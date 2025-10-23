'use client';

import { usePortfolio } from '@/hooks/use-portfolio';
import { PortfolioForm } from '@/components/portfolio-form';
import { PageWrapper } from '@/components/page-wrapper';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { EducationSection } from '@/components/sections/education-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ResumeSection } from '@/components/sections/resume-section';
import { ResumeSheet } from '@/components/resume-sheet';
import { ServicesSection } from '@/components/sections/services-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';


export default function Home() {
  const { portfolioData, isLoaded } = usePortfolio();

  if (!isLoaded || !portfolioData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageWrapper>
      <Header />
      <div className="relative z-10">
        <HeroSection id="home" />
        <AboutSection id="about" />
        <ServicesSection id="services" />
        <SkillsSection id="skills" />
        <ExperienceSection id="experience" />
        <EducationSection id="education" />
        <ProjectsSection id="projects" />
        <TestimonialsSection id="testimonials" />
        <ResumeSection id="resume" />
        <ContactSection id="contact" />
      </div>
      <PortfolioForm />
      <ResumeSheet />
    </PageWrapper>
  );
}
