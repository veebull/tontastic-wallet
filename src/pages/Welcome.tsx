import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import { Wallet, Shield, Zap } from 'lucide-react';

const slides = [
  {
    title: 'TON Wallet',
    subtitle: 'Your gateway to the decentralized world of TON blockchain.',
    icon: Wallet,
  },
  {
    title: 'Fully Decentralized',
    subtitle:
      'Experience true financial freedom with our decentralized wallet.',
    icon: Shield,
  },
  {
    title: 'Lightning Fast',
    subtitle: 'Enjoy swift transactions and seamless interactions on TON.',
    icon: Zap,
  },
];

const iconVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      bounce: 0.5,
    },
  },
};

const orbitVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

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
            return 100;
          }
        }
        return prev + 2;
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
    if (
      e.target instanceof HTMLElement &&
      (e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button'))
    ) {
      return;
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
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } flex flex-col`}
      onTouchStart={handleTouchStart}
      onMouseDown={handleTouchStart}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        } z-10`}
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      <div className='flex w-full p-2 gap-1'>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1 ${
              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
            } flex-grow rounded-full overflow-hidden`}
          >
            <motion.div
              className={`h-full ${
                theme === 'dark' ? 'bg-white' : 'bg-gray-900'
              }`}
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
          <motion.div
            className='relative w-48 h-48 mb-8'
            initial='hidden'
            animate='visible'
            variants={iconVariants}
          >
            {React.createElement(slides[currentSlide].icon, {
              size: 96,
              className: `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`,
            })}
            <motion.div
              className='absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-opacity-30'
              variants={orbitVariants}
              animate='animate'
            />
            <motion.div
              className='absolute top-0 left-0 w-full h-full border-4 border-green-500 rounded-full border-opacity-30'
              variants={orbitVariants}
              animate='animate'
              style={{ animationDelay: '-3s' }}
            />
            <motion.div
              className='absolute top-0 left-0 w-full h-full border-4 border-red-500 rounded-full border-opacity-30'
              variants={orbitVariants}
              animate='animate'
              style={{ animationDelay: '-6s' }}
            />
          </motion.div>
          <h1 className='text-3xl font-bold mb-2 mt-8'>
            {slides[currentSlide].title}
          </h1>
          <p
            className={`text-lg mb-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {slides[currentSlide].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {isLastSlide && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className='p-8'
        >
          <Link
            to='/tontastic-wallet/wallet-options'
            className={`block w-full ${
              theme === 'dark'
                ? 'bg-white text-indigo-600'
                : 'bg-indigo-600 text-white'
            } font-bold py-4 px-6 rounded-full text-center z-10`}
          >
            Get Started with TON
          </Link>
        </motion.div>
      )}
    </div>
  );
};
