import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const emojis = ['👛', '🏦', '💼', '🔐', '💰', '🏛️', '💎', '🗝️', '🔑', '🪙'];

export const WalletName: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (name && selectedEmoji) {
      const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
      const activeWallet = JSON.parse(
        localStorage.getItem('activeWallet') || '{}'
      );

      if (activeWallet) {
        activeWallet.name = name;
        activeWallet.emoji = selectedEmoji;

        // Update the wallet in the wallets array
        const updatedWallets = wallets.map((wallet: any) =>
          wallet.address === activeWallet.address &&
          wallet.chain === activeWallet.chain
            ? activeWallet
            : wallet
        );

        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        localStorage.setItem('activeWallet', JSON.stringify(activeWallet));
      }
      if (activeWallet.type === 'imported') {
        navigate('/tontastic-wallet/dashboard');
      } else {
        navigate('/tontastic-wallet/create-pin');
      }
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-900'
      } p-6 flex flex-col`}
    >
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Name Your Wallet</h1>
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='ml-4'
        />
        {theme === 'dark' ? (
          <Moon className='h-5 w-5 ml-2' />
        ) : (
          <Sun className='h-5 w-5 ml-2' />
        )}
      </div>

      <Input
        type='text'
        placeholder='Enter wallet name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`mb-4 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      />

      <div className='grid grid-cols-5 gap-2 mb-6'>
        {emojis.map((emoji) => (
          <Button
            key={emoji}
            variant={selectedEmoji === emoji ? 'default' : 'outline'}
            className='text-2xl p-2'
            onClick={() => setSelectedEmoji(emoji)}
          >
            {emoji}
          </Button>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!name || !selectedEmoji}
        className={`mt-auto ${
          theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        Continue
      </Button>
    </div>
  );
};
