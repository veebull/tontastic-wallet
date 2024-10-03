import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import {
  ChevronLeft,
  ChevronRight,
  Bell,
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
} from 'lucide-react';

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gray-900 text-white p-6'
    >
      <div className='max-w-md mx-auto'>
        <header className='flex justify-between items-center mb-8'>
          <Link
            to='/tontastic-wallet/dashboard'
            className='text-2xl text-white'
          >
            <ChevronLeft className='w-6 h-6' />
          </Link>
          <h1 className='text-xl font-semibold'>My Settings</h1>
          <div className='flex space-x-4'>
            <button
              onClick={toggleTheme}
              className='text-white hover:text-gray-300 transition-colors'
            >
              <Bell className='w-5 h-5' />
            </button>
            <Link
              to='/tontastic-wallet/wallet-options'
              className='text-white hover:text-gray-300 transition-colors'
            >
              <LogOut className='w-5 h-5' />
            </Link>
          </div>
        </header>

        <nav className='space-y-2'>
          {settingsItems.map((item) => (
            <Link
              key={item.name}
              to={`/settings/${item.name.toLowerCase().replace(' ', '-')}`}
              className='flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors'
            >
              <div className='flex items-center space-x-4'>
                <item.icon className='w-5 h-5 text-white' />
                <span className='text-sm font-medium text-white'>
                  {item.name}
                </span>
              </div>
              <ChevronRight className='w-4 h-4 text-white' />
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
