import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const CreateWallet: React.FC = () => {
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);

  const generateSeedPhrase = () => {
    // This is a placeholder. In a real app, you'd use a proper library to generate a secure seed phrase
    const words = Array(24)
      .fill(0)
      .map(() => Math.random().toString(36).substring(7));
    setSeedPhrase(words);
  };
  useEffect(() => {
    generateSeedPhrase();
  }, []);

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-2xl font-semibold mb-6 text-white'>
          Create New Wallet
        </h2>
        <div>
          {seedPhrase.length > 0 && (
            <div className='mt-6 grid grid-cols-3 gap-4'>
              {seedPhrase.map((word, index) => (
                <div key={index} className='p-2 bg-gray-200 rounded'>
                  {index + 1}. {word}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Link to='/tontastic-wallet/wallet-app'>
        <Button className='flex justify-center w-full' variant={'default'}>
          Go to wallet
        </Button>
      </Link>
    </>
  );
};
