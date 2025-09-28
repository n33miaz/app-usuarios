import React, { useState, useEffect } from 'react';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <HomeScreen />;
}