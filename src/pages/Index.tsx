
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [user, setUser] = useState(null);
  const [visionLevel, setVisionLevel] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedVisionLevel = localStorage.getItem('visionLevel');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedVisionLevel) {
      setVisionLevel(parseInt(savedVisionLevel));
    }
  }, []);

  useEffect(() => {
    // Apply vision level to root element
    const root = document.documentElement;
    root.style.fontSize = `${16 + visionLevel * 4}px`;
  }, [visionLevel]);

  if (user) {
    return <Dashboard user={user} setUser={setUser} visionLevel={visionLevel} setVisionLevel={setVisionLevel} />;
  }

  return <AuthForm setUser={setUser} />;
};

export default Index;
