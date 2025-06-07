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

import { ApiError } from './errors';
import type { AuthService } from './auth';
import type { ApiResponse, Environment, Logger, ProcessFeedResponse, Region } from './types';
import ky, { BeforeRetryState } from 'ky';

export interface HttpClient {
  request(endpoint: string, options?: RequestInit): Promise<ApiResponse>;
}

export interface HttpClientConfig {
  auth: AuthService;
  tenantId: string;
  region: Region;
  environment: Environment;
  timeoutMs: number;
  logger: Logger;
  baseUrlOverride?: string;
}

export const DEFAULT_TIMEOUT_MS = 10000;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000;

export function createHttpClient(config: HttpClientConfig): HttpClient {
  const { auth, tenantId, region, environment, timeoutMs, logger, baseUrlOverride } = config;
  const baseUrl =
    baseUrlOverride ||
    `https://${region.toLowerCase()}${environment.toLowerCase() === 'production' ? '' : '-sandbox'}.api.commerce.adobe.com`;

  const calculateRetryDelay = (attemptCount: number): number => {
    return INITIAL_RETRY_DELAY_MS * Math.pow(2, attemptCount - 1);
  };

  const getHeaders = async (additionalHeaders?: HeadersInit): Promise<HeadersInit> => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await auth.getBearerToken()}`,
      ...additionalHeaders,
    };
  };

  const maskSensitiveHeaders = (headers: HeadersInit): HeadersInit => {
    const authHeader = 'Authorization';
    const maskedHeaders = { ...headers };
    if (authHeader in maskedHeaders) {
      maskedHeaders[authHeader] = 'Bearer ***';
    }
    return maskedHeaders;
  };

  return {
    async request(endpoint: string, options?: RequestInit): Promise<ApiResponse> {
      const headers = await getHeaders(options?.headers);

      try {
        logger.debug('Sending request to ACO API', {
          url: `${baseUrl}/${tenantId}/${endpoint}`,
          headers: maskSensitiveHeaders(headers),
          options,
        });

        const res = await ky(`${baseUrl}/${tenantId}/${endpoint}`, {
          ...options,
          headers,
          timeout: timeoutMs,
          retry: {
            limit: MAX_RETRIES,
            methods: ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'],
            delay: calculateRetryDelay,
          },
          hooks: {
            beforeRetry: [
              // eslint-disable-next-line unused-imports/no-unused-vars
              ({ request, options, error, retryCount }: BeforeRetryState): void => {
                if (error instanceof ApiError && error.statusCode === 429) {
                  logger.info(
                    `Rate limit exceeded.\n` +
                      `Status Code: ${error.statusCode}\n` +
                      `Message: ${error.message}\n` +
                      `Attempt ${retryCount}/${MAX_RETRIES}\n` +
                      `Retrying in ${calculateRetryDelay(retryCount)}ms`,
                  );
                }
              },
            ],
            afterResponse: [
              // eslint-disable-next-line unused-imports/no-unused-vars
              async (request, options, response): Promise<void> => {
                if (!response.ok) {
                  const errorData = await response.json().catch(() => ({}));
                  const error = new ApiError(
                    `API request failed: ${res.statusText}`,
                    res.status,
                    JSON.stringify(errorData),
                  );
                  logger.error(error.message, error);
                  throw error;
                }
              },
            ],
          },
        });

        const data: ProcessFeedResponse = await res.json();

        logger.debug('Received response from ACO API', {
          url: `${baseUrl}/${tenantId}/${endpoint}`,
          status: res.status,
          statusText: res.statusText,
          data,
        });

        return {
          ok: res.ok,
          status: res.status,
          statusText: res.statusText,
          data,
        };
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError('Could not execute API request');
      }
    },
  };
}
