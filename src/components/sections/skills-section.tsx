'use client';

import { usePortfolio } from '@/hooks/use-portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MotionDiv } from '../motion-div';
import { TechIcon } from '../tech-icon';
import { Progress } from '../ui/progress';
import { TypingEffect } from '../typing-effect';

interface SkillsSectionProps {
  id: string;
}

export function SkillsSection({ id }: SkillsSectionProps) {
  const { portfolioData } = usePortfolio();

  if (!portfolioData) return null;

  return (
    <section id={id}>
      <div className="container mx-auto text-center">
        <MotionDiv className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-glow-accent inline-block">
                <TypingEffect text="Technologies & Skills" />
            </h2>
        </MotionDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((skill, index) => (
            <MotionDiv key={index} delay={index * 100}>
              <Card className="glass-effect text-left h-full transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                  <TechIcon name={skill.name} className="h-10 w-10 text-primary" />
                  <CardTitle>{skill.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Progress value={skill.level} className="w-full h-3" />
                    <span className="font-mono text-primary">{skill.level}%</span>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
