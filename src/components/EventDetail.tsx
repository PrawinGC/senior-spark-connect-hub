
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, MessageCircle, Users } from 'lucide-react';

interface EventDetailProps {
  events: any[];
  user: any;
  userMemberships: any;
  setUserMemberships: (memberships: any) => void;
}

const EventDetail = ({ events, user, userMemberships, setUserMemberships }: EventDetailProps) => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: 'Sarah Wilson', message: 'Excited for this event!', timestamp: new Date() },
    { id: 2, user: 'Robert Brown', message: 'What should I bring?', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const foundEvent = events.find(e => e.id === id);
    setEvent(foundEvent);
    
    if (foundEvent && userMemberships.events) {
      setIsRegistered(userMemberships.events.some((e: any) => e.id === foundEvent.id));
    }
  }, [id, events, userMemberships]);

  const handleRegisterEvent = () => {
    if (parseInt(user.age) < 18) {
      toast({
        title: "Age Verification Failed",
        description: "You must be 18 or older to register for this event.",
        variant: "destructive"
      });
      return;
    }

    if (event.members >= event.maxMembers) {
      toast({
        title: "Event Full",
        description: "This event has reached its maximum capacity.",
        variant: "destructive"
      });
      return;
    }

    const updatedMemberships = {
      ...userMemberships,
      events: [...(userMemberships.events || []), event]
    };
    
    setUserMemberships(updatedMemberships);
    setIsRegistered(true);
    
    toast({
      title: "Registered!",
      description: `You've successfully registered for ${event.name}.`
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      user: user.name,
      message: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  if (!event) {
    return <div className="text-center py-12">Event not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <Link to="/events" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">{event.name}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Event Information
                <Badge variant={event.members < event.maxMembers ? "default" : "destructive"}>
                  {event.members < event.maxMembers ? 'Open' : 'Full'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">{event.description}</p>
              <div className="flex items-center mb-4">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{event.members}/{event.maxMembers} attendees</span>
                </div>
                {!isRegistered && (
                  <Button onClick={handleRegisterEvent} disabled={event.members >= event.maxMembers}>
                    Register for Event
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {isRegistered && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Event Discussion
                </CardTitle>
                <CardDescription>Connect with other attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className="border-b pb-2">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-sm">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Attendees:</span>
                <span className="font-medium">{event.members}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Capacity:</span>
                <span className="font-medium">{event.maxMembers}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Spots:</span>
                <span className="font-medium">{event.maxMembers - event.members}</span>
              </div>
            </CardContent>
          </Card>

          {!isRegistered && (
            <Card>
              <CardHeader>
                <CardTitle>Registration Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Must be 18 years or older</li>
                  <li>• Respectful participation</li>
                  <li>• Follow event guidelines</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
