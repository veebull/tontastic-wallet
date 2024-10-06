import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { mnemonicWordList } from '@ton/crypto';

interface Wallet {
  address: string;
  name: string;
  emoji: string;
  mnemonic: string[];
  // Add other wallet properties as needed
}

export const CheckNewWallet: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [wordIndices, setWordIndices] = useState<number[]>([]);
  const [inputWords, setInputWords] = useState<{ [key: number]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<{ [key: number]: string }>({});
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    const activeWallet = JSON.parse(
      localStorage.getItem('activeWallet') || 'null'
    );

    if (activeWallet) {
      setCurrentWallet(activeWallet);
      const storedIndices = localStorage.getItem('checkWalletIndices');
      if (storedIndices) {
        setWordIndices(JSON.parse(storedIndices));
      } else {
        const indices = [];
        while (indices.length < 3) {
          const randomIndex = Math.floor(Math.random() * 24) + 1;
          if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
          }
        }
        indices.sort((a, b) => a - b);
        setWordIndices(indices);
        localStorage.setItem('checkWalletIndices', JSON.stringify(indices));
      }
    } else {
      // Handle the case where there's no active wallet
      navigate('/tontastic-wallet/wallet-options');
    }
  }, [navigate]);

  const handleInputChange = (index: number, value: string) => {
    setInputWords({ ...inputWords, [index]: value });
    setError(null);

    if (value.length > 0) {
      const matchingWord = mnemonicWordList.find((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions({ ...suggestions, [index]: matchingWord || '' });
    } else {
      setSuggestions({ ...suggestions, [index]: '' });
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Tab' && suggestions[index]) {
      event.preventDefault();
      setInputWords({ ...inputWords, [index]: suggestions[index] });
      setSuggestions({ ...suggestions, [index]: '' });
    }
  };

  const handleSubmit = () => {
    if (!currentWallet) return;

    const isCorrect = wordIndices.every(
      (index) =>
        inputWords[index]?.toLowerCase() ===
        currentWallet.mnemonic[index - 1]?.toLowerCase()
    );

    if (isCorrect) {
      localStorage.removeItem('checkWalletIndices');
      // Update the wallet status if needed
      const wallets = JSON.parse(localStorage.getItem('wallets') || '[]');
      const updatedWallets = wallets.map((wallet: Wallet) =>
        wallet.address === currentWallet.address
          ? { ...wallet, verified: true }
          : wallet
      );
      localStorage.setItem('wallets', JSON.stringify(updatedWallets));
      localStorage.setItem(
        'activeWallet',
        JSON.stringify({ ...currentWallet, verified: true })
      );
      navigate('/tontastic-wallet/wallet-name');
    } else {
      const incorrectIndex = wordIndices.find(
        (index) =>
          inputWords[index]?.toLowerCase() !==
          currentWallet.mnemonic[index - 1]?.toLowerCase()
      );
      setError(
        `Seed phrase at position ${incorrectIndex} is not correct. Please recheck and enter the right word.`
      );
    }
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } p-6 flex flex-col`}
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <div className='mt-6 flex justify-between items-center'>
        <Link
          to='/tontastic-wallet/create-wallet'
          className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
        >
          <ArrowLeft size={24} />
        </Link>
        <div className='flex items-center relative'>
          {theme === 'dark' ? (
            <Moon className='h-4 w-4 ml-2 absolute' />
          ) : (
            <Sun className='h-4 w-4 ml-2 absolute' />
          )}
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }
          />
        </div>
      </div>

      <div className='flex-grow flex flex-col mt-8 space-y-6'>
        <h1 className='text-2xl font-bold text-center'>Backup Verification</h1>

        <p
          className={`text-center ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Let's verify that you've written everything down correctly. Enter
          words {wordIndices.join(', ')}.
        </p>

        {error && <p className='text-red-500 text-center'>{error}</p>}

        <div className='space-y-4'>
          {wordIndices.map((index) => (
            <div
              key={index}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-300'
                  : 'bg-gray-200 border-gray-700'
              } rounded-lg p-4 relative`}
            >
              <div className='flex items-center'>
                <label
                  className={`${
                    theme === 'dark' ? 'text-gray-300 ' : 'text-gray-700 '
                  } mr-2 font-medium`}
                >
                  {index}:
                </label>
                <div className='relative flex-grow'>
                  <div className='relative'>
                    <Input
                      type='text'
                      value={inputWords[index] || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className={`bg-transparent w-full mt-1 text-md focus:outline-none border-2 ${
                        theme === 'dark'
                          ? 'text-white focus:border-blue-500'
                          : 'text-gray-900 focus:border-blue-600'
                      } ${error && !inputWords[index] ? 'border-red-500' : ''}`}
                    />
                    {suggestions[index] && (
                      <div
                        className='absolute inset-y-0 left-[0.7rem] text-md flex items-center pointer-events-none'
                        // style={{ left: `${inputWords[index]?.length * 0.9}em` }}
                      >
                        {suggestions[index].split('').map((char, i) => {
                          const inputLength = inputWords[index]?.length || 0;
                          return (
                            <span
                              key={i}
                              className={`${
                                theme === 'dark'
                                  ? 'text-gray-400'
                                  : 'text-gray-500'
                              }`}
                              style={{
                                opacity: i < inputLength ? 0 : 1,
                                paddingLeft: i === inputLength ? '0.2em' : '0',
                              }}
                            >
                              {char}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        disabled={!wordIndices.every((index) => inputWords[index])}
        variant='outline'
        onClick={handleSubmit}
        className={`w-full mt-6 font-bold p-6 ${
          theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        Done
      </Button>
    </div>
  );
};
