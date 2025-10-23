
'use client';

import type React from 'react';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface ImageUploadProps {
  onFileSelect: (fileData: string) => void;
}

const handleFileRead = (file: File, callback: (result: string) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      callback(e.target.result as string);
    }
  };
  reader.readAsDataURL(file);
};

export const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileRead(e.target.files[0], onFileSelect);
    }
  };

  return (
    <FormItem>
      <FormLabel>Upload Image</FormLabel>
      <FormControl>
        <Input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
