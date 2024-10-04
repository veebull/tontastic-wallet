import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  AlertCircle,
  Wallet,
  Lock,
  Bell as BellIcon,
  CreditCard,
  Info,
  Twitter,
  Send,
  Facebook,
  Sun,
  Moon,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const settingsItems = [
  { name: 'Price Alerts', icon: AlertCircle },
  { name: 'Wallet Connect', icon: Wallet },
  { name: 'Security', icon: Lock },
  { name: 'Push Notifications', icon: BellIcon },
  { name: 'Subscription', icon: CreditCard },
  { name: 'About', icon: Info },
  { name: 'Twitter', icon: Twitter },
  { name: 'Telegram', icon: Send },
  { name: 'Facebook', icon: Facebook },
];

export const Settings: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const [clickCount, setClickCount] = useState(0);
  const [devMode, setDevMode] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount + 1 === 5) {
      setDevMode(!devMode);
      setClickCount(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-900'
      } p-4`}
      style={{ maxWidth: '100%', margin: '0 auto' }}
    >
      <div className='max-w-md mx-auto'>
        <header className='flex justify-between items-center mb-6'>
          <Link
            to='/tontastic-wallet/dashboard'
            className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
          >
            <ChevronLeft className='w-6 h-6' />
          </Link>
          <h1 className='text-xl font-semibold'>My Settings</h1>
          <div className='flex space-x-4 items-center'>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            {theme === 'dark' ? (
              <Moon className='w-4 h-4' />
            ) : (
              <Sun className='w-4 h-4' />
            )}
            <Link
              to='/tontastic-wallet/wallet-options'
              className={
                theme === 'dark'
                  ? 'text-white hover:text-gray-300'
                  : 'text-gray-900 hover:text-gray-700'
              }
            >
              <LogOut className='w-5 h-5' />
            </Link>
          </div>
        </header>

        <nav className='space-y-2'>
          {settingsItems.map((item) => (
            <Link
              key={item.name}
              to={`/tontastic-wallet/settings/${item.name
                .toLowerCase()
                .replace(' ', '-')}`}
              className={`flex items-center justify-between p-3 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-200'
              } transition-colors`}
            >
              <div className='flex items-center space-x-3'>
                <item.icon
                  className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {item.name}
                </span>
              </div>
              <ChevronRight
                className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className='mt-8 flex justify-center'>
          <div onClick={handleLogoClick} className='cursor-pointer'>
            <svg
              width='100'
              height='40'
              viewBox='0 0 100 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {/* Replace with your actual SVG logo */}
              <rect
                width='100'
                height='40'
                fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
              />
              <text
                x='50'
                y='25'
                fontFamily='Arial'
                fontSize='14'
                fill={theme === 'dark' ? '#000000' : '#FFFFFF'}
                textAnchor='middle'
              >
                Tontastic
              </text>
            </svg>
            <p
              className={`text-xs text-center mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Version 1.0.0
            </p>
          </div>
        </div>

        {devMode && (
          <div
            className={`mt-4 p-2 rounded ${
              theme === 'dark'
                ? 'bg-yellow-800 text-yellow-200'
                : 'bg-yellow-200 text-yellow-800'
            }`}
          >
            Developer Mode Activated
          </div>
        )}
      </div>
    </motion.div>
  );
};
