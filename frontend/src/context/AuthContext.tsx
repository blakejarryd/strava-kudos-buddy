import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  athlete: any | null;
  login: (code: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [athlete, setAthlete] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('stravaToken');
    if (token) {
      setIsAuthenticated(true);
      // TODO: Fetch athlete data
      const athleteData = localStorage.getItem('athleteData');
      if (athleteData) {
        setAthlete(JSON.parse(athleteData));
      }
    }
    setLoading(false);
  }, []);

  const login = async (code: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/strava/callback?code=${code}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('stravaToken', data.data.accessToken);
      localStorage.setItem('athleteData', JSON.stringify(data.data.athlete));
      
      setIsAuthenticated(true);
      setAthlete(data.data.athlete);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('stravaToken');
    localStorage.removeItem('athleteData');
    setIsAuthenticated(false);
    setAthlete(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, athlete, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
