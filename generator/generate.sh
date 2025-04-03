#!/bin/bash

FORCE=false
GEN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SPEC_FILE_URL="https://raw.githubusercontent.com/AdobeDocs/commerce-services/refs/heads/ccdm-early-access/src/openapi/data-ingestion-schema-v1.yaml"
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

printf "\nCleaning OpenAPI spec file...\n"
./clean-openapi-spec.sh "$TEMP_SPEC"

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
