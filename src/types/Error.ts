export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  errorCode: string;
  message: string;
  path: string;
  requestId: string;
  fieldErrors?: Record<string, string>;
}
