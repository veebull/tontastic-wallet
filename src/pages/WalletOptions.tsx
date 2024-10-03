import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, DollarSign, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const WalletOptions: React.FC = () => {
  return (
    <div
      className='h-screen bg-white text-black p-6 flex flex-col justify-between'
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <motion.div
        className='flex-grow flex flex-col items-center justify-center space-y-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='relative w-48 h-48'>
          <motion.div
            className='absolute top-0 left-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center'
            animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <Bitcoin className='w-4 h-4 text-blue-500' />
          </motion.div>
          <motion.div
            className='absolute top-10 right-0 w-6 h-6 bg-black rounded-full flex items-center justify-center'
            animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <DollarSign className='w-3 h-3 text-white' />
          </motion.div>
          <motion.div
            className='absolute bottom-0 left-10 w-7 h-7 bg-green-200 rounded-full flex items-center justify-center'
            animate={{ x: [0, 15, 0], y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          >
            <DollarSign className='w-4 h-4 text-green-500' />
          </motion.div>
          <motion.div
            className='absolute bottom-20 right-10 w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center'
            animate={{ x: [0, -5, 0], y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          >
            <DollarSign className='w-3 h-3 text-purple-500' />
          </motion.div>
          <div className='w-full h-full flex items-center justify-center'>
            <svg
              width='120'
              height='120'
              viewBox='0 0 120 120'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='10'
                y='10'
                width='100'
                height='100'
                rx='20'
                stroke='black'
                strokeWidth='2'
              />
              <circle cx='60' cy='60' r='20' fill='#3B82F6' />
              <path
                d='M50 60H70M60 50V70'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>

        <div className='text-center space-y-4'>
          <h1 className='text-3xl font-bold'>
            Join us for easy, fast, and secure crypto.
          </h1>
          <p className='text-gray-500'>
            From Bitcoin to Dogecoin, we make it easy to buy and sell
            cryptocurrency.
          </p>
        </div>
      </motion.div>
      <div className='flex flex-col space-y-2 mt-8'>
        <Link to='/tontastic-wallet/create-wallet' className='w-full'>
          <Button variant='default' className='w-full py-6 text-white'>
            Create new wallet
          </Button>
        </Link>
        <Link to='/tontastic-wallet/import-wallet' className='w-full'>
          <Button variant='outline' className='w-full py-6  border-gray-600'>
            Import existing wallet
          </Button>
        </Link>
      </div>
    </div>
  );
};
