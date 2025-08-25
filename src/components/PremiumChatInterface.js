// AURA AI - VIRAL CHAT REVOLUTION 🚀
// The Instagram of AI Apps - Liquid Animations & TikTok Engagement

import React, { useState, useRef, useEffect } from 'react';
import '../viral-animations.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Menu, 
  Heart, 
  Brain, 
  Sparkles, 
  RotateCcw, 
  Share, 
  Copy, 
  Star,
  Mic,
  Image as ImageIcon,
  MoreHorizontal,
  Zap,
  Volume2,
  VolumeX
} from 'lucide-react';
import { createPremiumTheme, premiumModels, getTimeOfDay, detectUserMood } from '../utils/premiumDesignSystem';
import { 
  detectEmotionalContext, 
  classifyConversationTopic,
  generateConversationInsights,
  saveConversationWithIntelligence
} from '../utils/conversationIntelligence';

const PremiumChatInterface = ({
  chatHistory,
  message,
  setMessage,
  sendMessage,
  isTyping,
  selectedModel,
  setSelectedModel,
  models,
  onMenuClick,
  handleKeyPress,
  userTier,
  dailyMessageCount,
  subscriptionTiers,
  startNewConversation,
  user,
  isDarkMode
}) => {
  // 🔥 VIRAL STATE MANAGEMENT
  const [isRecording, setIsRecording] = useState(false);
  const [showReactions, setShowReactions] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [conversationMood, setConversationMood] = useState('neutral');
  const [showConversationInsights, setShowConversationInsights] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  
  // 🚀 VIRAL FEATURES
  const [isShaking, setIsShaking] = useState(false);
  const [liquidBackground, setLiquidBackground] = useState('default');
  const [messageStreak, setMessageStreak] = useState(0);
  const [viralMode, setViralMode] = useState(false);
  const [particleExplosion, setParticleExplosion] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // 🎯 VIRAL GESTURE DETECTION
  useEffect(() => {
    let shakeThreshold = 15;
    let lastX, lastY, lastZ;
    let lastTime = 0;

    const handleDeviceMotion = (event) => {
      const now = Date.now();
      if (now - lastTime < 100) return;
      
      const { x, y, z } = event.accelerationIncludingGravity || {};
      if (!x || !y || !z) return;

      const deltaX = Math.abs(x - (lastX || 0));
      const deltaY = Math.abs(y - (lastY || 0));
      const deltaZ = Math.abs(z - (lastZ || 0));

      if (deltaX + deltaY + deltaZ > shakeThreshold) {
        triggerViralSurprise();
      }

      lastX = x; lastY = y; lastZ = z; lastTime = now;
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, []);

  // 🔥 VIRAL SURPRISE TRIGGER
  const triggerViralSurprise = () => {
    setIsShaking(true);
    setParticleExplosion(true);
    setViralMode(true);
    setLiquidBackground('party');
    
    // Send surprise message
    if (sendMessage) {
      setMessage("🎉 Surprise me with something amazing!");
      setTimeout(() => sendMessage(), 500);
    }

    setTimeout(() => {
      setIsShaking(false);
      setParticleExplosion(false);
      setViralMode(false);
      setLiquidBackground('default');
    }, 3000);
  };
  
  const timeOfDay = getTimeOfDay();
  const userMood = detectUserMood(chatHistory);
  const theme = createPremiumTheme(isDarkMode, timeOfDay, userMood);
  const currentModel = premiumModels[selectedModel] || premiumModels.aura;

  // Auto-scroll to bottom with smooth animation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // Update conversation mood based on recent messages
  useEffect(() => {
    if (chatHistory.length > 0) {
      const recentMood = detectUserMood(chatHistory.slice(-3));
      setConversationMood(recentMood);
    }
  }, [chatHistory]);

  // Enhanced message sending with intelligence
  const handleSendMessage = async () => {
    if (!message.trim() || isTyping) return;

    // Detect emotional context and topic
    const emotionalContext = detectEmotionalContext(message, chatHistory);
    const topicClassification = classifyConversationTopic(message, chatHistory);

    // Create enhanced user message
    const enhancedMessage = {
      ...message,
      emotionalTone: emotionalContext.emotion,
      topic: topicClassification.primaryTopic,
      confidence: emotionalContext.confidence,
      urgency: emotionalContext.context.urgency
    };

    // Send message with enhanced context
    await sendMessage(enhancedMessage);
    
    // Save conversation with intelligence
    if (chatHistory.length > 0) {
      saveConversationWithIntelligence(chatHistory, selectedModel, user?.uid || 'guest');
    }
  };

  // Voice recording functionality (placeholder for future implementation)
  const handleVoiceRecording = () => {
    if (userTier === 'explorer') {
      // Show upgrade prompt
      return;
    }
    setIsRecording(!isRecording);
    // TODO: Implement actual voice recording
  };

  // File upload functionality
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // TODO: Handle file upload (images, documents)
      console.log('File uploaded:', file.name);
    }
  };

  // Message reactions
  const handleMessageReaction = (messageId, reaction) => {
    // TODO: Save message reaction
    setShowReactions(null);
    console.log(`Reacted to message ${messageId} with ${reaction}`);
  };

  // Copy message content
  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    // TODO: Show toast notification
  };

  // Share conversation
  const shareConversation = () => {
    // TODO: Generate shareable conversation card
    console.log('Sharing conversation...');
  };

  // Regenerate AI response
  const regenerateResponse = (messageIndex) => {
    // TODO: Regenerate the AI response for this message
    console.log(`Regenerating response for message ${messageIndex}`);
  };

  // Get conversation insights
  const insights = generateConversationInsights(chatHistory);

  // Floating particles based on conversation mood
  const moodParticles = {
    excited: ['✨', '🌟', '💫', '⭐'],
    creative: ['💡', '🎨', '🌈', '✨'],
    peaceful: ['🕯️', '🌙', '💙', '🦋'],
    supportive: ['💝', '🤗', '💕', '🌸'],
    neutral: ['💭', '🌟', '✨', '💫']
  };

  const particles = moodParticles[conversationMood] || moodParticles.neutral;

  return (
    <div className={`h-screen ${theme.colors.bg} flex flex-col relative overflow-hidden ${isShaking ? 'viral-shake' : ''}`}>
      {/* 🌊 VIRAL LIQUID BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Mood Background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: liquidBackground === 'party' 
              ? 'linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #ff6b6b)'
              : 'linear-gradient(-45deg, rgba(26,26,46,0.3), rgba(22,33,62,0.3), rgba(26,26,46,0.3))',
          }}
          transition={{ duration: 2 }}
          style={{
            backgroundSize: '400% 400%',
            animation: liquidBackground === 'party' 
              ? 'gradient-party 3s ease infinite' 
              : 'gradient-flow 8s ease infinite'
          }}
        />
        
        {/* Viral Particle Explosion */}
        {particleExplosion && (
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2, 0],
                  opacity: [0, 1, 0],
                  y: [0, -120],
                  x: [0, (Math.random() - 0.5) * 200]
                }}
                transition={{ 
                  duration: 2.5,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Enhanced Floating Particles */}
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${15 + (i * 8)}%`,
              top: `${20 + (i * 7)}%`,
              filter: viralMode ? 'hue-rotate(90deg) saturate(2) drop-shadow(0 0 10px currentColor)' : 'none'
            }}
            animate={{
              y: viralMode ? [-10, -40, -10] : [-10, -20, -10],
              x: viralMode ? [-10, 10, -10] : [-5, 5, -5],
              rotate: [0, 180, 360],
              scale: viralMode ? [0.8, 1.8, 0.8] : [0.8, 1.2, 0.8],
              opacity: viralMode ? [0.6, 1, 0.6] : [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: viralMode ? 1.5 : (6 + i),
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {particles[i % particles.length]}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className={`relative z-10 ${theme.colors.glass.primary} border-b border-white/10 px-4 md:px-6 py-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            {/* AI Avatar */}
            <motion.div 
              className={`w-12 h-12 ${theme.radius.lg} bg-gradient-to-r ${currentModel.color} flex items-center justify-center ${theme.shadows.glow.md} relative`}
              whileHover={{ scale: 1.05 }}
              animate={theme.animations.breathe.animate}
            >
              <span className="text-xl">{currentModel.emoji}</span>
              {isTyping && (
                <motion.div
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* AI Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h1 className={`font-semibold ${theme.colors.text.primary} text-lg truncate`}>
                  {currentModel.name}
                </h1>
                {currentModel.tier === 'premium' && (
                  <div className="px-2 py-0.5 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs rounded-full">
                    Premium
                  </div>
                )}
              </div>
              <p className={`text-sm ${theme.colors.text.secondary} truncate`}>
                {isTyping ? 'Thinking...' : currentModel.subtitle}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-2">
            {/* Conversation Insights */}
            {insights && (
              <motion.button
                onClick={() => setShowConversationInsights(!showConversationInsights)}
                className={`p-2 ${theme.radius.md} ${theme.colors.interactive.button}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Conversation Insights"
              >
                <Brain className="w-5 h-5" />
              </motion.button>
            )}

            {/* Voice Toggle */}
            <motion.button
              onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
              className={`p-2 ${theme.radius.md} ${theme.colors.interactive.button}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isSpeechEnabled ? 'Disable Speech' : 'Enable Speech'}
            >
              {isSpeechEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </motion.button>

            {/* Share Conversation */}
            <motion.button
              onClick={shareConversation}
              className={`p-2 ${theme.radius.md} ${theme.colors.interactive.button}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Share Conversation"
            >
              <Share className="w-5 h-5" />
            </motion.button>

            {/* Menu */}
            <motion.button
              onClick={onMenuClick}
              className={`p-2 ${theme.radius.md} ${theme.colors.interactive.button}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Conversation Insights Panel */}
        <AnimatePresence>
          {showConversationInsights && insights && (
            <motion.div
              className={`mt-4 ${theme.colors.glass.secondary} ${theme.radius.lg} p-4`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className={`text-xs ${theme.colors.text.tertiary}`}>Mood</p>
                  <p className={`font-medium ${theme.colors.text.primary} capitalize`}>
                    {insights.emotionalJourney.dominant}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${theme.colors.text.tertiary}`}>Topic</p>
                  <p className={`font-medium ${theme.colors.text.primary} capitalize`}>
                    {insights.topicAnalysis.dominant}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${theme.colors.text.tertiary}`}>Depth</p>
                  <p className={`font-medium ${theme.colors.text.primary} capitalize`}>
                    {insights.conversationDepth}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${theme.colors.text.tertiary}`}>Engagement</p>
                  <p className={`font-medium ${theme.colors.text.primary}`}>
                    {insights.engagement}%
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome State */}
          {chatHistory.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className={`w-24 h-24 mx-auto mb-6 ${theme.radius.xl} bg-gradient-to-r ${currentModel.color} flex items-center justify-center ${theme.shadows.glow.lg}`}
                animate={theme.animations.breathe.animate}
              >
                <span className="text-4xl">{currentModel.emoji}</span>
              </motion.div>
              
              <h2 className={`${theme.typography.headline} ${theme.colors.text.primary} mb-3`}>
                Hi, I'm {currentModel.name}
              </h2>
              
              <p className={`${theme.typography.body} ${theme.colors.text.secondary} max-w-lg mx-auto mb-8`}>
                {currentModel.description}. I remember our conversations and adapt to your communication style.
              </p>

              {/* Quick Starters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  "I've been feeling overwhelmed lately",
                  "Help me brainstorm creative ideas",
                  "I want to talk about my goals",
                  "I need some encouragement today"
                ].map((starter, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setMessage(starter)}
                    className={`${theme.colors.card.interactive} ${theme.radius.lg} p-4 text-left group`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`${theme.colors.text.primary} group-hover:${theme.colors.text.accent} transition-colors`}>
                        {starter}
                      </span>
                      <Sparkles className={`w-4 h-4 ${theme.colors.text.tertiary} group-hover:text-cyan-400 transition-colors`} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chat Messages */}
          <AnimatePresence>
            {chatHistory.map((msg, index) => (
              <motion.div
                key={msg.id || index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group cursor-pointer`}
                initial={{ opacity: 0, y: 50, scale: 0.3, rotateX: -90 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  rotateX: 0,
                  ...(viralMode && {
                    scale: [1, 1.1, 1],
                    rotateZ: [-2, 2, -2, 0],
                  })
                }}
                transition={{ 
                  duration: viralMode ? 0.8 : 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  bounce: viralMode ? 0.6 : 0.4
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onDoubleClick={() => setShowReactions(index)}
              >
                <div className={`max-w-[85%] md:max-w-[75%] relative`}>
                  {/* Message Bubble */}
                  <motion.div
                    className={`${theme.radius.lg} px-6 py-4 relative ${
                      msg.role === 'user'
                        ? `${theme.colors.accent.primary} text-white ${theme.shadows.glow.md}`
                        : `${theme.colors.card.primary} ${theme.colors.text.primary} backdrop-blur-xl`
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* AI Message Header */}
                    {msg.role === 'assistant' && msg.mood && (
                      <div className="flex items-center space-x-2 mb-3 opacity-70">
                        <div className="flex items-center space-x-1 text-xs">
                          {msg.mood === 'supportive' && <Heart className="w-3 h-3" />}
                          {msg.mood === 'encouraging' && <Zap className="w-3 h-3" />}
                          {msg.mood === 'empathetic' && <Brain className="w-3 h-3" />}
                          {msg.mood === 'thoughtful' && <Sparkles className="w-3 h-3" />}
                          <span className="capitalize">{msg.mood}</span>
                        </div>
                        {msg.topic && (
                          <>
                            <span>•</span>
                            <span className="text-xs capitalize">{msg.topic?.replace('_', ' ') || 'general'}</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Message Content */}
                    <p className={`${theme.typography.body} leading-relaxed whitespace-pre-wrap`}>
                      {msg.content}
                    </p>

                    {/* Message Footer */}
                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-xs opacity-60`}>
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : ''}
                      </span>

                      {/* Message Actions */}
                      {msg.role === 'assistant' && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
                          <motion.button
                            onClick={() => setShowReactions(showReactions === msg.id ? null : msg.id)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart className="w-3 h-3" />
                          </motion.button>
                          
                          <motion.button
                            onClick={() => copyMessage(msg.content)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Copy className="w-3 h-3" />
                          </motion.button>
                          
                          <motion.button
                            onClick={() => regenerateResponse(index)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <RotateCcw className="w-3 h-3" />
                          </motion.button>
                        </div>
                      )}
                    </div>

                    {/* Reaction Menu */}
                    <AnimatePresence>
                      {showReactions === msg.id && (
                        <motion.div
                          className={`absolute top-full mt-2 left-0 ${theme.colors.glass.primary} ${theme.radius.lg} p-2 flex space-x-2 ${theme.shadows.elevated.md}`}
                          initial={{ opacity: 0, scale: 0.8, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {['❤️', '👍', '🤯', '💡', '🙏'].map((emoji, i) => (
                            <motion.button
                              key={i}
                              onClick={() => handleMessageReaction(msg.id, emoji)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${theme.colors.card.primary} ${theme.radius.lg} px-6 py-4 flex items-center space-x-3`}>
                  <div className={`w-8 h-8 ${theme.radius.md} bg-gradient-to-r ${currentModel.color} flex items-center justify-center`}>
                    <span className="text-sm">{currentModel.emoji}</span>
                  </div>
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 ${theme.colors.accent.primary} rounded-full`}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1.5,
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

      {/* Input Area */}
      <motion.div
        className={`relative z-10 ${theme.colors.glass.primary} border-t border-white/10 px-4 md:px-6 py-4`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Usage Indicator for Free Users */}
          {userTier === 'explorer' && (
            <div className="mb-4 text-center">
              <div className={`inline-flex items-center px-3 py-1 ${theme.radius.md} ${theme.colors.glass.secondary} text-sm`}>
                <span className={`${theme.colors.text.tertiary}`}>
                  {dailyMessageCount}/{subscriptionTiers?.[userTier]?.limit || '∞'} messages today
                </span>
                {subscriptionTiers?.[userTier]?.limit && dailyMessageCount >= (subscriptionTiers?.[userTier]?.limit || 0) * 0.8 && (
                  <span className={`ml-2 px-2 py-0.5 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs ${theme.radius.sm}`}>
                    Upgrade for unlimited
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Input Container */}
          <div className="flex items-end space-x-3">
            {/* File Upload */}
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className={`p-3 ${theme.radius.lg} ${theme.colors.interactive.button} flex-shrink-0`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Upload file"
            >
              <ImageIcon className="w-5 h-5" />
            </motion.button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className={`w-full ${theme.colors.interactive.input} ${theme.radius.lg} px-6 py-4 pr-12 resize-none focus:ring-2 focus:ring-cyan-400/50 transition-all ${theme.typography.body}`}
                rows={1}
                style={{ minHeight: '56px', maxHeight: '120px' }}
              />
            </div>

            {/* Voice Input */}
            <motion.button
              onClick={handleVoiceRecording}
              className={`p-3 ${theme.radius.lg} ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : theme.colors.interactive.button
              } flex-shrink-0`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={userTier === 'explorer' ? 'Premium feature' : 'Voice input'}
            >
              <Mic className="w-5 h-5" />
            </motion.button>

            {/* 🚀 VIRAL SEND BUTTON */}
            <motion.button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className={`p-3 ${theme.radius.lg} ${
                message.trim() && !isTyping
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 shadow-lg shadow-purple-500/50'
                  : theme.colors.interactive.disabled
              } text-white transition-all duration-300 flex-shrink-0 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
              whileHover={{ 
                scale: message.trim() ? 1.1 : 1,
                rotate: message.trim() ? [0, -3, 3, 0] : 0,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: message.trim() ? 0.9 : 1 }}
              animate={message.trim() ? {
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                  '0 0 30px rgba(236, 72, 153, 0.6)',
                  '0 0 20px rgba(168, 85, 247, 0.4)'
                ]
              } : {}}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Liquid ripple effect */}
              {message.trim() && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <Send className="w-5 h-5 relative z-10" />
            </motion.button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumChatInterface;
