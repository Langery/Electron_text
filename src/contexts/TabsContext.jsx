import { createContext, useContext, useState, useCallback } from 'react';

const PATH_TITLES = {
  '/': 'Home',
  '/login': 'Login',
  '/register': 'Register',
  '/mainpage': 'Main',
  '/dragpage': 'Drag',
  '/demo': 'Demo',
  '/settings': 'Settings'
};

const normalize = (p) => (p === '/' ? p : p.replace(/\/$/, ''));
const titleOf = (path) => PATH_TITLES[normalize(path)] || normalize(path);
const isTabable = (path) => normalize(path) in PATH_TITLES;

const TabsContext = createContext(null);

export function TabsProvider({ children }) {
  const [tabs, setTabs] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  const openTab = useCallback((path) => {
    const norm = normalize(path);
    if (!isTabable(norm)) return;
    setTabs((pre) => {
      if (pre.find((t) => t.key === norm)) return pre;
      return [...pre, { key: norm, path: norm, title: titleOf(norm), closable: norm !== '/' }];
    });
    setActiveKey(norm);
  }, []);

  const closeTab = useCallback((path) => {
    const norm = normalize(path);
    if (norm === '/') return;
    setTabs((pre) => {
      const next = pre.filter((t) => t.key !== norm);
      if (next.length === 0) {
        next.push({ key: '/', path: '/', title: 'Home', closable: false });
      }
      return next;
    });
    setActiveKey((cur) => {
      if (cur !== norm) return cur;
      const remaining = tabs.filter((t) => t.key !== norm);
      return remaining[0]?.key || '/';
    });
  }, [tabs]);

  const switchTab = useCallback((path) => {
    setActiveKey(normalize(path));
  }, []);

  const value = { tabs, activeKey, openTab, closeTab, switchTab };
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

export const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('useTabs must be used within TabsProvider');
  return ctx;
};