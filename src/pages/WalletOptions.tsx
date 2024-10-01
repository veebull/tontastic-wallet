import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const WalletOptions: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-2xl font-semibold mb-6 text-white'>
        Choose an option
      </h2>
      <div className='space-y-4'>
        <Link to='/tontastic-wallet/create-wallet'>
          <Button className='w-full text-white'>Create New Wallet</Button>
        </Link>
        <Link to='/tontastic-wallet/import-wallet'>
          <Button className='w-full' variant='outline'>
            Import Existing Wallet
          </Button>
        </Link>
      </div>
    </div>
  );
};
