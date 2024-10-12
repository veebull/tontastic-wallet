import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';
import {
  mnemonicToWalletKey,
  mnemonicValidate,
  mnemonicWordList,
} from '@ton/crypto';
import { WalletContractV4 } from '@ton/ton';

export const ImportWallet: React.FC = () => {
  const [seedWords, setSeedWords] = useState<string[]>(Array(24).fill(''));
  const [suggestions, setSuggestions] = useState<string[][]>(
    Array(24).fill([])
  );
  const [invalidWords, setInvalidWords] = useState<boolean[]>(
    Array(24).fill(false)
  );
  const [chain, setChain] = useState<'mainnet' | 'testnet'>('mainnet');
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleInputChange = (index: number, value: string) => {
    const newSeedWords = [...seedWords];
    newSeedWords[index] = value;
    setSeedWords(newSeedWords);

    const newSuggestions = [...suggestions];
    newSuggestions[index] = mnemonicWordList.filter((word) =>
      word.startsWith(value.toLowerCase())
    );
    setSuggestions(newSuggestions);

    validateWord(index, value);
  };

  const handleSuggestionClick = (index: number, word: string) => {
    const newSeedWords = [...seedWords];
    newSeedWords[index] = word;
    setSeedWords(newSeedWords);

    const newSuggestions = [...suggestions];
    newSuggestions[index] = [];
    setSuggestions(newSuggestions);

    validateWord(index, word);
  };

  const validateWord = (index: number, word: string) => {
    const newInvalidWords = [...invalidWords];
    newInvalidWords[index] = !mnemonicWordList.includes(word.toLowerCase());
    setInvalidWords(newInvalidWords);
  };
  useEffect(() => {
    const isTestnetMode = localStorage.getItem('isTestnetMode') === 'true';
    setChain(isTestnetMode ? 'testnet' : 'mainnet');

    const handlePasteEvent = (event: ClipboardEvent) => {
      event.preventDefault();
      const pastedText = event.clipboardData?.getData('text') || '';
      processPastedText(pastedText);
    };

    document.addEventListener('paste', handlePasteEvent);
    return () => document.removeEventListener('paste', handlePasteEvent);
  }, []);

  const processPastedText = (text: string) => {
    const words = text.trim().split(/\s+/).slice(0, 24);
    const newSeedWords = [...seedWords];
    const newInvalidWords = Array(24).fill(false);

    words.forEach((word, index) => {
      newSeedWords[index] = word;
      newInvalidWords[index] = !mnemonicWordList.includes(word.toLowerCase());
    });

    setSeedWords(newSeedWords);
    setInvalidWords(newInvalidWords);
    setSuggestions(Array(24).fill([]));
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      processPastedText(clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard contents:', err);
    }
  };

  const isValidMnemonic = () => {
    return (
      seedWords.every((word) =>
        mnemonicWordList.includes(word.toLowerCase())
      ) && mnemonicValidate(seedWords)
    );
  };

  const handleContinue = async () => {
    if (isValidMnemonic()) {
      try {
        const keyPair = await mnemonicToWalletKey(seedWords);
        const wallet = WalletContractV4.create({
          workchain: 0,
          publicKey: keyPair.publicKey,
        });
        const address = wallet.address.toString();

        const walletData = {
          mnemonic: seedWords,
          publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
          secretKey: Buffer.from(keyPair.secretKey).toString('hex'),
          address,
          chain: chain,
          type: 'imported',
        };

        // Get existing wallets
        const existingWallets = JSON.parse(
          localStorage.getItem('wallets') || '[]'
        );

        // Check if wallet with the same address and chain already exists
        const walletExists = existingWallets.some(
          (w: { address: string; chain: string }) =>
            w.address === address && w.chain === chain
        );

        if (!walletExists) {
          // Add new wallet to the existing list
          const updatedWallets = [...existingWallets, walletData];

          // Save updated wallets list
          localStorage.setItem('wallets', JSON.stringify(updatedWallets));

          // Set the new wallet as active wallet
          localStorage.setItem('activeWallet', JSON.stringify(walletData));

          // Navigate to wallet name page
          navigate('/tontastic-wallet/wallet-name', {
            state: { newWallet: true },
          });
        } else {
          console.log('Wallet with this address and chain already exists');
          // Here you might want to show a message to the user
          // Set the new wallet as active wallet
          localStorage.setItem('activeWallet', JSON.stringify(walletData));

          // Navigate to wallet name page
          navigate('/tontastic-wallet/wallet-name', {
            state: { newWallet: true },
          });
          // For example:
          // setErrorMessage('A wallet with this address already exists on this chain.');
        }
      } catch (error) {
        console.error('Error creating wallet:', error);
        // Here you might want to show an error message to the user
        // For example:
        // setErrorMessage('An error occurred while creating the wallet. Please try again.');
      }
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      } p-6 flex flex-col relative`}
    >
      <div style={{ maxWidth: '390px', margin: '0 auto', width: '100%' }}>
        <div className='flex justify-between items-center mt-2'>
          {/* <Link to='/previous-page'>
            <ArrowLeft
              className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            />
          </Link> */}
          <div className='flex items-center'>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
            />
            {theme === 'dark' ? (
              <Moon className='h-4 w-4 ml-2' />
            ) : (
              <Sun className='h-4 w-4 ml-2' />
            )}
          </div>
        </div>

        <h1 className='text-2xl font-bold mt-6 mb-2'>Введите секретный ключ</h1>
        <p
          className={`text-sm mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Чтобы восстановить доступ, введите 24 секретных слова, которые вы
          получили при создании кошелька.
        </p>

        <div className='space-y-2 mb-6'>
          {seedWords.map((word, index) => (
            <div key={index} className='relative'>
              <Input
                type='text'
                placeholder={`${index + 1}`}
                value={word}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={`w-full ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-black'
                } 
                  ${invalidWords[index] ? 'border-red-500 text-red-500' : ''}`}
              />
              <AnimatePresence>
                {suggestions[index].length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute z-10 w-full mt-1 max-h-32 overflow-auto 
                      ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-black'
                      } 
                      border border-gray-300 rounded-md shadow-lg`}
                  >
                    {suggestions[index].map((suggestion, i) => (
                      <li
                        key={i}
                        className={`px-4 py-2 cursor-pointer 
                          ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-100'
                          }`}
                        onClick={() => handleSuggestionClick(index, suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!isValidMnemonic()}
          className={`w-full ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } 
            text-white py-6 ${
              !isValidMnemonic() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          Continue
        </Button>
      </div>

      <div
        className='fixed bottom-0 left-0 right-0 p-4'
        style={{ maxWidth: '390px', margin: '0 auto', width: '100%' }}
      >
        <Button variant='ghost' className='w-full py-4' onClick={handlePaste}>
          <Clipboard className='mr-2 h-4 w-4' /> Paste
        </Button>
      </div>
    </div>
  );
};
