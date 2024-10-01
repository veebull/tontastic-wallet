import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';

export const ImportWallet: React.FC = () => {
  const navigate = useNavigate();

  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(24).fill(''));

  const handleChange = (index: number, value: string) => {
    const newSeedPhrase = [...seedPhrase];
    newSeedPhrase[index] = value;
    setSeedPhrase(newSeedPhrase);
  };

  const handleImport = () => {
    // Handle the import process here
    console.log('Importing wallet with seed phrase:', seedPhrase.join(' '));
    navigate('/wallet-app');
  };

  return (
    <div>
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-2xl font-semibold mb-6 text-white'>
          Import Existing Wallet
        </h2>
        <div className='grid grid-cols-3 gap-4 mb-6'>
          {seedPhrase.map((word, index) => (
            <Input
              key={index}
              placeholder={`Word ${index + 1}`}
              value={word}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <Button onClick={handleImport}>Import Wallet</Button>
      </div>
    </div>
  );
};
