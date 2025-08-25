import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../viral-animations.css';
import { 
  Sparkles, 
  MessageCircle, 
  TrendingUp, 
  Calendar, 
  Brain,
  Zap,
  Heart,
  Coffee,
  Sun,
  Moon,
  Star,
  Target,
  Award,
  BarChart3,
  ChevronRight,
  Plus
} from 'lucide-react';
import ConversationHistory from './ConversationHistory';

const HomeDashboard = ({ 
  theme, 
  user, 
  onStartChat, 
  onOpenJournal, 
  onOpenUpgrade, 
  userTier, 
  dailyMessageCount, 
  chatHistory = [],
  selectedModel,
  models,
  onLoadConversation
}) => {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [streakCount, setStreakCount] = useState(7);
  const [todaysInsight, setTodaysInsight] = useState('');

  // Dynamic greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  // Generate today's AI insight
  useEffect(() => {
    const insights = [
      "Your curiosity is your superpower. What will you discover today?",
      "Every conversation is a step toward understanding something new.",
      "Your questions shape your growth. What's on your mind?",
      "Today's a perfect day to explore new ideas and perspectives.",
      "Your thoughtful conversations are building something beautiful."
    ];
    setTodaysInsight(insights[Math.floor(Math.random() * insights.length)]);
  }, []);

  // 🌟 DISCOVERY FEED - Beautiful conversation starters
  const discoveryFeed = [
    {
      title: "What if you could solve any world problem?",
      description: "Explore global challenges and innovative solutions",
      gradient: "from-blue-600 via-purple-600 to-indigo-800",
      emoji: "🌍",
      prompt: "If I could solve any world problem, I'd focus on",
      category: "Deep Thoughts",
      trending: true
    },
    {
      title: "Design your dream creative project",
      description: "Brainstorm something you've always wanted to create",
      gradient: "from-pink-500 via-rose-500 to-orange-500",
      emoji: "🎨",
      prompt: "My dream creative project would be",
      category: "Creative Labs"
    },
    {
      title: "What's the most interesting thing you learned recently?",
      description: "Share knowledge and discover new perspectives",
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      emoji: "🧠",
      prompt: "The most interesting thing I learned recently is",
      category: "Study Buddy"
    },
    {
      title: "If you could have dinner with anyone, who would it be?",
      description: "Explore fascinating conversations across time",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      emoji: "🍽️",
      prompt: "I'd love to have dinner with",
      category: "Deep Thoughts"
    }
  ];

  const recentTopics = [
    { title: 'Creative Writing Tips', time: '2 hours ago', messages: 12 },
    { title: 'JavaScript Concepts', time: 'Yesterday', messages: 8 },
    { title: 'Productivity Hacks', time: '2 days ago', messages: 15 },
    { title: 'Mindfulness Practice', time: '3 days ago', messages: 6 }
  ];

  const achievements = [
    { title: 'Curious Mind', description: '100 questions asked', icon: '🤔', unlocked: true },
    { title: 'Deep Thinker', description: '50 long conversations', icon: '🧠', unlocked: true },
    { title: 'Creative Soul', description: '25 creative prompts', icon: '🎨', unlocked: true },
    { title: 'Problem Solver', description: '10 complex problems solved', icon: '🔧', unlocked: false }
  ];

  const getGreeting = () => {
    const greetings = {
      morning: `Good morning, ${user?.email?.split('@')[0] || 'there'}! ☀️`,
      afternoon: `Good afternoon, ${user?.email?.split('@')[0] || 'there'}! 🌤️`,
      evening: `Good evening, ${user?.email?.split('@')[0] || 'there'}! 🌙`
    };
    return greetings[timeOfDay];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`min-h-screen ${theme.colors.bg} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-purple-500/5" />
      
      <motion.div 
        className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Greeting */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl md:text-4xl font-light ${theme.colors.text} mb-2`}>
                {getGreeting()}
              </h1>
              <p className={`${theme.colors.textSecondary} text-lg`}>
                Ready to explore ideas together?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme.colors.text}`}>{streakCount}</div>
                <div className={`text-xs ${theme.colors.textSecondary}`}>Day Streak</div>
              </div>
              <motion.div
                className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </div>

          {/* Today's Insight Card */}
          <motion.div 
            className={`${theme.colors.card} border rounded-3xl p-6 ${theme.shadows.glow} mb-8`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-medium ${theme.colors.text} mb-2`}>Today's Insight</h3>
                <p className={`${theme.colors.textSecondary} leading-relaxed`}>
                  {todaysInsight}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 🌟 DISCOVERY FEED */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${theme.colors.text}`}>Discover</h2>
            <span className={`text-sm ${theme.colors.textSecondary} bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 py-1 rounded-full`}>
              Trending conversations
            </span>
          </div>
          
          {/* Beautiful scrollable feed */}
          <div className="space-y-6">
            {discoveryFeed.map((conversation, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  if (onStartChat) {
                    onStartChat(conversation.prompt);
                  }
                }}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className={`relative rounded-2xl overflow-hidden ${theme.colors.card} border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300`}>
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${conversation.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative p-8">
                    <div className="flex items-start space-x-6">
                      {/* Large emoji/icon */}
                      <div className={`text-6xl flex-shrink-0 p-4 rounded-2xl bg-gradient-to-r ${conversation.gradient} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {conversation.emoji}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${conversation.gradient} text-white`}>
                            {conversation.category}
                          </span>
                          {conversation.trending && (
                            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full font-medium">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                        
                        <h3 className={`text-2xl font-bold ${theme.colors.text} mb-3 group-hover:bg-gradient-to-r group-hover:${conversation.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                          {conversation.title}
                        </h3>
                        
                        <p className={`text-lg ${theme.colors.textSecondary} leading-relaxed`}>
                          {conversation.description}
                        </p>
                        
                        {/* Call to action */}
                        <div className="mt-6 flex items-center justify-between">
                          <span className={`text-sm font-medium ${theme.colors.textSecondary} group-hover:${theme.colors.text} transition-colors`}>
                            Start conversation →
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${conversation.gradient}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                              {/* Recent Conversations */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <ConversationHistory
                            theme={theme}
                            user={user}
                            onSelectConversation={(conversation) => {
                                if (onLoadConversation) {
                                    onLoadConversation(conversation);
                                }
                                if (onStartChat) {
                                    onStartChat('');
                                }
                            }}
                            onStartNew={() => {
                                if (onStartChat) {
                                    onStartChat('');
                                }
                            }}
                        />
                    </motion.div>

          {/* Clean Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Simple Progress Card */}
            <div className={`${theme.colors.card} border rounded-2xl p-6 text-center`}>
              <div className="mb-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {streakCount}
                </div>
                <div className={`text-sm ${theme.colors.textSecondary}`}>day streak</div>
              </div>
              
              {userTier === 'explorer' && (
                <div className="space-y-2">
                  <div className={`text-sm ${theme.colors.textSecondary}`}>
                    {dailyMessageCount}/10 messages today
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((dailyMessageCount / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className={`${theme.colors.card} border rounded-3xl p-6 ${theme.shadows.glow}`}>
              <h3 className={`font-medium ${theme.colors.text} mb-4`}>Achievements</h3>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                      achievement.unlocked 
                        ? 'bg-green-500/10 border border-green-500/20' 
                        : 'opacity-50'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${theme.colors.text} text-sm`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${theme.colors.textSecondary} truncate`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Award className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Upgrade CTA */}
            {userTier === 'free' && (
              <motion.div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white relative overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={onOpenUpgrade}
              >
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">Unlock Premium</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Unlimited conversations, advanced AI models, and exclusive features
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Start Free Trial</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 transform rotate-12 translate-x-6 -translate-y-6">
                  <Sparkles className="w-full h-full opacity-20" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeDashboard;
