
'use server';

import { portfolioSchema, type PortfolioData } from '@/lib/data';
import { promises as fs } from 'fs';
import path from 'path';

export async function updatePortfolioAction(
  data: PortfolioData
): Promise<{ success: boolean; error?: string }> {
  try {
    const validatedData = portfolioSchema.parse(data);

    const prettyData = JSON.stringify(validatedData, null, 2);

    const fileContent = `
import { z } from 'zod';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name cannot be empty'),
  level: z.number().min(0).max(100).default(80),
});

const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
});

const educationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  year: z.string().min(1),
  description: z.string().optional().default(''),
});

const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  tech: z.string().min(1),
  githubUrl: z.string().optional().or(z.literal('')),
  liveUrl: z.string().optional().or(z.literal('')),
});

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const testimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  imageSource: z.enum(['url', 'upload']).default('url'),
  imageUrl: z.string().default(''),
  gender: z.enum(['male', 'female', 'other']).default('female'),
});

export const portfolioSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  about: z.string().min(1, 'About section is required'),
  email: z.string().email('Invalid email address'),
  github: z.string().url('Invalid GitHub URL'),
  linkedin: z.string().url('Invalid LinkedIn URL'),
  profileImageSource: z.enum(['url', 'upload']).default('url'),
  profileImageUrl: z.string().default(''),
  skills: z.array(skillSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  services: z.array(serviceSchema).optional().default([]),
  testimonials: z.array(testimonialSchema).optional().default([]),
});

export const initialPortfolioData: z.infer<typeof portfolioSchema> = ${prettyData};
`;

    const filePath = path.join(process.cwd(), 'src/lib/data.ts');
    await fs.writeFile(filePath, fileContent, 'utf8');

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Validation failed: ' + error.message };
    }
    console.error('Error writing to data.ts:', error);
    return { success: false, error: 'Failed to write to file.' };
  }
}
