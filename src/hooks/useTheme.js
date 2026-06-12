import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT = { theme: 'light', librarySort: 'time', libraryMaxItems: 100 };

export function useTheme() {
  const [settings] = useLocalStorage('appSettings', DEFAULT);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);
}
