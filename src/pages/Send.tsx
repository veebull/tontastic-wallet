import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Send: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    // Handle send transaction logic here
    console.log('Sending', amount, 'TON to', recipient);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-semibold mb-6'>Send TON</h2>
      <div className='space-y-4'>
        <Input
          placeholder='Recipient Address'
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Input
          type='number'
          placeholder='Amount (TON)'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={handleSend} className='w-full'>
          Send TON
        </Button>
      </div>
    </div>
  );
};
