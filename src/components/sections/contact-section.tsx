'use client';
import { usePortfolio } from '@/hooks/use-portfolio';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { TypingEffect } from '../typing-effect';
import { MotionDiv } from '../motion-div';

interface ContactSectionProps {
  id: string;
}

export function ContactSection({ id }: ContactSectionProps) {
  const { portfolioData } = usePortfolio();

  if (!portfolioData) return null;

  return (
    <footer id={id} className="w-full bg-background/50 border-t border-primary/10 py-16">
      <div className="container mx-auto text-center">
        <MotionDiv className="mb-8" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-glow-accent inline-block">
                <TypingEffect text="Contact Me" />
            </h2>
             <p className="text-lg text-foreground/80 max-w-2xl mx-auto mt-4">
                Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
            </p>
        </MotionDiv>
        <MotionDiv delay={200} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
            <div className="flex justify-center flex-wrap gap-8 mb-8 text-lg">
                 <a href={`mailto:${portfolioData.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail /> {portfolioData.email}
                </a>
            </div>
            <div className="flex justify-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github />
                    </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin />
                    </a>
                </Button>
            </div>
        </MotionDiv>
        <div className="mt-12 text-foreground/60">
             <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
             <p className="text-xs mt-2">Built with Next.js and a touch of cyberpunk.</p>
        </div>
      </div>
    </footer>
  );
}
