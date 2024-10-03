import React from 'react';
import { Link } from 'react-router-dom';

export const CreateWallet: React.FC = () => {
  const words = [
    'ripple',
    'hazard',
    'episode',
    'sword',
    'visa',
    'pool',
    'resemble',
    'neglect',
    'carry',
    'mimic',
    'empower',
    'dinosaur',
    'danger',
    'survey',
    'present',
    'faculty',
    'summer',
    'cupboard',
    'essence',
    'stomach',
    'prison',
    'asthma',
    'galaxy',
    'circle',
  ];

  return (
    <div
      className=' bg-white text-black p-6 flex flex-col'
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <div className='flex-grow flex flex-col items-center mt-8 space-y-6'>
        <svg
          width='64'
          height='64'
          viewBox='0 0 64 64'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='32' cy='32' r='30' fill='#E5E7EB' />
          <path
            d='M32 16C23.2 16 16 23.2 16 32C16 40.8 23.2 48 32 48C40.8 48 48 40.8 48 32C48 23.2 40.8 16 32 16ZM32 44C25.4 44 20 38.6 20 32C20 25.4 25.4 20 32 20C38.6 20 44 25.4 44 32C44 38.6 38.6 44 32 44Z'
            fill='#9CA3AF'
          />
          <path
            d='M32 24C27.6 24 24 27.6 24 32C24 36.4 27.6 40 32 40C36.4 40 40 36.4 40 32C40 27.6 36.4 24 32 24ZM32 36C29.8 36 28 34.2 28 32C28 29.8 29.8 28 32 28C34.2 28 36 29.8 36 32C36 34.2 34.2 36 32 36Z'
            fill='#6B7280'
          />
        </svg>

        <h1 className='text-2xl font-bold'>Your private key</h1>

        <p className='text-center text-gray-500'>
          Write these 24 words in exactly that order and hide them in a safe
          place
        </p>

        <div className='w-full grid grid-cols-2 gap-4'>
          {words.map((word, index) => (
            <div key={index} className='flex items-center'>
              <span className='text-gray-400 mr-2'>{index + 1}.</span>
              <span>{word}</span>
            </div>
          ))}
        </div>

        <Link
          to='/tontastic-wallet/check-new-wallet'
          className='w-full p-4 m-4 bg-blue-500 text-white hover:text-white qpy-3 rounded-lg text-center mt-6'
        >
          Continue
        </Link>
      </div>
    </div>
  );
};
