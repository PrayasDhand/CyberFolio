'use client';

import { usePortfolio } from '@/hooks/use-portfolio';
import { MotionDiv } from '../motion-div';
import { TypingEffect } from '../typing-effect';

interface AboutSectionProps {
  id: string;
}

export function AboutSection({ id }: AboutSectionProps) {
  const { portfolioData } = usePortfolio();

  if (!portfolioData) return null;

  return (
    <section id={id}>
      <MotionDiv className="container mx-auto">
        <div className="relative glass-effect p-8 md:p-12 rounded-lg">
            <div className="absolute hidden md:block top-0 -left-16 bottom-0 w-16 glass-effect"
                 style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
            <div className="absolute hidden md:block top-0 -left-16 bottom-0 w-16 glass-effect"
                 style={{ clipPath: 'polygon(100% 100%, 0 0, 0 100%)' }}></div>

          <h2 className="text-3xl md:text-4xl font-bold text-glow-accent mb-6">
            <TypingEffect text="About Me" />
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {portfolioData.about}
          </p>
        </div>
      </MotionDiv>
    </section>
  );
}
