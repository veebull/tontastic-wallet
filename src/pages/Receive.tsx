import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Copy } from 'lucide-react';
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
import { Button } from '@/components/ui/button';

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
          <Link
            to='/tontastic-wallet/dashboard'
            className='text-blue-500 hover:text-blue-600'
          >
            &lt; Back
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-white'
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <h1 className='text-2xl font-bold mb-4'>Receive</h1>

        <Alert variant='default' className='mb-4'>
          <AlertDescription>
            Only for TON network tokens. Do not send ETC here!
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
          <span className='text-sm truncate flex-1'>{walletAddress}</span>
          <Button
            onClick={copyAddress}
            className='ml-2 flex items-center'
            variant='outline'
          >
            <Copy size={16} className='mr-2' />
            Copy Address
          </Button>
        </div>

        <button
          onClick={() => {
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
              walletAddress
            )}&text=${encodeURIComponent('Here is my wallet address!')}`;
            window.open(telegramUrl, '_blank');
          }}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center mb-4'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2'
          >
            <path d='M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.36.506.494.864.498.355.004.717-.129.88-.498.886-2.008 1.801-4.138 2.687-6.18.126-.293.375-.416.679-.239 2.12 1.258 4.27 2.539 6.424 3.781.377.217.75.148 1.124-.111.23-.18.395-.451.445-.75.171-1.126.664-4.657.89-6.094a.923.923 0 0 0-.713-1.161.808.808 0 0 0-.725.12c-1.96 1.425-3.885 2.88-5.84 4.295-.384.28-.768.557-1.15.836A3.615 3.615 0 0 1 12 13.5c-.465 0-.912.108-1.274.309l-.144.07c-.156.094-.308.19-.392.246-.216.128-.422.25-.615.355-.325.148-.997.322-1.252-.062-.142-.222-.106-.364-.061-.445.113-.322.687-.768 1.254-1.086 1.656-.821 3.293-1.67 4.922-2.516 1.17-.61 2.339-1.217 3.505-1.83A92.27 92.27 0 0 0 21.198 4.25c.505-.266.652-.647.652-.99 0-.342-.147-.724-.652-.99z' />
          </svg>
          Share on Telegram
        </button>
      </motion.div>
    </div>
  );
};
