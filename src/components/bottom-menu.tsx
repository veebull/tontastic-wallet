import React from 'react';
import {
  History,
  BrainCog,
  Coins,
  Image as ImageIcon,
  LayoutDashboard,
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Link, useLocation } from 'react-router-dom';

export const BottomMenu: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === `/tontastic-wallet/${path}`;
  };
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } p-4`}
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <div className='flex justify-between'>
        {[
          { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
          { icon: History, label: 'History', path: 'history' },
          { icon: BrainCog, label: 'AI Assistant', path: 'ai-assistant' },
          { icon: Coins, label: 'Tokens', path: 'tokens' },
          { icon: ImageIcon, label: 'NFT', path: 'nft' },
          { icon: ImageIcon, label: 'Browser', path: 'browser' },
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
  );
};
