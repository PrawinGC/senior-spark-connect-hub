
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

interface NavbarProps {
  user: any;
  setUser: (user: any) => void;
}

const Navbar = ({ user, setUser }: NavbarProps) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('visionLevel');
    setUser(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            Senior Spark
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-lg transition-colors ${
                isActive('/') ? 'bg-primary-foreground text-primary' : 'hover:bg-primary/80'
              }`}
            >
              Home
            </Link>
            <Link
              to="/clubs"
              className={`px-3 py-2 rounded-md text-lg transition-colors ${
                isActive('/clubs') ? 'bg-primary-foreground text-primary' : 'hover:bg-primary/80'
              }`}
            >
              Clubs
            </Link>
            <Link
              to="/events"
              className={`px-3 py-2 rounded-md text-lg transition-colors ${
                isActive('/events') ? 'bg-primary-foreground text-primary' : 'hover:bg-primary/80'
              }`}
            >
              Events
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-lg transition-colors ${
                isActive('/profile') ? 'bg-primary-foreground text-primary' : 'hover:bg-primary/80'
              }`}
            >
              <User className="inline-block mr-2 h-5 w-5" />
              Profile
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-primary border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
