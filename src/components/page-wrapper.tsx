'use client';

import { cn } from '@/lib/utils';
import React from 'react';

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn('relative w-full', className)}
    >
      {children}
    </div>
  );
};
