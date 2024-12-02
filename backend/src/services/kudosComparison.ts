import { Activity, KudosComparison, ComparisonParams } from '../types/kudos';
import { stravaApiService } from './stravaApi';

class KudosComparisonService {
  async compareKudos(
    accessToken: string,
    params: ComparisonParams
  ): Promise<KudosComparison> {
    const { athleteId, targetAthleteId, startDate, endDate } = params;
    
    // Get activities for both athletes
    const [userActivities, targetActivities] = await Promise.all([
      this.getActivitiesWithKudos(accessToken, startDate, endDate),
      this.getActivitiesWithKudos(accessToken, startDate, endDate, targetAthleteId)
    ]);

    // Analyze kudos interactions
    const kudosGiven = this.countKudosGiven(userActivities, targetAthleteId);
    const kudosReceived = this.countKudosReceived(targetActivities, athleteId);

    // Filter activities with relevant kudos
    const givenActivities = this.filterActivitiesWithKudosTo(userActivities, targetAthleteId);
    const receivedActivities = this.filterActivitiesWithKudosFrom(targetActivities, athleteId);

    // Find last interaction
    const lastInteraction = this.findLastInteractionDate(givenActivities, receivedActivities);

    return {
      kudosGiven,
      kudosReceived,
      givenActivities,
      receivedActivities,
      lastInteraction,
      periodStart: startDate || 'all time',
      periodEnd: endDate || 'present'
    };
  }

  private async getActivitiesWithKudos(
    accessToken: string,
    after?: string,
    before?: string,
    athleteId?: number
  ): Promise<Activity[]> {
    const activities = await stravaApiService.getAthleteActivities(
      accessToken,
      after,
      before
    );

    // Fetch kudos for each activity
    const activitiesWithKudos = await Promise.all(
      activities.map(async (activity) => {
        const kudos = await stravaApiService.getActivityKudos(
          accessToken,
          activity.id
        );
        return { ...activity, kudos };
      })
    );

    return activitiesWithKudos;
  }

  private countKudosGiven(activities: Activity[], targetAthleteId: number): number {
    return activities.reduce((count, activity) => {
      const kudosGiven = activity.kudos?.filter(
        (kudos) => kudos.athlete_id === targetAthleteId
      ).length || 0;
      return count + kudosGiven;
    }, 0);
  }

  private countKudosReceived(activities: Activity[], athleteId: number): number {
    return activities.reduce((count, activity) => {
      const kudosReceived = activity.kudos?.filter(
        (kudos) => kudos.athlete_id === athleteId
      ).length || 0;
      return count + kudosReceived;
    }, 0);
  }

  private filterActivitiesWithKudosTo(
    activities: Activity[],
    targetAthleteId: number
  ): Activity[] {
    return activities.filter(
      (activity) =>
        activity.kudos?.some((kudos) => kudos.athlete_id === targetAthleteId)
    );
  }

  private filterActivitiesWithKudosFrom(
    activities: Activity[],
    athleteId: number
  ): Activity[] {
    return activities.filter(
      (activity) =>
        activity.kudos?.some((kudos) => kudos.athlete_id === athleteId)
    );
  }

  private findLastInteractionDate(
    givenActivities: Activity[],
    receivedActivities: Activity[]
  ): string {
    const allActivities = [...givenActivities, ...receivedActivities];
    if (allActivities.length === 0) return 'No interactions';

    const dates = allActivities.map((activity) => new Date(activity.start_date));
    return new Date(Math.max(...dates.map(d => d.getTime()))).toISOString();
  }
}

export const kudosComparisonService = new KudosComparisonService();
