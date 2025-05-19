import React from 'react';
import Header from './components/Header';
import AnalyzerForm from './components/AnalyzerForm';
import ResultsContainer from './components/ResultsContainer';
import { SentimentProvider } from './contexts/SentimentContext';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200 text-gray-800 dark:text-gray-200">
      <SentimentProvider>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AnalyzerForm />
          <ResultsContainer />
        </main>
        <Footer />
      </SentimentProvider>
    </div>
  );
}

export default App;