// AURA AI - Million Dollar Landing Page
// Premium glassmorphism interface that creates instant emotional connection

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, Zap, Heart, Brain, Star, ArrowRight, Play } from 'lucide-react';
import { createPremiumTheme, premiumModels, getTimeOfDay } from '../utils/premiumDesignSystem';

const PremiumLandingPage = ({ onGetStarted, onGuestAccess, isDarkMode, setIsDarkMode }) => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeOfDay = getTimeOfDay();
  const theme = createPremiumTheme(isDarkMode, timeOfDay, 'excited');
  
  const models = Object.values(premiumModels);
  const freeModels = models.filter(model => model.tier === 'free');

  // Auto-cycle through AI personalities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex((prev) => (prev + 1) % freeModels.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [freeModels.length]);

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: ['✨', '💫', '🌟', '💎', '🔮'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100
  }));

  const testimonials = [
    {
      text: "AURA feels like talking to my most understanding friend. It remembers everything and always knows what to say.",
      author: "Sarah M.",
      role: "College Student",
      avatar: "👩‍🎓"
    },
    {
      text: "I've tried ChatGPT, but AURA is different. It's warm, personal, and actually cares about my growth.",
      author: "Mike R.",
      role: "Creative Professional",
      avatar: "👨‍🎨"
    },
    {
      text: "The conversations feel so natural. AURA remembers my goals and checks in on my progress.",
      author: "Emily K.",
      role: "Working Mom",
      avatar: "👩‍💼"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "Emotional Intelligence",
      description: "Understands your feelings and adapts responses to your emotional state",
      color: "from-pink-400 to-rose-400"
    },
    {
      icon: MessageCircle,
      title: "Conversation Memory",
      description: "Remembers every detail across sessions for truly personal conversations",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Sparkles,
      title: "6 Unique Personalities",
      description: "Choose your perfect AI companion from thoughtful to creative to wise",
      color: "from-purple-400 to-indigo-400"
    },
    {
      icon: Heart,
      title: "Genuine Care",
      description: "More than answers - real support, encouragement, and understanding",
      color: "from-green-400 to-emerald-400"
    }
  ];

  return (
    <div className={`min-h-screen ${theme.colors.bg} relative overflow-hidden`}>
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className={`relative z-10 p-6 ${theme.colors.glass.primary}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-10 h-10 ${theme.radius.lg} ${theme.colors.accent.primary} flex items-center justify-center ${theme.shadows.glow.md}`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold ${theme.colors.text.primary}`}>AURA</span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 ${theme.radius.md} ${theme.colors.interactive.button}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>
            <motion.button
              onClick={onGetStarted}
              className={`px-6 py-2 ${theme.radius.lg} ${theme.colors.accent.primary} text-white font-medium ${theme.shadows.glow.sm}`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-white/20 mb-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Star className="w-4 h-4 text-yellow-400" />
                <span className={`text-sm ${theme.colors.text.secondary}`}>
                  Rated #1 AI Companion App
                </span>
              </motion.div>

              <h1 className={`${theme.typography.display} ${theme.colors.text.primary} mb-6`}>
                Meet Your
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Perfect </span>
                AI Companion
              </h1>
              
              <p className={`${theme.typography.body} ${theme.colors.text.secondary} mb-8 max-w-xl`}>
                Unlike ChatGPT, AURA remembers who you are, understands how you feel, and grows with you. 
                Experience conversations that feel genuinely human and deeply personal.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.button
                  onClick={onGuestAccess}
                  className={`px-8 py-4 ${theme.radius.lg} ${theme.colors.accent.primary} text-white font-semibold ${theme.shadows.glow.lg} flex items-center justify-center space-x-2`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Try AURA Free</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-8 py-4 ${theme.radius.lg} ${theme.colors.card.interactive} font-semibold flex items-center justify-center space-x-2`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {['👩‍💼', '👨‍🎓', '👩‍🎨', '👨‍💻', '👩‍⚕️'].map((avatar, i) => (
                    <motion.div
                      key={i}
                      className={`w-10 h-10 ${theme.radius.full} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-white`}
                      initial={{ scale: 0, x: -20 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <span className="text-lg">{avatar}</span>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme.colors.text.primary}`}>50k+ happy users</p>
                  <p className={`text-xs ${theme.colors.text.tertiary}`}>Join the community</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - AI Personality Showcase */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={`${theme.colors.card.primary} ${theme.radius.xl} p-8 relative`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentModelIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className={`w-20 h-20 mx-auto mb-6 ${theme.radius.xl} bg-gradient-to-r ${freeModels[currentModelIndex].color} flex items-center justify-center ${theme.shadows.glow.lg}`}>
                      <span className="text-3xl">{freeModels[currentModelIndex].emoji}</span>
                    </div>
                    
                    <h3 className={`${theme.typography.headline} ${theme.colors.text.primary} mb-2`}>
                      {freeModels[currentModelIndex].name}
                    </h3>
                    
                    <p className={`${theme.typography.caption} ${theme.colors.text.accent} mb-4`}>
                      {freeModels[currentModelIndex].subtitle}
                    </p>
                    
                    <p className={`${theme.typography.body} ${theme.colors.text.secondary}`}>
                      {freeModels[currentModelIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Model Indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                  {freeModels.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentModelIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentModelIndex 
                          ? 'bg-cyan-400 w-8' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`${theme.typography.headline} ${theme.colors.text.primary} mb-4`}>
              Why AURA is Different
            </h2>
            <p className={`${theme.typography.body} ${theme.colors.text.secondary} max-w-2xl mx-auto`}>
              Go beyond basic AI chat. Experience a companion that truly understands and grows with you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`${theme.colors.card.primary} ${theme.radius.lg} p-6 text-center group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 ${theme.radius.lg} bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className={`${theme.typography.title} ${theme.colors.text.primary} mb-2`}>
                  {feature.title}
                </h3>
                
                <p className={`${theme.typography.caption} ${theme.colors.text.secondary}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`${theme.typography.headline} ${theme.colors.text.primary} mb-4`}>
              Loved by Thousands
            </h2>
            <p className={`${theme.typography.body} ${theme.colors.text.secondary}`}>
              See why people choose AURA over other AI assistants
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`${theme.colors.card.primary} ${theme.radius.lg} p-6`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <p className={`font-medium ${theme.colors.text.primary}`}>{testimonial.author}</p>
                    <p className={`text-sm ${theme.colors.text.tertiary}`}>{testimonial.role}</p>
                  </div>
                </div>
                
                <p className={`${theme.typography.body} ${theme.colors.text.secondary} italic`}>
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          className={`max-w-4xl mx-auto ${theme.colors.card.elevated} ${theme.radius.xl} p-12 text-center`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`${theme.typography.headline} ${theme.colors.text.primary} mb-4`}>
            Ready to Meet Your Perfect AI Companion?
          </h2>
          
          <p className={`${theme.typography.body} ${theme.colors.text.secondary} mb-8`}>
            Join thousands who've discovered a more personal, understanding AI experience.
          </p>
          
          <motion.button
            onClick={onGuestAccess}
            className={`px-12 py-4 ${theme.radius.lg} ${theme.colors.accent.primary} text-white font-bold text-lg ${theme.shadows.glow.xl}`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey Free
          </motion.button>
          
          <p className={`text-xs ${theme.colors.text.tertiary} mt-4`}>
            No credit card required • Start chatting in seconds
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default PremiumLandingPage;
