import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';

interface KudosComparison {
  kudosGiven: number;
  kudosReceived: number;
  givenActivities: any[];
  receivedActivities: any[];
  lastInteraction: string;
  periodStart: string;
  periodEnd: string;
}

export default function ComparisonPage() {
  const { athleteId } = useParams();
  const { athlete } = useAuth();
  const [comparison, setComparison] = useState<KudosComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [targetAthlete, setTargetAthlete] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comparisonResponse, athleteResponse] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_API_URL}/api/kudos/compare/${athleteId}?athleteId=${athlete?.id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('stravaToken')}`,
              },
            }
          ),
          fetch(
            `${import.meta.env.VITE_API_URL}/api/kudos/athlete/${athleteId}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('stravaToken')}`,
              },
            }
          )
        ]);

        if (!comparisonResponse.ok || !athleteResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [comparisonData, athleteData] = await Promise.all([
          comparisonResponse.json(),
          athleteResponse.json()
        ]);

        setComparison(comparisonData);
        setTargetAthlete(athleteData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (athleteId && athlete?.id) {
      fetchData();
    }
  }, [athleteId, athlete]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!comparison || !targetAthlete) {
    return null;
  }

  const chartData = [
    {
      name: 'Kudos',
      given: comparison.kudosGiven,
      received: comparison.kudosReceived,
    },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>
            Kudos Comparison with {targetAthlete.firstname} {targetAthlete.lastname}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    name="Kudos Given"
                    dataKey="given"
                    fill="#FC4C02"
                    className="hover:opacity-80"
                  />
                  <Bar
                    name="Kudos Received"
                    dataKey="received"
                    fill="#1E293B"
                    className="hover:opacity-80"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-2">Activities You've Supported</h3>
              <div className="space-y-2">
                {comparison.givenActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="font-medium">{activity.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(activity.start_date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Activities They've Supported</h3>
              <div className="space-y-2">
                {comparison.receivedActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="font-medium">{activity.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(activity.start_date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Last interaction: {new Date(comparison.lastInteraction).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
