#!/bin/bash

# Update server URL and description using awk
awk '
BEGIN { p=1 }
/^servers:/ { 
  print "servers:";
  print "  - url: https://na1.api.commerce.adobe.com/<TENANT_ID>/api/";
  print "    description: Production endpoint. The TENANT_ID value is the identifier of the Adobe Commerce instance. See [Adobe Commerce Cloud Manager](https://experience.adobe.com/#/commerce/cloud-service/instances) to see your available instances.";
  print "";
  p=0 
}
/^tags:/ { p=1 }
p { print }
' "$1" > "$1.tmp" && mv "$1.tmp" "$1"

# Convert operationId fields from <Entity><HttpMethod> to <Action><Entity>
# Using capture groups to extract the entity name and transform based on HTTP method
sed -i 's/operationId: \([A-Za-z]*\)Post/operationId: create\1/g' "$1"
sed -i 's/operationId: \([A-Za-z]*\)Put/operationId: create\1/g' "$1"
sed -i 's/operationId: \([A-Za-z]*\)Patch/operationId: update\1/g' "$1"
sed -i 's/operationId: \([A-Za-z]*\)Delete/operationId: delete\1/g' "$1"

# Change x-api-key parameter to Authorization
sed -i 's/name: x-api-key/name: Authorization/g' "$1"
sed -i 's/description: Production public API key/description: Authorization Bearer token/g' "$1"

# Remove x-gw-signature parameter
sed -i '/name: x-gw-signature/,/description:.*$/d' "$1"

# Update unauthorized response descriptions
sed -i 's/description: Unauthorized request. Verify the `x-api-key` and make sure that the JWT in `x-gw-signature` is still valid./description: Unauthorized request. Verify the `Authorization` header is present and the Bearer token is still valid./g' "$1"
sed -i 's/description: Unauthorized request. Verify the `x-api-key` is present and valid./description: Unauthorized request. Verify the `Authorization` header is present and the Bearer token is still valid./g' "$1"
