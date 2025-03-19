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
    public response?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
} 