export enum ErrorCode {
  ZERO_RESULTS = 'ZERO_RESULTS',
  REQUEST_DENIED = 'REQUEST_DENIED',
  INVALID_INPUT = 'INVALID_INPUT',
  QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  NETWORK_FAILURE = 'NETWORK_FAILURE',
  UNKNOWN_FALLBACK = 'UNKNOWN_ERROR',
}

export class AppError extends Error {
  constructor(public readonly message: string, public readonly code: ErrorCode) {
    super(message);
    this.name = 'AppError';
  }
}
