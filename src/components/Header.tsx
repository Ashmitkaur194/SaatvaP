import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import shlokas from '../data/shlokas.json';
import affirmations from '../data/affirmations.json';

const Header: React.FC = () => {
  const [currentContent, setCurrentContent] = useState<any>(null);
  const [contentType, setContentType] = useState<'shloka' | 'affirmation'>('shloka');

  const getRandomContent = () => {
    const showShloka = Math.random() > 0.5;
    setContentType(showShloka ? 'shloka' : 'affirmation');
    
    if (showShloka) {
      const randomShloka = shlokas[Math.floor(Math.random() * shlokas.length)];
      setCurrentContent(randomShloka);
    } else {
      const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
      setCurrentContent(randomAffirmation);
    }
  };

  useEffect(() => {
    getRandomContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  if (!currentContent) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            contentType === 'shloka' 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {contentType === 'shloka' ? 'Bhagavad Gita' : 'Daily Affirmation'}
          </div>
        </div>
        <button
          onClick={getRandomContent}
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          title="Get new content"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {contentType === 'shloka' ? (
        <div className="space-y-4">
          <div className="text-right text-sm opacity-90">
            {currentContent.chapter}
          </div>
          <div className="text-lg font-medium leading-relaxed">
            {currentContent.sanskrit.split('\n').map((line: string, index: number) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          <div className="text-sm opacity-90 italic">
            {currentContent.transliteration}
          </div>
          <div className="border-t border-white border-opacity-20 pt-4">
            <div className="font-medium mb-2">{currentContent.translation}</div>
            <div className="text-sm opacity-90">{currentContent.meaning}</div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xl font-medium leading-relaxed">
            "{currentContent.text}"
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium capitalize">
              {currentContent.category}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Header;