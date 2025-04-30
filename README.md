# Adobe Commerce Optimizer SDK

The Adobe Commerce Optimizer (ACO) SDK provides an easy integration point with the Adobe Commerce Optimizer Data
Ingestion API. With the ACO SDK, you do not need to manage the full integration with catalog ingestion APIs and IMS
authentication methods. Simply follow the guide below to install and begin using the ACO client SDK directly in your
codebase.

For complete Merchandising Services documentation, visit the
[Adobe Developer Documentation](https://developer-stage.adobe.com/commerce/services/composable-catalog/) site.

## Install the SDK

```bash
npm install @adobe-commerce/aco-ts-sdk
```

## Initialize the SDK

To get started ingesting your catalog into Adobe Commerce Optimizer, you first need to create the client. In order to do
this, use the `createClient` function provided in the `@adobe-commerce/aco-ts-sdk` package. The `createClient` function
accepts a client configuration object of type `ClientConfig`. The `ClientConfig` object requires the following:

- `credentials`: The credentials object contains the IMS fields needed to authenticate with the ACO APIs
  - `clientId`: This is your client id found in the Adobe Developer Console. See [documentation]().
  - `clientSecret`: This is your client secret found in the Adobe Developer Console. See [documentation]().
- `tenantId`: This is the identifier for your ACO instance. See [documentation]().
- `region`: This is the region in which your ACO instance is deployed. Example: `na1`. See [documentation]().
- `environment`: This is your ACO instance's environment type: `sandbox` or `production`

### How do I find my configuration values?

In the [Commerce Cloud Manager](https://experience.adobe.com/#/@commerceprojectbeacon/commerce/cloud-service/instances),
you will see a list of all of the instances you have provisioned. Find the instance you want to point the ACO SDK to and
click the "Instance info" icon. In the popup, find the `GraphQL endpoint` URL. From this URL, we can determine the
required `tenantId`, `region`, and `environment` configuration variables.

The URL is composed of the following: `https://{region}[-sandbox].api.commerce.adobe.com/{tenantId}/graphql` As an
example, if your GraphQL endpoint URL is `https://na1-sandbox.api.commerce.adobe.com/WVYj1WZf8ifzLH7n6WAVas/graphql`
then your configuration variables are as follows:

- `tenantId`: `WVYj1WZf8ifzLH7n6WAVas`
- `region`: `na1`
- `environment`: `sandbox`

_Note:_ Only the `sandbox` environment type will have its `environment` explicitly designated in the URL. If the
environment type is `production`, then the `environment` will be omitted from the URL. Example:

- Sandbox: `https://na1-sandbox.api.commerce.adobe.com/WVYj1WZf8ifzLH7n6WAVas/graphql`
- Production: `https://na1.api.commerce.adobe.com/WVYj1WZf8ifzLH7n6WAVas/graphql`

### Example:

```typescript
import { createClient, Client, ClientConfig, Environment, Region } from '@adobe-commerce/aco-ts-sdk';

// Define your configuration
const config: ClientConfig = {
  credentials: {
    clientId: 'my-client-id', // Your IMS client id from Dev Console
    clientSecret: 'my-client-secret', // Your IMS client secret from Dev Console
  },
  tenantId: 'my-tenant-id', // Your instance's tenant id found in Commerce Cloud Manager UI
  region: 'na1' as Region, // Your instance's region found in Commerce Cloud Manager UI
  environment: 'sandbox' as Environment, // Your instance's environment type: sandbox or production
};

// Initialize the client instance
const client: Client = createClient(config);
```

Once the `client` is initialized, you can begin ingesting your catalog data into Adobe Commerce Optimizer!

## Ingest Catalog Data

The ACO SDK Client provides the ability to easily manage the following entities in your catalog:

- Products
- Product Metadata
- Price Books
- Prices

### Product Operations

#### Create Products

```typescript
import {
  FeedProduct,
  FeedProductStatusEnum,
  FeedProductVisibleInEnum,
  ProductAttributeTypeEnum,
} from '@adobe-commerce/aco-ts-sdk';

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
// response.data: { status: 'ACCEPTED', acceptedCount: 2 }
```

#### Update Products

```typescript
import { FeedProductUpdate } from '@adobe-commerce/aco-ts-sdk';

const productUpdate: FeedProductUpdate = {
  sku: 'EXAMPLE-SKU-001',
  scope: { locale: 'en-US' },
  name: 'Updated Product Name',
};

const response = await client.updateProducts([productUpdate]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Delete Products

```typescript
import { FeedProductDelete } from '@adobe-commerce/aco-ts-sdk';

const productDelete: FeedProductDelete = {
  sku: 'EXAMPLE-SKU-001',
  scope: { locale: 'en-US' },
};

const response = await client.deleteProducts([productDelete]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

### Product Metadata Operations

#### Create Product Metadata

```typescript
import { FeedMetadata, FeedMetadataDataTypeEnum, FeedMetadataVisibleInEnum } from '@adobe-commerce/aco-ts-sdk';

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
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Update Product Metadata

```typescript
import { FeedMetadataUpdate } from '@adobe-commerce/aco-ts-sdk';

const metadataUpdate: FeedMetadataUpdate = {
  code: 'color',
  scope: { locale: 'en-US' },
  label: 'Updated Color Label',
};

const response = await client.updateProductMetadata([metadataUpdate]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Delete Product Metadata

```typescript
import { FeedMetadataDelete } from '@adobe-commerce/aco-ts-sdk';

const metadataDelete: FeedMetadataDelete = {
  code: 'color',
  scope: { locale: 'en-US' },
};

const response = await client.deleteProductMetadata([metadataDelete]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

### Price Book Operations

#### Create Price Books

```typescript
import { FeedPricebook } from '@adobe-commerce/aco-ts-sdk';

const pricebook: FeedPricebook = {
  priceBookId: 'default',
  name: 'Default Price Book',
  currency: 'USD',
};

const response = await client.createPriceBooks([pricebook]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Update Price Books

```typescript
import { FeedPricebook } from './src/types';

const pricebookUpdate: FeedPricebook = {
  priceBookId: 'default',
  name: 'Updated Price Book Name',
};

const response = await client.updatePriceBooks([pricebookUpdate]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Delete Price Books

```typescript
import { FeedPricebook } from '@adobe-commerce/aco-ts-sdk';

const pricebookDelete: FeedPricebook = {
  priceBookId: 'default',
};

const response = await client.deletePriceBooks([pricebookDelete]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

### Price Operations

#### Create Prices

```typescript
import { FeedPrices } from '@adobe-commerce/aco-ts-sdk';

const price: FeedPrices = {
  sku: 'EXAMPLE-SKU-001',
  priceBookId: 'default',
  regular: 99.99,
};

const response = await client.createPrices([price]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Update Prices

```typescript
import { FeedPricesUpdate } from '@adobe-commerce/aco-ts-sdk';

const priceUpdate: FeedPricesUpdate = {
  sku: 'EXAMPLE-SKU-001',
  priceBookId: 'default',
  regular: 99.99,
};

const response = await client.updatePrices([priceUpdate]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

#### Delete Prices

```typescript
import { FeedPricesDelete } from '@adobe-commerce/aco-ts-sdk';

const priceDelete: FeedPricesDelete = {
  sku: 'EXAMPLE-SKU-001',
  priceBookId: 'default',
  regular: 84.49,
};

const response = await client.deletePrices([priceDelete]);
// response.data: { status: 'ACCEPTED', acceptedCount: 1 }
```

## Types

See the [types.ts](https://github.com/adobe-commerce/aco-ts-sdk/blob/main/src/types.ts) file for all exported type
definitions.
