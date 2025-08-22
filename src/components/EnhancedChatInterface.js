import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Menu, 
  Palette, 
  Sparkles, 
  Heart,
  MoreHorizontal,
  Smile,
  Copy,
  Share,
  RefreshCw
} from 'lucide-react';
import { conversationThemes, messageReactions, suggestionCategories, moodDetection, autoCompleteSuggestions } from '../utils/themes';

const EnhancedChatInterface = ({ 
  chatHistory, 
  message, 
  setMessage, 
  sendMessage, 
  isTyping, 
  selectedModel, 
  setSelectedModel, 
  models, 
  theme,
  onMenuClick,
  handleKeyPress,
  userTier,
  dailyMessageCount,
  subscriptionTiers
}) => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Enhanced state
  const [selectedTheme, setSelectedTheme] = useState('minimal');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [messageReactionMenu, setMessageReactionMenu] = useState(null);
  const [autoSuggestions, setAutoSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState([]);

  const currentTheme = conversationThemes[selectedTheme];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Auto-complete suggestions
  useEffect(() => {
    const words = message.toLowerCase().trim();
    let suggestions = [];
    
    Object.entries(autoCompleteSuggestions).forEach(([key, values]) => {
      if (words.startsWith(key) && words.length > key.length) {
        suggestions = values.filter(suggestion => 
          suggestion.toLowerCase().startsWith(words)
        );
      }
    });
    
    setAutoSuggestions(suggestions.slice(0, 3));
    setShowSuggestions(suggestions.length > 0 && message.length > 3);
  }, [message]);

  // Mood detection
  const detectMoodAndSuggestTheme = (messageText) => {
    const text = messageText.toLowerCase();
    for (const [mood, config] of Object.entries(moodDetection)) {
      if (config.keywords.some(keyword => text.includes(keyword))) {
        if (selectedTheme !== config.theme) {
          // Suggest theme change with animation
          setTimeout(() => {
            setSelectedTheme(config.theme);
          }, 1000);
        }
        return config.response;
      }
    }
    return null;
  };

  // Handle message reactions
  const handleReaction = (messageIndex, reactionKey) => {
    // Add reaction to message (would store in state/database)
    console.log(`Reacted with ${reactionKey} to message ${messageIndex}`);
    setMessageReactionMenu(null);
  };

  // Enhanced send message with mood detection
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const moodResponse = detectMoodAndSuggestTheme(message);
    sendMessage();
    
    if (moodResponse) {
      // Show mood detection response as system message
      setTimeout(() => {
        console.log('Mood detected:', moodResponse);
      }, 2000);
    }
  };

  // Generate floating particles for themes
  useEffect(() => {
    if (currentTheme.animation.particles) {
      const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        emoji: currentTheme.colors.particles[Math.floor(Math.random() * currentTheme.colors.particles.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      }));
      setFloatingParticles(particles);
    } else {
      setFloatingParticles([]);
    }
  }, [selectedTheme]);

  return (
    <div className={`h-screen flex flex-col relative overflow-hidden`}>
      {/* Dynamic Background with Theme */}
      <div className={`absolute inset-0 ${currentTheme.colors.background} ${currentTheme.animation.background}`} />
      
      {/* Floating Particles */}
      <AnimatePresence>
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl pointer-events-none z-10"
            initial={{ 
              x: `${particle.x}vw`, 
              y: `${particle.y}vh`, 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: `${particle.y - 20}vh`,
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0.8],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 8,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header with Theme Selector */}
      <motion.header 
        className={`${currentTheme.colors.card} border-b backdrop-blur-xl px-4 md:px-6 py-3 md:py-4 relative z-20`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-r ${models[selectedModel].color} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="text-white text-lg md:text-xl">{models[selectedModel].emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className={`font-medium ${currentTheme.colors.text} text-base md:text-lg truncate`}>
                {models[selectedModel].name}
                {models[selectedModel].tier === 'premium' && (
                  <span className="ml-1 md:ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 md:px-2 py-0.5 rounded-full text-xs">
                    Premium
                  </span>
                )}
              </h1>
              <p className={`text-xs md:text-sm ${currentTheme.colors.textSecondary} truncate`}>
                {currentTheme.name} Theme • {models[selectedModel].description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            {/* Theme Selector */}
            <motion.button
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              className={`p-2 md:p-2 rounded-xl ${currentTheme.colors.textSecondary} hover:${currentTheme.colors.text} transition-colors relative`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Palette className="w-5 h-5 md:w-5 md:h-5" />
            </motion.button>
            
            {/* Menu */}
            <motion.button
              onClick={onMenuClick}
              className={`p-2 md:p-2 rounded-xl ${currentTheme.colors.textSecondary} hover:${currentTheme.colors.text} transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </div>

        {/* Theme Selector Dropdown */}
        <AnimatePresence>
          {showThemeSelector && (
            <motion.div
              className={`absolute top-full right-4 mt-2 ${currentTheme.colors.card} border rounded-2xl p-4 ${currentTheme.colors.glow} z-30 min-w-64`}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className={`font-medium ${currentTheme.colors.text} mb-3`}>Choose Theme</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(conversationThemes).map(([key, themeData]) => (
                  <motion.button
                    key={key}
                    onClick={() => {
                      setSelectedTheme(key);
                      setShowThemeSelector(false);
                    }}
                    className={`p-3 rounded-xl border transition-all ${
                      selectedTheme === key 
                        ? `${themeData.colors.accent} text-white` 
                        : `${currentTheme.colors.card} ${currentTheme.colors.text} hover:${themeData.colors.glow}`
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-1">{themeData.emoji}</div>
                    <div className="text-sm font-medium">{themeData.name}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Messages with Enhanced Styling */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <AnimatePresence>
            {chatHistory.length === 0 && (
              <motion.div 
                className="text-center py-8 md:py-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl md:rounded-3xl bg-gradient-to-r ${models[selectedModel].color} ${currentTheme.colors.glow} flex items-center justify-center mb-4 md:mb-6`}>
                  <span className="text-white text-2xl md:text-3xl">{models[selectedModel].emoji}</span>
                </div>
                <h3 className={`text-xl md:text-2xl font-light ${currentTheme.colors.text} mb-2 md:mb-3`}>
                  Hi, I'm {models[selectedModel].name}
                </h3>
                <p className={`${currentTheme.colors.textSecondary} max-w-md mx-auto text-base md:text-lg px-4`}>
                  {models[selectedModel].description}. How can I help you today?
                </p>

                {/* Quick Action Suggestions */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto px-4">
                  {Object.entries(suggestionCategories).map(([key, category]) => (
                    <motion.button
                      key={key}
                      onClick={() => setMessage(category.prompts[0])}
                      className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white hover:shadow-lg transition-all`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl mb-2">{category.emoji}</div>
                      <div className="text-sm font-medium">{category.name}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
            
            {chatHistory.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="relative">
                  <div
                    className={`max-w-[85%] md:max-w-[75%] rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 relative ${
                      msg.role === 'user'
                        ? currentTheme.colors.userBubble + ' text-white shadow-lg'
                        : currentTheme.colors.aiBubble + ' ' + currentTheme.colors.text + ' border'
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    <div className={`text-xs mt-2 md:mt-3 ${
                      msg.role === 'user' ? 'text-white/70' : currentTheme.colors.textSecondary
                    }`}>
                      {msg.timestamp?.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>

                    {/* Message Actions */}
                    {msg.role === 'assistant' && (
                      <div className="absolute -bottom-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          onClick={() => setMessageReactionMenu(messageReactionMenu === index ? null : index)}
                          className="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg border"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Smile className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Reaction Menu */}
                  <AnimatePresence>
                    {messageReactionMenu === index && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-xl border flex space-x-1 z-30"
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      >
                        {Object.entries(messageReactions).map(([key, reaction]) => (
                          <motion.button
                            key={key}
                            onClick={() => handleReaction(index, key)}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            title={reaction.label}
                          >
                            <span className="text-lg">{reaction.emoji}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${currentTheme.colors.aiBubble} border rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center space-x-2 md:space-x-3`}>
                  <span className="text-base md:text-lg">{models[selectedModel].emoji}</span>
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full`}
                        style={{ backgroundColor: currentTheme.colors.textSecondary.replace('text-', '') }}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1.2, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Input with Auto-suggestions */}
      <motion.div 
        className={`${currentTheme.colors.card} border-t backdrop-blur-xl px-4 md:px-6 py-4 md:py-6 relative z-20`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Auto-suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              className="mb-3 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {autoSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className={`px-3 py-1 rounded-full text-sm ${currentTheme.colors.card} ${currentTheme.colors.text} border hover:${currentTheme.colors.glow} transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto flex items-end space-x-3 md:space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`w-full ${currentTheme.colors.card} ${currentTheme.colors.text} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 pr-12 md:pr-14 border backdrop-blur-sm resize-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-base placeholder-opacity-60`}
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <motion.button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className={`bg-gradient-to-r ${currentTheme.colors.accent} p-3 md:p-4 rounded-xl md:rounded-2xl text-white ${currentTheme.colors.glow} hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
            whileHover={{ scale: message.trim() ? 1.05 : 1 }}
            whileTap={{ scale: message.trim() ? 0.95 : 1 }}
          >
            <Send className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </motion.div>

      {/* Click outside to close menus */}
      {(showThemeSelector || messageReactionMenu !== null) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setShowThemeSelector(false);
            setMessageReactionMenu(null);
          }} 
        />
      )}
    </div>
  );
};

export default EnhancedChatInterface;
