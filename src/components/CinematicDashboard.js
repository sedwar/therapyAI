// 🎬 AURA AI - CINEMATIC DASHBOARD
// Modern, professional dashboard interface

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { createCinematicTheme } from '../ui/themes/cinematicDesign';

// Custom 3D Icons
const AuraLogo3D = ({ className = "w-12 h-12" }) => (
  <motion.div 
    className={`${className} relative`}
    whileHover={{ rotateY: 180, rotateX: 15 }}
    transition={{ duration: 0.8, ease: "backOut" }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="auraGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <filter id="glow3D">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#auraGradient3D)" strokeWidth="2" opacity="0.3" />
      
      {/* Middle ring */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="url(#auraGradient3D)" strokeWidth="3" opacity="0.6" />
      
      {/* Inner core */}
      <circle cx="50" cy="50" r="15" fill="url(#auraGradient3D)" filter="url(#glow3D)" />
      
      {/* Orbital dots */}
      <circle cx="80" cy="30" r="3" fill="#14b8a6" opacity="0.8">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>
      
      <circle cx="20" cy="70" r="2" fill="#22c55e" opacity="0.6">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;-360 50 50"
          dur="15s"
          repeatCount="indefinite"
        />
      </circle>
      
      <circle cx="75" cy="75" r="1.5" fill="#4ade80" opacity="0.7">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          dur="25s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </motion.div>
);

const NeuralNetworkBG = () => {
  const [nodes] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 20 + 10,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Connections */}
        {nodes.map((node, i) => 
          nodes.slice(i + 1).map((otherNode, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            
            if (distance < 20) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={otherNode.x}
                  y2={otherNode.y}
                  stroke="#14b8a6"
                  strokeWidth="0.1"
                  opacity={0.3 - (distance / 20) * 0.3}
                />
              );
            }
            return null;
          })
        )}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size / 2}
            fill="url(#nodeGradient)"
            opacity={node.opacity}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0 0; ${Math.sin(node.id) * 2} ${Math.cos(node.id) * 2}; 0 0`}
              dur={`${node.speed}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

const FloatingCard = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ opacity: 0, y: 100, rotateX: -15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ 
      duration: 0.8, 
      delay,
      ease: [0.16, 1, 0.3, 1] // Cinematic easing
    }}
    whileHover={{ 
      y: -8, 
      rotateX: 5,
      transition: { duration: 0.3 }
    }}
  >
    {children}
  </motion.div>
);

