import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  models 
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

  const quickActions = [
    {
      title: 'Creative Writing',
      description: 'Spark your imagination',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      prompt: 'Help me write a creative story about',
      category: 'creative'
    },
    {
      title: 'Problem Solving',
      description: 'Work through challenges',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      prompt: 'Help me solve this problem:',
      category: 'work'
    },
    {
      title: 'Learn Something',
      description: 'Expand your knowledge',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      prompt: 'Teach me about',
      category: 'learning'
    },
    {
      title: 'Just Chat',
      description: 'Casual conversation',
      icon: MessageCircle,
      color: 'from-orange-500 to-yellow-500',
      prompt: 'I want to chat about',
      category: 'fun'
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

        {/* Quick Actions Grid */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className={`text-2xl font-light ${theme.colors.text} mb-6`}>Quick Start</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  console.log('Quick action clicked:', action.prompt);
                  if (onStartChat) {
                    onStartChat(action.prompt);
                  }
                }}
                className={`p-6 rounded-3xl bg-gradient-to-r ${action.color} text-white hover:shadow-xl transition-all relative overflow-hidden group`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <div className="relative z-10">
                  <action.icon className="w-8 h-8 mb-4 mx-auto" />
                  <h3 className="font-medium text-lg mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Recent Conversations */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-light ${theme.colors.text}`}>Recent Conversations</h2>
              <motion.button
                onClick={() => {
                  console.log('Start New clicked');
                  if (onStartChat) {
                    onStartChat('');
                  }
                }}
                className={`flex items-center space-x-2 ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors`}
                whileHover={{ x: 5 }}
              >
                <span>Start New</span>
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
            
            {/* Simplified - just show the welcome card */}
            <motion.div
              className={`${theme.colors.card} border rounded-2xl p-8 text-center`}
              variants={itemVariants}
            >
              <MessageCircle className={`w-12 h-12 ${theme.colors.textSecondary} mx-auto mb-4`} />
              <h3 className={`font-medium ${theme.colors.text} mb-2`}>Ready to chat?</h3>
              <p className={`${theme.colors.textSecondary} mb-4`}>
                Start a conversation with {models[selectedModel]?.name || 'your AI companion'}
              </p>
              <motion.button
                onClick={() => {
                  console.log('Start Chatting clicked');
                  if (onStartChat) {
                    onStartChat('');
                  }
                }}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Chatting
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Stats Card */}
            <div className={`${theme.colors.card} border rounded-3xl p-6 ${theme.shadows.glow}`}>
              <h3 className={`font-medium ${theme.colors.text} mb-4`}>Your Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`${theme.colors.textSecondary}`}>Conversations</span>
                  <span className={`font-bold ${theme.colors.text}`}>{chatHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${theme.colors.textSecondary}`}>This week</span>
                  <span className={`font-bold ${theme.colors.text}`}>12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${theme.colors.textSecondary}`}>Streak</span>
                  <span className={`font-bold text-orange-500`}>{streakCount} days</span>
                </div>
                
                {userTier === 'free' && (
                  <div className="pt-4 border-t border-slate-200/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${theme.colors.textSecondary}`}>Today's usage</span>
                      <span className={`text-sm font-medium ${theme.colors.text}`}>
                        {dailyMessageCount}/5
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${(dailyMessageCount / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
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
