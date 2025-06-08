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

import { ConfigurationError } from './errors';
import type { AdobeCredentials } from './types';

export interface AuthService {
  getBearerToken(): Promise<string>;
}

const IMS_BASE_URL = 'https://ims-na1.adobelogin.com';
const TOKEN_BUFFER_SECONDS = 300; // 5 minutes
const DEFAULT_SCOPES = 'adobeio_api,openid,AdobeID,read_organizations';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface CachedToken {
  token: string;
  expiresAt: number;
}

export function createAuthService(credentials: AdobeCredentials, imsBaseUrlOverride?: string): AuthService {
  if (!credentials.clientId || !credentials.clientSecret) {
    throw new ConfigurationError('Required credentials are missing');
  }

  const imsTokenEndpoint = `${imsBaseUrlOverride || IMS_BASE_URL}/ims/token/v3`;

  let cachedToken: CachedToken | null = null;

  const getToken = async (): Promise<string> => {
    // Check if cached token is still valid
    if (cachedToken && cachedToken.expiresAt > Date.now() + TOKEN_BUFFER_SECONDS * 1000) {
      return cachedToken.token;
    }

    const params = new URLSearchParams({
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      grant_type: 'client_credentials',
      scope: DEFAULT_SCOPES,
    });

    const response = await fetch(imsTokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to get authentication token: ${response.statusText}`);
    }

    const data: TokenResponse = await response.json();

    // Cache the new token with its expiration time
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    return data.access_token;
  };

  return {
    getBearerToken: async (): Promise<string> => {
      return await getToken();
    },
  };
}
