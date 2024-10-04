import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { mnemonicToWalletKey, mnemonicNew } from '@ton/crypto';
import { WalletContractV4 } from '@ton/ton';

interface WalletData {
  mnemonic: string[];
  publicKey: string;
  secretKey: string;
  address: string;
  chain: 'mainnet';
  type: 'created';
}

export const CreateWallet: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [showWords, setShowWords] = useState(false);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const generateWallet = async () => {
      try {
        const mnemonic = await mnemonicNew(24);
        const keyPair = await mnemonicToWalletKey(mnemonic);
        const wallet = WalletContractV4.create({
          workchain: 0,
          publicKey: keyPair.publicKey,
        });
        const address = wallet.address.toString();

        const newWalletData: WalletData = {
          mnemonic,
          publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
          secretKey: Buffer.from(keyPair.secretKey).toString('hex'),
          address: address,
          chain: 'mainnet',
          type: 'created',
        };

        setWalletData(newWalletData);
      } catch (error) {
        console.error('Error generating wallet:', error);
      }
    };

    generateWallet();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const copyWords = () => {
    if (walletData) {
      navigator.clipboard.writeText(walletData.mnemonic.join(' '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  const handleContinue = () => {
    if (walletData) {
      const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
      wallets.push(walletData);
      localStorage.setItem('wallets', JSON.stringify(wallets));
      localStorage.setItem('activeWallet', JSON.stringify(walletData));
      navigate('/tontastic-wallet/check-new-wallet');
    }
  };

  return (
    <div className='bg-background text-foreground p-4 flex flex-col items-center min-h-screen'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md space-y-6'
      >
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Your private key</h1>
          <div className='flex items-center'>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            {theme === 'dark' ? (
              <Moon className='h-4 w-4 ml-2 absolute' />
            ) : (
              <Sun className='h-4 w-4 ml-2 absolute' />
            )}
          </div>
        </div>

        <p className='text-sm text-muted-foreground text-center'>
          Write these 24 words in exactly that order and hide them in a safe
          place
        </p>

        <div className='relative'>
          <motion.div
            transition={{ duration: 0.3 }}
            className='grid grid-cols-2 gap-2 text-sm'
          >
            {walletData?.mnemonic.map((word, index) => (
              <div key={index} className='flex items-center'>
                <span className='text-muted-foreground mr-2 w-6 text-right'>
                  {index + 1}.
                </span>
                <span>
                  {showWords
                    ? word
                    : '•'.repeat(Math.floor(Math.random() * 5) + 3)}
                </span>
              </div>
            ))}
          </motion.div>
          <Button
            variant='secondary'
            size='lg'
            className='absolute top-0 right-0'
            onClick={() => setShowWords(!showWords)}
          >
            {showWords ? (
              <EyeOff className='h-6 w-6' />
            ) : (
              <Eye className='h-6 w-6' />
            )}
          </Button>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={copied ? 'copied' : 'copy'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size='default'
              variant='secondary'
              onClick={copyWords}
              className='w-full flex items-center justify-center p-7'
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className='mr-2 h-5 w-5' />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className='mr-2 h-5 w-5' />
                  Copy Words
                </>
              )}
            </Button>
          </motion.div>
        </AnimatePresence>

        <Button
          variant='default'
          size='lg'
          className='w-full p-7'
          onClick={handleContinue}
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
};
