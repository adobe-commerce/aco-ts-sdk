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

export class CommerceSdkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CommerceSDKError';
  }
}

export class ConfigurationError extends CommerceSdkError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export class InvalidInputError extends CommerceSdkError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidInputError';
  }
}

export class ApiError extends CommerceSdkError {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown,
  ) {
    super(message);
    this.name = 'APIError';
  }
}
