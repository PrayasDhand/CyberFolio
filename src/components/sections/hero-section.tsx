
'use client';

import Image from 'next/image';
import { usePortfolio } from '@/hooks/use-portfolio';
import { Button } from '../ui/button';
import { ArrowDown, UserCircle2 } from 'lucide-react';
import { MotionDiv } from '../motion-div';
import { TypingEffect } from '../typing-effect';

interface HeroSectionProps {
  id: string;
}

export function HeroSection({ id }: HeroSectionProps) {
  const { portfolioData } = usePortfolio();

  if (!portfolioData) return null;
  
  return (
    <section id={id} className="text-center">
      <div className="container mx-auto flex flex-col items-center gap-8">
        <MotionDiv>
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-primary/50 flex items-center justify-center overflow-hidden shadow-lg animate-pulse-glow bg-background">
              {portfolioData.profileImageUrl ? (
                <Image
                  src={portfolioData.profileImageUrl}
                  alt={portfolioData.name}
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                />
              ) : (
                <UserCircle2 className="w-full h-full text-primary/70" />
              )}
            </div>
        </MotionDiv>
        <MotionDiv delay={100} className="flex flex-col gap-2 items-center">
            <TypingEffect text={portfolioData.name} className="text-4xl md:text-6xl font-bold tracking-tighter text-glow-primary" />
            <TypingEffect text={portfolioData.title} className="text-xl md:text-2xl text-foreground/80 font-light" speed={30} />
        </MotionDiv>
        <MotionDiv delay={200}>
            <p className="max-w-3xl mx-auto text-base md:text-lg text-foreground/70">
                {portfolioData.summary}
            </p>
        </MotionDiv>
        <MotionDiv delay={300}>
          <Button asChild variant="outline" size="lg" className="mt-4">
            <a href="#about">
              Discover More <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
}
