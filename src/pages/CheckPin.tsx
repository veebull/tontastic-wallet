import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Delete, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

export const CheckPin: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleNumberClick = (number: number) => {
    if (pin.length < 4) {
      setPin((prev) => prev + number);
      setError(null);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(null);
  };

  const handleContinue = () => {
    const savedPin = localStorage.getItem('walletPin');
    if (pin === savedPin) {
      navigate('/tontastic-wallet/dashboard');
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } p-4 flex flex-col`}
      style={{ maxWidth: '100%', margin: '0 auto' }}
    >
      <div className='flex justify-between items-center mb-4'>
        <Link to='/tontastic-wallet/secure-options'>
          <ArrowLeft
            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          />
        </Link>
        <div className='flex items-center'>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }
          />
          {theme === 'dark' ? (
            <Moon className='h-4 w-4 ml-2' />
          ) : (
            <Sun className='h-4 w-4 ml-2' />
          )}
        </div>
      </div>

      <h1 className='text-xl font-bold mb-6'>Enter PIN to access wallet</h1>

      {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

      <div className='flex justify-between mb-6'>
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`w-14 h-14 border-b-2 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
            } flex items-center justify-center`}
          >
            <AnimatePresence>
              {pin[index] && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className='text-2xl font-bold'
                >
                  •
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-3 gap-2 mb-6'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            variant='ghost'
            className={`w-full h-16 rounded-full text-xl font-bold ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
            }`}
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </Button>
        ))}
        <div></div>
        <Button
          variant='ghost'
          className={`w-full h-16 rounded-full text-xl font-bold ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
          }`}
          onClick={() => handleNumberClick(0)}
        >
          0
        </Button>
        <Button
          variant='ghost'
          className={`w-full h-16 rounded-full ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
          }`}
          onClick={handleDelete}
        >
          <Delete className='w-5 h-5' />
        </Button>
      </div>

      <Button
        variant='default'
        className={`w-full py-6 ${
          pin.length === 4 ? '' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={handleContinue}
        disabled={pin.length !== 4}
      >
        Access Wallet
      </Button>
    </div>
  );
};