const CinematicDashboard = ({ 
  user, 
  onStartChat, 
  onNavigateToAuth,
  onNavigateToUpgrade,
  onNavigateToProfile,
  onNavigateToTrending,
  userTier = 'explorer',
  dailyMessageCount = 0 
}) => {
  const theme = createCinematicTheme('dark', 'default');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const containerRef = useRef(null);
  
  // Parallax scrolling effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  // Update time and greeting
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const hour = currentTime.getHours();
    const greetings = {
      morning: ['Ready to crush today?', 'Let\'s make moves', 'Morning energy activated'],
      afternoon: ['Afternoon momentum', 'What\'s on your mind?', 'Let\'s dive in'],
      evening: ['Evening vibes', 'Time to reflect and plan', 'What\'s next?'],
      night: ['Night owl mode', 'Late night clarity', 'Deep thoughts time']
    };
    
    let timeOfDay;
    if (hour < 12) timeOfDay = 'morning';
    else if (hour < 17) timeOfDay = 'afternoon';
    else if (hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';
    
    const timeGreetings = greetings[timeOfDay];
    setGreeting(timeGreetings[Math.floor(Math.random() * timeGreetings.length)]);
  }, [currentTime]);

  // Conversation starters - engaging and relatable
  const conversationStarters = [
    {
      title: 'Life is Messy',
      description: 'When everything feels chaotic and you need clarity',
      icon: '🌪️',
      gradient: 'from-purple-600 via-pink-600 to-red-600',
      prompt: 'Life feels completely chaotic right now and I don\'t know what to do',
      category: 'Reality Check',
      glow: 'shadow-purple-500/30'
    },
    {
      title: 'Relationship Drama',
      description: 'Family, friends, dating - let\'s figure it out together',
      icon: '💔',
      gradient: 'from-rose-500 via-pink-500 to-purple-500',
      prompt: 'There\'s some serious relationship drama going on and I need to vent',
      category: 'Real Talk',
      glow: 'shadow-pink-500/30'
    },
    {
      title: 'Chase Your Dreams',
      description: 'Turn those wild ideas into reality',
      icon: '🚀',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      prompt: 'I have this crazy dream but everyone thinks I\'m nuts for wanting it',
      category: 'Dream Big',
      glow: 'shadow-cyan-500/30'
    },
    {
      title: 'Mental Health Check',
      description: 'Real talk about anxiety, stress, and feeling overwhelmed',
      icon: '🧠',
      gradient: 'from-green-500 via-teal-500 to-blue-500',
      prompt: 'My mental health has been all over the place lately',
      category: 'Mind Matters',
      glow: 'shadow-teal-500/30'
    },
    {
      title: 'Creative Genius Mode',
      description: 'Unleash your creative side and make something amazing',
      icon: '🎭',
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      prompt: 'I want to create something incredible but don\'t know where to start',
      category: 'Create Magic',
      glow: 'shadow-orange-500/30'
    },
    {
      title: 'Just Need to Vent',
      description: 'Sometimes you just need someone who gets it',
      icon: '💨',
      gradient: 'from-slate-500 via-gray-600 to-slate-700',
      prompt: 'I just need to vent to someone who won\'t judge me',
      category: 'No Judgment',
      glow: 'shadow-slate-500/30'
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: theme.gradients.background.mesh,
        backgroundColor: theme.colors.bg.primary 
      }}
    >
      {/* Neural Network Background */}
      <motion.div style={{ y: y1 }}>
        <NeuralNetworkBG />
      </motion.div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <motion.header 
          className="p-6 md:p-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <AuraLogo3D className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                  AURA AI
                </h1>
                <p className="text-sm text-slate-400">Your Compassionate AI Companion</p>
              </div>
            </div>
            
            {/* Navigation & User Actions */}
            <div className="flex items-center space-x-4">
              {/* Trending Topics */}
              <motion.button
                onClick={onNavigateToTrending}
                className="px-4 py-2 border border-white/20 text-white rounded-xl font-medium text-sm backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: 'rgba(20, 184, 166, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                📈 Trending
              </motion.button>
              {/* Premium Button */}
              {userTier === 'explorer' && (
                <motion.button
                  onClick={onNavigateToUpgrade}
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl font-medium text-sm"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upgrade to Pro
                </motion.button>
              )}
              
              {/* Auth Button */}
              {!user || user.email === 'guest' ? (
                <motion.button
                  onClick={onNavigateToAuth}
                  className="px-4 py-2 border border-white/20 text-white rounded-xl font-medium text-sm backdrop-blur-sm"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(20, 184, 166, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              ) : (
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-right">
                    <p className="text-sm text-slate-300">
                      {user?.email || 'Guest User'}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {userTier} • {dailyMessageCount} queries today
                    </p>
                  </div>
                  
                  <motion.button
                    onClick={onNavigateToProfile}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-white font-semibold text-sm">
                      {(user?.email?.[0] || 'G').toUpperCase()}
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.header>
        
        {/* Hero Section */}
        <motion.div 
          className="flex-1 flex flex-col justify-center px-6 md:px-8 py-12"
          style={{ y: y2 }}
        >
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Greeting */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-teal-200 to-green-200 bg-clip-text text-transparent">
                  {greeting.split(' ')[0]}
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                  {greeting.split(' ').slice(1).join(' ')}
                </span>
              </h2>
              
              <motion.p 
                className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Your AI companion for breakthrough conversations and next-level thinking. 
                Ready to explore ideas, solve problems, and unlock your potential? 
                Let's get started. ⚡
              </motion.p>
            </motion.div>
            
            {/* Conversation Starters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {conversationStarters.map((starter, index) => (
                <FloatingCard key={index} delay={0.3 + index * 0.15}>
                  <motion.button
                    onClick={() => onStartChat(starter.prompt)}
                    className="w-full p-8 rounded-3xl border border-white/20 backdrop-blur-xl group relative overflow-hidden h-64"
                    style={{
                      background: `linear-gradient(135deg, ${starter.gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ').replace('-', '')})`,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
                    }}
                    whileHover={{ 
                      scale: 1.08,
                      rotate: 2,
                      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${starter.glow}`,
                      y: -10
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/30" />
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            scale: [1, 2, 1],
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Icon */}
                      <motion.div 
                        className="text-6xl mb-4 filter drop-shadow-lg"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: 10,
                          filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {starter.icon}
                      </motion.div>
                      
                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                          {starter.title}
                        </h3>
                        <p className="text-white/90 text-base leading-relaxed font-medium">
                          {starter.description}
                        </p>
                      </div>
                      
                      {/* Category Badge */}
                      <motion.div 
                        className="flex justify-between items-end"
                        whileHover={{ y: -2 }}
                      >
                        <span className="px-4 py-2 rounded-full text-sm font-bold bg-white/25 text-white backdrop-blur-sm border border-white/30 shadow-lg">
                          {starter.category}
                        </span>
                        <motion.div
                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                          whileHover={{ rotate: 180, scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-white/0 group-hover:bg-white/10 transition-all duration-500"
                      style={{
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.1), transparent)",
                      }}
                    />
                    
                    {/* Border Animation */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/50 transition-all duration-500"
                    />
                  </motion.button>
                </FloatingCard>
              ))}
            </div>
            
            {/* Quick Actions */}
            <FloatingCard delay={0.8} className="max-w-2xl mx-auto">
              <div 
                className="p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
                style={{
                  background: theme.gradients.glass.secondary,
                  boxShadow: theme.shadows.glass.lg
                }}
              >
                <h3 className="text-lg font-semibold text-white mb-4 text-center">
                  Quick Start
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={() => onStartChat("I want to brainstorm innovative solutions")}
                    className="flex-1 p-4 rounded-xl bg-gradient-to-r from-teal-600 to-green-600 text-white font-medium"
                    whileHover={{ scale: 1.02, boxShadow: theme.shadows.glow.teal }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Brainstorming
                  </motion.button>
                  
                  <motion.button
                    onClick={() => onStartChat("Help me solve a complex problem")}
                    className="flex-1 p-4 rounded-xl border border-white/20 backdrop-blur-sm text-white font-medium"
                    style={{ background: theme.gradients.glass.primary }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Problem Solving
                  </motion.button>
                  
                  <motion.button
                    onClick={() => onStartChat("I need strategic guidance")}
                    className="flex-1 p-4 rounded-xl border border-white/20 backdrop-blur-sm text-white font-medium"
                    style={{ background: theme.gradients.glass.primary }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Strategic Guidance
                  </motion.button>
                </div>
                
                {/* Guest Access */}
                {(!user || user.email === 'guest') && (
                  <div className="text-center mt-4">
                    <p className="text-slate-400 text-sm mb-2">
                      Try AURA AI without signing up
                    </p>
                    <motion.button
                      onClick={() => onStartChat("Hello AURA AI, I'd like to explore your capabilities!")}
                      className="px-6 py-2 text-sm text-teal-400 border border-teal-500/30 rounded-xl backdrop-blur-sm hover:bg-teal-500/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start as Guest
                    </motion.button>
                  </div>
                )}
              </div>
            </FloatingCard>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CinematicDashboard;
