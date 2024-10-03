import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Copy, Share2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { QRCodeSVG } from 'qrcode.react';

// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';

export const Receive: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [walletAddress] = useState(
    '0x9abC74120e13e7D2B46cfE8D6796Da317e65658c'
  );

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    // You might want to add a toast notification here
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6'
      >
        <div className='flex justify-between items-center mb-4'>
          <Link to='/' className='text-blue-500 hover:text-blue-600'>
            &lt; Back
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <h1 className='text-2xl font-bold mb-4'>Receive</h1>

        <Alert variant='default' className='mb-4'>
          <AlertDescription>
            Only for *** network tokens. Do not send ETC here!
          </AlertDescription>
        </Alert>

        <div className='bg-white dark:bg-gray-700 p-4 rounded-lg mb-4 mx-10'>
          <QRCodeSVG
            value={walletAddress}
            size={200}
            className='w-full h-auto'
          />
        </div>

        <div className='flex items-center justify-between bg-gray-200 dark:bg-gray-600 p-2 rounded-lg mb-4'>
          <span className='text-sm truncate'>{walletAddress}</span>
          <button
            onClick={copyAddress}
            className='text-blue-500 hover:text-blue-600'
          >
            <Copy size={20} />
          </button>
        </div>

        <Link
          to='/share'
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center'
        >
          <Share2 size={20} className='mr-2' />
          Share
        </Link>
      </motion.div>
    </div>
  );
};
