import Sentiment from 'sentiment';

interface SentimentResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

// French language sentiment analysis
const frenchWords = {
  positif: 2,
  négatif: -2,
  incroyable: 3,
  excellent: 3,
  terrible: -3,
  aimer: 2,
  détester: -2,
  adorer: 3,
  horrible: -3,
  magnifique: 3,
  génial: 3,
  nul: -2,
  mauvais: -2,
  triste: -1,
  heureux: 2,
  extraordinaire: 3,
  formidable: 3,
  ennuyeux: -2,
  pire: -3,
  meilleur: 3,
  déception: -2,
  fascinant: 2,
  inspirant: 2,
  pauvre: -1,
  riche: 1,
  décevant: -2,
  recommander: 2,
  beau: 2,
  moche: -2,
  intéressant: 1,
  passionnant: 2,
  super: 3,
  fantastique: 3,
  catastrophe: -3,
  plaisir: 2,
  inutile: -2,
  utile: 2,
  parfait: 3,
  pénible: -2,
  déçu: -2,
  content: 2,
  stupide: -2,
  intelligent: 2,
  charmant: 2,
  douloureux: -2,
  agréable: 2,
  désagréable: -2,
  mal: -1,
  bien: 1,
  brillant: 2,
  impressionnant: 2,
  misérable: -2,
  dégoutant: -3,
  médiocre: -1
};

export const analyzeSentiment = (text: string): SentimentResult => {
  const sentiment = new Sentiment();
  
  // Add French language support
  sentiment.registerLanguage('fr', {
    labels: frenchWords,
    // Add negations for French
    negations: ['ne', 'pas', 'jamais', 'aucun', 'aucune', 'ni', 'sans']
  });
  
  const result = sentiment.analyze(text, { language: 'fr' });
  
  let category: 'positive' | 'negative' | 'neutral';
  if (result.score > 0) {
    category = 'positive';
  } else if (result.score < 0) {
    category = 'negative';
  } else {
    category = 'neutral';
  }
  
  return {
    score: result.score,
    sentiment: category
  };
};