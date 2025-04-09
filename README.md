# Adobe Commerce Optimizer SDK

A TypeScript SDK for easy integration with the Adobe Commerce Optimizer Data Ingestion API.

## Documentation

For complete API documentation, visit the
[Adobe Commerce Composable Catalog Documentation](https://developer-stage.adobe.com/commerce/services/composable-catalog/data-ingestion).

## Installation

```bash
npm install @adobe/aco-ts-sdk
```

## Creating a Client

The SDK provides a client for interacting with the Adobe Commerce Optimizer API. To create a client instance:

```typescript
import { createClient, Environment, Region } from '@adobe/aco-ts-sdk';

const client = createClient(
  {
    clientId: 'my-client-id', // Your IMS client id from Dev Console
    clientSecret: 'my-client-secret', // Your IMS client secret from Dev Console
  },
  'my-tenant-id', // Your instance's tenant id found in Commerce Cloud Manager UI
  'na1' as Region, // Your instance's region
  'sandbox' as Environment, // Your instance's environment type: sandbox or production
);
```

## Available Operations

The client provides the following Catalog operations:

### Product Operations

#### Create Products

```typescript
import {
  FeedProduct,
  FeedProductStatusEnum,
  FeedProductVisibleInEnum,
  ProductAttributeTypeEnum,
} from '@adobe/aco-ts-sdk';

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
  ],
};

const response = await client.createProducts([product1, product2]);
// Response: { status: 'ACCEPTED', acceptedCount: 2 }
```

#### Update Products

```typescript
import { FeedProductUpdate } from '@adobe/aco-ts-sdk';

const productUpdate: FeedProductUpdate = {
  sku: 'EXAMPLE-SKU-001',
  scope: { locale: 'en-US' },
  name: 'Updated Product Name',
};

const response = await client.updateProducts([productUpdate]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Delete Products

```typescript
import { FeedProductDelete } from '@adobe/aco-ts-sdk';

const productDelete: FeedProductDelete = {
  sku: 'EXAMPLE-SKU-001',
  scope: { locale: 'en-US' },
};

const response = await client.deleteProducts([productDelete]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

### Product Metadata Operations

#### Create Product Metadata

```typescript
import { FeedMetadata, FeedMetadataDataTypeEnum, FeedMetadataVisibleInEnum } from '@adobe/aco-ts-sdk';

const metadata: FeedMetadata = {
  code: 'color',
  scope: { locale: 'en-US' },
  label: 'Color',
  dataType: FeedMetadataDataTypeEnum.Text,
  visibleIn: [FeedMetadataVisibleInEnum.ProductDetail],
  filterable: true,
  sortable: true,
  searchable: true,
};

const response = await client.createProductMetadata([metadata]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Update Product Metadata

```typescript
import { FeedMetadataUpdate } from '@adobe/aco-ts-sdk';

const metadataUpdate: FeedMetadataUpdate = {
  code: 'color',
  scope: { locale: 'en-US' },
  label: 'Updated Color Label',
};

const response = await client.updateProductMetadata([metadataUpdate]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Delete Product Metadata

```typescript
import { FeedMetadataDelete } from '@adobe/aco-ts-sdk';

const metadataDelete: FeedMetadataDelete = {
  code: 'color',
  scope: { locale: 'en-US' },
};

const response = await client.deleteProductMetadata([metadataDelete]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

### Price Book Operations

#### Create Price Books

```typescript
import { FeedPricebook } from '@adobe/aco-ts-sdk';

const pricebook: FeedPricebook = {
  code: 'default',
  name: 'Default Price Book',
  currency: 'USD',
};

const response = await client.createPriceBooks([pricebook]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Update Price Books

```typescript
import { FeedPricebook } from './src/types';

const pricebookUpdate: FeedPricebook = {
  code: 'default',
  name: 'Updated Price Book Name',
};

const response = await client.updatePriceBooks([pricebookUpdate]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Delete Price Books

```typescript
import { FeedPricebook } from '@adobe/aco-ts-sdk';

const pricebookDelete: FeedPricebook = {
  code: 'default',
};

const response = await client.deletePriceBooks([pricebookDelete]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

### Price Operations

#### Create Prices

```typescript
import { FeedPrices } from '@adobe/aco-ts-sdk';

const price: FeedPrices = {
  sku: 'EXAMPLE-SKU-001',
  scope: { locale: 'en-US' },
  pricebook: 'default',
  price: 99.99,
};

const response = await client.createPrices([price]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Update Prices

```typescript
import { FeedPricesUpdate } from '@adobe/aco-ts-sdk';

const priceUpdate: FeedPricesUpdate = {
  sku: 'EXAMPLE-SKU-001',
  scope: { locale: 'en-US' },
  pricebook: 'default',
  price: 89.99,
};

const response = await client.updatePrices([priceUpdate]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Delete Prices

```typescript
import { FeedPricesDelete } from '@adobe/aco-ts-sdk';

const priceDelete: FeedPricesDelete = {
  sku: 'EXAMPLE-SKU-001',
  scope: { locale: 'en-US' },
  pricebook: 'default',
};

const response = await client.deletePrices([priceDelete]);
// Response: { status: 'ACCEPTED', acceptedCount: 1 }
```

## Types

See the [types.ts](https://github.com/adobe-commerce/aco-ts-sdk/blob/main/src/types.ts) file for all exported types.
