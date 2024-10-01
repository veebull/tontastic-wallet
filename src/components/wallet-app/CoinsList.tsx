export const CoinsList = () => {
  return (
    <div className='p-4'>
      <h3 className='text-lg font-semibold'>Coins</h3>
      <div className='space-y-4 mt-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <div className='rounded-full bg-gray-200 p-2'>
              {/* Replace with coin logo */}
              <span className='font-bold text-gray-700'>EOS</span>
            </div>
            <p className='font-semibold'>EOS</p>
          </div>
          <div className='text-right'>
            <p className='text-xl font-bold'>$329</p>
            <p className='text-green-600'>+2.56%</p>
          </div>
        </div>
        {/* Add more coins here */}
      </div>
    </div>
  );
};
