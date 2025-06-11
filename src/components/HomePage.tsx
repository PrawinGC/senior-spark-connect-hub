
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar } from 'lucide-react';

interface HomePageProps {
  user: any;
  clubs: any[];
  events: any[];
}

const HomePage = ({ user, clubs, events }: HomePageProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Welcome, {user.name}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Connect, engage, and thrive in our vibrant senior community
        </p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center">
            <Users className="mr-3 h-8 w-8 text-primary" />
            Featured Clubs
          </h2>
          <Link to="/clubs">
            <Button variant="outline" size="lg">View All Clubs</Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Card key={club.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{club.name}</CardTitle>
                <CardDescription className="text-base">{club.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">
                    {club.members}/{club.maxMembers} members
                  </span>
                </div>
                <Link to={`/club/${club.id}`}>
                  <Button className="w-full">View Club</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center">
            <Calendar className="mr-3 h-8 w-8 text-primary" />
            Featured Events
          </h2>
          <Link to="/events">
            <Button variant="outline" size="lg">View All Events</Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{event.name}</CardTitle>
                <CardDescription className="text-base">{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    {event.members}/{event.maxMembers} attendees
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <Link to={`/event/${event.id}`}>
                  <Button className="w-full">View Event</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
