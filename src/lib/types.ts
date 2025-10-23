import { type z } from 'zod';
import { type portfolioSchema } from '@/lib/data';

export type PortfolioData = z.infer<typeof portfolioSchema>;

export type Section = {
  id: 'home' | 'about' | 'services' | 'skills' | 'experience' | 'education' | 'projects' | 'testimonials' | 'contact' | 'resume';
  name: string;
};

export const sections: Section[] = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'services', name: 'What I Do'},
  { id: 'skills', name: 'Skills' },
  { id: 'experience', name: 'Experience' },
  { id: 'education', name: 'Education' },
  { id: 'projects', name: 'Projects' },
  { id: 'testimonials', name: 'Testimonials' },
  { id: 'contact', name: 'Contact' },
  { id: 'resume', name: 'Resume' },
];
