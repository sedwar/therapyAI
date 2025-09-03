// 🚀 AURA AI - Enhanced Chat Interface
// Professional, modern chat experience with advanced features

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Send, 
  Mic, 
  MicOff, 
  ArrowLeft, 
  MoreVertical,
  Download,
  Share2,
  Bookmark,
  RefreshCw,
  Zap,
  Sparkles,
  Brain,
  Star,
  Heart,
  MessageSquare,
  Copy,
  CheckCircle,
  AlertCircle,
  User,
  Bot,
  MessageCircle, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Pin,
  Clock,
  Flame,
  X,
  Settings,
  Crown
} from 'lucide-react';
import { createCinematicTheme } from '../ui/themes/cinematicDesign';

// Chat Sidebar Component
const ChatSidebar = ({ 
  conversations = [], 
  currentConversationId, 
  onSelectConversation, 
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
  onClearAllConversations,
  isOpen,
  onToggle,
  user,
  userTier = 'explorer'
}) => {
  const theme = createCinematicTheme('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Filter and sort conversations
  useEffect(() => {
    let filtered = conversations.filter(conv =>
      conv.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.topic?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'pinned':
        filtered = filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
        break;
      case 'popular':
        filtered = filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'recent':
      default:
        filtered = filtered.sort((a, b) => new Date(b.lastActive || b.createdAt) - new Date(a.lastActive || a.createdAt));
        break;
    }

    setFilteredConversations(filtered);
  }, [conversations, searchTerm, sortBy]);

  const handleRename = (id, newTitle) => {
    if (newTitle.trim()) {
      onRenameConversation(id, newTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(date).toLocaleDateString();
  };



  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full w-full sm:w-80 z-50 transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: theme.gradients.background.mesh,
          backgroundColor: theme.colors.bg.primary,
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(20, 184, 166, 0.3)',
          boxShadow: theme.shadows.glass.lg
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10" style={{ background: theme.gradients.glass.primary }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h2 className="text-lg font-bold text-white">AURA AI</h2>
                {userTier !== 'explorer' && (
                  <div className="flex items-center space-x-1">
                    <Crown className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-yellow-400 font-medium uppercase">{userTier}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* New Chat Button */}
          <motion.button
            onClick={onNewConversation}
            className="w-full flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-teal-600 to-green-600 text-white font-bold hover:shadow-xl hover:shadow-teal-500/30 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
            <Sparkles className="w-4 h-4" />
          </motion.button>

          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:bg-white/15 focus:border-teal-500/30 transition-all backdrop-blur-sm"
            />
          </div>

          {/* Sort Options */}
          <div className="flex space-x-1 mt-4">
            {[
              { key: 'recent', label: 'Recent', icon: Clock },
              { key: 'pinned', label: 'Pinned', icon: Pin },
              { key: 'popular', label: 'Hot', icon: Flame }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                  sortBy === key
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <AnimatePresence>
            {filteredConversations.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MessageCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-sm">
                  {searchTerm ? 'No conversations found' : 'Start your first conversation!'}
                </p>
              </motion.div>
            ) : (
              filteredConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all ${
                    currentConversationId === conversation.id
                      ? 'bg-teal-600/20 border border-teal-500/30 shadow-lg shadow-teal-500/20'
                      : 'hover:bg-white/10 border border-transparent hover:border-white/20'
                  }`}
                  onClick={() => onSelectConversation(conversation)}
                  whileHover={{ x: 4, scale: 1.02 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      {editingId === conversation.id ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => handleRename(conversation.id, editTitle)}
                          onKeyPress={(e) => e.key === 'Enter' && handleRename(conversation.id, editTitle)}
                          className="w-full bg-transparent border-b border-teal-500 text-white text-sm font-medium focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          {conversation.pinned && <Pin className="w-3 h-3 text-yellow-400 flex-shrink-0" />}
                          <h3 className="text-white text-sm font-bold truncate">
                            {conversation.title || 'Untitled Chat'}
                          </h3>
                          {conversation.likes > 0 && (
                            <div className="flex items-center space-x-1">
                              <Flame className="w-3 h-3 text-orange-400" />
                              <span className="text-xs text-orange-400 font-bold">{conversation.likes}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center space-x-2 mt-2 text-xs text-slate-400">
                        <span>{getTimeAgo(conversation.lastActive || conversation.createdAt)}</span>
                        {conversation.history && (
                          <span>• {conversation.history.length} msgs</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(conversation.id);
                          setEditTitle(conversation.title || '');
                        }}
                        className="p-1 rounded hover:bg-white/20 transition-colors"
                      >
                        <Edit3 className="w-3 h-3 text-slate-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="p-1 rounded hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10" style={{ background: theme.gradients.glass.primary }}>
          <div className="flex space-x-2">
            <motion.button
              onClick={onClearAllConversations}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors text-sm font-bold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </motion.button>
            
            <motion.button
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-xl bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white transition-colors text-sm font-bold border border-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Enhanced Message Bubble with Reactions
const EnhancedMessageBubble = ({ message, isUser, onLike, onShare, onCopy, onRegenerate, onReact }) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const theme = createCinematicTheme('dark');

  const reactionEmojis = ['❤️', '😂', '🤯', '🔥', '💯', '🚀', '✨', '👏'];

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(message.id, !liked);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.(message);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReaction = (emoji) => {
    onReact?.(message.id, emoji);
    setShowReactions(false);
  };

  return (
    <motion.div
      className={`flex items-start space-x-4 mb-8 group ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <motion.div
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-gradient-to-br from-teal-500 to-green-500' 
            : 'bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-white/20'
        }`}
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ duration: 0.3 }}
      >
        {isUser ? (
          <User className="w-6 h-6 text-white" />
        ) : (
          <Brain className="w-6 h-6 text-white" />
        )}
      </motion.div>

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Message Content */}
        <motion.div
          className={`relative p-6 rounded-3xl backdrop-blur-xl border ${
            isUser 
              ? 'bg-gradient-to-br from-teal-600/30 to-green-600/30 border-teal-500/40 text-white' 
              : 'border-white/10 text-slate-100'
          }`}
          style={{
            background: isUser ? undefined : theme.gradients.glass.primary,
            boxShadow: theme.shadows.glass.md
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: theme.shadows.glass.lg
          }}
          transition={{ duration: 0.3 }}
          layout
        >
          {/* AI Badge */}
          {!isUser && (
            <div className="flex items-center space-x-2 mb-3 opacity-70">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs text-teal-400 font-bold">AURA AI</span>
              {message.model && (
                <span className="text-xs text-slate-400">• {message.model}</span>
              )}
            </div>
          )}
          
          {/* Message Text */}
          <div className={`leading-relaxed ${isUser ? 'text-white' : 'text-slate-100'}`}>
            {message.content}
          </div>
          
          {/* Timestamp & Reactions */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs opacity-60">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
            {message.reactions && Object.keys(message.reactions).length > 0 && (
              <div className="flex items-center space-x-1">
                {Object.entries(message.reactions).map(([emoji, count]) => (
                  <span key={emoji} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {emoji} {count}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* SICK Action Buttons */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              className={`flex items-center space-x-2 mt-3 ${isUser ? 'flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Emoji Reactions */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowReactions(!showReactions)}
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-slate-400 hover:text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-sm">😊</span>
                </motion.button>
                
                <AnimatePresence>
                  {showReactions && (
                    <motion.div
                      className="absolute bottom-12 left-0 flex space-x-1 p-2 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    >
                      {reactionEmojis.map((emoji) => (
                        <motion.button
                          key={emoji}
                          onClick={() => handleReaction(emoji)}
                          className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="text-lg">{emoji}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors ${
                  liked ? 'bg-red-500 text-white' : 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-400 hover:text-red-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
              </motion.button>

              <motion.button
                onClick={handleCopy}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </motion.button>

              <motion.button
                onClick={() => onShare?.(message)}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-slate-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-4 h-4" />
              </motion.button>

              {!isUser && (
                <motion.button
                  onClick={() => onRegenerate?.(message)}
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-slate-400 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Enhanced Typing Indicator
const EnhancedTypingIndicator = () => {
  const theme = createCinematicTheme('dark');
  
  return (
    <motion.div
      className="flex items-start space-x-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-white/20 flex items-center justify-center">
        <Brain className="w-6 h-6 text-white" />
      </div>
      
      <div 
        className="p-6 rounded-3xl backdrop-blur-xl border border-white/10"
        style={{
          background: theme.gradients.glass.primary,
          boxShadow: theme.shadows.glass.md
        }}
      >
        <div className="flex items-center space-x-2 mb-3 opacity-70">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs text-teal-400 font-bold">AURA AI is thinking...</span>
        </div>
        
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-green-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Enhanced Chat Interface
const EnhancedChatInterface = ({
  chatHistory = [],
  message,
  setMessage,
  sendMessage,
  isTyping,
  onBack,
  conversations = [],
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
  onClearAllConversations,
  user,
  userTier,
  dailyMessageCount = 0,
  remainingMessages = Infinity,
  onUpdateMessage // Add this prop to update messages with reactions
}) => {
  const theme = createCinematicTheme('dark');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [messageReactions, setMessageReactions] = useState({});

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleSend = () => {
    if (!message.trim() || isTyping) return;
    sendMessage();
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Enhanced message action handlers
  const handleMessageLike = (messageId, liked) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: { ...prev[messageId], liked }
    }));
    console.log(`Message ${messageId} ${liked ? 'liked' : 'unliked'}`);
  };

  const handleMessageReaction = (messageId, emoji) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: { 
        ...prev[messageId], 
        reactions: [...(prev[messageId]?.reactions || []), { emoji, timestamp: new Date() }] 
      }
    }));
    console.log(`Added ${emoji} reaction to message ${messageId}`);
  };

  const handleMessageShare = (message) => {
    if (navigator.share) {
      navigator.share({
        title: 'AURA AI Conversation',
        text: message.content,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`AURA AI: ${message.content}`);
      console.log('Message copied to clipboard for sharing');
    }
  };

  const handleMessageRegenerate = (message) => {
    // Re-trigger AI response for the same prompt
    if (message.role === 'assistant') {
      console.log('Regenerating response for:', message.content);
      // You could implement actual regeneration here
    }
  };



  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Chat Sidebar */}
      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={onSelectConversation}
        onNewConversation={onNewConversation}
        onDeleteConversation={onDeleteConversation}
        onRenameConversation={onRenameConversation}
        onClearAllConversations={onClearAllConversations}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
        userTier={userTier}
      />

      {/* Main Chat Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-500 ${
          sidebarOpen ? 'sm:ml-80' : 'ml-0'
        }`}
        style={{ 
          background: theme.gradients.background.mesh,
          backgroundColor: theme.colors.bg.primary 
        }}
      >
        {/* Chat Header */}
        <motion.header 
          className="flex items-center justify-between p-4 backdrop-blur-xl border-b border-white/10"
          style={{ background: theme.gradients.glass.primary }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30 text-teal-400 hover:bg-teal-600/30 hover:text-teal-300 transition-colors shadow-lg shadow-teal-500/20"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
            
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div>
              <h1 className="text-xl font-bold text-white">AURA AI Chat</h1>
              <p className="text-sm text-slate-400">Your intelligent companion</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Daily Message Counter */}
            {userTier === 'explorer' && remainingMessages !== Infinity && (
              <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-xl bg-teal-600/20 border border-teal-500/30">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-teal-400" />
                <span className="text-xs sm:text-sm font-bold text-teal-300">
                  <span className="hidden sm:inline">{remainingMessages} left today</span>
                  <span className="sm:hidden">{remainingMessages}</span>
                </span>
              </div>
            )}
            
            {userTier === 'visionary' && remainingMessages !== Infinity && (
              <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-xl bg-yellow-600/20 border border-yellow-500/30">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm font-bold text-yellow-300">
                  <span className="hidden sm:inline">{remainingMessages}/50 today</span>
                  <span className="sm:hidden">{remainingMessages}/50</span>
                </span>
              </div>
            )}
            
            {userTier === 'genius' && (
              <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-xl bg-purple-600/20 border border-purple-500/30">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span className="text-xs sm:text-sm font-bold text-purple-300">
                  <span className="hidden sm:inline">Unlimited</span>
                  <span className="sm:hidden">∞</span>
                </span>
              </div>
            )}
            

          </div>
        </motion.header>



        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message */}
            {chatHistory.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Heart className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready to dive in? ⚡
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                  I'm AURA - your AI companion for breakthrough thinking and real conversations. 
                  What's on your mind?
                </p>
                
                {/* Simple Welcome */}
                <div className="text-center">
                  <p className="text-slate-400 text-sm">
                    Start typing your message below to begin our conversation.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Chat Messages */}
            <AnimatePresence>
              {chatHistory.map((msg, index) => (
                <EnhancedMessageBubble
                  key={msg.id || index}
                  message={msg}
                  isUser={msg.role === 'user'}
                  onLike={handleMessageLike}
                  onShare={handleMessageShare}
                  onCopy={(msg) => console.log('Copied:', msg)}
                  onRegenerate={handleMessageRegenerate}
                  onReact={handleMessageReaction}
                  reactions={messageReactions[msg.id]}
                />
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && <EnhancedTypingIndicator />}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input Area */}
        <motion.div 
          className="p-6 backdrop-blur-xl border-t border-white/10"
          style={{ background: theme.gradients.glass.primary }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Low Messages Warning */}
            {userTier === 'explorer' && remainingMessages <= 3 && remainingMessages > 0 && (
              <motion.div
                className="mb-4 p-3 rounded-xl bg-yellow-600/20 border border-yellow-500/30 flex items-center space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-300">
                  Only {remainingMessages} messages left today! 
                  <button 
                    onClick={() => window.location.hash = '#upgrade'}
                    className="ml-1 underline hover:text-yellow-200"
                  >
                    Upgrade for more
                  </button>
                </span>
              </motion.div>
            )}
            
            {remainingMessages === 0 && userTier === 'explorer' && (
              <motion.div
                className="mb-4 p-3 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-300">
                  You've reached your daily limit of 10 messages. 
                  <button 
                    onClick={() => window.location.hash = '#upgrade'}
                    className="ml-1 underline hover:text-red-200"
                  >
                    Upgrade to continue chatting
                  </button>
                </span>
              </motion.div>
            )}
            <div className="relative">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="w-full p-3 sm:p-4 pr-20 sm:pr-24 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 resize-none backdrop-blur-xl text-sm sm:text-base"
                rows={1}
                style={{ minHeight: '60px', maxHeight: '120px' }}
              />
              
              <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex items-center space-x-1 sm:space-x-2">
                <motion.button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-full transition-colors ${
                    isRecording 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                      : 'bg-white/10 border border-white/20 text-slate-400 hover:text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  onClick={handleSend}
                  disabled={!message.trim() || isTyping || (userTier === 'explorer' && remainingMessages <= 0)}
                  className={`p-2 rounded-full transition-colors ${
                    message.trim() && !isTyping && (userTier !== 'explorer' || remainingMessages > 0)
                      ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white hover:shadow-lg hover:shadow-teal-500/30'
                      : 'bg-white/10 border border-white/20 text-slate-400 cursor-not-allowed'
                  }`}
                  whileHover={message.trim() && !isTyping && (userTier !== 'explorer' || remainingMessages > 0) ? { scale: 1.1 } : {}}
                  whileTap={message.trim() && !isTyping && (userTier !== 'explorer' || remainingMessages > 0) ? { scale: 0.9 } : {}}
                  title={remainingMessages <= 0 && userTier === 'explorer' ? 'Daily limit reached - Upgrade to continue' : 'Send message'}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
              <span>AURA AI can make mistakes. Verify important information.</span>
              <span>{message.length}/2000</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedChatInterface;