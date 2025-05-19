import React from 'react';
import { useSentiment } from '../contexts/SentimentContext';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const SentimentSummary: React.FC = () => {
  const { stats } = useSentiment();
  
  const totalComments = stats.total;
  const positivePercentage = totalComments > 0 ? Math.round((stats.positive / totalComments) * 100) : 0;
  const negativePercentage = totalComments > 0 ? Math.round((stats.negative / totalComments) * 100) : 0;
  const neutralPercentage = totalComments > 0 ? Math.round((stats.neutral / totalComments) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-6">Résumé du sentiment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Positive Comments */}
        <SentimentCard 
          type="positive"
          icon={<ThumbsUp className="h-6 w-6 text-sentiment-positive" />}
          percentage={positivePercentage}
          count={stats.positive}
          totalComments={totalComments}
        />
        
        {/* Neutral Comments */}
        <SentimentCard 
          type="neutral"
          icon={<Minus className="h-6 w-6 text-sentiment-neutral" />}
          percentage={neutralPercentage}
          count={stats.neutral}
          totalComments={totalComments}
        />
        
        {/* Negative Comments */}
        <SentimentCard 
          type="negative"
          icon={<ThumbsDown className="h-6 w-6 text-sentiment-negative" />}
          percentage={negativePercentage}
          count={stats.negative}
          totalComments={totalComments}
        />
      </div>
    </div>
  );
};

interface SentimentCardProps {
  type: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  percentage: number;
  count: number;
  totalComments: number;
}

const SentimentCard: React.FC<SentimentCardProps> = ({ type, icon, percentage, count, totalComments }) => {
  const getBgColor = () => {
    switch (type) {
      case 'positive': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'negative': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'neutral': return 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700';
    }
  };
  
  const getBarColor = () => {
    switch (type) {
      case 'positive': return 'bg-sentiment-positive';
      case 'negative': return 'bg-sentiment-negative';
      case 'neutral': return 'bg-sentiment-neutral';
    }
  };
  
  const getTitle = () => {
    switch (type) {
      case 'positive': return 'Commentaires positifs';
      case 'negative': return 'Commentaires négatifs';
      case 'neutral': return 'Commentaires neutres';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getBgColor()} transition-colors duration-200`}>
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="ml-2 font-medium">{getTitle()}</h3>
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <span className="text-3xl font-bold">{percentage}%</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{count} commentaires</span>
      </div>
      
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getBarColor()} transition-all duration-1000 ease-in-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default SentimentSummary;