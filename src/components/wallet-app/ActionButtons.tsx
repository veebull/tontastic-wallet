import { Plus, RefreshCcw, Send, MoreHorizontal } from 'lucide-react';

export const ActionButtons = () => {
  return (
    <div className='flex justify-around py-4'>
      <button className='flex flex-col items-center bg-white border-b border-black'>
        <Plus className='w-6 h-6' />
        <span>Buy</span>
      </button>
      <button className='flex flex-col items-center bg-white border-b border-black'>
        <RefreshCcw className='w-6 h-6' />
        <span>Swap</span>
      </button>
      <button className='flex flex-col items-center bg-white border-b border-black'>
        <Send className='w-6 h-6' />
        <span>Send</span>
      </button>
      <button className='flex flex-col items-center bg-white border-b border-black'>
        <MoreHorizontal className='w-6 h-6' />
        <span>More</span>
      </button>
    </div>
  );
};
