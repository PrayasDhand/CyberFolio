'use client';

import { usePortfolio } from '@/hooks/use-portfolio';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';
import { MotionDiv } from '../motion-div';
import { TypingEffect } from '../typing-effect';

interface ProjectsSectionProps {
  id: string;
}

export function ProjectsSection({ id }: ProjectsSectionProps) {
  const { portfolioData } = usePortfolio();

  if (!portfolioData) return null;

  return (
    <section id={id}>
      <div className="container mx-auto">
        <MotionDiv className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-glow-accent inline-block">
                <TypingEffect text="Projects" />
            </h2>
        </MotionDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <MotionDiv key={index} delay={index * 100}>
              <Card className="glass-effect flex flex-col h-full transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(',').map((t, i) => (
                      <Badge key={i} variant="secondary">{t.trim()}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="default" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
