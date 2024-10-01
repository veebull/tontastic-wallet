import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NewWallet: React.FC = () => {
  const [seedPhrase] = useState<string[]>(['слово1', 'слово2', '...']);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Создайте новый кошелек</h1>
      <div className='mt-4'>
        <p>Ваша сид фраза:</p>
        <div className='bg-gray-100 p-2 rounded'>{seedPhrase.join(' ')}</div>
        <Link to='/wallet' className='btn-primary mt-4'>
          Перейти к кошельку
        </Link>
      </div>
    </div>
  );
};
