import React from 'react';
import { SettingsIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Dashboard: React.FC = () => {
  return (
    <div
      className='bg-white text-black p-6 flex flex-col'
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <div className='flex justify-between items-center mt-6'>
        <div className='flex items-center space-x-2'>
          <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
            <span className='text-sm'>👦</span>
          </div>
          <h1 className='text-xl font-semibold'>Hello Antony!</h1>
        </div>
        <Link to='/tontastic-wallet/settings'>
          <SettingsIcon className='text-gray-500' />
        </Link>
      </div>

      <div className='mt-6'>
        <h2 className='text-gray-500'>Wallet (USD)</h2>
        <p className='text-3xl font-bold'>$67,9890.04</p>
      </div>
      <div className='flex justify-between mt-6'>
        {['Buy', 'Swap', 'Send', 'Receive'].map((action, index) => (
          <Link
            className='text-black'
            key={index}
            to={`/tontastic-wallet/${action.toLowerCase()}`}
          >
            <div
              className={`w-16 h-16 rounded-full flex flex-col items-center justify-center ${
                ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-gray-100'][
                  index
                ]
              }`}
            >
              {index === 0 && <PlusIcon className='mb-1' />}
              {index === 1 && (
                <svg
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mb-1'
                >
                  <path d='M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16' />
                </svg>
              )}
              {index === 2 && (
                <svg
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mb-1'
                >
                  <path d='M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z' />
                </svg>
              )}
              {index === 3 && (
                <svg
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mb-1'
                >
                  <polyline points='22 12 16 12 14 15 10 15 8 12 2 12' />
                  <path d='M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' />
                </svg>
              )}

              <span className='text-xs mt-1'>{action}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className='mt-6'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold'>Favourites</h2>
          <span className='text-blue-500'>View All</span>
        </div>
        <div className='flex space-x-4 mt-4'>
          <div className='w-24 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'>
            <PlusIcon className='text-gray-400' />
          </div>
          {['Casper', 'Bitcoin'].map((coin, index) => (
            <div
              key={index}
              className={`w-36 h-32 ${
                ['bg-blue-100', 'bg-green-100'][index]
              } rounded-lg p-4 flex flex-col justify-between`}
            >
              <div className='flex justify-between items-center'>
                <span>{coin}</span>
                <span className='text-xs'>{['CSPR', 'BTC'][index]}</span>
              </div>
              <div>
                <p className='font-bold'>
                  ${['34,459.04', '78,686.25'][index]}
                </p>
                <p
                  className={`text-sm ${
                    ['text-red-500', 'text-green-500'][index]
                  }`}
                >
                  {['▼ 3.85%', '▲ 5.18%'][index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='font-semibold'>Make a transfer</h2>
        <div className='flex space-x-4 mt-4'>
          {[
            'New Transfer',
            'Send to yourself',
            'Dmitriy Yahorau',
            'Lubomir Zarko',
            'Yuriy Grishak',
          ].map((person, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-1'>
                {index === 0 && (
                  <svg
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                    stroke='currentColor'
                    strokeWidth='2'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M5 12h14M12 5l7 7-7 7' />
                  </svg>
                )}
                {index !== 0 && <span className='text-sm'>👤</span>}
              </div>
              <span className='text-xs text-center'>{person}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6 bg-gray-100 rounded-lg p-4'>
        <div className='flex justify-between mb-4'>
          <span className='font-semibold'>Total</span>
          <span className='font-semibold'>Per Platform</span>
          <span className='font-semibold'>Month ▼</span>
        </div>
        <div className='flex flex-wrap justify-between'>
          {['0,050', '1,223', '5,700', '12m', '0,100', '0,930'].map(
            (value, index) => (
              <div
                key={index}
                className={`w-20 h-20 ${
                  [
                    'bg-gray-300',
                    'bg-green-200',
                    'bg-green-300',
                    'bg-purple-200',
                    'bg-yellow-200',
                    'bg-pink-200',
                  ][index]
                } rounded-full flex items-center justify-center mb-2`}
              >
                <span className='font-semibold'>{value}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
