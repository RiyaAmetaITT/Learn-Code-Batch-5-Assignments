import { ErrorCode, AppError } from '../core/Errors';

export class GeocodingErrorHandler {
  private static readonly codes: Record<string, ErrorCode> = {
    ZERO_RESULTS: ErrorCode.ZERO_RESULTS,
    REQUEST_DENIED: ErrorCode.REQUEST_DENIED,
    INVALID_REQUEST: ErrorCode.INVALID_INPUT,
    OVER_QUERY_LIMIT: ErrorCode.QUERY_LIMIT,
  };

  static handleStatus(status: string, message?: string): void {
    if (status === 'OK') return;
    const code = this.codes[status] ?? ErrorCode.UNKNOWN_FALLBACK;
    throw new AppError(message || status, code);
  }
}
