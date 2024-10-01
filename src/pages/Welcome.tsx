// src/pages/Welcome.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Welcome: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4xl font-bold mb-8 text-white'>
        Welcome to TON Wallet
      </h1>
      <Link to='/wallet-options'>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};
