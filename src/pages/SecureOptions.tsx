import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Sparkles, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

export const SecureOptions: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } p-6 flex flex-col`}
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-between items-center mt-2'
      >
        <Link to='/tontastic-wallet/check-new-wallet'>
          <ArrowLeft
            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          />
        </Link>
        <div className='flex items-center'>
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          {theme === 'dark' ? (
            <Moon className='h-4 w-4 ml-2' />
          ) : (
            <Sun className='h-4 w-4 ml-2' />
          )}
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-2xl font-bold mt-6 mb-8'
      >
        Choose a faster way to
        <br />
        log in on this device
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='flex justify-center items-center my-12'
      >
        <div className='relative'>
          <Lock
            className={`w-32 h-32 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`}
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className='absolute top-0 right-0'
          >
            <Sparkles className='w-8 h-8 text-blue-400' />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1,
            }}
            className='absolute bottom-0 left-0'
          >
            <Sparkles className='w-6 h-6 text-green-400' />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='space-y-4 mt-auto'
      >
        <Link to='/tontastic-wallet/create-pin' className='block'>
          <Button variant='default' className='w-full py-6'>
            Create a PIN
          </Button>
        </Link>

        <Link to='/tontastic-wallet/dashboard' className='block text-center'>
          <Button
            variant='secondary'
            className={`w-full ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-white border-gray-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Maybe, Later
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
