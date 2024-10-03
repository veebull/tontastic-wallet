import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const CheckNewWallet: React.FC = () => {
  return (
    <div
      className='h-screen bg-gray-900 text-white p-6 flex flex-col'
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <div className='mt-6'>
        <Link to='/tontastic-wallet/create-wallet' className='text-gray-400'>
          <ArrowLeft size={24} />
        </Link>
      </div>

      <div className='flex-grow flex flex-col mt-8 space-y-6'>
        <h1 className='text-2xl font-bold text-center'>
          Проверка резервной копии
        </h1>

        <p className='text-center text-gray-400'>
          Давайте проверим, все ли вы записали правильно. Введите слова 7, 10, и
          13.
        </p>

        <div className='space-y-4'>
          <div className='bg-gray-800 rounded-lg p-4'>
            <div className='flex items-center'>
              <label className='text-gray-400 mr-2'>7:</label>
              <input
                type='text'
                className='bg-transparent flex-grow mt-1 focus:outline-none'
              />
            </div>
          </div>
          <div className='flex items-center bg-gray-800 rounded-lg p-4'>
            <label className='text-gray-400 mr-2'>10:</label>
            <input
              type='text'
              className='bg-transparent w-full mt-1 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-800 rounded-lg p-4'>
            <label className='text-gray-400 mr-2'>13:</label>
            <input
              type='text'
              className='bg-transparent w-full mt-1 focus:outline-none'
            />
          </div>
        </div>
      </div>

      <Link
        to='/tontastic-wallet/secure-options'
        className='w-full bg-blue-500 text-white hover:text-white py-4 rounded-lg text-center mt-6'
      >
        Готово
      </Link>
    </div>
  );
};
