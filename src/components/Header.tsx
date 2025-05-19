import React from 'react';
import { Youtube, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-youtube-dark shadow-md py-4 transition-colors duration-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Youtube className="text-youtube-red h-8 w-8 mr-2" />
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-youtube-red">YouTube</span> Comment Analyzer
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;