import { useState, useEffect, useCallback, useRef } from 'react';

const readStorage = (key, defaultValue) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / serialization errors
  }
};

export function useLocalStorage(key, defaultValue = null) {
  const defaultRef = useRef(defaultValue);
  const [value, setValueState] = useState(() => readStorage(key, defaultRef.current));

  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        setValueState(readStorage(key, defaultRef.current));
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  const setValue = useCallback((next) => {
    setValueState((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      writeStorage(key, resolved);
      return resolved;
    });
  }, [key]);

  const refresh = useCallback(() => {
    setValueState(readStorage(key, defaultRef.current));
  }, [key]);

  return [value, setValue, refresh];
}
