import { UserIcon, MoreVertical } from 'lucide-react';

export const WalletHeader = () => {
  return (
    <div className='flex justify-between items-center p-4'>
      <div className='flex items-center space-x-3'>
        <UserIcon className='w-10 h-10 text-gray-600' />
        <div>
          <h1 className='text-xl font-semibold'>Hello Antony!</h1>
          <p className='text-gray-500'>Wallet (USD)</p>
        </div>
      </div>
      <div className='text-right'>
        <p className='text-2xl font-bold'>$67,9890.04</p>
      </div>
      <MoreVertical className='w-6 h-6 text-gray-500' />
    </div>
  );
};
