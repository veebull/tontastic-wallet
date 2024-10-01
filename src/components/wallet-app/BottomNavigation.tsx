import { Home, ArrowLeftRight, Send, Settings } from 'lucide-react';

export const BottomNavigation = () => {
  return (
    <div className=''>
      <div className='fixed z-50 w-full h-16 max-w-sm -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600'>
        <div className='grid h-full max-w-lg grid-cols-4 mx-auto font-medium'>
          <Home className='w-6 h-6 m-auto text-gray-500 inline-flex flex-col items-center justify-center group' />
          <ArrowLeftRight className='w-6 h-6 m-auto text-gray-500 inline-flex flex-col items-center justify-center group' />
          <Send className='w-6 h-6 m-auto text-gray-500 inline-flex flex-col items-center justify-center group' />
          <Settings className='w-6 h-6 m-auto text-gray-500 inline-flex flex-col items-center justify-center group' />
        </div>
      </div>
    </div>
  );
};
