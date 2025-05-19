import React, { createContext, useContext, useState } from 'react';
import { analyzeSentiment } from '../utils/sentimentAnalyzer';

export interface Comment {
  id: string;
  author: string;
  text: string;
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface SentimentContextType {
  url: string;
  setUrl: (url: string) => void;
  comments: Comment[];
  loading: boolean;
  error: string | null;
  analyzed: boolean;
  stats: {
    positive: number;
    negative: number;
    neutral: number;
    total: number;
  };
  analyzeComments: (url: string) => Promise<void>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredComments: Comment[];
}

const SentimentContext = createContext<SentimentContextType | undefined>(undefined);

export const SentimentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [url, setUrl] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const stats = {
    positive: comments.filter(c => c.sentiment === 'positive').length,
    negative: comments.filter(c => c.sentiment === 'negative').length,
    neutral: comments.filter(c => c.sentiment === 'neutral').length,
    total: comments.length
  };

  const filteredComments = searchTerm 
    ? comments.filter(c => 
        c.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : comments;

  const analyzeComments = async (youtubeUrl: string) => {
    try {
      setLoading(true);
      setError(null);
      setAnalyzed(false);
      
      // Validate YouTube URL
      const videoId = extractVideoId(youtubeUrl);
      if (!videoId) {
        throw new Error('URL invalide. Veuillez entrer une URL YouTube valide.');
      }

      // In a real app, we would fetch actual YouTube comments here
      // For this demo, we'll use mock data
      const mockComments = generateMockComments();
      const analyzedComments = mockComments.map(comment => ({
        ...comment,
        ...analyzeSentiment(comment.text)
      }));
      
      setComments(analyzedComments);
      setUrl(youtubeUrl);
      setAnalyzed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SentimentContext.Provider 
      value={{ 
        url,
        setUrl,
        comments, 
        loading, 
        error, 
        analyzed, 
        stats,
        analyzeComments,
        searchTerm,
        setSearchTerm,
        filteredComments
      }}
    >
      {children}
    </SentimentContext.Provider>
  );
};

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Function to generate mock comments for demo purposes
const generateMockComments = (): Omit<Comment, 'score' | 'sentiment'>[] => {
  const mockComments = [
    { id: '1', author: 'User123', text: 'Cette vidéo est incroyable! J\'adore le contenu.' },
    { id: '2', author: 'VideoFan', text: 'Je n\'ai pas vraiment aimé cette vidéo. C\'était ennuyeux.' },
    { id: '3', author: 'TechGeek', text: 'C\'est une vidéo moyenne, elle a des points forts et des points faibles.' },
    { id: '4', author: 'MusicLover', text: 'Super vidéo! La qualité est excellente et le sujet est fascinant.' },
    { id: '5', author: 'CriticPro', text: 'Horrible. Contenu trompeur et mal recherché.' },
    { id: '6', author: 'RandomUser', text: 'C\'est ok. Rien de spécial mais pas mauvais non plus.' },
    { id: '7', author: 'ContentCreator', text: 'Inspirant! J\'ai appris beaucoup de nouvelles techniques!' },
    { id: '8', author: 'DisappointedViewer', text: 'Quelle déception. J\'attendais mieux de ce créateur.' },
    { id: '9', author: 'CasualWatcher', text: 'Vidéo intéressante. Pourrait être plus courte cependant.' },
    { id: '10', author: 'EnthusiasticFan', text: 'INCROYABLE! La meilleure vidéo que j\'ai vue cette année!' },
    { id: '11', author: 'SeriousCritic', text: 'Contenu trop simpliste et plein d\'erreurs. Je ne la recommande pas.' },
    { id: '12', author: 'NewSubscriber', text: 'Première fois que je regarde ce canal. Assez bien fait.' },
    { id: '13', author: 'BigFan', text: 'J\'adore absolument tout dans cette vidéo! Continue comme ça!' },
    { id: '14', author: 'AngryViewer', text: 'Perte de temps totale. N\'écoutez pas ce créateur désinformant.' },
    { id: '15', author: 'RegularViewer', text: 'C\'est correct. Peut-être que je regarderai la prochaine vidéo.' }
  ];
  
  return mockComments;
};

export const useSentiment = (): SentimentContextType => {
  const context = useContext(SentimentContext);
  if (context === undefined) {
    throw new Error('useSentiment must be used within a SentimentProvider');
  }
  return context;
};