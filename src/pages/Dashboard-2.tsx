import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Avatar } from '@/components/ui/avatar';

export const Dashboard2: React.FC = () => {
  // Data for the favorites tokens and transfer contacts
  const tokens = [
    { name: 'Casper', symbol: 'CSPR', price: '$34,459.04', change: '+3.85%' },
    { name: 'Bitcoin', symbol: 'BTC', price: '$78,686.25', change: '+5.18%' },
  ];

  const contacts = [
    { name: 'Dmitry Vahonji', avatar: 'contact1.png' },
    { name: 'Lubomir Zanko', avatar: 'contact2.png' },
    { name: 'Yuriy Grisher', avatar: 'contact3.png' },
  ];

  const stats = [
    { label: 'Bitcoin', value: '1,223', color: 'bg-yellow-300' },
    { label: 'Ethereum', value: '12m', color: 'bg-purple-300' },
    { label: 'Tether', value: '5,700', color: 'bg-green-300' },
  ];

  return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg p-4'>
      {/* Header */}
      <header className='flex items-center justify-between'>
        {/* <avatar src='avatar.png' alt='user avatar' size='md' /> */}
        <h1 className='text-xl font-bold'>Hello Antony!</h1>
        <Button variant='ghost'>
          <Settings />
        </Button>
      </header>

      {/* Wallet Balance */}
      <section className='text-center my-4'>
        <h2 className='text-4xl font-bold'>$67,980.04</h2>
        <p className='text-sm text-gray-500'>Wallet (USD)</p>
      </section>

      {/* Action Buttons */}
      <div className='grid grid-cols-4 gap-4 my-4'>
        <Button className='bg-blue-500 text-white'>Buy</Button>
        <Button className='bg-green-500 text-white'>Swap</Button>
        <Button className='bg-purple-500 text-white'>Send</Button>
        <Button className='bg-gray-500 text-white'>More</Button>
      </div>

      {/* Favorites */}
      <section>
        <h3 className='text-xl font-bold'>Favorites</h3>
        <div className='grid grid-cols-2 gap-4 mt-2'>
          {tokens.map((token, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className='bg-gray-100 p-4 rounded-lg'
            >
              <h4 className='text-lg font-semibold'>{token.name}</h4>
              <p className='text-sm text-gray-500'>{token.symbol}</p>
              <p className='text-lg font-bold'>{token.price}</p>
              <p className='text-sm text-green-500'>{token.change}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Transfer Options */}
      <section className='my-4'>
        <h3 className='text-lg font-bold'>Make a Transfer</h3>
        <div className='flex space-x-4 mt-2'>
          {contacts.map((contact, index) => (
            <div key={index} className='text-center'>
              <img
                src={contact.avatar}
                alt={contact.name}
                className='w-12 h-12 rounded-full'
              />
              <p className='text-sm text-gray-500'>{contact.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Graph */}
      <section className='grid grid-cols-3 gap-4 mt-6'>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className={`${stat.color} p-4 rounded-full text-center`}
          >
            <p className='text-lg font-bold'>{stat.value}</p>
            <p className='text-sm'>{stat.label}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};
