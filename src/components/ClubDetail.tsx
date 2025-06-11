
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Users, MessageCircle } from 'lucide-react';

interface ClubDetailProps {
  clubs: any[];
  user: any;
  userMemberships: any;
  setUserMemberships: (memberships: any) => void;
}

const ClubDetail = ({ clubs, user, userMemberships, setUserMemberships }: ClubDetailProps) => {
  const { id } = useParams();
  const [club, setClub] = useState<any>(null);
  const [isMember, setIsMember] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: 'John Smith', message: 'Welcome to our club!', timestamp: new Date() },
    { id: 2, user: 'Mary Johnson', message: 'Looking forward to our next meeting!', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const foundClub = clubs.find(c => c.id === id);
    setClub(foundClub);
    
    if (foundClub && userMemberships.clubs) {
      setIsMember(userMemberships.clubs.some((c: any) => c.id === foundClub.id));
    }
  }, [id, clubs, userMemberships]);

  const handleJoinClub = () => {
    if (parseInt(user.age) < 18) {
      toast({
        title: "Age Verification Failed",
        description: "You must be 18 or older to join this club.",
        variant: "destructive"
      });
      return;
    }

    if (club.members >= club.maxMembers) {
      toast({
        title: "Club Full",
        description: "This club has reached its maximum capacity.",
        variant: "destructive"
      });
      return;
    }

    const updatedMemberships = {
      ...userMemberships,
      clubs: [...(userMemberships.clubs || []), club]
    };
    
    setUserMemberships(updatedMemberships);
    setIsMember(true);
    
    toast({
      title: "Joined Club!",
      description: `You've successfully joined ${club.name}.`
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

  if (!club) {
    return <div className="text-center py-12">Club not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <Link to="/clubs" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clubs
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">{club.name}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Club Information
                <Badge variant={club.members < club.maxMembers ? "default" : "destructive"}>
                  {club.members < club.maxMembers ? 'Open' : 'Full'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">{club.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{club.members}/{club.maxMembers} members</span>
                </div>
                {!isMember && (
                  <Button onClick={handleJoinClub} disabled={club.members >= club.maxMembers}>
                    Join Club
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {isMember && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Club Chat
                </CardTitle>
                <CardDescription>Connect with fellow club members</CardDescription>
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
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total Members:</span>
                <span className="font-medium">{club.members}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Capacity:</span>
                <span className="font-medium">{club.maxMembers}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Spots:</span>
                <span className="font-medium">{club.maxMembers - club.members}</span>
              </div>
            </CardContent>
          </Card>

          {!isMember && (
            <Card>
              <CardHeader>
                <CardTitle>Join Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Must be 18 years or older</li>
                  <li>• Respectful communication</li>
                  <li>• Active participation encouraged</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubDetail;
