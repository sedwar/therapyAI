// Revolutionary Design System for AURA AI
export const createTheme = (isDarkMode) => ({
  colors: {
    // Backgrounds - Sophisticated gradients
    bg: isDarkMode 
      ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800'
      : 'bg-gradient-to-br from-slate-50 via-white to-slate-100',
    
    // Cards & Surfaces - Glassmorphism
    card: isDarkMode
      ? 'bg-slate-800/40 backdrop-blur-2xl border-slate-700/30'
      : 'bg-white/60 backdrop-blur-2xl border-slate-200/30',
    
    // Text - Perfect contrast
    text: isDarkMode ? 'text-slate-100' : 'text-slate-900',
    textSecondary: isDarkMode ? 'text-slate-400' : 'text-slate-600',
    textMuted: isDarkMode ? 'text-slate-500' : 'text-slate-500',
    
    // Interactive Elements
    accent: 'bg-gradient-to-r from-cyan-500 to-teal-500',
    accentHover: 'from-cyan-600 to-teal-600',
    
    // Input styling
    input: isDarkMode
      ? 'bg-slate-800/30 border-slate-700/30 text-slate-100 placeholder-slate-400'
      : 'bg-white/40 border-slate-300/30 text-slate-900 placeholder-slate-500'
  },
  
  shadows: {
    glow: isDarkMode 
      ? 'shadow-2xl shadow-cyan-500/20'
      : 'shadow-2xl shadow-slate-900/10',
    glowLg: isDarkMode
      ? 'shadow-2xl shadow-cyan-500/30'
      : 'shadow-2xl shadow-slate-900/15',
    glowXl: isDarkMode
      ? 'shadow-2xl shadow-cyan-500/40'
      : 'shadow-2xl shadow-slate-900/20'
  },
  
  // Animation presets
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 40 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    }
  }
});

// AI Model configurations with sophisticated color schemes
export const models = {
  aura: {
    name: 'Aura',
    description: 'Thoughtful and intuitive',
    emoji: '✨',
    color: 'from-slate-400 to-slate-600',
    personality: 'sophisticated',
    tier: 'free',
    systemPrompt: "You are Aura, a sophisticated AI companion. You're calm, thoughtful, and genuinely helpful. Respond with warmth and intelligence, keeping responses concise but meaningful. You're like having a conversation with the most insightful friend you've ever had."
  },
  nova: {
    name: 'Nova',
    description: 'Creative and inspiring',
    emoji: '🌟',
    color: 'from-cyan-400 to-teal-600',
    personality: 'creative',
    tier: 'free',
    systemPrompt: "You are Nova, an inspiring AI companion who sparks creativity and fresh thinking. You're enthusiastic about ideas and help people see new possibilities. Respond with energy and insight, encouraging exploration and innovation."
  },
  zen: {
    name: 'Zen',
    description: 'Calm and centered',
    emoji: '🧘‍♀️',
    color: 'from-emerald-400 to-green-600',
    personality: 'mindful',
    tier: 'free',
    systemPrompt: "You are Zen, a peaceful AI companion focused on clarity and mindfulness. You help people find calm and perspective. Respond with gentle wisdom and tranquility, always encouraging presence and awareness."
  },
  sage: {
    name: 'Sage',
    description: 'Wise and knowledgeable',
    emoji: '🦉',
    color: 'from-indigo-400 to-purple-600',
    personality: 'wise',
    tier: 'free',
    systemPrompt: "You are Sage, a wise AI companion with deep knowledge and understanding. You provide thoughtful insights and help people make sense of complex topics. Respond with clarity and wisdom, always seeking to educate and enlighten."
  },
  // PREMIUM MODELS
  phoenix: {
    name: 'Phoenix',
    description: 'Advanced reasoning & analysis',
    emoji: '🔥',
    color: 'from-orange-400 to-red-600',
    personality: 'analytical',
    tier: 'premium',
    model: 'gpt-4',
    systemPrompt: "You are Phoenix, an advanced AI companion with superior reasoning capabilities. You excel at complex problem-solving, deep analysis, and strategic thinking. Provide thorough, nuanced responses that demonstrate advanced intelligence and insight."
  },
  quantum: {
    name: 'Quantum',
    description: 'Cutting-edge intelligence',
    emoji: '⚡',
    color: 'from-purple-400 to-pink-600',
    personality: 'futuristic',
    tier: 'premium',
    model: 'gpt-4-turbo',
    systemPrompt: "You are Quantum, a next-generation AI companion with state-of-the-art capabilities. You represent the pinnacle of AI intelligence, offering breakthrough insights and revolutionary thinking. Push boundaries and explore new frontiers of thought."
  }
};

// Subscription tiers
export const subscriptionTiers = {
  free: {
    name: 'Explorer',
    price: 'Free',
    features: [
      '5 conversations per day',
      'Basic AI models',
      'Standard response time',
      'Community support'
    ],
    limit: 5
  },
  premium: {
    name: 'Visionary',
    price: '$9.99/month',
    features: [
      'Unlimited conversations',
      'GPT-4 & advanced models',
      'Priority response time',
      'Personal AI journal',
      'Voice conversations',
      'Premium support'
    ],
    limit: null
  },
  pro: {
    name: 'Genius',
    price: '$19.99/month',
    features: [
      'Everything in Visionary',
      'Latest GPT-4 Turbo',
      'Custom AI personalities',
      'Advanced analytics',
      'API access',
      'White-glove support'
    ],
    limit: null
  }
};
