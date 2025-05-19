import React from 'react';
import { useSentiment } from '../contexts/SentimentContext';
import SentimentSummary from './SentimentSummary';
import CommentList from './CommentList';
import SearchComments from './SearchComments';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

const ResultsContainer: React.FC = () => {
  const { analyzed, loading, error } = useSentiment();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <Loader2 className="h-12 w-12 text-youtube-red animate-spin mb-4" />
        <p className="text-lg">Analyse des commentaires en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 animate-fade-in transition-colors duration-200">
        <h3 className="text-red-600 dark:text-red-400 font-semibold text-lg flex items-center">
          <ThumbsDown className="h-5 w-5 mr-2" />
          Erreur
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{error}</p>
      </div>
    );
  }

  if (!analyzed) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center animate-fade-in transition-colors duration-200">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-4 mb-6">
            <ThumbsUp className="h-8 w-8 text-sentiment-positive" />
            <ThumbsDown className="h-8 w-8 text-sentiment-negative" />
          </div>
          <h3 className="text-xl font-medium mb-2">Prêt à analyser les commentaires</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Entrez une URL YouTube ci-dessus pour commencer l'analyse du sentiment des commentaires
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <SentimentSummary />
      <SearchComments />
      <CommentList />
    </div>
  );
};

export default ResultsContainer;