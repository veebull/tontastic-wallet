import React from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  HelpCircle,
  Battery,
  Apple,
  GamepadIcon,
  DollarSign,
  Users,
  Sparkles,
} from 'lucide-react';

const InclinedCard: React.FC<{
  children: React.ReactNode;
  bgColor: string;
  className: string;
  borderColor: string;
}> = ({ children, bgColor, borderColor, className }) => (
  <div
    className={`relative ${bgColor} ${borderColor} border-2 transform -skew-x-6 p-3 ${className}`}
  >
    <div className='transform skew-x-6'>{children}</div>
  </div>
);

export const Game = () => {
  return (
    <div className='bg-gray-900 text-white h-screen p-4 relative overflow-hidden flex flex-col'>
      {/* Textured background */}
      <div
        className='absolute inset-0 bg-repeat opacity-10'
        style={{
          backgroundImage:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkY5NjY1REE5NDY2MTFFMDgwOUZFNkZDOUQwNUZBMTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkY5NjY1REI5NDY2MTFFMDgwOUZFNkZDOUQwNUZBMTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGRjk2NjVEODk0NjYxMUUwODA5RkU2RkM5RDA1RkExNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGRjk2NjVEOTk0NjYxMUUwODA5RkU2RkM5RDA1RkExNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjpGQqcAAAAjSURBVHjaYmRgYDBmQAIMP/5DJRgZkAFIAUwSWQFIASMDBgA3VQMMhVwJlAAAAABJRU5ErkJggg==")',
        }}
      ></div>

      {/* Header */}
      <div className='flex justify-between items-center mb-4 relative z-10'>
        <div className='flex items-center space-x-2'>
          <div className='w-10 h-10 bg-yellow-500 rounded-full overflow-hidden'>
            <img
              src='/api/placeholder/40/40'
              alt='Duck avatar'
              className='w-full h-full object-cover'
            />
          </div>
          <span className='font-bold text-xl'>DUCK228</span>
        </div>
        <div className='flex space-x-4 items-center'>
          <Wallet size={20} />
          <HelpCircle size={20} />
          <div className='border border-white px-2 py-0.5 text-sm font-bold'>
            RU
          </div>
        </div>
      </div>

      {/* Bonuses and Balance */}
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <InclinedCard
          bgColor='bg-indigo-700'
          borderColor='border-indigo-500'
          className='h-24'
        >
          <h2 className='text-sm font-bold mb-1'>BONUSES</h2>
          <p className='text-xs'>REFERRER BONUS</p>
          <p className='text-lg font-bold'>8 🐱</p>
          <p className='text-xs text-green-400'>NFT - INACTIVE 12 🐱</p>
        </InclinedCard>
        <InclinedCard
          bgColor='bg-yellow-600'
          borderColor='border-yellow-400'
          className='h-24'
        >
          <h2 className='text-sm font-bold mb-1'>BALANCE</h2>
          <p className='text-lg font-bold'>3.323.318 🪙</p>
          <p className='text-xs'>TOTAL FARM INCOME:</p>
          <p className='text-xs'>+$100 MWSP/HOUR</p>
        </InclinedCard>
      </div>

      {/* Meow Speed Section */}
      <div className='bg-gray-800 rounded-lg p-4 mb-4 flex-grow'>
        <div className='flex justify-between items-start mb-4'>
          <div className='w-1/2'>
            <h2 className='text-2xl font-bold mb-2'>MEOW SPEED</h2>
            <img
              src='/api/placeholder/150/150'
              alt='Street Kitten'
              className='w-full rounded-lg mb-2'
            />
            <p className='text-center text-xs'>STREET KITTEN Common 7</p>
          </div>
          <div className='w-1/2 pl-4'>
            <InclinedCard
              bgColor='bg-gray-700'
              borderColor='border-gray-600'
              className='mb-2'
            >
              <div className='flex justify-between items-center'>
                <span className='font-bold text-sm'>TESTER KITTEN</span>
                <span className='font-bold text-sm'>LVL 1</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-xs'>+$100 MWSP/HOUR</span>
                <div className='flex'>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className='w-3 h-3 bg-red-500 rounded-full ml-0.5'
                    ></div>
                  ))}
                </div>
              </div>
            </InclinedCard>
            <div className='grid grid-cols-2 gap-2 mb-2'>
              <button className='bg-green-500 text-black text-xs font-bold py-1 px-2 rounded flex items-center justify-center'>
                <Battery size={12} className='mr-1' /> REPAIR
              </button>
              <button className='bg-orange-500 text-black text-xs font-bold py-1 px-2 rounded flex items-center justify-center'>
                <Apple size={12} className='mr-1' /> FOOD
              </button>
            </div>
            <button className='w-full bg-gray-700 text-white text-xs font-bold py-1 rounded'>
              UPDATE
            </button>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className='text-center text-xl font-bold mb-4'>00:00:72</div>

      {/* Claim Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className='w-full bg-yellow-500 text-black font-bold py-3 rounded-lg text-xl mb-4'
      >
        CLAIM
      </motion.button>

      {/* Bottom Navigation */}
      <div className='flex justify-between items-center bg-gray-800 rounded-t-lg p-2'>
        <button className='flex flex-col items-center w-1/5'>
          <GamepadIcon size={20} />
          <span className='text-[10px] mt-1'>GAME</span>
        </button>
        <button className='flex flex-col items-center w-1/5 bg-yellow-500 text-black rounded p-1'>
          <DollarSign size={20} />
          <span className='text-[10px] mt-1'>FARMING</span>
        </button>
        <button className='flex flex-col items-center w-1/5'>
          <DollarSign size={20} />
          <span className='text-[10px] mt-1'>EARN</span>
        </button>
        <button className='flex flex-col items-center w-1/5'>
          <Users size={20} />
          <span className='text-[10px] mt-1'>FRIENDS</span>
        </button>
        <button className='flex flex-col items-center w-1/5'>
          <Sparkles size={20} />
          <span className='text-[10px] mt-1'>AIRDROP</span>
        </button>
      </div>
    </div>
  );
};
