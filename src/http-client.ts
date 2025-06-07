/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2025 Adobe All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The
 * intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by
 * all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this
 * information or reproduction of this material is strictly forbidden unless prior written permission is obtained from
 * Adobe.
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
  logger: Logger;
  baseUrlOverride?: string;
}

const TIMEOUT_MS = 10000;
const BACKOFF_LIMIT_MS = 10000;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000;

export function createHttpClient(config: HttpClientConfig): HttpClient {
  const { auth, tenantId, region, environment, logger, baseUrlOverride } = config;
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

  return {
    async request(endpoint: string, options?: RequestInit): Promise<ApiResponse> {
      const headers = await getHeaders(options?.headers);

      try {
        logger.debug('Sending request to ACO API', {
          url: `${baseUrl}/${tenantId}/${endpoint}`,
          headers,
          options,
        });

        const res = await ky(`${baseUrl}/${tenantId}/${endpoint}`, {
          ...options,
          headers,
          timeout: TIMEOUT_MS,
          retry: {
            limit: MAX_RETRIES,
            methods: ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'],
            backoffLimit: BACKOFF_LIMIT_MS,
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
              async (request, options, res): Promise<void> => {
                if (!res.ok) {
                  const errorData = await res.json().catch(() => ({}));
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
