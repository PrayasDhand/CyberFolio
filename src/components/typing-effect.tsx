'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypingEffect({ text, className, speed = 50 }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && text) {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      setDisplayedText(''); 
      let i = 0;
      typingIntervalRef.current = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
        }
      }, speed);
    }
  }, [text, speed, isIntersecting]);

  return (
    <span ref={ref} className={cn('min-h-[1em] inline-block', className)}>
      {displayedText}
      <span className="animate-pulse">_</span>
    </span>
  );
}
