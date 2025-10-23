
'use client';

import React, { useEffect, useState, type ComponentProps, Suspense } from 'react';
import { Button } from './ui/button';
import { usePortfolio } from '@/hooks/use-portfolio';
import { cn } from '@/lib/utils';
import { sections } from '@/lib/types';
import { Menu, X, Edit } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useSearchParams } from 'next/navigation';

function HeaderContent() {
  const { setMode } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [showEdit, setShowEdit] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setShowEdit(true);
    } else {
      setShowEdit(false);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      let currentSectionId = 'home';
      let currentSectionIndex = 0;
      for (const [index, section] of sections.entries()) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= window.scrollY + 100) {
          currentSectionId = section.id;
          currentSectionIndex = index;
        }
      }
      setActiveSection(currentSectionId);
      if (api && api.selectedScrollSnap() !== currentSectionIndex) {
        api.scrollTo(currentSectionIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [api]);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'resume') {
      setMode('resume');
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'py-2 bg-background/50 backdrop-blur-lg border-b border-primary/20'
          : 'py-4'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#home" className="text-xl font-bold text-glow-primary">
          Prayas's Portfolio
        </a>

        <nav className="hidden md:block">
          <Carousel
            opts={{
              align: 'start',
              dragFree: true,
            }}
            setApi={setApi}
            className="w-full max-w-xs lg:max-w-sm"
          >
            <CarouselContent>
              {sections.map((section) => (
                <CarouselItem key={section.id} className="basis-auto">
                   <NavButton
                      id={section.id}
                      activeSection={activeSection}
                      onClick={() => handleNavClick(section.id)}
                    >
                      {section.name}
                    </NavButton>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="h-6 w-6 -left-8" />
            <CarouselNext className="h-6 w-6 -right-8" />
          </Carousel>
        </nav>

        <div className="flex items-center gap-2">
          {showEdit && (
            <Button variant="outline" size="sm" onClick={() => setMode('edit')}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-2 glass-effect p-4">
          <nav className="flex flex-col gap-4">
            {sections.map((section) => (
              <NavButton
                key={section.id}
                id={section.id}
                activeSection={activeSection}
                onClick={() => handleNavClick(section.id)}
                className="text-lg text-left"
              >
                {section.name}
              </NavButton>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={null}>
      <HeaderContent />
    </Suspense>
  )
}


interface NavButtonProps extends ComponentProps<'button'> {
  id: string;
  activeSection: string;
}

const NavButton = ({ id, activeSection, children, onClick, className }: NavButtonProps) => {
  const isActive = activeSection === id;
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative font-medium transition-colors bg-transparent border-none cursor-pointer p-2',
        'text-foreground/80 hover:text-primary',
        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transition-transform after:duration-300 after:scale-x-0 after:origin-center hover:after:scale-x-100',
        isActive && 'text-primary text-glow-primary',
        isActive && 'after:scale-x-100',
        className
      )}
    >
      {children}
    </button>
  );
};
