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
import { HTTPError } from 'ky';
// ky is imported dynamically below to avoid CJS bundling issues with the ESM-only ky package

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
const RETRYABLE_STATUS_CODES = [408, 413, 429, 500, 502, 503, 504];

export function createHttpClient(config: HttpClientConfig): HttpClient {
  const { auth, tenantId, region, environment, timeoutMs, logger, baseUrlOverride } = config;
  const baseUrl =
    baseUrlOverride ||
    `https://${region.toLowerCase()}${environment.toLowerCase() === 'production' ? '' : '-sandbox'}.api.commerce.adobe.com`;

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

  const handleRetryableError = (response: Response, attempt: number): void => {
    const retryAfter = response.headers.get('retry-after');
    const retryAfterInfo = retryAfter ? ` Retrying after ${retryAfter}s.` : '';

    if (response.status === 429) {
      logger.info(
        `Rate limit exceeded. Status Code: ${response.status}. Message: ${response.statusText}. Attempt ${attempt}/${MAX_RETRIES}.${retryAfterInfo}`,
      );
    } else {
      logger.info(
        `Request failed. Status Code: ${response.status}. Message: ${response.statusText}. Attempt ${attempt}/${MAX_RETRIES}.`,
      );
    }
  };

  return {
    async request(endpoint: string, options?: RequestInit): Promise<ApiResponse> {
      const headers = await getHeaders(options?.headers);
      let attempt = 1;

      try {
        logger.debug('Sending request to ACO API', {
          url: `${baseUrl}/${tenantId}${endpoint}`,
          headers: maskSensitiveHeaders(headers),
          options,
        });

        const ky = (await import('ky')).default;
        const res = await ky(`${baseUrl}/${tenantId}${endpoint}`, {
          ...options,
          headers,
          timeout: timeoutMs,
          retry: {
            limit: MAX_RETRIES,
            methods: ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'],
            statusCodes: RETRYABLE_STATUS_CODES,
          },
          hooks: {
            afterResponse: [
              // eslint-disable-next-line unused-imports/no-unused-vars
              async (request, options, response): Promise<void> => {
                if (!response.ok && RETRYABLE_STATUS_CODES.includes(response.status) && attempt <= MAX_RETRIES) {
                  handleRetryableError(response, attempt);
                  attempt++;
                  return;
                }
              },
            ],
          },
        });

        const data: ProcessFeedResponse = await res.json();

        logger.debug('Received response from ACO API', {
          url: `${baseUrl}/${tenantId}${endpoint}`,
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
        // Handle ky HTTPError
        if (error instanceof HTTPError) {
          const response = error.response as Response;
          const errorPrefix = attempt > MAX_RETRIES ? 'Maximum retry attempts reached' : 'API request failed';
          const errorData = await response.json().catch(() => ({}));
          const apiError = new ApiError(
            `${errorPrefix}: ${response.statusText}`,
            response.status,
            JSON.stringify(errorData),
          );
          logger.error(apiError.message, apiError);
          throw apiError;
        }

        logger.error('Error executing API request', error as Error);
        throw new ApiError('Could not execute API request', undefined, error as Error);
      }
    },
  };
}
