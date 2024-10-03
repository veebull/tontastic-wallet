import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CreatePin: React.FC = () => {
  const [pin, setPin] = useState<string>('');

  const handleNumberClick = (number: number) => {
    if (pin.length < 4) {
      setPin((prev) => prev + number);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

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
        <Link to='/tontastic-wallet/secure-options'>
          <ArrowLeft className='text-gray-400' />
        </Link>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-2xl font-bold mt-6 mb-8'
      >
        Create a PIN
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='flex justify-between mb-8'
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className='w-16 h-16 border-b-2 border-gray-700 flex items-center justify-center'
          >
            <AnimatePresence>
              {pin[index] && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className='text-3xl font-bold'
                >
                  {pin[index]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='grid grid-cols-3 gap-4'
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            variant='ghost'
            className='w-20 h-20 rounded-full text-2xl font-bold'
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </Button>
        ))}
        <div></div>
        <Button
          variant='ghost'
          className='w-20 h-20 rounded-full text-2xl font-bold'
          onClick={() => handleNumberClick(0)}
        >
          0
        </Button>
        <Button
          variant='ghost'
          className='w-20 h-20 rounded-full'
          onClick={handleDelete}
        >
          <Delete className='w-6 h-6' />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='mt-auto'
      >
        <Link
          to='/tontastic-wallet/dashboard'
          className={`block ${
            pin.length === 4 ? '' : 'pointer-events-none opacity-50'
          }`}
        >
          <Button variant='default' className='w-full text-white py-6'>
            Continue
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
