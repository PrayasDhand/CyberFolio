
'use client';
import { usePortfolio } from '@/hooks/use-portfolio';
import { Card } from '../ui/card';
import { MotionDiv } from '../motion-div';
import { TypingEffect } from '../typing-effect';
import { Quote, User, UserCircle2 } from 'lucide-react';
import Image from 'next/image';

interface TestimonialsSectionProps {
  id: string;
}

const PlaceholderIcon = ({ gender }: { gender: 'male' | 'female' | 'other' }) => {
  if (gender === 'male') {
    return <UserCircle2 className="w-full h-full text-primary/70" />;
  }
  if (gender === 'female') {
    return <User className="w-full h-full p-2 text-primary/70" />;
  }
  return <UserCircle2 className="w-full h-full text-primary/70" />;
};


export function TestimonialsSection({ id }: TestimonialsSectionProps) {
  const { portfolioData } = usePortfolio();

  if (!portfolioData || !portfolioData.testimonials?.length) return null;

  return (
    <section id={id}>
      <div className="container mx-auto">
        <MotionDiv className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-glow-accent inline-block">
                <TypingEffect text="Testimonials" />
            </h2>
        </MotionDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.testimonials.map((testimonial, index) => (
            <MotionDiv key={index} delay={index * 100} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
              <Card className="glass-effect flex flex-col p-6 h-full transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
                <Quote className="w-8 h-8 text-primary/50 mb-4" />
                <div className="flex-grow">
                  <p className="text-foreground/80 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center gap-4 mt-6">
                   <div className="w-20 h-20 rounded-full border-2 border-primary/50 shrink-0 overflow-hidden flex items-center justify-center bg-secondary">
                      {testimonial.imageUrl ? (
                        <Image src={testimonial.imageUrl} alt={testimonial.name} width={80} height={80} className="object-cover w-full h-full" />
                      ) : (
                        <PlaceholderIcon gender={testimonial.gender} />
                      )}
                    </div>
                  <div>
                    <p className="font-bold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.title}</p>
                  </div>
                </div>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
