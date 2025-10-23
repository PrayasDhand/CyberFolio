
'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { type PortfolioData, portfolioSchema, initialPortfolioData } from '@/lib/data';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { updatePortfolioAction } from '@/app/actions/update-portfolio-action';

type Mode = 'view' | 'edit' | 'resume';

type PortfolioContextType = {
  portfolioData: PortfolioData | null;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  isLoaded: boolean;
  savePortfolioData: (data: PortfolioData) => void;
  isFirstTime: boolean;
};

export const PortfolioContext = createContext<PortfolioContextType | null>(null);

const PortfolioProviderInternal = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [mode, setMode] = useState<Mode>('view');
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setMode('edit');
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      const validatedData = portfolioSchema.parse(initialPortfolioData);
      setPortfolioData(validatedData);
    } catch (error) {
      console.error('Failed to load or parse portfolio data:', error);
      toast({
        variant: 'destructive',
        title: 'Error loading data',
        description: 'There was an issue loading the portfolio data.'
      })
    } finally {
      setIsLoaded(true);
    }
  }, [toast]);

  const savePortfolioData = async (data: PortfolioData) => {
    try {
      const validatedData = portfolioSchema.parse(data);
      setPortfolioData(validatedData);
      setMode('view');
      
      const result = await updatePortfolioAction(validatedData);
      if (result.success) {
        toast({
          title: 'Portfolio Updated',
          description: "Your portfolio has been saved and is now live.",
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Saving Data',
          description: result.error || 'An unknown error occurred while saving your portfolio.',
        });
      }

    } catch (error) {
      console.error('Failed to save portfolio data:', error);
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'There was an issue validating the portfolio data.'
      })
    }
  };

  const contextValue = useMemo(
    () => ({
      portfolioData,
      mode,
      setMode,
      isLoaded,
      savePortfolioData,
      isFirstTime,
    }),
    [portfolioData, mode, isLoaded, isFirstTime]
  );

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};

export function PortfolioProvider({ children }: { children: ReactNode }) {
  // The Suspense Boundary is necessary because PortfolioProviderInternal uses useSearchParams
  return (
    <React.Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <PortfolioProviderInternal>{children}</PortfolioProviderInternal>
    </React.Suspense>
  );
}
