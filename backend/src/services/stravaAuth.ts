import { StravaTokenResponse, TokenData, AuthResponse } from '../types/strava';

class StravaAuthService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.STRAVA_CLIENT_ID || '';
    this.clientSecret = process.env.STRAVA_CLIENT_SECRET || '';
    this.redirectUri = process.env.STRAVA_REDIRECT_URI || '';

    if (!this.clientId || !this.clientSecret || !this.redirectUri) {
      throw new Error('Missing required Strava configuration');
    }
  }

  async exchangeToken(code: string): Promise<AuthResponse> {
    try {
      const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          grant_type: 'authorization_code',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange token');
      }

      const data: StravaTokenResponse = await response.json();
      
      return {
        success: true,
        data: {
          athlete: data.athlete,
          accessToken: data.access_token,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to authenticate with Strava',
      };
    }
  }

  async refreshToken(refreshToken: string): Promise<TokenData | null> {
    try {
      const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data: StravaTokenResponse = await response.json();
      
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at,
        athleteId: data.athlete.id,
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }

  getAuthorizationUrl(): string {
    const scopes = ['read', 'activity:read'];
    return `https://www.strava.com/oauth/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${scopes.join(',')}`;
  }
}

export const stravaAuthService = new StravaAuthService();
