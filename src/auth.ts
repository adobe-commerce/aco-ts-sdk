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

import { ConfigurationError } from './errors';
import type { AdobeCredentials } from './types';

export interface AuthService {
  getBearerToken(): Promise<string>;
}

const IMS_BASE_URL = 'https://ims-na1.adobelogin.com';
const TOKEN_BUFFER_SECONDS = 300; // 5 minutes

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
  if (!credentials.clientId || !credentials.clientSecret || !credentials.scopes) {
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
      scope: credentials.scopes,
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
