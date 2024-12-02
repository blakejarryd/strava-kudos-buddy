import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    // Handle OAuth callback
    const code = searchParams.get('code');
    if (code) {
      login(code).catch(console.error);
    }
  }, [isAuthenticated, navigate, searchParams, login]);

  const handleStravaLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/strava/url`);
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Failed to get auth URL:', error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Track Your Kudos Interactions
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Connect with Strava to analyze and compare kudos with other athletes.
          See who you're supporting and who's supporting you!
        </p>
        <Button 
          onClick={handleStravaLogin}
          className="bg-strava-orange hover:bg-strava-orange-dark"
          size="lg"
        >
          Connect with Strava
        </Button>
      </div>
    </div>
  );
}
