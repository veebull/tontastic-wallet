import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black neon-bg'>
      <h1 className='text-6xl font-extrabold neon-text animate-pulse mb-8 text-center'>
        Добро пожаловать в TON Wallet
      </h1>
      <Link
        to='/new-wallet'
        className='neon-button bg-neon-pink hover:neon-glow'
      >
        Создать новый кошелек
      </Link>
      <Link
        to='/import-wallet'
        className='neon-button bg-neon-blue hover:neon-glow mt-4'
      >
        Импортировать кошелек
      </Link>
    </div>
  );
};
