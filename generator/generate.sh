#!/bin/bash

# ============================================================================
# Copyright 2025 Adobe. All Rights Reserved.
#
# This file is licensed to you under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License. You may obtain a copy
# of the License at http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed under
# the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
# OF ANY KIND, either express or implied. See the License for the specific language
# governing permissions and limitations under the License.
# ============================================================================

FORCE=false
GEN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SPEC_FILE_URL="https://raw.githubusercontent.com/AdobeDocs/commerce-services/refs/heads/develop/src/openapi/data-ingestion-schema-v1.yaml"
TEMP_SPEC="catalog-ingestion-openapi-spec.yaml.tmp"
CURRENT_SPEC="catalog-ingestion-openapi-spec.yaml"

cd "$GEN_DIR" || exit 1

# Parse command line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -f|--force) FORCE=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

printf "########################\n"
printf "Generating ACO TS SDK\n"
printf "########################\n"

printf "\nDownloading latest OpenAPI spec from Adobe Docs repo (%s)...\n" "$SPEC_FILE_URL"
curl -o "$TEMP_SPEC" "$SPEC_FILE_URL"

# Check if the spec has changed, unless force flag is set
if [ "$FORCE" = false ] && [ -f "$CURRENT_SPEC" ] && cmp -s "$TEMP_SPEC" "$CURRENT_SPEC"; then
    printf "\nNo changes detected in OpenAPI spec. Skipping generation.\n"
    rm "$TEMP_SPEC"
    exit 0
fi

mv "$TEMP_SPEC" "$CURRENT_SPEC"

printf "\nGenerating client SDK code and types...\n\n"

if [ ! -f "generator-config.yaml" ]; then
    printf "\n❌ Error: generator-config.yaml not found in %s\n" "$(pwd)"
    exit 1
fi

GENERATOR_CLI=$(pnpm exec which openapi-generator-cli)
if [ -z "$GENERATOR_CLI" ]; then
    printf "\n❌ Error: openapi-generator-cli not found in PATH\n"
    exit 1
fi

if ! "$GENERATOR_CLI" generate -c "$(pwd)/generator-config.yaml" -i "$(pwd)/$CURRENT_SPEC" -g typescript-fetch -o ../; then
    printf "\n❌ OpenAPI generator failed! Generation aborted.\n"
    exit 1
fi

printf "\nFormatting generated code...\n\n"
cd .. || exit 1
# Post-process generated files to fix formatting issues
FILES=($(find "$(pwd)/src" "$(pwd)/test" -name "*.ts" 2>/dev/null))
for FILE in "${FILES[@]}"; do
    # Step 1: Fix encoded angle brackets in JSDoc comments
    sed -i 's/&lt;/</g' "$FILE"
    sed -i 's/& lt;/</g' "$FILE"
    sed -i 's/&gt;/>/g' "$FILE"
    sed -i 's/& gt;/>/g' "$FILE"
    sed -i 's/& gt}/>/g' "$FILE"
    # Step 2: Convert Array<T> to T[] in JSDoc comments
    sed -i 's/@type {Array<\([^>]*\)>}/@type {\1[]}/g' "$FILE"
    sed -i 's/@param \([a-zA-Z0-9_]*\) - Array<\([^>]*\)>/@param \1 - \2[]/g' "$FILE"
    # Step 3: Convert Array<T> to T[] in TypeScript code
    # Property types and type definitions
    sed -i 's/: Array<\([^>]*\)>/: \1[]/g' "$FILE"
    sed -i 's/\?: Array<\([^>]*\)>/\?: \1[]/g' "$FILE"
    sed -i 's/export type \([a-zA-Z0-9_]*\) = Array<\([^>]*\)>;/export type \1 = \2[];/g' "$FILE"
    # Function parameters with generic patterns
    sed -i 's/\([a-zA-Z0-9_]*\)(data: Array<\([^>]*\)>)/\1(data: \2[])/g' "$FILE"
    sed -i 's/\([a-zA-Z0-9_]*\)(\([a-zA-Z0-9_]*\): Array<\([^>]*\)>)/\1(\2: \3[])/g' "$FILE"
done

# Running prettier to fix formatting issues
pnpm format

printf "\nLinting generated code...\n\n"
pnpm lint:fix
if ! pnpm lint; then
    printf "\n❌ Linting failed! Generation aborted.\n"
    exit 1
fi

printf "\nTesting generated client...\n\n"
if ! pnpm test:run; then
    printf "\n❌ Tests failed! Generation aborted.\n"
    exit 1
fi

printf "\n✅ Generation Successful!\n"
