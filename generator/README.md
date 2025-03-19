# Adobe Commerce Optimizer Client SDK Generation

This SDK is generated using the [OpenAPI Generator](https://openapi-generator.tech/docs/customization/) tool with custom templates.

## Generation steps

1. Ensure the Catalog Ingestion OpenAPI spec yaml is present at `generator/catalog-ingestion-openapi-spec.yaml`
2. Run: `./generate.sh`

Generated files will be output to the root `src/` directory. The following files are currently generated:

- `src/types.ts`
- `src/client.ts`
