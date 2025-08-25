// AURA AI - Conversation History Component
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Clock, Heart, Brain, Smile, Search, Trash2, Share, Plus } from 'lucide-react';

const ConversationHistory = ({ theme, onSelectConversation, onStartNew, user }) => {
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);

  // Load conversations from localStorage
  useEffect(() => {
    try {
      const savedConversations = JSON.parse(localStorage.getItem('aura_conversations') || '[]');
      const userConversations = savedConversations.filter(conv => 
        conv.userId === (user?.uid || 'guest')
      );
      setConversations(userConversations);
      setFilteredConversations(userConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }, [user]);

  // Filter conversations based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.history.some(msg => 
          msg.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredConversations(filtered);
    }
  }, [searchTerm, conversations]);

  // Get conversation preview
  const getConversationPreview = (history) => {
    const lastUserMessage = history.slice().reverse().find(msg => msg.role === 'user');
    return lastUserMessage?.content.slice(0, 100) + (lastUserMessage?.content.length > 100 ? '...' : '') || 'New conversation';
  };

  // Get mood color
  const getMoodColor = (topic) => {
    const moodColors = {
      relationships: 'from-pink-400 to-red-400',
      work: 'from-blue-400 to-cyan-400',
      family: 'from-green-400 to-emerald-400',
      mental_health: 'from-purple-400 to-indigo-400',
      general: 'from-slate-400 to-gray-400'
    };
    return moodColors[topic] || moodColors.general;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Delete conversation
  const deleteConversation = (conversationId) => {
    try {
      const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
      setConversations(updatedConversations);
      
      const allConversations = JSON.parse(localStorage.getItem('aura_conversations') || '[]');
      const filteredAll = allConversations.filter(conv => conv.id !== conversationId);
      localStorage.setItem('aura_conversations', JSON.stringify(filteredAll));
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  // Clear all conversations
  const clearAllConversations = () => {
    const confirmed = window.confirm('Are you sure you want to clear all conversations? This cannot be undone.');
    if (confirmed) {
      setConversations([]);
      localStorage.removeItem('aura_conversations');
      localStorage.removeItem('aura_current_conversation');
      
      // Extra aggressive clearing - clear ALL aura keys
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('aura_')) {
          localStorage.removeItem(key);
        }
      });
      
      alert('All conversations cleared! The page will refresh.');
      window.location.reload();
    }
  };

  if (conversations.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <MessageCircle className={`w-16 h-16 ${theme.colors.textMuted} mx-auto mb-4`} />
        <h3 className={`text-xl font-light ${theme.colors.text} mb-2`}>
          Start Your First Conversation
        </h3>
        <p className={`${theme.colors.textSecondary} mb-6 max-w-sm mx-auto`}>
          Begin a meaningful conversation with your AI companion. Your conversations will be saved here.
        </p>
        <motion.button
          onClick={onStartNew}
          className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Conversation
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${theme.colors.text}`}>Recent Chats</h2>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={clearAllConversations}
            className={`px-3 py-2 rounded-lg text-sm ${theme.colors.textSecondary} hover:${theme.colors.text} hover:bg-red-50 dark:hover:bg-red-900/20 transition-all`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All ({conversations.length})
          </motion.button>
          <motion.button
            onClick={onStartNew}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">New</span>
          </motion.button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.colors.textMuted}`} />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full ${theme.colors.input} rounded-xl pl-10 pr-4 py-3 border backdrop-blur-sm focus:ring-2 focus:ring-cyan-500/50`}
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredConversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              className={`${theme.colors.card} border rounded-xl p-4 hover:${theme.shadows.glow} transition-all cursor-pointer group`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getMoodColor(conversation.topic)} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">
                    {conversation.title?.charAt(0) || '💬'}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${theme.colors.text} truncate text-lg`}>
                      {conversation.title || 'New Conversation'}
                    </h3>
                    <span className={`text-xs ${theme.colors.textMuted} flex-shrink-0`}>
                      {formatDate(conversation.lastMessage) || 'now'}
                    </span>
                  </div>
                  
                  <p className={`text-sm ${theme.colors.textSecondary} truncate`}>
                    {getConversationPreview(conversation.history)}
                  </p>
                </div>

                {/* Actions */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2 ml-4">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Share functionality
                    }}
                    className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Share conversation"
                  >
                    <Share className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                    className={`p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-600`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No results */}
      {searchTerm && filteredConversations.length === 0 && (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Search className={`w-12 h-12 ${theme.colors.textMuted} mx-auto mb-3`} />
          <p className={`${theme.colors.textSecondary}`}>
            No conversations found for "{searchTerm}"
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ConversationHistory;
