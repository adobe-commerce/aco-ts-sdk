import { config } from 'dotenv';
import { describe, test, beforeAll, expect } from 'vitest';
import { Client, createClient } from '../../src/client';
import { FeedPrices, Environment, Region, ClientConfig } from '../../src/types';

config();

const requiredEnvVars = ['IMS_CLIENT_ID', 'IMS_CLIENT_SECRET', 'TENANT_ID', 'REGION', 'ENVIRONMENT'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

describe('Prices Integration Tests', () => {
  let client: Client;

  const price1: FeedPrices = {
    sku: 'EXAMPLE-SKU-001',
    priceBookId: 'default',
    regular: 99.99,
  };

  const price2: FeedPrices = {
    sku: 'EXAMPLE-SKU-001',
    priceBookId: 'vip',
    regular: 79.99,
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

  test('should create prices', async () => {
    const response = await client.createPrices([price1, price2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should update prices', async () => {
    const priceUpdate1: FeedPrices = {
      sku: 'EXAMPLE-SKU-001',
      priceBookId: 'default',
      regular: 109.99,
    };

    const priceUpdate2: FeedPrices = {
      sku: 'EXAMPLE-SKU-001',
      priceBookId: 'vip',
      regular: 59.99,
    };

    const response = await client.updatePrices([priceUpdate1, priceUpdate2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should delete prices', async () => {
    const response = await client.deletePrices([
      { sku: price1.sku, priceBookId: price1.priceBookId },
      { sku: price2.sku, priceBookId: price2.priceBookId },
    ]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });
});
