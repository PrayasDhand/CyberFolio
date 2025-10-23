
'use client';

import { usePortfolio } from '@/hooks/use-portfolio';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Briefcase, GraduationCap, Mail, Linkedin, Github } from 'lucide-react';
import { Separator } from './ui/separator';

export function ResumeSheet() {
  const { portfolioData, mode, setMode } = usePortfolio();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setMode('view');
    }
  };

  if (!portfolioData) return null;

  return (
    <Sheet open={mode === 'resume'} onOpenChange={handleOpenChange}>
      <SheetContent className="glass-effect w-full sm:max-w-3xl p-0" side="right">
        <ScrollArea className="h-full">
          <div className="p-6 sm:p-8">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="text-4xl font-bold text-glow-accent">{portfolioData.name}</SheetTitle>
              <SheetDescription className="text-lg text-foreground/80">{portfolioData.title}</SheetDescription>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                <a href={`mailto:${portfolioData.email}`} className="flex items-center gap-2 hover:text-primary"><Mail /> {portfolioData.email}</a>
                <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Linkedin /> LinkedIn</a>
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Github /> GitHub</a>
              </div>
            </SheetHeader>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-glow-primary mb-4">Summary</h3>
                <p className="text-foreground/80">{portfolioData.summary}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-semibold text-glow-primary mb-6">Work Experience</h3>
                <div className="relative border-l-2 border-primary/30 ml-4 space-y-8">
                  {portfolioData.experience.map((exp, index) => (
                    <div key={index} className="pl-10">
                      <div className="absolute -left-4 top-1 h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-primary font-mono">{exp.duration}</p>
                        <h4 className="text-xl font-bold mt-1">{exp.role}</h4>
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
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />

              <div>
                <h3 className="text-2xl font-semibold text-glow-primary mb-6">Education</h3>
                <div className="relative border-l-2 border-primary/30 ml-4 space-y-8">
                  {portfolioData.education.map((edu, index) => (
                    <div key={index} className="pl-10">
                       <div className="absolute -left-4 top-1 h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-primary font-mono">{edu.year}</p>
                        <h4 className="text-xl font-bold mt-1">{edu.degree}</h4>
                        <p className="text-md text-foreground/80">{edu.institution}</p>
                        {edu.description && (
                          <div className="text-foreground/70 mt-2 space-y-1">
                             {edu.description.split('\n').map((item, i) => (
                                item.startsWith('- ') ? 
                                <div key={i} className="flex items-start">
                                  <span className="mr-3 mt-2 text-primary text-lg font-bold leading-none">∙</span>
                                  <span className="flex-1">{item.substring(2)}</span>
                                </div>
                                : <p key={i}>{item}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-semibold text-glow-primary mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.map((skill, index) => (
                        <div key={index} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                            {skill.name}
                        </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
