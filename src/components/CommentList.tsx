import React from 'react';
import { useSentiment } from '../contexts/SentimentContext';
import { MessageSquare, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const CommentList: React.FC = () => {
  const { filteredComments, searchTerm } = useSentiment();

  if (filteredComments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center transition-colors duration-200">
        <MessageSquare className="h-8 w-8 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Aucun commentaire trouvé</h3>
        {searchTerm ? (
          <p className="text-gray-600 dark:text-gray-400">
            Aucun résultat pour "{searchTerm}". Essayez une autre recherche.
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Aucun commentaire n'a été trouvé pour cette vidéo.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        Commentaires
        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          ({filteredComments.length})
        </span>
      </h2>
      
      <div className="space-y-4">
        {filteredComments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

interface CommentItemProps {
  comment: {
    id: string;
    author: string;
    text: string;
    score: number;
    sentiment: 'positive' | 'negative' | 'neutral';
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const getBorderColor = () => {
    switch (comment.sentiment) {
      case 'positive': return 'border-l-sentiment-positive';
      case 'negative': return 'border-l-sentiment-negative';
      case 'neutral': return 'border-l-sentiment-neutral';
    }
  };
  
  const getSentimentIcon = () => {
    switch (comment.sentiment) {
      case 'positive': return <ThumbsUp className="h-4 w-4 text-sentiment-positive" />;
      case 'negative': return <ThumbsDown className="h-4 w-4 text-sentiment-negative" />;
      case 'neutral': return <Minus className="h-4 w-4 text-sentiment-neutral" />;
    }
  };
  
  const getSentimentText = () => {
    switch (comment.sentiment) {
      case 'positive': return 'Positif';
      case 'negative': return 'Négatif';
      case 'neutral': return 'Neutre';
    }
  };

  return (
    <div className={`p-4 bg-gray-50 dark:bg-gray-700/30 rounded-md border-l-4 ${getBorderColor()} animate-slide-in-right transition-colors duration-200`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{comment.author}</h4>
        <div className="flex items-center text-xs px-2 py-1 rounded-full bg-white dark:bg-gray-700 shadow-sm">
          {getSentimentIcon()}
          <span className="ml-1">{getSentimentText()}</span>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
    </div>
  );
};

export default CommentList;