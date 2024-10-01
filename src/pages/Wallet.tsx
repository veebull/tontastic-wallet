import React from 'react';
import { Link } from 'react-router-dom';

interface WalletProps {
  balance: number;
  address: string;
}

export const Wallet: React.FC<WalletProps> = () => {
  const balance = 10;
  const address = 'EQC...';
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Ваш кошелек</h1>
      <div className='mt-4'>
        <p>Баланс: {balance} TON</p>
        <p>Адрес: {address}</p>
        <Link to='/receive' className='btn-primary mt-4'>
          Получить
        </Link>
        <Link to='/send' className='btn-secondary mt-4'>
          Отправить
        </Link>
      </div>
    </div>
  );
};
