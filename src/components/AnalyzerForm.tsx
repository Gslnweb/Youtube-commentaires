import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSentiment } from '../contexts/SentimentContext';

const AnalyzerForm: React.FC = () => {
  const { analyzeComments, loading } = useSentiment();
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      analyzeComments(inputUrl);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 animate-fade-in transition-colors duration-200">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Analyser les commentaires YouTube</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Entrez l'URL d'une vidéo YouTube pour analyser le sentiment des commentaires
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-youtube-red focus:border-youtube-red dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !inputUrl.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200
            ${loading || !inputUrl.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-youtube-red hover:bg-red-700'}`}
        >
          {loading ? 'Analyse en cours...' : 'Analyser les commentaires'}
        </button>
      </form>
    </div>
  );
};

export default AnalyzerForm;