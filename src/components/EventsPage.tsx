
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Calendar } from 'lucide-react';

interface EventsPageProps {
  events: any[];
  setEvents: (events: any[]) => void;
  user: any;
  userMemberships: any;
  setUserMemberships: (memberships: any) => void;
}

const EventsPage = ({ events, setEvents, user, userMemberships, setUserMemberships }: EventsPageProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: ''
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(user.age) < 18) {
      toast({
        title: "Age Verification Failed",
        description: "You must be 18 or older to create an event.",
        variant: "destructive"
      });
      return;
    }

    const event = {
      id: Date.now().toString(),
      name: newEvent.name,
      description: newEvent.description,
      date: newEvent.date,
      members: 1,
      maxMembers: 500,
      createdBy: user.id,
      featured: false
    };

    setEvents([...events, event]);
    setNewEvent({ name: '', description: '', date: '' });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Event Created!",
      description: `${event.name} has been created successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold flex items-center">
          <Calendar className="mr-3 h-10 w-10 text-primary" />
          Events
        </h1>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Create Your Own Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Event</DialogTitle>
              <DialogDescription>
                Organize an event for the community. Maximum 500 attendees per event.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Event Name</label>
                <Input
                  value={newEvent.name}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="text-lg p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="text-lg p-3"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Date</label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  required
                  className="text-lg p-3"
                />
              </div>
              <Button type="submit" className="w-full">Create Event</Button>
            </form>
          </DialogContent>
        </Dialog>
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
                <span className={`px-2 py-1 rounded text-xs ${
                  event.members < event.maxMembers ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {event.members < event.maxMembers ? 'Open' : 'Full'}
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

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No events available yet. Be the first to create one!</p>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
