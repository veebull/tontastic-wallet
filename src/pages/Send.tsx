import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Copy, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export const Send: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('ETH');
  const [address, setAddress] = useState<string>('23ysbGSKgjnxch23wTWM');
  const [amount, setAmount] = useState<string>('6.8642');
  const [selectedOption, setSelectedOption] = useState<string>('Average');

  const quickSendOptions = [
    { name: 'Emma Lily', image: '/path/to/emma.jpg' },
    { name: 'Junior Antony', image: '/path/to/junior.jpg' },
    { name: 'Elizabeth Sofia', image: '/path/to/elizabeth.jpg' },
  ];

  const feeOptions = ['Low', 'Average', 'High'];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      } p-6 flex flex-col`}
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-between items-center'
      >
        <Link to='/previous-page' className='flex items-center'>
          <ArrowLeft
            className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mr-2`}
          />
          <span>Back</span>
        </Link>
        <h1 className='text-xl font-bold'>Send</h1>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '🌞' : '🌙'}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='mt-6'
      >
        <Select defaultValue={selectedCrypto} onValueChange={setSelectedCrypto}>
          <SelectTrigger
            className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-blue-100'}`}
          >
            <SelectValue placeholder='Select cryptocurrency' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ETH'>ETH</SelectItem>
            <SelectItem value='BTC'>BTC</SelectItem>
            <SelectItem value='USDT'>USDT</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mt-4'
      >
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        />
        <Button variant='ghost' size='icon' className='absolute right-8 top-32'>
          <Copy className='h-4 w-4' />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='mt-4'
      >
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        />
        <Button variant='ghost' size='icon' className='absolute right-8 top-44'>
          <Eye className='h-4 w-4' />
        </Button>
        <p
          className={`text-sm mt-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Balance: 45.530 ETH
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-6'
      >
        <h2 className='text-lg font-semibold mb-2'>Quick Send</h2>
        <div className='flex space-x-4'>
          <Button
            variant='outline'
            size='icon'
            className={`rounded-full ${
              darkMode ? 'bg-gray-800' : 'bg-green-100'
            }`}
          >
            <Plus className='h-6 w-6' />
          </Button>
          {quickSendOptions.map((option, index) => (
            <div key={index} className='text-center'>
              <div
                className={`w-12 h-12 rounded-full overflow-hidden mx-auto mb-1 ${
                  darkMode ? 'bg-gray-800' : 'bg-green-100'
                }`}
              >
                <img
                  src={option.image}
                  alt={option.name}
                  className='w-full h-full object-cover'
                />
              </div>
              <p className='text-xs'>{option.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='mt-6'
      >
        <h2 className='text-lg font-semibold mb-2'>Select Option</h2>
        <div className='flex justify-between'>
          {feeOptions.map((option) => (
            <Button
              key={option}
              variant={selectedOption === option ? 'default' : 'outline'}
              onClick={() => setSelectedOption(option)}
              className={`flex-1 mx-1 ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : ''
              }`}
            >
              {option}
              <br />
              <span className='text-xs'>32 usd</span>
            </Button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='mt-auto'
      >
        <Link to='/confirm-send' className='block'>
          <Button
            className={`w-full ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white py-4 rounded-full`}
          >
            Confirm
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
