
'use client';

import { usePortfolio } from '@/hooks/use-portfolio';
import { Briefcase } from 'lucide-react';
import { MotionDiv } from '../motion-div';
import { TypingEffect } from '../typing-effect';

interface ExperienceSectionProps {
  id: string;
}

export function ExperienceSection({ id }: ExperienceSectionProps) {
  const { portfolioData } = usePortfolio();

  if (!portfolioData || !portfolioData.experience.length) return null;

  return (
    <section id={id}>
      <div className="container mx-auto">
         <div className="relative glass-effect p-8 md:p-12 rounded-lg">
            <div className="absolute hidden md:block top-0 -left-16 bottom-0 w-16 glass-effect"
                 style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
            <div className="absolute hidden md:block top-0 -left-16 bottom-0 w-16 glass-effect"
                 style={{ clipPath: 'polygon(100% 100%, 0 0, 0 100%)' }}></div>
            <MotionDiv className="mb-12" viewport={{ once: false }} initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-glow-accent inline-block">
                <TypingEffect text="Work Experience" />
            </h2>
            </MotionDiv>
            <div className="relative border-l-2 border-primary/30 ml-4">
            {portfolioData.experience.map((exp, index) => (
                <MotionDiv
                key={index}
                className="mb-10 pl-10"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: false }}
                >
                <div className="absolute -left-4 top-1 h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0">
                    <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-4">
                    <p className="text-sm text-primary font-mono">{exp.duration}</p>
                    <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
                    <p className="text-md text-foreground/80 mb-2">{exp.company}</p>
                    <div className="text-foreground/70 space-y-1">
                      {exp.description.split('\n').map((item, i) => (
                          item.startsWith('- ') ? 
                          <div key={i} className="flex items-start">
                            <span className="mr-3 mt-2 text-primary text-lg font-bold leading-none">∙</span>
                            <span className="flex-1">{item.substring(2)}</span>
                          </div>
                          : <p key={i}>{item}</p>
                      ))}
                    </div>
                </div>
                </MotionDiv>
            ))}
            </div>
         </div>
      </div>
    </section>
  );
}
