import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid, Clock, Bell, ChevronDown, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

interface Transaction {
  type: 'Buy' | 'Sell';
  asset: 'ETH' | 'BTC' | 'USDT';
  date: string;
  amount: string;
  rate: string;
}

export const History: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const transactions: Transaction[] = [
    {
      type: 'Buy',
      asset: 'ETH',
      date: '17.06.2024 16:37',
      amount: '$1,500.00',
      rate: '$3,500',
    },
    {
      type: 'Buy',
      asset: 'BTC',
      date: '15.06.2024 14:32',
      amount: '$5,400.00',
      rate: '$69,800',
    },
    {
      type: 'Sell',
      asset: 'ETH',
      date: '08.06.2024 12:12',
      amount: '1.47 ETH',
      rate: '$6,000',
    },
    {
      type: 'Buy',
      asset: 'BTC',
      date: '15.05.2024 14:32',
      amount: '$5,400.00',
      rate: '$69,800',
    },
    {
      type: 'Buy',
      asset: 'USDT',
      date: '15.05.2024 14:32',
      amount: '$5,400.00',
      rate: '$69,800',
    },
    {
      type: 'Sell',
      asset: 'BTC',
      date: '10.05.2024 09:45',
      amount: '0.5 BTC',
      rate: '$65,000',
    },
    {
      type: 'Buy',
      asset: 'ETH',
      date: '05.05.2024 11:20',
      amount: '$2,000.00',
      rate: '$3,200',
    },
    {
      type: 'Sell',
      asset: 'USDT',
      date: '01.05.2024 16:55',
      amount: '$10,000.00',
      rate: '$1',
    },
  ];

  const assetColors = {
    ETH: 'bg-blue-500',
    BTC: 'bg-orange-500',
    USDT: 'bg-green-500',
  };

  const assetIcons = {
    ETH: (
      <svg
        className='w-6 h-6 text-white'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z' />
      </svg>
    ),
    BTC: (
      <svg
        className='w-6 h-6 text-white'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z' />
      </svg>
    ),
    USDT: (
      <svg
        className='w-6 h-6 text-white'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.629 0 12 0ZM8.75 13.376c-3.915-1.43-4.282-2.387-4.305-2.528-.135-.842.943-1.674 3.396-2.156.76-.15 1.62-.225 2.61-.27-1.066.458-2.22 1.202-2.22 2.13 0 1.315 1.755 2.04 3.644 2.37-.27.144-.548.27-.832.36-1.146.39-2.035.39-2.294.094Zm3.925-4.503a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3.934 4.91c-1.11.608-2.25.864-2.59.825-.925-.105-1.56-.57-1.56-1.26 0-.78.855-1.38 2.07-1.38.78 0 1.56.195 2.295.585.225.105.45.24.646.375.166.135.304.27.406.405.075.075.135.15.18.24.105.15.135.285.12.39-.016.074-.075.15-.166.225-.21.195-.616.39-1.396.594Z' />
      </svg>
    ),
  };

  useEffect(() => {
    console.log('Transactions:', transactions);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen mb-10 ${theme}`}>
      <div
        className={`bg-background text-foreground p-4 flex flex-col h-screen ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
        }`}
        style={{ maxWidth: '100%', margin: '0 auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex justify-between items-center mb-4'
        >
          <Link to='/tontastic-wallet/dashboard/'>
            <Grid size={20} />
          </Link>
          <div className='flex space-x-2 items-center'>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            <Clock size={20} />
            <Bell size={20} />
          </div>
        </motion.div>

        <h1 className='text-xl font-bold mb-3'>History</h1>

        <div className='flex space-x-2 mb-4'>
          {['Asset', 'Type', 'Period'].map((filter) => (
            <DropdownMenu key={filter}>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='text-xs py-1 px-2'>
                  {filter} <ChevronDown className='ml-1 h-3 w-3' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        <ScrollArea className='flex-grow'>
          {['June', 'May 2024'].map((month) => {
            const monthTransactions = transactions.filter((t) => {
              // Convert date string to Date object
              const transactionDate = new Date(
                t.date.split(' ')[0].split('.').reverse().join('-')
              );
              // Get month name in English
              const transactionMonth = transactionDate.toLocaleString('en-US', {
                month: 'long',
              });
              // Check if the transaction month matches the current month we're filtering for
              return transactionMonth.includes(month.split(' ')[0]);
            });
            return (
              <React.Fragment key={month}>
                <h2 className='text-sm font-semibold mb-2'>{month}</h2>
                {monthTransactions.map((transaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className='mb-2'>
                      <CardContent className='flex justify-between items-center p-3'>
                        <div className='flex items-center'>
                          <div
                            className={`w-8 h-8 rounded-full ${
                              assetColors[transaction.asset]
                            } flex items-center justify-center mr-2`}
                          >
                            {
                              assetIcons[
                                transaction.asset as keyof typeof assetIcons
                              ]
                            }
                          </div>
                          <div>
                            <p className='font-semibold text-sm'>
                              {transaction.type} {transaction.asset}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold text-sm'>
                            {transaction.amount}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            Rate: {transaction.rate}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </React.Fragment>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
};
