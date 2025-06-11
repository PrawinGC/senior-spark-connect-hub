
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface AuthFormProps {
  setUser: (user: any) => void;
}

const AuthForm = ({ setUser }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && parseInt(formData.age) < 18) {
      toast({
        title: "Age Restriction",
        description: "You must be 18 or older to join our community.",
        variant: "destructive"
      });
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      id: Date.now().toString()
    };

    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    
    toast({
      title: isLogin ? "Welcome back!" : "Welcome to Senior Spark!",
      description: isLogin ? "You've successfully logged in." : "Your account has been created successfully."
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Senior Spark</CardTitle>
          <CardDescription className="text-lg">
            {isLogin ? 'Welcome back to your community' : 'Join our vibrant senior community'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="text-lg p-3"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="text-lg p-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="text-lg p-3"
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  required
                  min="18"
                  className="text-lg p-3"
                />
              </div>
            )}
            
            <Button type="submit" className="w-full text-lg p-3">
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline text-base"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
