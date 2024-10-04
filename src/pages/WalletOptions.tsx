import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

const TonIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z'
      fill='#0088CC'
    />
    <path
      d='M9.75 18.75v-7.5L18 7.5l-8.25 3.75-4.5-2.25 12.75-4.5v2.25L9.75 18.75z'
      fill='white'
    />
  </svg>
);

export const WalletOptions: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={`h-screen p-6 flex flex-col justify-between transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <div className='flex justify-end'>
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          className='mr-2'
        />
        {theme ? <Moon className='w-5 h-5' /> : <Sun className='w-5 h-5' />}
      </div>
      <motion.div
        className='flex-grow flex flex-col items-center justify-center space-y-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='relative w-48 h-48'>
          <motion.div
            className='absolute top-0 left-0 w-8 h-8 rounded-full flex items-center justify-center'
            animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <TonIcon className='w-8 h-8' />
          </motion.div>
          <motion.div
            className='absolute top-10 right-0 w-6 h-6 rounded-full flex items-center justify-center'
            animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <TonIcon className='w-6 h-6' />
          </motion.div>
          <motion.div
            className='absolute bottom-0 left-10 w-7 h-7 rounded-full flex items-center justify-center'
            animate={{ x: [0, 15, 0], y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          >
            <TonIcon className='w-7 h-7' />
          </motion.div>
          <motion.div
            className='absolute bottom-20 right-10 w-5 h-5 rounded-full flex items-center justify-center'
            animate={{ x: [0, -5, 0], y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          >
            <TonIcon className='w-5 h-5' />
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
                stroke={theme === 'dark' ? 'white' : 'black'}
                strokeWidth='2'
              />
              <circle cx='60' cy='60' r='20' fill='#0088CC' />
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
            Join TON for fast and secure transactions.
          </h1>
          <p
            className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            Experience the power of TON blockchain with easy-to-use wallets and
            lightning-fast transactions.
          </p>
        </div>
      </motion.div>
      <div className='flex flex-col space-y-2 mt-8'>
        <Link to='/tontastic-wallet/create-wallet' className='w-full'>
          <Button
            variant='default'
            className={`w-full py-6 ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Create new wallet
          </Button>
        </Link>
        <Link to='/tontastic-wallet/import-wallet' className='w-full'>
          <Button
            variant='outline'
            className={`w-full py-6 ${
              theme === 'dark'
                ? 'border-gray-600 text-white'
                : 'border-gray-300 text-black'
            }`}
          >
            Import existing wallet
          </Button>
        </Link>
      </div>
    </div>
  );
};
