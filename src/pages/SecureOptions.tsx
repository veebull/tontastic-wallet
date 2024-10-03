import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SecureOptions: React.FC = () => {
  return (
    <div
      className='min-h-screen bg-gray-900 text-white p-6 flex flex-col'
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-between items-center mt-2'
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='mt-6'
      >
        <Link to='/tontastic-wallet/check-new-wallet'>
          <ArrowLeft className='text-gray-400' />
        </Link>
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
          <Lock className='w-32 h-32 text-gray-600' />
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
        <Link to='/tontastic-wallet/dashboard' className='block'>
          <Button variant='default' className='w-full text-white py-6'>
            Use Face ID
          </Button>
        </Link>
        <Link to='/tontastic-wallet/create-pin' className='block'>
          <Button variant='outline' className='w-full border-gray-600  py-6'>
            Create a PIN
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
