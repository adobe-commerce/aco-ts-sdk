import { config } from 'dotenv';
import { describe, test, beforeAll, expect } from 'vitest';
import { Client, createClient } from '../../src/client';
import {
  FeedMetadataVisibleInEnum,
  FeedMetadataDataTypeEnum,
  FeedMetadata,
  FeedMetadataUpdate,
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

describe('Product Metadata Integration Tests', () => {
  let client: Client;

  const metadata1: FeedMetadata = {
    code: 'color',
    scope: { locale: 'en-US' },
    label: 'Color',
    dataType: FeedMetadataDataTypeEnum.Text,
    visibleIn: [
      FeedMetadataVisibleInEnum.ProductDetail,
      FeedMetadataVisibleInEnum.ProductListing,
      FeedMetadataVisibleInEnum.SearchResults,
      FeedMetadataVisibleInEnum.ProductCompare,
    ],
    filterable: true,
    sortable: true,
    searchable: true,
  };

  const metadata2: FeedMetadata = {
    code: 'size',
    scope: { locale: 'en-US' },
    label: 'Size',
    dataType: FeedMetadataDataTypeEnum.Text,
    visibleIn: [
      FeedMetadataVisibleInEnum.ProductDetail,
      FeedMetadataVisibleInEnum.ProductListing,
      FeedMetadataVisibleInEnum.SearchResults,
      FeedMetadataVisibleInEnum.ProductCompare,
    ],
    filterable: true,
    sortable: true,
    searchable: true,
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

  test('should create product metadata', async () => {
    const response = await client.createProductMetadata([metadata1, metadata2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should update product metadata', async () => {
    const metadataUpdate1: FeedMetadataUpdate = {
      code: 'color',
      scope: { locale: 'en-US' },
      label: 'Color Updated',
    };
    const metadataUpdate2: FeedMetadataUpdate = {
      code: 'size',
      scope: { locale: 'en-US' },
      label: 'Size Updated',
    };

    const response = await client.updateProductMetadata([metadataUpdate1, metadataUpdate2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should delete product metadata', async () => {
    const response = await client.deleteProductMetadata([
      { code: metadata1.code, scope: metadata1.scope },
      { code: metadata2.code, scope: metadata2.scope },
    ]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });
});
