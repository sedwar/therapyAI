// 🌌 AURA AI - Revolutionary AI Companion
import React, { useState, useEffect, useRef } from 'react';
import './ui/animations/cinematicAnimations.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  X
} from 'lucide-react';
import { auth, googleProvider } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createCinematicTheme } from './ui/themes/cinematicDesign';
import { premiumModels } from './core/utils/aiModels';
import { getAIResponse } from './services/openaiService';
// Revolutionary cinematic components
import CinematicDashboard from './components/CinematicDashboard';
import EnhancedChatInterface from './components/EnhancedChatInterface';
import PremiumUpgrade from './components/PremiumUpgrade';
import Journal from './components/Journal';

const App = () => {
  // Core State
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home'); // home, auth, chat, journal, upgrade
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('aura');
  
  // Premium State
  const [userTier] = useState('explorer'); // explorer, visionary, genius - setUserTier for future subscription upgrades
  const [dailyMessageCount, setDailyMessageCount] = useState(0);
  
  // Auth State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('signin');
  
  // Conversation Management
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);

  const messagesEndRef = useRef(null);
  
  // Cinematic Theme system - Ultra modern
  const theme = createCinematicTheme('dark', 'default');
  
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

  // Daily Message Tracking
  const updateDailyMessageCount = () => {
    const today = new Date().toDateString();
    const newCount = dailyMessageCount + 1;
    setDailyMessageCount(newCount);
    localStorage.setItem('dailyMessageData', JSON.stringify({
      date: today,
      count: newCount
    }));
  };

  const getRemainingMessages = () => {
    const limits = { explorer: 10, visionary: 50, genius: Infinity };
    const limit = limits[userTier] || 10;
    return limit === Infinity ? Infinity : Math.max(0, limit - dailyMessageCount);
  };

  // Conversation Management Functions
  const handleNewConversation = () => {
    // Save current conversation if it exists
    if (chatHistory.length > 0 && currentConversationId) {
      const updatedConversations = conversations.map(conv => 
        conv.id === currentConversationId 
          ? { ...conv, history: chatHistory, lastActive: new Date().toISOString() }
          : conv
      );
      setConversations(updatedConversations);
    }
    
    // Create new conversation
    const newConversationId = Date.now().toString();
    const newConversation = {
      id: newConversationId, title: 'New Chat', history: [],
      createdAt: new Date().toISOString(), lastActive: new Date().toISOString(),
      pinned: false, likes: 0
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversationId);
    setChatHistory([]);
    setMessage('');
  };

  const handleSelectConversation = (conversation) => {
    if (chatHistory.length > 0 && currentConversationId) {
      const updatedConversations = conversations.map(conv => 
        conv.id === currentConversationId 
          ? { ...conv, history: chatHistory, lastActive: new Date().toISOString() }
          : conv
      );
      setConversations(updatedConversations);
    }
    setCurrentConversationId(conversation.id);
    setChatHistory(conversation.history || []);
    setMessage('');
  };

  const handleDeleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
      setChatHistory([]);
      setMessage('');
    }
  };

  const handleRenameConversation = (conversationId, newTitle) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId ? { ...conv, title: newTitle } : conv
    ));
  };

  const handleClearAllConversations = () => {
    if (window.confirm('Are you sure you want to clear all conversations? This cannot be undone.')) {
      setConversations([]);
      setCurrentConversationId(null);
      setChatHistory([]);
      setMessage('');
      localStorage.removeItem('aura_current_conversation');
      localStorage.removeItem('aura_conversations');
      localStorage.removeItem('aura_conversation_history');
    }
  };

  // Chat Functions
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    // Create new conversation if none exists
    if (!currentConversationId) {
      const newConversationId = Date.now().toString();
      const newConversation = {
        id: newConversationId, title: 'New Chat', history: [],
        createdAt: new Date().toISOString(), lastActive: new Date().toISOString(),
        pinned: false, likes: 0
      };
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newConversationId);
      setChatHistory([]);
      // Continue with sending the message instead of returning
    }
    
    // Check subscription limits
    const remainingMessages = getRemainingMessages();
    if (remainingMessages <= 0) {
      alert(`You've reached your daily limit of messages. Upgrade to send more!`);
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
    
    // Increment message count for users with limits
    if (userTier === 'explorer' || userTier === 'visionary') {
      updateDailyMessageCount();
    }
    
    // Get AI response using the enhanced service
    setTimeout(async () => {
      try {
        const aiResponse = await getAIResponse(userMessage.content, chatHistory, selectedModel, userTier);
        
        const response = {
          role: 'assistant',
          content: aiResponse.content,
          timestamp: new Date(),
          model: selectedModel,
          usage: aiResponse.usage,
          isMock: aiResponse.isMock || false,
          id: Date.now() + Math.random()
        };
        
        const finalHistory = [...chatHistory, userMessage, response];
        setChatHistory(finalHistory);
        
        // Save conversation to localStorage and update conversations list
        if (currentConversationId) {
          const conversationData = {
            id: currentConversationId,
            title: finalHistory.length <= 2 ? finalHistory[0]?.content?.substring(0, 50) + '...' : conversations.find(c => c.id === currentConversationId)?.title || 'New Chat',
            history: finalHistory,
            model: selectedModel,
            lastActive: new Date().toISOString(),
            createdAt: conversations.find(c => c.id === currentConversationId)?.createdAt || new Date().toISOString()
          };
          
          localStorage.setItem('aura_current_conversation', JSON.stringify(conversationData));
          
          // Update conversations list
          const updatedConversations = conversations.map(conv => 
            conv.id === currentConversationId ? conversationData : conv
          );
          setConversations(updatedConversations);
          localStorage.setItem('aura_conversations', JSON.stringify(updatedConversations));
        }
        
        setIsTyping(false);
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        // Fallback response on error
        const response = {
          role: 'assistant',
          content: "I'm having trouble processing that right now. Could you try rephrasing your question?",
          timestamp: new Date(),
          model: selectedModel,
          error: true,
          id: Date.now() + Math.random()
        };
        
        setChatHistory(prev => [...prev, response]);
        setIsTyping(false);
      }
    }, selectedModel === 'gpt-4' ? 2000 : 1500);
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

  // Load conversation history and conversations on app start
  useEffect(() => {
    loadConversationHistory();
    loadConversationsFromStorage();
  }, [user]);

  // Load conversations from localStorage
  const loadConversationsFromStorage = () => {
    try {
      const savedConversations = localStorage.getItem('aura_conversations');
      if (savedConversations) {
        const conversations = JSON.parse(savedConversations);
        setConversations(conversations);
        
        // If there's a current conversation, set it as active
        const currentConv = localStorage.getItem('aura_current_conversation');
        if (currentConv) {
          const current = JSON.parse(currentConv);
          setCurrentConversationId(current.id);
        }
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

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

  // Direct app entry - no landing page needed

  // Auth Screen
  if (currentScreen === 'auth') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center px-4 py-8"
        style={{
          background: theme.gradients.background.mesh,
          backgroundColor: theme.colors.bg.primary
        }}
      >
        <motion.div 
          className="max-w-sm w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-2 md:mb-3">
              {authMode === 'signin' ? 'Welcome back' : 'Join AURA AI'}
            </h2>
            <p className="text-slate-300 text-base md:text-lg">
              {authMode === 'signin' ? 'Sign in to continue' : 'Create your account'}
            </p>
          </motion.div>

          <motion.div 
            className="border rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-xl"
            style={{
              background: theme.gradients.glass.primary,
              backgroundColor: 'rgba(17, 17, 17, 0.8)',
              borderColor: 'rgba(20, 184, 166, 0.3)',
              boxShadow: theme.shadows.glass.lg
            }}
            layout
          >
            <div className="space-y-4 md:space-y-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 md:p-4 rounded-xl md:rounded-2xl border backdrop-blur-sm transition-all focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-base md:text-sm text-white placeholder-gray-400"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              />
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEmailAuth()}
                className="w-full p-4 md:p-4 rounded-xl md:rounded-2xl border backdrop-blur-sm transition-all focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-base md:text-sm text-white placeholder-gray-400"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              />
              
              <motion.button
                onClick={handleEmailAuth}
                className="w-full text-white p-4 md:p-4 rounded-xl md:rounded-2xl font-medium transition-all text-base md:text-sm"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #22c55e 100%)',
                  boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)'
                }}
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
                  <span className="px-3 text-slate-400" style={{ backgroundColor: theme.colors.bg.primary }}>or</span>
                </div>
              </div>
              
              <motion.button
                onClick={handleGoogleAuth}
                className="w-full border p-4 rounded-2xl font-medium transition-all flex items-center justify-center space-x-3"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="w-5 h-5"
                />
                <span className="text-white">Continue with Google</span>
              </motion.button>
              
              <div className="text-center pt-4">
                <button
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="text-slate-400 text-sm hover:text-slate-300 transition-colors"
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
              onClick={() => setCurrentScreen('home')}
              className="text-slate-400 text-sm hover:text-slate-300 transition-colors"
            >
              ← Back to App
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Cinematic Dashboard - Revolutionary UI
  if (currentScreen === 'home') {
    return (
      <CinematicDashboard 
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
        onNavigateToAuth={() => setCurrentScreen('auth')}
        onNavigateToUpgrade={() => setCurrentScreen('upgrade')}
        onNavigateToTrending={() => alert('Trending topics coming soon! 🔥')}
        userTier={userTier}
        dailyMessageCount={dailyMessageCount}
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

  // Premium Upgrade Screen
  if (currentScreen === 'upgrade') {
    return (
      <PremiumUpgrade
        onBack={() => setCurrentScreen('home')}
        currentTier={userTier}
      />
    );
  }

  // Cinematic Chat Interface - Social Media AI
  if (currentScreen === 'chat') {
    return (
      <EnhancedChatInterface
        chatHistory={chatHistory}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        isTyping={isTyping}
        onBack={() => setCurrentScreen('home')}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onClearAllConversations={handleClearAllConversations}
        user={user}
        userTier={userTier}
        dailyMessageCount={dailyMessageCount}
        remainingMessages={getRemainingMessages()}
      />
    );
  }

  return null;
};

export default App;