import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Note: This is a subset of BIP-39 words for demonstration. In a real app, you'd use the full list.
const BIP39_WORDS = [
  'abandon',
  'ability',
  'able',
  'about',
  'above',
  'absent',
  'absorb',
  'abstract',
  'absurd',
  'abuse',
  'access',
  'accident',
  'account',
  'accuse',
  'achieve',
  'acid',
  'acoustic',
  'acquire',
  'across',
  'act',
  'action',
  'actor',
  'actress',
  'actual',
  'adapt',
  'add',
  'addict',
  'address',
  'adjust',
  'admit',
  'adult',
  'advance',
  'advice',
  'aerobic',
  'affair',
  'afford',
  'afraid',
  'again',
  'age',
  'agent',
  'agree',
  'ahead',
  'aim',
  'air',
  'airport',
  'aisle',
  'alarm',
  'album',
  'alcohol',
  'alert',
  'alien',
  'all',
  'alley',
  'allow',
  'almost',
  'alone',
  'alpha',
  'already',
  'also',
  'alter',
  'always',
  'amateur',
  'amazing',
  'among',
  'amount',
  'amused',
  'analyst',
  'anchor',
  'ancient',
  'anger',
  'angle',
  'angry',
  'animal',
  'ankle',
  'announce',
  'annual',
  'another',
  'answer',
  'antenna',
  'antique',
  'anxiety',
  'any',
  'apart',
  'apology',
  'appear',
  'apple',
  'approve',
  'april',
  'arch',
  'arctic',
  'area',
  'arena',
  'argue',
  'arm',
  'armed',
  'armor',
  'army',
  'around',
  'arrange',
  'arrest',
  'arrive',
  'arrow',
  'art',
  'artefact',
  'artist',
  'artwork',
  'ask',
  'aspect',
  'assault',
  'asset',
  'assist',
  'assume',
  'asthma',
  'athlete',
  'atom',
  'attack',
  'attend',
  'attitude',
  'attract',
  'auction',
  'audit',
  'august',
  'aunt',
  'author',
  'auto',
  'autumn',
  'average',
  'avocado',
  'avoid',
  'awake',
  'aware',
  'away',
  'awesome',
  'awful',
  'awkward',
  'axis',
];

export const ImportWallet: React.FC = () => {
  const [seedWords, setSeedWords] = useState<string[]>(Array(24).fill(''));
  const [suggestions, setSuggestions] = useState<string[][]>(
    Array(24).fill([])
  );
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const handleInputChange = (index: number, value: string) => {
    const newSeedWords = [...seedWords];
    newSeedWords[index] = value;
    setSeedWords(newSeedWords);

    const newSuggestions = [...suggestions];
    newSuggestions[index] = BIP39_WORDS.filter((word) =>
      word.startsWith(value.toLowerCase())
    );
    setSuggestions(newSuggestions);
  };

  const handleSuggestionClick = (index: number, word: string) => {
    const newSeedWords = [...seedWords];
    newSeedWords[index] = word;
    setSeedWords(newSeedWords);

    const newSuggestions = [...suggestions];
    newSuggestions[index] = [];
    setSuggestions(newSuggestions);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      } p-6 flex flex-col relative`}
    >
      <div style={{ maxWidth: '390px', margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex justify-between items-center mt-2'
        >
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className='h-[1.2rem] w-[1.2rem]' />
            ) : (
              <Moon className='h-[1.2rem] w-[1.2rem]' />
            )}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mt-6'
        >
          <Link to='/previous-page'>
            <ArrowLeft
              className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-2xl font-bold mt-6 mb-2'
        >
          Введите секретный ключ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`text-sm mb-6 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Чтобы восстановить доступ, введите 24 секретных слова, которые вы
          получили при создании кошелька.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='space-y-2 mb-6'
        >
          {seedWords.map((word, index) => (
            <div key={index} className='relative'>
              <Input
                type='text'
                placeholder={`${index + 1}`}
                value={word}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={`w-full ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
                }`}
              />
              <AnimatePresence>
                {suggestions[index].length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute z-10 w-full mt-1 max-h-32 overflow-auto ${
                      darkMode
                        ? 'bg-gray-800 text-white'
                        : 'bg-white text-black'
                    } border border-gray-300 rounded-md shadow-lg`}
                  >
                    {suggestions[index].map((suggestion, i) => (
                      <li
                        key={i}
                        className={`px-4 py-2 cursor-pointer ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mt-auto'
        >
          <Link to='/tontastic-wallet/dashboard' className='block'>
            <Button
              className={`w-full ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white py-6`}
            >
              Продолжить
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='fixed bottom-0 left-0 right-0 p-4'
        style={{ maxWidth: '390px', margin: '0 auto', width: '100%' }}
      >
        <Button variant='ghost' className='w-full py-4'>
          Вставить
        </Button>
      </motion.div>
    </div>
  );
};
