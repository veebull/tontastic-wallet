import React from 'react';
import { Button } from '@/components/ui/button';
import { QrCode, Copy, Link } from 'lucide-react';

export const Receive: React.FC = () => {
  const walletAddress = 'EQD...abc'; // Replace with actual wallet address

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const generateDeepLink = () => {
    // Generate deep link logic here
    console.log('Generating deep link');
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-semibold mb-6'>Receive TON</h2>
      <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
        <QrCode className='w-48 h-48 mx-auto mb-4' />
        <p className='text-center mb-4'>{walletAddress}</p>
        <div className='flex justify-center space-x-4'>
          <Button onClick={handleCopy}>
            <Copy className='mr-2' />
            Copy Address
          </Button>
          <Button onClick={generateDeepLink}>
            <Link className='mr-2' />
            Generate Deep Link
          </Button>
        </div>
      </div>
    </div>
  );
};
