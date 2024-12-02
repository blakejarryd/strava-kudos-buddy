import { Activity, Kudos } from '../types/kudos';

class StravaApiService {
  private baseUrl = 'https://www.strava.com/api/v3';

  async getAthleteActivities(
    accessToken: string,
    after?: string,
    before?: string,
    page: number = 1
  ): Promise<Activity[]> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: '50',
      ...(after && { after }),
      ...(before && { before })
    });

    const response = await fetch(
      `${this.baseUrl}/athlete/activities?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }

    return response.json();
  }

  async getActivityKudos(accessToken: string, activityId: number): Promise<Kudos[]> {
    const response = await fetch(
      `${this.baseUrl}/activities/${activityId}/kudos`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch kudos');
    }

    return response.json();
  }

  async getAthleteProfile(accessToken: string, athleteId: number) {
    const response = await fetch(
      `${this.baseUrl}/athletes/${athleteId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch athlete profile');
    }

    return response.json();
  }
}

export const stravaApiService = new StravaApiService();
