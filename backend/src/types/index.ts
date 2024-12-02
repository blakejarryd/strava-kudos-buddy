export * from './strava';

export interface ErrorResponse {
  error: string;
  message?: string;
}

export interface HealthCheckResponse {
  status: string;
  message: string;
}
