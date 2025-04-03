# Adobe Commerce Optimizer SDK

A TypeScript SDK for easy integration with the Adobe Commerce Optimizer Data Ingestion API.

## Documentation

For complete API documentation, visit the
[Adobe Commerce Composable Catalog Documentation](https://developer-stage.adobe.com/commerce/services/composable-catalog/data-ingestion).

## Installation

```bash
npm install @adobe/aco-ts-sdk
```

## Usage

```typescript
import { createClient } from '@adobe/aco-ts-sdk';
import {
  Region,
  Environment,
  FeedProduct,
  FeedProductStatusEnum,
  FeedProductVisibleInEnum,
  ProductAttributeTypeEnum,
} from './src/types';

// Create client instance
const client = createClient(
  {
    clientId: 'my-client-id',
    clientSecret: 'my-client-secret',
    scopes: 'adobeio_api,openid,AdobeID,read_organizations',
  },
  'my-tenant-id',
  'na1' as Region,
  'sandbox' as Environment,
);

// Define a couple of products
const product1: FeedProduct = {
  sku: 'EXAMPLE-SKU-001',
  scope: { locale: 'en-US' },
  name: 'Example Product 1',
  slug: 'example-product-1',
  description: 'This is an example product created via the SDK',
  status: FeedProductStatusEnum.Enabled,
  visibleIn: [FeedProductVisibleInEnum.Catalog, FeedProductVisibleInEnum.Search],
  attributes: [
    {
      code: 'brand',
      type: ProductAttributeTypeEnum.String,
      values: ['Example Brand'],
    },
    {
      code: 'category',
      type: ProductAttributeTypeEnum.String,
      values: ['Electronics'],
    },
  ],
};

const product2: FeedProduct = {
  sku: 'EXAMPLE-SKU-002',
  scope: { locale: 'en-US' },
  name: 'Example Product 2',
  slug: 'example-product-2',
  description: 'This is another example product created via the SDK',
  status: FeedProductStatusEnum.Enabled,
  visibleIn: [FeedProductVisibleInEnum.Catalog, FeedProductVisibleInEnum.Search],
  attributes: [
    {
      code: 'brand',
      type: ProductAttributeTypeEnum.String,
      values: ['Example Brand'],
    },
    {
      code: 'category',
      type: ProductAttributeTypeEnum.String,
      values: ['Electronics'],
    },
  ],
};

// Create the products
try {
  const response = await client.createProducts([product1, product2]);
  console.log('Product created successfully:', response);
} catch (error) {
  console.error('Error creating product:', error);
}
```

### Run the Example Client

The [example-client.ts](https://github.com/adobe-commerce/aco-ts-sdk/blob/main/example-client.ts) file contains the most
recent example usage.

1. Set your credentials in a `.env` file following the example in `.env.sample`.
2. Run the command: `ts-node example-client.ts`.
3. Expected output: `Products created successfully: { status: 'ACCEPTED', acceptedCount: 2 }`
