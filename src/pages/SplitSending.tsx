import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Recipient {
  name: string;
  image: string;
  eth: number;
}

export const SplitSending: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [totalValue, setTotalValue] = useState<number>(1225.85);
  const [recipients, setRecipients] = useState<Recipient[]>([
    { name: 'Liam', image: '/path/to/liam.jpg', eth: 1 },
    { name: 'Josh', image: '/path/to/josh.jpg', eth: 0.04 },
    { name: 'Jane', image: '/path/to/jane.jpg', eth: 0.6 },
    { name: 'Eva', image: '/path/to/eva.jpg', eth: 0.32 },
  ]);

  const handleSliderChange = (index: number, newValue: number) => {
    const newRecipients = [...recipients];
    newRecipients[index].eth = newValue;
    setRecipients(newRecipients);
  };

  const Slider: React.FC<{
    index: number;
    value: number;
    onChange: (value: number) => void;
  }> = ({ index, value, onChange }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (clientY: number) => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const sliderHeight = rect.height;
        const offsetY = rect.bottom - clientY;
        const newValue = Math.max(0, Math.min(1, offsetY / sliderHeight));
        onChange(parseFloat(newValue.toFixed(2)));
      }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      handleMove(e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    useEffect(() => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging]);

    return (
      <div
        ref={sliderRef}
        className='h-64 w-16 relative bg-gray-700 rounded-full'
      >
        <div
          className='absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full'
          style={{ height: `${value * 100}%` }}
        />
        <div
          className='absolute bottom-0 left-0 right-0 w-16 h-16 bg-white rounded-full cursor-grab'
          style={{ bottom: `calc(${value * 100}% - 32px)` }}
          onMouseDown={handleMouseDown}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (isDragging) {
              handleMove(e.touches[0].clientY);
            }
          }}
          onTouchEnd={() => setIsDragging(false)}
        />
        <div className='absolute top-0 left-0 right-0 text-center text-sm'>
          {value.toFixed(2)} ETH
        </div>
        <div className='absolute bottom-0 left-0 right-0 text-center'>
          <Button
            variant='ghost'
            size='sm'
            className='rounded-full'
            onClick={() => onChange(1)}
          >
            Max
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      } p-6 flex flex-col`}
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-between items-center'
      >
        <Link to='/previous-page'>
          <ArrowLeft
            className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          />
        </Link>
        <h1 className='text-xl font-bold'>SPLIT SENDING</h1>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='mt-6'
      >
        <p className='text-sm text-gray-500'>Current value</p>
        <p className='text-3xl font-bold'>${totalValue.toFixed(2)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mt-6'
      >
        <p className='text-sm text-gray-500 mb-2'>Recipient address</p>
        <div className='flex space-x-2'>
          {recipients.map((recipient, index) => (
            <div key={index} className='w-10 h-10 rounded-full overflow-hidden'>
              <img
                src={recipient.image}
                alt={recipient.name}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
          <Button variant='outline' size='icon' className='rounded-full'>
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='mt-6 flex justify-between'
      >
        {recipients.map((recipient, index) => (
          <div key={index} className='text-center'>
            <div className='w-16 h-16 rounded-full overflow-hidden mx-auto mb-2'>
              <img
                src={recipient.image}
                alt={recipient.name}
                className='w-full h-full object-cover'
              />
            </div>
            <p className='text-sm'>{recipient.name}</p>
            <Slider
              index={index}
              value={recipient.eth}
              onChange={(newValue) => handleSliderChange(index, newValue)}
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-auto'
      >
        <Link to='/confirm-split' className='block'>
          <Button
            className={`w-full ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white py-6 rounded-full`}
          >
            Split Now
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
