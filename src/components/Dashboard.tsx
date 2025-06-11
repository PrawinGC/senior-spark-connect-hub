
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ClubsPage from './ClubsPage';
import EventsPage from './EventsPage';
import ProfilePage from './ProfilePage';
import ClubDetail from './ClubDetail';
import EventDetail from './EventDetail';

interface DashboardProps {
  user: any;
  setUser: (user: any) => void;
  visionLevel: number;
  setVisionLevel: (level: number) => void;
}

const Dashboard = ({ user, setUser, visionLevel, setVisionLevel }: DashboardProps) => {
  const [clubs, setClubs] = useState([
    {
      id: '1',
      name: 'Morning Walkers Club',
      description: 'Join us for refreshing morning walks in the park',
      members: 23,
      maxMembers: 50,
      createdBy: 'admin',
      featured: true
    },
    {
      id: '2',
      name: 'Book Reading Circle',
      description: 'Discuss fascinating books with fellow readers',
      members: 15,
      maxMembers: 50,
      createdBy: 'admin',
      featured: true
    }
  ]);

  const [events, setEvents] = useState([
    {
      id: '1',
      name: 'Community Gardening Workshop',
      description: 'Learn organic gardening techniques',
      members: 45,
      maxMembers: 500,
      date: '2024-06-15',
      createdBy: 'admin',
      featured: true
    },
    {
      id: '2',
      name: 'Senior Fitness Day',
      description: 'Fun fitness activities designed for seniors',
      members: 78,
      maxMembers: 500,
      date: '2024-06-20',
      createdBy: 'admin',
      featured: true
    }
  ]);

  const [userMemberships, setUserMemberships] = useState({
    clubs: [],
    events: []
  });

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar user={user} setUser={setUser} />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={
              <HomePage 
                user={user} 
                clubs={clubs.filter(club => club.featured)} 
                events={events.filter(event => event.featured)} 
              />
            } />
            <Route path="/clubs" element={
              <ClubsPage 
                clubs={clubs} 
                setClubs={setClubs} 
                user={user}
                userMemberships={userMemberships}
                setUserMemberships={setUserMemberships}
              />
            } />
            <Route path="/events" element={
              <EventsPage 
                events={events} 
                setEvents={setEvents} 
                user={user}
                userMemberships={userMemberships}
                setUserMemberships={setUserMemberships}
              />
            } />
            <Route path="/profile" element={
              <ProfilePage 
                user={user} 
                userMemberships={userMemberships}
                visionLevel={visionLevel}
                setVisionLevel={setVisionLevel}
              />
            } />
            <Route path="/club/:id" element={
              <ClubDetail 
                clubs={clubs} 
                user={user}
                userMemberships={userMemberships}
                setUserMemberships={setUserMemberships}
              />
            } />
            <Route path="/event/:id" element={
              <EventDetail 
                events={events} 
                user={user}
                userMemberships={userMemberships}
                setUserMemberships={setUserMemberships}
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
