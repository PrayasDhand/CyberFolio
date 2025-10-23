
'use client';

import { usePortfolio } from '@/hooks/use-portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { portfolioSchema, type PortfolioData, initialPortfolioData } from '@/lib/data';
import { Trash2, PlusCircle } from 'lucide-react';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type React from 'react';
import { ImageUpload } from './image-upload';


export function PortfolioForm() {
  const { portfolioData, savePortfolioData, mode, setMode, isFirstTime } = usePortfolio();

  const form = useForm<PortfolioData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: portfolioData || initialPortfolioData,
  });
  
  const { fields: skills, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: 'skills' });
  const { fields: experiences, append: appendExperience, remove: removeExperience } = useFieldArray({ control: form.control, name: 'experience' });
  const { fields: educations, append: appendEducation, remove: removeEducation } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: projects, append: appendProject, remove: removeProject } = useFieldArray({ control: form.control, name: 'projects' });
  const { fields: services, append: appendService, remove: removeService } = useFieldArray({ control: form.control, name: 'services' });
  const { fields: testimonials, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({ control: form.control, name: 'testimonials' });

  const onSubmit = (data: PortfolioData) => {
    savePortfolioData(data);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset(portfolioData || initialPortfolioData);
      setMode('view');
    }
  };
  
  const profileImageSource = form.watch('profileImageSource');

  return (
    <Dialog open={mode === 'edit'} onOpenChange={handleOpenChange}>
      <DialogContent className="glass-effect sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-glow-primary">
            {isFirstTime ? 'Setup Your Portfolio' : 'Update Your Portfolio'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ScrollArea className="h-[70vh] pr-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-glow-accent">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="title" render={({ field }) => ( <FormItem><FormLabel>Title / Tagline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="github" render={({ field }) => ( <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="linkedin" render={({ field }) => ( <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>

                <FormField
                  control={form.control}
                  name="profileImageSource"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Profile Picture Source</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="url" />
                            </FormControl>
                            <FormLabel className="font-normal">URL</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="upload" />
                            </FormControl>
                            <FormLabel className="font-normal">Upload</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {profileImageSource === 'url' ? (
                  <FormField control={form.control} name="profileImageUrl" render={({ field }) => ( <FormItem><FormLabel>Profile Image URL</FormLabel><FormControl><Input {...field} value={field.value ?? ''} placeholder="https://example.com/image.png" /></FormControl><FormMessage /></FormItem> )} />
                ) : (
                  <FormField 
                    control={form.control} 
                    name="profileImageUrl" 
                    render={({ field }) => ( 
                      <ImageUpload onFileSelect={field.onChange} />
                    )} 
                  />
                )}

                 <FormField control={form.control} name="summary" render={({ field }) => ( <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                 <FormField control={form.control} name="about" render={({ field }) => ( <FormItem><FormLabel>About Section</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem> )} />
                
                <Separator className="my-6" />
                
                <ArraySection title="Services" fields={services} remove={removeService} append={appendService} defaultItem={{ title: '', description: '' }} renderItem={(index) => (
                  <>
                    <FormField control={form.control} name={`services.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Service Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`services.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                  </>
                )} />

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold text-glow-accent">Skills</h3>
                {skills.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-2">
                    <FormField control={form.control} name={`skills.${index}.name`} render={({ field }) => ( <FormItem className="flex-1"><FormLabel>Skill</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                    <FormField control={form.control} name={`skills.${index}.level`} render={({ field }) => ( <FormItem className="w-24"><FormLabel>Level (%)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} /></FormControl></FormItem> )} />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeSkill(index)}><Trash2 /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendSkill({ name: '', level: 80 })}><PlusCircle className="mr-2" /> Add Skill</Button>

                <Separator className="my-6" />

                <ArraySection title="Experience" fields={experiences} remove={removeExperience} append={appendExperience} defaultItem={{ role: '', company: '', duration: '', description: '' }} renderItem={(index) => (
                  <>
                    <FormField control={form.control} name={`experience.${index}.role`} render={({ field }) => (<FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`experience.${index}.duration`} render={({ field }) => (<FormItem><FormLabel>Duration</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description (use '-' for bullet points)</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl></FormItem>)} />
                  </>
                )} />

                <Separator className="my-6" />

                <ArraySection title="Education" fields={educations} remove={removeEducation} append={appendEducation} defaultItem={{ degree: '', institution: '', year: '', description: '' }} renderItem={(index) => (
                  <>
                    <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`education.${index}.year`} render={({ field }) => (<FormItem><FormLabel>Year</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`education.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description (use '-' for bullet points)</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl></FormItem>)} />
                  </>
                )} />

                <Separator className="my-6" />

                <ArraySection title="Projects" fields={projects} remove={removeProject} append={appendProject} defaultItem={{ name: '', description: '', tech: '', githubUrl: '', liveUrl: '' }} renderItem={(index) => (
                   <>
                    <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`projects.${index}.tech`} render={({ field }) => (<FormItem><FormLabel>Technologies</FormLabel><FormControl><Input {...field} placeholder="Comma-separated" /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`projects.${index}.githubUrl`} render={({ field }) => (<FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name={`projects.${index}.liveUrl`} render={({ field }) => (<FormItem><FormLabel>Live URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                   </>
                )} />

                <Separator className="my-6" />

                <ArraySection 
                  title="Testimonials" 
                  fields={testimonials} 
                  remove={removeTestimonial} 
                  append={appendTestimonial} 
                  defaultItem={{ name: '', title: '', quote: '', gender: 'female', imageSource: 'url', imageUrl: '' }} 
                  renderItem={(index) => {
                    const imageSource = form.watch(`testimonials.${index}.imageSource`);
                    return (
                      <>
                        <FormField control={form.control} name={`testimonials.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`testimonials.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`testimonials.${index}.quote`} render={({ field }) => (<FormItem><FormLabel>Quote</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                        
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.imageSource`}
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Image Source</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex space-x-4"
                                >
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl><RadioGroupItem value="url" /></FormControl>
                                    <FormLabel className="font-normal">URL</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl><RadioGroupItem value="upload" /></FormControl>
                                    <FormLabel className="font-normal">Upload</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {imageSource === 'url' ? (
                          <FormField control={form.control} name={`testimonials.${index}.imageUrl`} render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} value={field.value ?? ''} placeholder="https://example.com/image.png" /></FormControl></FormItem>)} />
                        ) : (
                           <FormField 
                            control={form.control} 
                            name={`testimonials.${index}.imageUrl`}
                            render={({ field }) => (
                              <ImageUpload onFileSelect={field.onChange} />
                            )}
                          />
                        )}

                        <FormField control={form.control} name={`testimonials.${index}.gender`} render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender for Placeholder</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </>
                    )
                  }}
                />

              </div>
            </ScrollArea>
            <DialogFooter>
               {!isFirstTime && <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>}
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function ArraySection<T>({ title, fields, remove, append, defaultItem, renderItem }: {
  title: string;
  fields: (T & { id: string })[];
  remove: (index: number) => void;
  append: (item: any) => void;
  defaultItem: any;
  renderItem: (index: number) => React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-glow-accent">{title}</h3>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
           <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              onClick={() => remove(index)}
              className="absolute top-2 right-2 h-7 w-7"
            >
              <Trash2 className="h-4 w-4" />
           </Button>
          <div className="space-y-2 pr-10">
            {renderItem(index)}
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append(defaultItem)} className="w-full sm:w-auto">
        <PlusCircle className="mr-2" /> Add {title.slice(0, -1)}
      </Button>
    </div>
  );
}
