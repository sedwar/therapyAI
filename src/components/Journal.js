import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Calendar, 
  Tag, 
  Save, 
  Edit3, 
  Trash2, 
  Heart,
  Sparkles,
  ArrowLeft 
} from 'lucide-react';

const Journal = ({ theme, onBack, userTier }) => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: 'My First Entry',
      content: 'Welcome to your personal AI journal. This is where your thoughts, reflections, and insights live.',
      date: new Date(),
      tags: ['welcome', 'first'],
      mood: 'curious'
    }
  ]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  
  const editorRef = useRef(null);

  const moods = [
    { emoji: '😊', name: 'happy', color: 'from-yellow-400 to-orange-400' },
    { emoji: '😌', name: 'peaceful', color: 'from-green-400 to-teal-400' },
    { emoji: '🤔', name: 'curious', color: 'from-blue-400 to-purple-400' },
    { emoji: '💭', name: 'reflective', color: 'from-indigo-400 to-purple-400' },
    { emoji: '🌟', name: 'inspired', color: 'from-pink-400 to-rose-400' },
    { emoji: '😔', name: 'melancholy', color: 'from-gray-400 to-slate-400' }
  ];

  const createNewEntry = () => {
    const newEntry = {
      id: Date.now(),
      title: 'Untitled Entry',
      content: '',
      date: new Date(),
      tags: [],
      mood: 'curious'
    };
    setEntries([newEntry, ...entries]);
    setCurrentEntry(newEntry);
    setIsEditing(true);
  };

  const saveEntry = () => {
    if (currentEntry) {
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? currentEntry : entry
      ));
      setIsEditing(false);
    }
  };

  const deleteEntry = (entryId) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
    if (currentEntry?.id === entryId) {
      setCurrentEntry(null);
    }
  };

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditing]);

  // Premium gate for non-premium users
  if (userTier === 'free') {
    return (
      <div className={`min-h-screen ${theme.colors.bg} p-4 md:p-6`}>
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={onBack}
            className={`mb-4 md:mb-6 flex items-center space-x-2 ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Chat</span>
          </button>

          <div className={`${theme.colors.card} border rounded-2xl md:rounded-3xl p-8 md:p-12 ${theme.shadows.glow}`}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-2xl md:text-3xl font-light ${theme.colors.text} mb-3 md:mb-4`}>
              Personal AI Journal
            </h1>
            <p className={`${theme.colors.textSecondary} text-base md:text-lg mb-6 md:mb-8 leading-relaxed px-2`}>
              Unlock your private space for thoughts, reflections, and insights. Your journal syncs across devices and includes AI-powered insights.
            </p>
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-medium text-base md:text-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Upgrade to Visionary
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.colors.bg}`}>
      {/* Header */}
      <motion.header 
        className={`${theme.colors.card} border-b backdrop-blur-xl p-4 md:p-6`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
            <button
              onClick={onBack}
              className={`${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors flex-shrink-0`}
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="min-w-0">
              <h1 className={`text-xl md:text-2xl font-light ${theme.colors.text} truncate`}>Journal</h1>
              <p className={`text-sm md:text-base ${theme.colors.textSecondary} truncate`}>Your personal reflection space</p>
            </div>
          </div>
          
          <motion.button
            onClick={createNewEntry}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl hover:shadow-lg transition-all flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <motion.div 
              className={`${theme.colors.card} border rounded-2xl md:rounded-3xl p-4 md:p-6 ${theme.shadows.glow} mb-4 md:mb-6`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Search */}
              <div className="relative mb-6">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.colors.textMuted}`} />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${theme.colors.input} backdrop-blur-sm transition-all focus:ring-2 focus:ring-cyan-500/50`}
                />
              </div>

              {/* Mood Filter */}
              <div className="mb-6">
                <h3 className={`font-medium ${theme.colors.text} mb-3`}>Filter by Mood</h3>
                <div className="grid grid-cols-3 gap-2">
                  {moods.map((mood) => (
                    <motion.button
                      key={mood.name}
                      onClick={() => setSelectedMood(selectedMood === mood.name ? '' : mood.name)}
                      className={`p-3 rounded-xl transition-all ${
                        selectedMood === mood.name 
                          ? `bg-gradient-to-r ${mood.color} text-white` 
                          : `${theme.colors.card} border hover:shadow-md`
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs capitalize">{mood.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Entry List */}
              <div className="space-y-3">
                <h3 className={`font-medium ${theme.colors.text} mb-3`}>
                  Recent Entries ({filteredEntries.length})
                </h3>
                <AnimatePresence>
                  {filteredEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        currentEntry?.id === entry.id 
                          ? `${theme.colors.accent} text-white` 
                          : `${theme.colors.card} hover:shadow-md`
                      }`}
                      onClick={() => setCurrentEntry(entry)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium truncate">{entry.title}</h4>
                        <div className="text-xl ml-2">
                          {moods.find(m => m.name === entry.mood)?.emoji}
                        </div>
                      </div>
                      <p className="text-sm opacity-75 line-clamp-2 mb-2">
                        {entry.content || 'No content yet...'}
                      </p>
                      <div className="text-xs opacity-60">
                        {entry.date.toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Main Editor */}
          <div className="col-span-12 lg:col-span-8">
            {currentEntry ? (
              <motion.div 
                className={`${theme.colors.card} border rounded-3xl p-8 ${theme.shadows.glow} h-full min-h-[600px]`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Entry Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentEntry.title}
                        onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                        className={`text-2xl font-light bg-transparent border-none outline-none ${theme.colors.text} w-full`}
                        placeholder="Entry title..."
                      />
                    ) : (
                      <h1 className={`text-2xl font-light ${theme.colors.text}`}>
                        {currentEntry.title}
                      </h1>
                    )}
                    <div className={`${theme.colors.textSecondary} text-sm mt-1`}>
                      {currentEntry.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {isEditing ? (
                      <motion.button
                        onClick={saveEntry}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Save className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <>
                        <motion.button
                          onClick={() => setIsEditing(true)}
                          className={`${theme.colors.textSecondary} hover:${theme.colors.text} p-2 rounded-xl transition-colors`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Edit3 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          onClick={() => deleteEntry(currentEntry.id)}
                          className="text-red-500 hover:text-red-600 p-2 rounded-xl transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>

                {/* Mood Selector */}
                {isEditing && (
                  <div className="mb-6">
                    <h3 className={`font-medium ${theme.colors.text} mb-3`}>How are you feeling?</h3>
                    <div className="flex flex-wrap gap-2">
                      {moods.map((mood) => (
                        <motion.button
                          key={mood.name}
                          onClick={() => setCurrentEntry({...currentEntry, mood: mood.name})}
                          className={`px-4 py-2 rounded-xl transition-all ${
                            currentEntry.mood === mood.name 
                              ? `bg-gradient-to-r ${mood.color} text-white` 
                              : `${theme.colors.card} border hover:shadow-md`
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="mr-2">{mood.emoji}</span>
                          <span className="capitalize">{mood.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Editor */}
                <div className="flex-1">
                  {isEditing ? (
                    <textarea
                      ref={editorRef}
                      value={currentEntry.content}
                      onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                      placeholder="What's on your mind? Share your thoughts, feelings, ideas, or reflections..."
                      className={`w-full h-96 bg-transparent border-none outline-none resize-none ${theme.colors.text} text-lg leading-relaxed`}
                    />
                  ) : (
                    <div className={`${theme.colors.text} text-lg leading-relaxed whitespace-pre-wrap`}>
                      {currentEntry.content || (
                        <div className={`${theme.colors.textMuted} italic`}>
                          Click edit to start writing...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className={`${theme.colors.card} border rounded-3xl p-12 text-center ${theme.shadows.glow}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className={`text-2xl font-light ${theme.colors.text} mb-4`}>
                  Welcome to Your Journal
                </h2>
                <p className={`${theme.colors.textSecondary} text-lg mb-8`}>
                  Select an entry from the sidebar or create a new one to begin your reflection journey.
                </p>
                <motion.button
                  onClick={createNewEntry}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Writing
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
