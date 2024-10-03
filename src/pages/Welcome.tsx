import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';

const slides = [
  {
    title: 'Syfter',
    subtitle: 'Revolutionizing your investment and trading experience.',
    image: '/syfter-coin.svg', // Replace with actual path
  },
  {
    title: 'Crypto and Stocks',
    subtitle:
      'Get access to the analytics on the tickers around the globe in one place.',
    image: '/crypto-stocks.svg', // Replace with actual path
  },
  {
    title: 'Simple and Easy',
    subtitle:
      'Explore new horizons through pre-set filters and update your watchlist with a single swipe.',
    image: '/simple-easy.svg', // Replace with actual path
  },
];

export const Welcome: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const { theme, setTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLastSlide = currentSlide === slides.length - 1;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0);
  };

  const startTimer = () => {
    resetTimer();
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (!isLastSlide) {
            nextSlide();
            return 0;
          } else {
            clearInterval(timerRef.current!);
            return 100; // Keep at 100% for the last slide
          }
        }
        return prev + 2; // Increase by 2% every 100ms to complete in 5 seconds
      });
    }, 100);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      resetTimer();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      resetTimer();
    }
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    // Check if the click event occurred on a link or button
    if (
      e.target instanceof HTMLElement &&
      (e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button'))
    ) {
      return; // Do nothing if clicked on a link or button
    }
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const halfWidth = window.innerWidth / 2;

    if (clientX < halfWidth) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    startTimer();
    return () => resetTimer();
  }, [currentSlide]);

  return (
    <div
      className='min-h-screen bg-gray-900 text-white flex flex-col'
      onTouchStart={handleTouchStart}
      onMouseDown={handleTouchStart}
    >
      <button
        onClick={toggleTheme}
        className='absolute top-4 right-4 text-white z-10'
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      <div className='flex w-full p-2 gap-1'>
        {slides.map((_, index) => (
          <div
            key={index}
            className='h-1 bg-gray-600 flex-grow rounded-full overflow-hidden'
          >
            <motion.div
              className='h-full bg-white'
              initial={{ width: 0 }}
              animate={{
                width:
                  index < currentSlide
                    ? '100%'
                    : index === currentSlide
                    ? `${progress}%`
                    : '0%',
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className='flex-grow flex flex-col items-center justify-center p-8 text-center'
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className='w-64 h-64 mb-8'
          />
          <h1 className='text-3xl font-bold mb-2'>
            {slides[currentSlide].title}
          </h1>
          <p className='text-lg mb-8 text-gray-400'>
            {slides[currentSlide].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {isLastSlide && (
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className='p-8'
        >
          <Link
            to='/tontastic-wallet/wallet-options'
            className='block w-full bg-white text-indigo-600 font-bold py-4 px-6 rounded-full text-center z-10'
          >
            Start Now
          </Link>
        </motion.div>
      )}
    </div>
  );
};
