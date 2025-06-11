
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Eye, Users, Calendar } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  userMemberships: any;
  visionLevel: number;
  setVisionLevel: (level: number) => void;
}

const ProfilePage = ({ user, userMemberships, visionLevel, setVisionLevel }: ProfilePageProps) => {
  const handleVisionChange = (value: string) => {
    const level = parseInt(value);
    setVisionLevel(level);
    localStorage.setItem('visionLevel', level.toString());
    
    // Apply vision level immediately
    const root = document.documentElement;
    root.style.fontSize = `${16 + level * 4}px`;
  };

  const visionOptions = [
    { value: -3, label: "-3.0 (Stronger magnification)" },
    { value: -2, label: "-2.0 (Strong magnification)" },
    { value: -1, label: "-1.0 (Moderate magnification)" },
    { value: 0, label: "0 (Normal size)" },
    { value: 1, label: "+1.0 (Slight reduction)" },
    { value: 2, label: "+2.0 (Moderate reduction)" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-8">
        <User className="mr-3 h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold">My Profile</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-6 w-6" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Age</label>
              <p className="text-lg">{user.age} years</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="mr-2 h-6 w-6" />
              Vision Settings
            </CardTitle>
            <CardDescription>
              Adjust the app layout to match your vision level for better readability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Vision Level: {visionLevel === 0 ? 'Normal' : visionLevel > 0 ? `+${visionLevel}` : visionLevel}
                </label>
                <Select value={visionLevel.toString()} onValueChange={handleVisionChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                Select your eye power level to automatically adjust text size and layout for optimal readability.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-6 w-6" />
            My Clubs
          </CardTitle>
          <CardDescription>Clubs you're currently a member of</CardDescription>
        </CardHeader>
        <CardContent>
          {userMemberships.clubs && userMemberships.clubs.length > 0 ? (
            <div className="grid gap-4">
              {userMemberships.clubs.map((club: any) => (
                <div key={club.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{club.name}</h4>
                    <p className="text-sm text-muted-foreground">{club.description}</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't joined any clubs yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-6 w-6" />
            My Events
          </CardTitle>
          <CardDescription>Events you're attending</CardDescription>
        </CardHeader>
        <CardContent>
          {userMemberships.events && userMemberships.events.length > 0 ? (
            <div className="grid gap-4">
              {userMemberships.events.map((event: any) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <p className="text-sm font-medium">Date: {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="secondary">Registered</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't registered for any events yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
