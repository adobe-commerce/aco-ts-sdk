import { ApiError } from "./errors";
import { AuthService } from "./auth";
import { Environment, Region } from "./types";

export interface HttpClient {
  request<T>(endpoint: string, options?: RequestInit): Promise<T>;
}

export function createHttpClient(
  auth: AuthService,
  tenantId: string,
  region: Region,
  environment: Environment,
  baseUrlOverride?: string
): HttpClient {
  const baseUrl =
    baseUrlOverride || `https://${region}${environment === "production" ? "" : "-sandbox"}.api.commerce.adobe.com`;
  const timeout = 10000;
  const maxRetries = 3;
  const retryDelay = 1000;

  const getHeaders = async (additionalHeaders?: HeadersInit): Promise<HeadersInit> => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await auth.getBearerToken()}`,
      ...additionalHeaders,
    };
    return headers;
  };

  const delay = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const executeRequest = async <T>(endpoint: string, options: RequestInit): Promise<T> => {
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

      return response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return {
    async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
      const headers = await getHeaders(options?.headers);

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await executeRequest<T>(endpoint, {
            ...options,
            headers,
          });
          return response;
        } catch (error) {
          if (attempt === maxRetries) throw error;

          if (error instanceof ApiError && error.statusCode >= 400 && error.statusCode < 500) {
            throw error;
          }

          await delay(retryDelay * attempt);
        }
      }

      throw new ApiError("Could not execute request", 0);
    },
  };
}
