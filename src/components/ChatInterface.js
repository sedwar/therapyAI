import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu } from 'lucide-react';

const ChatInterface = ({ 
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className={`h-screen ${theme.colors.bg} flex flex-col`}>
      {/* Header */}
      <motion.header 
        className={`${theme.colors.card} border-b backdrop-blur-xl px-4 md:px-6 py-3 md:py-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-r ${models[selectedModel].color} flex items-center justify-center ${theme.shadows.glow} flex-shrink-0`}>
              <span className="text-white text-lg md:text-xl">{models[selectedModel].emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className={`font-medium ${theme.colors.text} text-base md:text-lg truncate`}>
                {models[selectedModel].name}
                {models[selectedModel].tier === 'premium' && (
                  <span className="ml-1 md:ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 md:px-2 py-0.5 rounded-full text-xs">
                    Premium
                  </span>
                )}
              </h1>
              <p className={`text-xs md:text-sm ${theme.colors.textSecondary} truncate`}>
                {models[selectedModel].description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            {/* Model Selector - Hidden on Mobile, shown in menu instead */}
            <select
              value={selectedModel}
              onChange={(e) => {
                const newModel = e.target.value;
                // Check if user can access premium models
                if (models[newModel].tier === 'premium' && userTier === 'free') {
                  // Could show upgrade prompt here
                  return;
                }
                setSelectedModel(newModel);
              }}
              className={`hidden md:block ${theme.colors.input} rounded-xl px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm border backdrop-blur-sm focus:ring-2 focus:ring-cyan-500/50`}
            >
              {Object.entries(models).map(([key, model]) => (
                <option 
                  key={key} 
                  value={key}
                  disabled={model.tier === 'premium' && userTier === 'free'}
                >
                  {model.emoji} {model.name} {model.tier === 'premium' ? '(Premium)' : ''}
                </option>
              ))}
            </select>
            
            {/* Usage Indicator for Free Users */}
            {userTier === 'free' && (
              <div className={`text-xs ${theme.colors.textMuted} px-2 hidden md:block`}>
                {dailyMessageCount}/{subscriptionTiers[userTier].limit}
              </div>
            )}
            
            {/* Menu */}
            <motion.button
              onClick={onMenuClick}
              className={`p-2 md:p-2 rounded-xl ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-8">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
          <AnimatePresence>
            {chatHistory.length === 0 && (
              <motion.div 
                className="text-center py-8 md:py-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl md:rounded-3xl bg-gradient-to-r ${models[selectedModel].color} ${theme.shadows.glow} flex items-center justify-center mb-4 md:mb-6`}>
                  <span className="text-white text-2xl md:text-3xl">{models[selectedModel].emoji}</span>
                </div>
                <h3 className={`text-xl md:text-2xl font-light ${theme.colors.text} mb-2 md:mb-3`}>
                  Hi, I'm {models[selectedModel].name}
                </h3>
                <p className={`${theme.colors.textSecondary} max-w-md mx-auto text-base md:text-lg px-4`}>
                  {models[selectedModel].description}. How can I help you today?
                </p>
              </motion.div>
            )}
            
            {chatHistory.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 ${
                    msg.role === 'user'
                      ? `${theme.colors.accent} text-white ${theme.shadows.glow}`
                      : `${theme.colors.card} border ${theme.colors.text} backdrop-blur-xl`
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                  <div className={`text-xs mt-2 md:mt-3 ${
                    msg.role === 'user' ? 'text-white/70' : theme.colors.textMuted
                  }`}>
                    {msg.timestamp?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
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
                <div className={`${theme.colors.card} border rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center space-x-2 md:space-x-3 backdrop-blur-xl`}>
                  <span className="text-base md:text-lg">{models[selectedModel].emoji}</span>
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-400 rounded-full"
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

      {/* Input */}
      <motion.div 
        className={`${theme.colors.card} border-t backdrop-blur-xl px-4 md:px-6 py-4 md:py-6`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto flex items-end space-x-3 md:space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`w-full ${theme.colors.input} rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 pr-12 md:pr-14 border backdrop-blur-sm resize-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-base`}
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <motion.button
            onClick={sendMessage}
            disabled={!message.trim() || isTyping}
            className={`${theme.colors.accent} p-3 md:p-4 rounded-xl md:rounded-2xl text-white ${theme.shadows.glow} hover:${theme.shadows.glowLg} transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
            whileHover={{ scale: message.trim() ? 1.05 : 1 }}
            whileTap={{ scale: message.trim() ? 0.95 : 1 }}
          >
            <Send className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;
