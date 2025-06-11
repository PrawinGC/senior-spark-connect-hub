
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Users } from 'lucide-react';

interface ClubsPageProps {
  clubs: any[];
  setClubs: (clubs: any[]) => void;
  user: any;
  userMemberships: any;
  setUserMemberships: (memberships: any) => void;
}

const ClubsPage = ({ clubs, setClubs, user, userMemberships, setUserMemberships }: ClubsPageProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newClub, setNewClub] = useState({
    name: '',
    description: ''
  });

  const handleCreateClub = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(user.age) < 18) {
      toast({
        title: "Age Verification Failed",
        description: "You must be 18 or older to create a club.",
        variant: "destructive"
      });
      return;
    }

    const club = {
      id: Date.now().toString(),
      name: newClub.name,
      description: newClub.description,
      members: 1,
      maxMembers: 50,
      createdBy: user.id,
      featured: false
    };

    setClubs([...clubs, club]);
    setNewClub({ name: '', description: '' });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Club Created!",
      description: `${club.name} has been created successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold flex items-center">
          <Users className="mr-3 h-10 w-10 text-primary" />
          Clubs
        </h1>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Create Your Own Club</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Club</DialogTitle>
              <DialogDescription>
                Start your own community within Senior Spark. Maximum 50 members per club.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateClub} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Club Name</label>
                <Input
                  value={newClub.name}
                  onChange={(e) => setNewClub(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="text-lg p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newClub.description}
                  onChange={(e) => setNewClub(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="text-lg p-3"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">Create Club</Button>
            </form>
          </DialogContent>
        </Dialog>
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
                <span className={`px-2 py-1 rounded text-xs ${
                  club.members < club.maxMembers ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {club.members < club.maxMembers ? 'Open' : 'Full'}
                </span>
              </div>
              <Link to={`/club/${club.id}`}>
                <Button className="w-full">View Club</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {clubs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No clubs available yet. Be the first to create one!</p>
        </div>
      )}
    </div>
  );
};

export default ClubsPage;
