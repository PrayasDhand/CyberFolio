'use client';

import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import { MotionDiv } from '../motion-div';
import { TypingEffect } from '../typing-effect';
import { usePortfolio } from '@/hooks/use-portfolio';

export function ResumeSection({ id }: { id: string }) {
  const { setMode } = usePortfolio();
  
  return (
    <section id={id}>
      <div className="container mx-auto text-center">
        <MotionDiv className="mb-8" viewport={{ once: false }}>
          <h2 className="text-3xl md:text-4xl font-bold text-glow-accent inline-block">
            <TypingEffect text="Resume" />
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mt-4">
            Interested in my profile? View my full resume for a more detailed look at my skills and experience, or download it directly.
          </p>
        </MotionDiv>
        <MotionDiv delay={200} viewport={{ once: false }}>
          <Button
            size="lg"
            className="group"
            onClick={() => setMode('resume')}
          >
            <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
            View Resume
          </Button>
        </MotionDiv>
        <div className="absolute left-0 right-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent -z-10" />
      </div>
    </section>
  );
}
