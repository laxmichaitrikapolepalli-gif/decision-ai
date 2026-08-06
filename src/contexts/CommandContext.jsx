import React, { createContext, useContext, useState, useEffect } from 'react';

const CommandContext = createContext();

export const CommandProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openCommandPalette = () => setIsOpen(true);
  const closeCommandPalette = () => setIsOpen(false);

  return (
    <CommandContext.Provider value={{ isOpen, openCommandPalette, closeCommandPalette, setIsOpen }}>
      {children}
    </CommandContext.Provider>
  );
};

export const useCommand = () => {
  const context = useContext(CommandContext);
  if (!context) throw new Error('useCommand must be used within a CommandProvider');
  return context;
};
