import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Moon, Copy, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const Receive: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [deeplink, setDeeplink] = useState('');

  useEffect(() => {
    // Retrieve the wallet address from localStorage
    const activeWallet = JSON.parse(
      localStorage.getItem('activeWallet') || '{}'
    );
    if (activeWallet && activeWallet.address) {
      setWalletAddress(activeWallet.address);
    } else {
      // Handle the case where no wallet address is found
      toast({
        title: 'No Wallet Found',
        description: 'Please create or import a wallet first.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  useEffect(() => {
    generateDeeplink();
  }, [amount, walletAddress]);

  const generateDeeplink = () => {
    if (!walletAddress) return;
    const baseUrl = 'https://t.me/tontastic_wallet_bot/wallet?transfer=';
    const params = new URLSearchParams({
      addressTo: walletAddress,
      amount: amount ? (parseFloat(amount) * 1e9).toString() : '0',
    });
    setDeeplink(`${baseUrl}${encodeURIComponent(params.toString())}`);
  };

  const copyAddress = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: 'Address Copied',
      description: 'The wallet address has been copied to your clipboard.',
    });
  };

  const shareOnTelegram = () => {
    if (!walletAddress) return;
    const message = amount
      ? `Here is my wallet address to receive ${amount} TON: ${deeplink}`
      : `Here is my wallet address: ${walletAddress}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      deeplink || walletAddress
    )}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-900'
      } p-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md mx-auto'
      >
        <div className='flex justify-between items-center mb-6'>
          <Link
            to='/tontastic-wallet/dashboard'
            className='flex items-center text-blue-500 hover:text-blue-600'
          >
            <ArrowLeft size={20} className='mr-2' />
            Back
          </Link>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        <h1 className='text-2xl font-bold mb-4'>Receive</h1>

        <Alert variant='default' className='mb-6'>
          <AlertDescription>
            Only for TON network tokens. Do not send other tokens here!
          </AlertDescription>
        </Alert>

        {walletAddress ? (
          <>
            <div className='mb-4'>
              <Input
                type='number'
                placeholder='Amount to receive (optional)'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              />
            </div>

            <div
              className={`${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } p-4 rounded-lg mb-6 flex justify-center`}
            >
              <QRCodeSVG
                value={deeplink || walletAddress}
                size={200}
                className='w-full max-w-[200px] h-auto'
              />
            </div>

            <div
              className={`flex items-center justify-between ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              } p-3 rounded-lg mb-6`}
            >
              <span className='text-sm truncate flex-1'>{walletAddress}</span>
              <Button
                onClick={copyAddress}
                variant='outline'
                size='sm'
                className='ml-2 flex items-center'
              >
                <Copy size={16} className='mr-2' />
                Copy
              </Button>
            </div>

            <Button
              onClick={shareOnTelegram}
              className='w-full p-6'
              variant='default'
            >
              <Send size={20} className='mr-2' />
              Share on Telegram
            </Button>
          </>
        ) : (
          <Alert variant='destructive'>
            <AlertDescription>
              No wallet address found. Please create or import a wallet first.
            </AlertDescription>
          </Alert>
        )}
      </motion.div>
    </div>
  );
};
