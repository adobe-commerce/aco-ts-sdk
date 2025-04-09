#!/bin/bash

# Check if a file argument is provided
if [ -z "$1" ]; then
    echo "Error: No input file specified"
    exit 1
fi

INPUT_FILE="$1"

# Update server URL and description using awk
awk '
BEGIN { p=1 }
/^servers:/ { 
  print "servers:";
  print "  - url: https://na1.api.commerce.adobe.com/<TENANT_ID>/";
  print "    description: Production endpoint. The TENANT_ID value is the identifier of the Adobe Commerce instance. See [Adobe Commerce Cloud Manager](https://experience.adobe.com/#/commerce/cloud-service/instances) to see your available instances.";
  print "";
  p=0 
}
/^tags:/ { p=1 }
p { print }
' "$INPUT_FILE" > "$INPUT_FILE.tmp" && mv "$INPUT_FILE.tmp" "$INPUT_FILE"

# Convert operationId fields from <Entity><HttpMethod> to <Action><Entity>
# Using capture groups to extract the entity name and transform based on HTTP method
sed -i.bak 's/operationId: \([A-Za-z]*\)Post/operationId: create\1/g' "$INPUT_FILE"
sed -i.bak 's/operationId: \([A-Za-z]*\)Put/operationId: create\1/g' "$INPUT_FILE"
sed -i.bak 's/operationId: \([A-Za-z]*\)Patch/operationId: update\1/g' "$INPUT_FILE"
sed -i.bak 's/operationId: \([A-Za-z]*\)Delete/operationId: delete\1/g' "$INPUT_FILE"

# Change x-api-key parameter to Authorization
sed -i.bak 's/name: x-api-key/name: Authorization/g' "$INPUT_FILE"
sed -i.bak 's/description: Production public API key/description: Authorization Bearer token/g' "$INPUT_FILE"

# Remove x-gw-signature parameter
sed -i.bak '/name: x-gw-signature/,/description:.*$/d' "$INPUT_FILE"

# Update unauthorized response descriptions
sed -i.bak 's/description: Unauthorized request. Verify the `x-api-key` and make sure that the JWT in `x-gw-signature` is still valid./description: Unauthorized request. Verify the `Authorization` header is present and the Bearer token is still valid./g' "$INPUT_FILE"
sed -i.bak 's/description: Unauthorized request. Verify the `x-api-key` is present and valid./description: Unauthorized request. Verify the `Authorization` header is present and the Bearer token is still valid./g' "$INPUT_FILE"

# Clean up backup files
rm -f "$INPUT_FILE.bak"

echo "OpenAPI spec cleaned successfully."
