/**
 * Copyright 2025 Adobe. All Rights Reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the License for
 * the specific language governing permissions and limitations under the License.
 */

import { config } from 'dotenv';
import { describe, test, beforeAll, expect } from 'vitest';
import { Client, createClient } from '../../src/client';
import {
  FeedProductMetadataVisibleInEnum,
  FeedProductMetadataDataTypeEnum,
  FeedProductMetadata,
  FeedProductMetadataUpdate,
  FeedCategoryMetadataDataTypeEnum,
  FeedCategoryMetadata,
  FeedCategoryMetadataUpdate,
  Environment,
  Region,
  ClientConfig,
  LogLevel,
} from '../../src/types';
import { consoleLogger } from '../../src/logger';

config();

const requiredEnvVars = ['IMS_CLIENT_ID', 'IMS_CLIENT_SECRET', 'TENANT_ID', 'REGION', 'ENVIRONMENT'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const createTestClient = (): Client => {
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

  return createClient(config);
};

describe('Product Metadata Integration Tests', () => {
  let client: Client;

  const metadata1: FeedProductMetadata = {
    code: 'color',
    source: { locale: 'en-US' },
    label: 'Color',
    dataType: FeedProductMetadataDataTypeEnum.Text,
    visibleIn: [
      FeedProductMetadataVisibleInEnum.ProductDetail,
      FeedProductMetadataVisibleInEnum.ProductListing,
      FeedProductMetadataVisibleInEnum.SearchResults,
      FeedProductMetadataVisibleInEnum.ProductCompare,
    ],
    filterable: true,
    sortable: true,
    searchable: true,
  };

  const metadata2: FeedProductMetadata = {
    code: 'size',
    source: { locale: 'en-US' },
    label: 'Size',
    dataType: FeedProductMetadataDataTypeEnum.Text,
    visibleIn: [
      FeedProductMetadataVisibleInEnum.ProductDetail,
      FeedProductMetadataVisibleInEnum.ProductListing,
      FeedProductMetadataVisibleInEnum.SearchResults,
      FeedProductMetadataVisibleInEnum.ProductCompare,
    ],
    filterable: true,
    sortable: true,
    searchable: true,
  };

  beforeAll(() => {
    client = createTestClient();
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
    const metadataUpdate1: FeedProductMetadataUpdate = {
      code: 'color',
      source: { locale: 'en-US' },
      label: 'Color Updated',
    };
    const metadataUpdate2: FeedProductMetadataUpdate = {
      code: 'size',
      source: { locale: 'en-US' },
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
      { code: metadata1.code, source: metadata1.source },
      { code: metadata2.code, source: metadata2.source },
    ]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });
});

describe('Category Metadata Integration Tests', () => {
  let client: Client;

  const metadata1: FeedCategoryMetadata = {
    code: 'department',
    source: { locale: 'en-US' },
    label: 'Department',
    dataType: FeedCategoryMetadataDataTypeEnum.Text,
  };

  const metadata2: FeedCategoryMetadata = {
    code: 'season',
    source: { locale: 'en-US' },
    label: 'Season',
    dataType: FeedCategoryMetadataDataTypeEnum.Text,
  };

  beforeAll(() => {
    client = createTestClient();
  });

  test('should create category metadata', async () => {
    const response = await client.createCategoryMetadata([metadata1, metadata2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should update category metadata', async () => {
    const metadataUpdate1: FeedCategoryMetadataUpdate = {
      code: 'department',
      source: { locale: 'en-US' },
      label: 'Department Updated',
    };
    const metadataUpdate2: FeedCategoryMetadataUpdate = {
      code: 'season',
      source: { locale: 'en-US' },
      label: 'Season Updated',
    };

    const response = await client.updateCategoryMetadata([metadataUpdate1, metadataUpdate2]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });

  test('should delete category metadata', async () => {
    const response = await client.deleteCategoryMetadata([
      { code: metadata1.code, source: metadata1.source },
      { code: metadata2.code, source: metadata2.source },
    ]);
    expect(response).toBeDefined();
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.data.status).toBe('ACCEPTED');
    expect(response.data.acceptedCount).toBe(2);
  });
});
