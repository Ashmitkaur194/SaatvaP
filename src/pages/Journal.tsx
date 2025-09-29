import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Calendar, Search, Edit3 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
}

const Journal: React.FC = () => {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journalEntries', []);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentMood, setCurrentMood] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const moods = ['😊 Happy', '😔 Sad', '😌 Calm', '😟 Anxious', '😡 Angry', '🤔 Thoughtful', '😴 Tired', '🥰 Grateful'];

  // Auto-save functionality
  useEffect(() => {
    if (currentEntry.length > 10) {
      const timer = setTimeout(() => {
        console.log('Auto-saving entry...'); // Placeholder for auto-save
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentEntry]);

  const saveEntry = () => {
    if (!currentTitle.trim() || !currentEntry.trim()) return;

    const entry: JournalEntry = {
      id: editingId || Date.now().toString(),
      title: currentTitle,
      content: currentEntry,
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
    };

    if (editingId) {
      setEntries(entries.map(e => e.id === editingId ? entry : e));
      setEditingId(null);
    } else {
      setEntries([entry, ...entries]);
    }

    // Clear form
    setCurrentTitle('');
    setCurrentEntry('');
    setCurrentMood('');
  };

  const editEntry = (entry: JournalEntry) => {
    setCurrentTitle(entry.title);
    setCurrentEntry(entry.content);
    setCurrentMood(entry.mood);
    setEditingId(entry.id);
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Journal</h2>
          <p className="text-gray-600">Express your thoughts and feelings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400" size={20} />
          <span className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </motion.div>

      {/* Writing Area */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Give your entry a title..."
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            className="w-full text-xl font-semibold border-0 border-b border-gray-200 focus:border-indigo-500 focus:ring-0 pb-2 placeholder-gray-400"
          />
          
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-600">How are you feeling?</label>
            <select
              value={currentMood}
              onChange={(e) => setCurrentMood(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select mood</option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>{mood}</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Start writing your thoughts here... Your words are automatically saved as you type."
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            rows={10}
            className="w-full border border-gray-200 rounded-lg p-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none placeholder-gray-400"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Edit3 size={16} className="text-gray-400" />
              <span className="text-sm text-gray-500">
                {currentEntry.length > 10 ? 'Auto-saving...' : 'Start typing to auto-save'}
              </span>
            </div>
            <button
              onClick={saveEntry}
              disabled={!currentTitle.trim() || !currentEntry.trim()}
              className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={16} />
              <span>{editingId ? 'Update Entry' : 'Save Entry'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search and Entries */}
      {entries.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search your entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Entries List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Previous Entries ({filteredEntries.length})
            </h3>
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => editEntry(entry)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{entry.title}</h4>
                  <div className="flex items-center space-x-2">
                    {entry.mood && <span className="text-sm">{entry.mood}</span>}
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                </div>
                <p className="text-gray-600 line-clamp-3">{entry.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Journal;