import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { TonClient, WalletContractV4, internal, toNano } from '@ton/ton';
import { mnemonicToWalletKey } from '@ton/crypto';

interface WalletData {
  publicKey: string;
  secretKey: string;
  address: string;
  type: 'created' | 'imported';
  chain: 'mainnet' | 'testnet';
  mnemonic: string[];
}

export const Send: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState<string>('TON');
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('...');
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('Average');
  const [status, setStatus] = useState<string>('');
  const [walletData, setWalletData] = useState<WalletData | null>(null);

  useEffect(() => {
    const storedWalletData = localStorage.getItem('activeWallet');
    if (storedWalletData) {
      setWalletData(JSON.parse(storedWalletData) as WalletData);
    }

    const transferData = localStorage.getItem('transferData');
    if (transferData) {
      const { addressTo, amount } = JSON.parse(transferData);
      setAddress(addressTo);
      setAmount(amount);
    }
    localStorage.removeItem('transferData');

    // Define the fetchBalance function
    const fetchBalance = async () => {
      if (walletData) {
        try {
          const { contract } = await setupWallet();
          const balance = await contract.getBalance();
          console.log('balance', balance);
          setBalance(balance.toString());
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    // Fetch balance immediately
    fetchBalance();

    // Set up an interval to fetch the balance every 20 seconds
    const balanceInterval = setInterval(fetchBalance, 20000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(balanceInterval);
  }, []);

  const quickSendOptions = [
    { name: 'Emma Lily', image: '/path/to/emma.jpg' },
    { name: 'Junior Antony', image: '/path/to/junior.jpg' },
    { name: 'Elizabeth Sofia', image: '/path/to/elizabeth.jpg' },
  ];

  const feeOptions = ['Low', 'Average', 'High'];

  const setupWallet = async () => {
    if (!walletData) {
      throw new Error('No active wallet found');
    }

    const client = new TonClient({
      endpoint:
        walletData.chain === 'testnet'
          ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
          : 'https://toncenter.com/api/v2/jsonRPC',
    });

    const keyPair = await mnemonicToWalletKey(walletData.mnemonic);
    const wallet = WalletContractV4.create({
      workchain: 0,
      publicKey: keyPair.publicKey,
    });
    const contract = client.open(wallet);

    return { contract, keyPair };
  };

  const sendTransfer = async () => {
    if (!walletData) {
      setStatus('Error: No active wallet found');
      return;
    }
    if (!address) {
      setStatus('Error: No recipient address');
      return;
    }
    if (!amount) {
      setStatus('Error: No amount');
      return;
    }

    try {
      setStatus('Setting up wallet...');
      const { contract, keyPair } = await setupWallet();

      setStatus('Checking balance...');
      const balance = await contract.getBalance();
      console.log('balance', balance);
      setBalance(balance.toString());

      setStatus(`Current balance: ${balance}`);
      console.log('balance', BigInt(balance));
      console.log('amount', toNano(0.01));
      if (BigInt(balance) < toNano(0.01)) {
        setStatus('Error: Insufficient balance');
        return;
      }

      setStatus('Creating transfer...');
      const seqno = await contract.getSeqno();
      const transfer = contract.createTransfer({
        seqno,
        secretKey: keyPair.secretKey,
        messages: [
          internal({
            value: amount,
            to: address,
            body: message,
          }),
        ],
      });

      setStatus('Sending transfer...');
      await contract.send(transfer);
      setStatus('Transfer sent successfully');

      // Navigate to success page
      navigate('/tontastic-wallet/transfer-success');
    } catch (error) {
      console.error('Transfer failed:', error);
      setStatus(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      } p-4 flex flex-col`}
      style={{ maxWidth: '100%', margin: '0 auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-between items-center'
      >
        <Link to='/tontastic-wallet/dashboard' className='flex items-center'>
          <ArrowLeft
            className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            } mr-2`}
          />
          <span>Back</span>
        </Link>
        <h1 className='text-xl font-bold'>Send</h1>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='mt-4'
      >
        <Select defaultValue={selectedCrypto} onValueChange={setSelectedCrypto}>
          <SelectTrigger
            className={`w-full ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <SelectValue placeholder='Select cryptocurrency' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='TON'>TON</SelectItem>
            <SelectItem value='BTC'>BTC</SelectItem>
            <SelectItem value='ETH'>ETH</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mt-4 relative'
      >
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Recipient's address"
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='mt-4 relative'
      >
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Amount'
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        />
        <p
          className={`text-sm mt-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          My balance: {balance} TON
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-4 relative'
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Message (optional)'
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='mt-4'
      >
        <p
          className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Network: {walletData?.chain || 'Unknown'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='mt-6'
      >
        <h2 className='text-lg font-semibold mb-2'>Quick Send</h2>
        <div className='flex space-x-4 overflow-x-auto pb-2'>
          <Button
            variant='outline'
            size='icon'
            className={`rounded-full flex-shrink-0 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}
          >
            <Plus className='h-6 w-6' />
          </Button>
          {quickSendOptions.map((option, index) => (
            <div key={index} className='text-center flex-shrink-0'>
              <div
                className={`w-12 h-12 rounded-full overflow-hidden mx-auto mb-1 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                }`}
              >
                <img
                  src={option.image}
                  alt={option.name}
                  className='w-full h-full object-cover'
                />
              </div>
              <p className='text-xs'>{option.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className='mt-6'
      >
        <h2 className='text-lg font-semibold mb-2'>Select Option</h2>
        <div className='flex justify-between'>
          {feeOptions.map((option) => (
            <Button
              key={option}
              variant={selectedOption === option ? 'default' : 'outline'}
              onClick={() => setSelectedOption(option)}
              className={`flex-1 mx-1 text-xs ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : ''
              }`}
            >
              {option}
              <br />
              <span className='text-xs'>32 usd</span>
            </Button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className='mt-6'
      >
        <p
          className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <strong>Status:</strong> {status}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className='mt-auto pt-4'
      >
        <Button
          onClick={sendTransfer}
          className={`w-full top-0 ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-4 rounded-full mb-[10rem]`}
        >
          Confirm
        </Button>
      </motion.div>
    </div>
  );
};

export default Send;
