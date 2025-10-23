'use client';

import { PortfolioContext } from '@/components/portfolio-provider';
import { useContext } from 'react';

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
