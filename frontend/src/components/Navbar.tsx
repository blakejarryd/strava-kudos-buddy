import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { isAuthenticated, athlete, logout } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-strava-orange">
            Kudos Buddy
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-sm text-gray-700 hover:text-strava-orange"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    {athlete?.firstname} {athlete?.lastname}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-700 hover:text-strava-orange"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
