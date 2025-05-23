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
import type { ApiResponse, Environment, Region } from './types';

export interface HttpClient {
  request(endpoint: string, options?: RequestInit): Promise<ApiResponse>;
}

export function createHttpClient(
  auth: AuthService,
  tenantId: string,
  region: Region,
  environment: Environment,
  baseUrlOverride?: string,
): HttpClient {
  const baseUrl =
    baseUrlOverride ||
    `https://${region.toLowerCase()}${environment.toLowerCase() === 'production' ? '' : '-sandbox'}.api.commerce.adobe.com`;
  const timeout = 10000;
  const maxRetries = 3;
  const initialRetryDelay = 1000;

  const getHeaders = async (additionalHeaders?: HeadersInit): Promise<HeadersInit> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await auth.getBearerToken()}`,
      ...additionalHeaders,
    };
    return headers;
  };

  const delay = async (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const calculateBackoffDelay = (attempt: number): number => {
    return initialRetryDelay * Math.pow(2, attempt - 1);
  };

  const executeRequest = async (endpoint: string, options: RequestInit): Promise<ApiResponse> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${baseUrl}/${tenantId}/${endpoint}`, {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(`API request failed: ${response.statusText}`, response.status, JSON.stringify(errorData));
      }

      return {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: await response.json(),
      };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return {
    async request(endpoint: string, options?: RequestInit): Promise<ApiResponse> {
      const headers = await getHeaders(options?.headers);

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await executeRequest(endpoint, {
            ...options,
            headers,
          });
          return response;
        } catch (error: unknown) {
          if (attempt === maxRetries) {
            throw error;
          }

          if (error instanceof ApiError) {
            if (error.statusCode === 429) {
              const retryDelayMs = calculateBackoffDelay(attempt);
              // eslint-disable-next-line no-console
              console.log(
                `Rate limit exceeded. Status Code: ${error.statusCode}. Message: ${error.message}. Attempt ${attempt}/${maxRetries}: retrying in ${retryDelayMs}ms.`,
              );
              await delay(retryDelayMs);
              continue;
            }

            if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
              throw error;
            }
          }

          // Retry for 5xx errors
          const retryDelayMs = calculateBackoffDelay(attempt);
          // eslint-disable-next-line no-console
          console.log(`Request failed. Attempt ${attempt}/${maxRetries}: retrying in ${retryDelayMs}ms.`);
          await delay(retryDelayMs);
        }
      }

      throw new ApiError('Could not execute API request');
    },
  };
}
