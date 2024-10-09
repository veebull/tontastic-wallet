import React, { useEffect, useState } from 'react';
import {
  History,
  BrainCog,
  Coins,
  Image as ImageIcon,
  LayoutDashboard,
  GlobeIcon,
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Link, useLocation } from 'react-router-dom';

interface Wallet {
  address: string;
  chain: 'mainnet' | 'testnet';
  emoji: string;
  name: string;
  publicKey: string;
  secretKey: string;
  seedWords: string[];
  type: 'imported' | 'generated';
}

export const BottomMenu: React.FC = () => {
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);

  const { theme } = useTheme();
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === `/tontastic-wallet/${path}`;
  };

  useEffect(() => {
    const handleWalletChange = (event: CustomEvent<Wallet>) => {
      setCurrentWallet(event.detail);
    };

    // Initial load
    const storedWallet = JSON.parse(
      localStorage.getItem('activeWallet') || 'null'
    );
    setCurrentWallet(storedWallet);

    // Listen for custom wallet change event
    window.addEventListener(
      'activeWalletChanged',
      handleWalletChange as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        'activeWalletChanged',
        handleWalletChange as EventListener
      );
    };
  }, []);

  return (
    <>
      <div className='flex justify-center mx-auto top-0 absolute left-0 right-0'>
        {currentWallet && (
          <span
            className={`text-sm font-medium  px-3 py-1 rounded-full mt-1 ${
              currentWallet.chain === 'mainnet' && theme === 'dark'
                ? 'text-green-500 bg-gray-900'
                : currentWallet.chain === 'testnet' && theme === 'dark'
                ? 'text-yellow-500 bg-gray-900'
                : currentWallet.chain === 'testnet' && theme === 'light'
                ? 'text-yellow-600 bg-yellow-100'
                : 'text-green-500 bg-green-100'
            }`}
          >
            {currentWallet.chain.toUpperCase()}
          </span>
        )}
      </div>
      <div
        className={`fixed bottom-0 left-0 right-0 mx-auto py-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } p-4`}
        style={{ maxWidth: '390px' }}
      >
        <div className='flex justify-between'>
          {[
            { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
            { icon: History, label: 'History', path: 'history' },
            { icon: BrainCog, label: 'AI Assistant', path: 'ai-assistant' },
            { icon: Coins, label: 'Tokens', path: 'tokens' },
            { icon: ImageIcon, label: 'NFT', path: 'nft' },
            { icon: GlobeIcon, label: 'Browser', path: 'browser' },
          ].map((item, index) => (
            <Link
              key={index}
              to={`/tontastic-wallet/${item.path}`}
              className={`flex flex-col items-center ${
                isActive(item.path)
                  ? 'text-blue-500'
                  : theme === 'dark'
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}
            >
              <item.icon className='mb-1' />
              <span className='text-xs'>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
