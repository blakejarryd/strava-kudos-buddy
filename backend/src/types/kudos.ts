export interface Activity {
  id: number;
  athlete: {
    id: number;
    firstname: string;
    lastname: string;
  };
  name: string;
  kudos_count: number;
  start_date: string;
  kudos?: Kudos[];
}

export interface Kudos {
  activity_id: number;
  athlete_id: number;
  firstname: string;
  lastname: string;
  timestamp: string;
}

export interface KudosComparison {
  kudosGiven: number;
  kudosReceived: number;
  givenActivities: Activity[];
  receivedActivities: Activity[];
  lastInteraction: string;
  periodStart: string;
  periodEnd: string;
}

export interface ComparisonParams {
  athleteId: number;
  targetAthleteId: number;
  startDate?: string;
  endDate?: string;
}
