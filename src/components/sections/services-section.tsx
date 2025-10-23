'use client';
import { usePortfolio } from '@/hooks/use-portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MotionDiv } from '../motion-div';
import { TypingEffect } from '../typing-effect';
import { Code, Smartphone, Cloud, Server } from 'lucide-react';

interface ServicesSectionProps {
  id: string;
}

const getServiceIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('web')) return <Code className="h-10 w-10 text-primary" />;
    if (lowerTitle.includes('mobile')) return <Smartphone className="h-10 w-10 text-primary" />;
    if (lowerTitle.includes('cloud')) return <Cloud className="h-10 w-10 text-primary" />;
    if (lowerTitle.includes('backend')) return <Server className="h-10 w-10 text-primary" />;
    return <Code className="h-10 w-10 text-primary" />;
}

export function ServicesSection({ id }: ServicesSectionProps) {
  const { portfolioData } = usePortfolio();

  if (!portfolioData || !portfolioData.services?.length) return null;

  return (
    <section id={id}>
      <div className="container mx-auto">
        <MotionDiv className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-glow-accent inline-block">
                <TypingEffect text="What I Do" />
            </h2>
        </MotionDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioData.services.map((service, index) => (
            <MotionDiv key={index} delay={index * 100} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
              <Card className="glass-effect text-center flex flex-col h-full transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
                <CardHeader className="items-center">
                  {getServiceIcon(service.title)}
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">{service.description}</p>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
