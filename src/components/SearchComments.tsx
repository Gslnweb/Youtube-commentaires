import React from 'react';
import { useSentiment } from '../contexts/SentimentContext';
import { Search, X } from 'lucide-react';

const SearchComments: React.FC = () => {
  const { searchTerm, setSearchTerm, comments, filteredComments } = useSentiment();

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="transition-colors duration-200">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher dans les commentaires..."
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-youtube-red focus:border-youtube-red dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {filteredComments.length === 0 ? (
            <span>Aucun résultat pour "{searchTerm}"</span>
          ) : (
            <span>
              {filteredComments.length} résultat{filteredComments.length > 1 ? 's' : ''} pour "{searchTerm}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComments;