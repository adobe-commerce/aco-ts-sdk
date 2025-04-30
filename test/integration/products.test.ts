import { config } from 'dotenv';
import { describe, test, beforeAll, expect } from 'vitest';
import { Client, createClient } from '../../src/client';
import {
  FeedProduct,
  FeedProductStatusEnum,
  FeedProductVisibleInEnum,
  ProductAttributeTypeEnum,
  FeedProductUpdate,
  Environment,
  Region,
  ClientConfig,
} from '../../src/types';

config();

const requiredEnvVars = ['IMS_CLIENT_ID', 'IMS_CLIENT_SECRET', 'TENANT_ID', 'REGION', 'ENVIRONMENT'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

describe('Products Integration Tests', () => {
  let client: Client;

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

  beforeAll(() => {
    const config: ClientConfig = {
      credentials: {
        clientId: process.env.IMS_CLIENT_ID!,
        clientSecret: process.env.IMS_CLIENT_SECRET!,
      },
      tenantId: process.env.TENANT_ID!,
      region: process.env.REGION as Region,
      environment: process.env.ENVIRONMENT as Environment,
    };

    client = createClient(config);
  });

  test('should create products', async () => {
    const response = await client.createProducts([product1, product2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should update products', async () => {
    const productUpdate1: FeedProductUpdate = {
      sku: 'EXAMPLE-SKU-001',
      scope: { locale: 'en-US' },
      name: 'Updated Product Name',
    };

    const productUpdate2: FeedProductUpdate = {
      sku: 'EXAMPLE-SKU-002',
      scope: { locale: 'en-US' },
      name: 'Updated Product Name 2',
    };

    const response = await client.updateProducts([productUpdate1, productUpdate2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should delete products', async () => {
    const response = await client.deleteProducts([
      { sku: product1.sku, scope: product1.scope },
      { sku: product2.sku, scope: product2.scope },
    ]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });
});
