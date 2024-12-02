export interface StravaTokenResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: StravaAthlete;
}

export interface StravaAthlete {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  profile: string;
}

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  athleteId: number;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    athlete: StravaAthlete;
    accessToken: string;
  };
}
