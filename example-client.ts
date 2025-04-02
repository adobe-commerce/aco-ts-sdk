/* eslint-disable no-console */
import { config } from 'dotenv';
import { createClient } from './src/client';
import {
  Region,
  Environment,
  FeedProduct,
  FeedProductStatusEnum,
  FeedProductVisibleInEnum,
  ProductAttributeTypeEnum,
} from './src/types';

// Load environment variables from .env file
config();

// Validate required environment variables
const requiredEnvVars = ['IMS_CLIENT_ID', 'IMS_CLIENT_SECRET', 'IMS_SCOPES', 'TENANT_ID', 'REGION', 'ENVIRONMENT'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

async function main(): Promise<void> {
  // Create client instance
  const client = createClient(
    {
      clientId: process.env.IMS_CLIENT_ID!,
      clientSecret: process.env.IMS_CLIENT_SECRET!,
      scopes: process.env.IMS_SCOPES!,
    },
    process.env.TENANT_ID!,
    process.env.REGION as Region,
    process.env.ENVIRONMENT as Environment,
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
}

// Run the example
main().catch(console.error);
