import { useEffect, useState } from 'react';

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

export const useCapacityStatus = (current: number, capacity: number) => {
  const percentage = (current / capacity) * 100;
  const status = percentage < 50 ? 'low' : percentage < 75 ? 'moderate' : percentage < 90 ? 'high' : 'full';
  const color = {
    low: 'bg-green-500',
    moderate: 'bg-yellow-500',
    high: 'bg-orange-500',
    full: 'bg-red-500',
  }[status];

  return { percentage, status, color };
};
