// AURA AI - Million Dollar ChatGPT Wrapper
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  X, 
  LogOut,
  Heart
} from 'lucide-react';
import { auth, googleProvider } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createPremiumTheme, premiumModels, premiumSubscriptions, getTimeOfDay, detectUserMood } from './utils/premiumDesignSystem';
import { 
  detectEmotionalContext, 
  classifyConversationTopic, 
  generateContextualResponse,
  saveConversationWithIntelligence,
  detectConversationTopic,
  generateConversationTitle
} from './utils/conversationIntelligence';
import PremiumLandingPage from './components/PremiumLandingPage';
import PremiumChatInterface from './components/PremiumChatInterface';
import HomeDashboard from './components/HomeDashboard';
import Journal from './components/Journal';
import UpgradeScreen from './components/UpgradeScreen';

const App = () => {
  // Core State
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing'); // landing, auth, home, chat, journal, upgrade
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState('aura');
  
  // Premium State
  const [userTier] = useState('explorer'); // explorer, visionary, genius - setUserTier for future subscription upgrades
  const [dailyMessageCount, setDailyMessageCount] = useState(0);
  
  // Auth State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('signin');
  
  // UI State
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const messagesEndRef = useRef(null);
  
  // Premium Theme system with time and mood awareness
  const timeOfDay = getTimeOfDay();
  const userMood = detectUserMood(chatHistory);
  const theme = createPremiumTheme(isDarkMode, timeOfDay, userMood);
  
  // Auth Functions
  const handleEmailAuth = async () => {
    try {
      const authFunction = authMode === 'signup' 
        ? createUserWithEmailAndPassword 
        : signInWithEmailAndPassword;
      
      const cred = await authFunction(auth, email, password);
      setUser({ email: cred.user.email });
      setCurrentScreen('home');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Auth error:', error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser({ email: result.user.email });
      setCurrentScreen('home');
    } catch (error) {
      console.error('Google auth error:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCurrentScreen('landing');
      setChatHistory([]);
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  // Chat Functions
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    // Check subscription limits
    const currentTier = premiumSubscriptions[userTier];
    if (currentTier.limit && dailyMessageCount >= currentTier.limit) {
      // Show upgrade prompt
      setCurrentScreen('upgrade');
      return;
    }
    
    // Check if model requires premium
    const selectedModelData = premiumModels[selectedModel];
    if (selectedModelData.tier === 'premium' && userTier === 'free') {
      // Switch to free model or show upgrade
      setSelectedModel('aura');
      return;
    }
    
    const userMessage = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
      model: selectedModel,
      id: Date.now() + Math.random()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Increment message count for free users
    if (userTier === 'explorer') {
      setDailyMessageCount(prev => prev + 1);
    }
    
    // Enhanced AI response with conversation intelligence
    setTimeout(() => {
      const modelData = premiumModels[selectedModel];
      
      // Advanced emotional and topic analysis
      const emotionalContext = detectEmotionalContext(userMessage.content, chatHistory);
      const topicClassification = classifyConversationTopic(userMessage.content, chatHistory);
      
      const intelligentResponse = generateContextualResponse(
        userMessage.content, 
        modelData, 
        topicClassification.primaryTopic, 
        emotionalContext.emotion, 
        chatHistory.slice(-4)
      );
      
      const response = {
        role: 'assistant',
        content: intelligentResponse.content,
        timestamp: new Date(),
        model: selectedModel,
        topic: topicClassification.primaryTopic,
        mood: intelligentResponse.tone || 'thoughtful',
        emotionalTone: emotionalContext.emotion,
        confidence: emotionalContext.confidence,
        urgency: emotionalContext.context.urgency,
        id: Date.now() + Math.random()
      };
      
      const finalHistory = [...chatHistory, userMessage, response];
      setChatHistory(finalHistory);
      
      // Save conversation with advanced intelligence
      saveConversationWithIntelligence(finalHistory, selectedModel, user?.uid || 'guest');
      
      setIsTyping(false);
    }, selectedModelData.tier === 'premium' ? 2000 : 1500);
  };



  // Load conversation history on app start
  const loadConversationHistory = () => {
    try {
      const savedConversation = localStorage.getItem('aura_current_conversation');
      if (savedConversation) {
        const conversation = JSON.parse(savedConversation);
        // Ensure timestamps are proper Date objects
        const history = (conversation.history || []).map(msg => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
        }));
        setChatHistory(history);
        setSelectedModel(conversation.model || 'aura');
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Load conversation history on app start
  useEffect(() => {
    loadConversationHistory();
  }, [user]);

  // Start new conversation
  const startNewConversation = () => {
    setChatHistory([]);
    localStorage.removeItem('aura_current_conversation');
    localStorage.removeItem('aura_conversations');
    setCurrentScreen('chat');
  };

  // Load specific conversation
  const loadConversation = (conversation) => {
    // Ensure timestamps are proper Date objects
    const history = (conversation.history || []).map(msg => ({
      ...msg,
      timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
    }));
    setChatHistory(history);
    setSelectedModel(conversation.model || 'aura');
    localStorage.setItem('aura_current_conversation', JSON.stringify(conversation));
  };

  // Landing Page
  if (currentScreen === 'landing') {
    return (
      <PremiumLandingPage
        onGetStarted={() => setCurrentScreen('auth')}
        onGuestAccess={() => {
          setUser({ email: 'guest', uid: 'guest' });
          setCurrentScreen('home');
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    );
  }

  // Auth Screen
  if (currentScreen === 'auth') {
    return (
      <div className={`min-h-screen ${theme.colors.bg} flex items-center justify-center px-4 py-8`}>
        <motion.div 
          className="max-w-sm w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="text-center mb-6 md:mb-8">
            <h2 className={`text-2xl md:text-3xl font-light ${theme.colors.text} mb-2 md:mb-3`}>
              {authMode === 'signin' ? 'Welcome back' : 'Join AURA AI'}
            </h2>
            <p className={`${theme.colors.textSecondary} text-base md:text-lg`}>
              {authMode === 'signin' ? 'Sign in to continue' : 'Create your account'}
            </p>
          </motion.div>

          <motion.div 
            className={`${theme.colors.card} border rounded-2xl md:rounded-3xl p-6 md:p-8 ${theme.shadows.glow}`}
            layout
          >
            <div className="space-y-4 md:space-y-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-4 md:p-4 rounded-xl md:rounded-2xl border ${theme.colors.input} backdrop-blur-sm transition-all focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-base md:text-sm`}
              />
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEmailAuth()}
                className={`w-full p-4 md:p-4 rounded-xl md:rounded-2xl border ${theme.colors.input} backdrop-blur-sm transition-all focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-base md:text-sm`}
              />
              
              <motion.button
                onClick={handleEmailAuth}
                className={`w-full ${theme.colors.accent} text-white p-4 md:p-4 rounded-xl md:rounded-2xl font-medium ${theme.shadows.glow} hover:${theme.shadows.glowLg} transition-all text-base md:text-sm`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </motion.button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`${theme.colors.bg} px-3 ${theme.colors.textMuted}`}>or</span>
                </div>
              </div>
              
              <motion.button
                onClick={handleGoogleAuth}
                className={`w-full ${theme.colors.card} border p-4 rounded-2xl font-medium hover:${theme.shadows.glow} transition-all flex items-center justify-center space-x-3`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="w-5 h-5"
                />
                <span className={theme.colors.text}>Continue with Google</span>
              </motion.button>
              
              <div className="text-center pt-4">
                <button
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className={`${theme.colors.textMuted} text-sm hover:${theme.colors.textSecondary} transition-colors`}
                >
                  {authMode === 'signin' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentScreen('landing')}
              className={`${theme.colors.textMuted} text-sm hover:${theme.colors.textSecondary} transition-colors`}
            >
              ← Back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Home Dashboard
  if (currentScreen === 'home') {
    return (
              <HomeDashboard
          theme={theme}
          user={user}
          onStartChat={(prompt = '') => {
            console.log('onStartChat called with prompt:', prompt);
            try {
              if (prompt && prompt.trim()) {
                setMessage(prompt.trim());
              }
              setCurrentScreen('chat');
            } catch (error) {
              console.error('Error in onStartChat:', error);
            }
          }}
          onLoadConversation={loadConversation}
          onOpenJournal={() => setCurrentScreen('journal')}
          onOpenUpgrade={() => setCurrentScreen('upgrade')}
          userTier={userTier}
          dailyMessageCount={dailyMessageCount}
          chatHistory={chatHistory}
          selectedModel={selectedModel}
          models={premiumModels}
        />
    );
  }

  // Journal Screen
  if (currentScreen === 'journal') {
    return (
      <Journal
        theme={theme}
        onBack={() => setCurrentScreen('home')}
        userTier={userTier}
      />
    );
  }

  // Upgrade Screen
  if (currentScreen === 'upgrade') {
    return (
      <UpgradeScreen
        theme={theme}
        onBack={() => setCurrentScreen('home')}
        currentTier={userTier}
      />
    );
  }

  // Chat Interface
  if (currentScreen === 'chat') {
    return (
      <>
        <PremiumChatInterface
          chatHistory={chatHistory}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          isTyping={isTyping}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          models={premiumModels}
          onMenuClick={() => setShowMobileMenu(true)}
          handleKeyPress={handleKeyPress}
          userTier={userTier}
          dailyMessageCount={dailyMessageCount}
          subscriptionTiers={premiumSubscriptions}
          startNewConversation={startNewConversation}
          user={user}
          isDarkMode={isDarkMode}
        />

        {/* Settings Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center md:justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
            >
              <motion.div
                className={`${theme.colors.card} border rounded-t-3xl md:rounded-3xl p-6 md:p-8 w-full md:max-w-sm ${theme.shadows.glowLg} max-h-[80vh] overflow-y-auto`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 500 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${theme.colors.text} text-lg`}>Menu</h3>
                    <button
                      onClick={() => setShowMobileMenu(false)}
                      className={`${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Navigation */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setCurrentScreen('home');
                        setShowMobileMenu(false);
                      }}
                      className="w-full text-left p-4 md:p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3"
                    >
                      <Sparkles className="w-6 h-6 md:w-5 md:h-5" />
                      <span className="text-base md:text-sm">Home</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentScreen('journal');
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left p-4 md:p-3 rounded-xl hover:${theme.colors.card} transition-colors flex items-center space-x-3 ${
                        userTier === 'free' ? 'opacity-60' : ''
                      }`}
                    >
                      <Heart className="w-6 h-6 md:w-5 md:h-5" />
                      <span className="text-base md:text-sm">Journal</span>
                      {userTier === 'free' && (
                        <div className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 md:px-2 md:py-1 rounded-full text-xs">
                          Premium
                        </div>
                      )}
                    </button>

                    {userTier === 'free' && (
                      <button
                        onClick={() => {
                          setCurrentScreen('upgrade');
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left p-4 md:p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white transition-colors flex items-center space-x-3"
                      >
                        <Sparkles className="w-6 h-6 md:w-5 md:h-5" />
                        <span className="text-base md:text-sm">Upgrade to Premium</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-300/30 pt-4 space-y-4">
                    {/* Subscription Status */}
                    <div className="text-center">
                      <div className={`text-sm ${theme.colors.textMuted} mb-1`}>Current Plan</div>
                                                    <div className={`font-medium ${theme.colors.text}`}>
                                {premiumSubscriptions[userTier].name}
                              </div>
                              {userTier === 'free' && (
                                <div className={`text-xs ${theme.colors.textMuted} mt-1`}>
                                  {dailyMessageCount}/{premiumSubscriptions[userTier].limit} messages today
                                </div>
                              )}
                    </div>
                    
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between">
                      <span className={`${theme.colors.text} font-medium`}>Dark Mode</span>
                      <motion.button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-14 h-8 rounded-full transition-colors ${
                          isDarkMode ? 'bg-cyan-500' : 'bg-slate-300'
                        }`}
                        layout
                      >
                        <motion.div 
                          className="w-6 h-6 bg-white rounded-full shadow-lg"
                          animate={{ x: isDarkMode ? 28 : 4 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                    
                    {user?.email !== 'guest' && (
                      <button
                        onClick={handleSignOut}
                        className={`w-full ${theme.colors.textSecondary} hover:${theme.colors.text} text-left transition-colors flex items-center space-x-3`}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return null;
};

export default App;