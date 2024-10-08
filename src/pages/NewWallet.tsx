import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mnemonicNew } from '@ton/crypto';

export const NewWallet: React.FC = () => {
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generateSeedPhrase = async () => {
      const mnemonic = await mnemonicNew();
      setSeedPhrase(mnemonic);
    };
    generateSeedPhrase();
  }, []);

  const handleContinue = () => {
    // Store the seed phrase in localStorage
    localStorage.setItem('tempSeedPhrase', JSON.stringify(seedPhrase));
    navigate('/tontastic-wallet/check-new-wallet');
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Create a New Wallet</h1>
      <div className='mt-4'>
        <p>Your seed phrase:</p>
        <div className='bg-gray-100 p-2 rounded'>{seedPhrase.join(' ')}</div>
        <Button onClick={handleContinue} className='mt-4'>
          Continue
        </Button>
      </div>
    </div>
  );
};
