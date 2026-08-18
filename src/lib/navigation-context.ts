'use client';

import { createContext, useContext } from 'react';
import type { ISidebarItem } from '@/interfaces/navigation.interface';

interface INavigationContextValue {
  select: (id: ISidebarItem['id']) => void;
}

export const NavigationContext = createContext<INavigationContextValue | null>(
  null
);

export const useNavigation = (): INavigationContextValue => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      'useNavigation must be used within a NavigationContext provider'
    );
  }

  return context;
};
