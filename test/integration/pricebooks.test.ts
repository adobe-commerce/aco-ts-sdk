import { config } from 'dotenv';
import { describe, test, beforeAll, expect } from 'vitest';
import { Client, createClient } from '../../src/client';
import { FeedPricebook, Environment, Region, ClientConfig, LogLevel } from '../../src/types';
import { consoleLogger } from '../../src/logger';

config();

const requiredEnvVars = ['IMS_CLIENT_ID', 'IMS_CLIENT_SECRET', 'TENANT_ID', 'REGION', 'ENVIRONMENT'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

describe('Pricebooks Integration Tests', () => {
  let client: Client;

  const pricebook1: FeedPricebook = {
    priceBookId: 'default',
    name: 'Default Price Book',
    currency: 'USD',
  };

  const pricebook2: FeedPricebook = {
    priceBookId: 'vip',
    name: 'VIP Price Book',
    currency: 'USD',
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
      logger: consoleLogger(LogLevel.DEBUG),
    };

    client = createClient(config);
  });

  test('should create priceBooks', async () => {
    const response = await client.createPriceBooks([pricebook1, pricebook2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should update priceBooks', async () => {
    const pricebookUpdate1: FeedPricebook = {
      priceBookId: 'default',
      name: 'Default Price Book Updated',
    };

    const pricebookUpdate2: FeedPricebook = {
      priceBookId: 'vip',
      name: 'VIP Price Book Updated',
    };

    const response = await client.updatePriceBooks([pricebookUpdate1, pricebookUpdate2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should delete priceBooks', async () => {
    const response = await client.deletePriceBooks([
      { priceBookId: pricebook1.priceBookId },
      { priceBookId: pricebook2.priceBookId },
    ]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });
});
