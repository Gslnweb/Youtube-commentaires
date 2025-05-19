import React from 'react';
import { Youtube, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-youtube-dark py-6 mt-12 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Youtube className="text-youtube-red h-6 w-6 mr-2" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              YouTube Comment Sentiment Analyzer
            </span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Créé avec React, TypeScript et Tailwind CSS
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-youtube-red dark:text-gray-400 dark:hover:text-youtube-red transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;