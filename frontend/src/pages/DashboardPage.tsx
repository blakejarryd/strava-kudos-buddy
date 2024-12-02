import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { athlete } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/kudos/search/athletes?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('stravaToken')}`,
          },
        }
      );

      const data = await response.json();
      // For now, just navigate to comparison with the searched athlete ID
      // In a real app, you'd show search results and let the user select
      if (data.athletes?.[0]) {
        navigate(`/comparison/${data.athletes[0].id}`);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {athlete?.firstname}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Search for an athlete to compare kudos interactions.
          </p>
          
          <div className="mt-4 flex space-x-4">
            <Input
              type="text"
              placeholder="Enter athlete name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* TODO: Add recent comparisons or suggested athletes */}
    </div>
  );
}
