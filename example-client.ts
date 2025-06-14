/* eslint-disable no-console */
import { config } from 'dotenv';
import { createClient, Client } from './src/client';
import {
  ClientConfig,
  Region,
  Environment,
  FeedProduct,
  FeedProductStatusEnum,
  FeedProductVisibleInEnum,
} from './src/types';

// Load environment variables from .env file
config();

// Validate required environment variables
const requiredEnvVars = ['IMS_CLIENT_ID', 'IMS_CLIENT_SECRET', 'TENANT_ID', 'REGION', 'ENVIRONMENT'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

async function main(): Promise<void> {
  // Define your configuration
  const config: ClientConfig = {
    credentials: {
      clientId: process.env.IMS_CLIENT_ID!,
      clientSecret: process.env.IMS_CLIENT_SECRET!,
    },
    tenantId: process.env.TENANT_ID!,
    region: process.env.REGION as Region,
    environment: process.env.ENVIRONMENT as Environment,
  };

  // Initialize the client instance
  const client: Client = createClient(config);

  // Define a couple of products
  const product1: FeedProduct = {
    sku: 'EXAMPLE-SKU-001',
    source: { locale: 'en-US' },
    name: 'Example Product 1',
    slug: 'example-product-1',
    description: 'This is an example product created via the SDK',
    status: FeedProductStatusEnum.Enabled,
    visibleIn: [FeedProductVisibleInEnum.Catalog, FeedProductVisibleInEnum.Search],
    attributes: [
      {
        code: 'brand',
        values: ['Example Brand'],
      },
      {
        code: 'category',
        values: ['Electronics'],
      },
    ],
  };

  const product2: FeedProduct = {
    sku: 'EXAMPLE-SKU-002',
    source: { locale: 'en-US' },
    name: 'Example Product 2',
    slug: 'example-product-2',
    description: 'This is another example product created via the SDK',
    status: FeedProductStatusEnum.Enabled,
    visibleIn: [FeedProductVisibleInEnum.Catalog, FeedProductVisibleInEnum.Search],
    attributes: [
      {
        code: 'brand',
        values: ['Example Brand'],
      },
      {
        code: 'category',
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
