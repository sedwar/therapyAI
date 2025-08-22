// AURA AI - Complete Design System
// Consolidated theme system for the revolutionary ChatGPT wrapper

// Base theme system for app-wide styling
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

// AI Model configurations with sophisticated personas
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

// Enhanced Chat Features (for future implementation)
export const conversationThemes = {
  minimal: {
    name: 'Minimal',
    emoji: '⚪',
    description: 'Clean and focused',
    colors: {
      primary: 'from-slate-600 via-gray-600 to-slate-700',
      secondary: 'from-slate-500 to-gray-600',
      accent: 'from-slate-400 to-gray-500',
      text: 'text-slate-100',
      textSecondary: 'text-slate-300',
      background: 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800',
      card: 'bg-slate-800/50 backdrop-blur-xl border-slate-500/20',
      userBubble: 'bg-gradient-to-r from-slate-500 to-gray-500',
      aiBubble: 'bg-gradient-to-r from-slate-600/80 to-gray-600/80 backdrop-blur-xl',
      glow: 'shadow-slate-500/20',
      particles: ['💭', '✨', '💫', '⭐', '🤍']
    },
    animation: {
      background: 'animate-none',
      particles: false
    }
  },
  cosmic: {
    name: 'Cosmic',
    emoji: '🌌',
    description: 'Journey through the stars',
    colors: {
      primary: 'from-purple-600 via-blue-600 to-indigo-900',
      secondary: 'from-purple-500 to-blue-600',
      accent: 'from-cyan-400 to-purple-500',
      text: 'text-purple-100',
      textSecondary: 'text-purple-300',
      background: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black',
      card: 'bg-purple-900/30 backdrop-blur-xl border-purple-500/20',
      userBubble: 'bg-gradient-to-r from-purple-500 to-pink-500',
      aiBubble: 'bg-gradient-to-r from-indigo-500/80 to-purple-500/80 backdrop-blur-xl',
      glow: 'shadow-purple-500/30',
      particles: ['⭐', '✨', '🌟', '💫', '🪐']
    },
    animation: {
      background: 'animate-pulse',
      particles: true
    }
  },
  ocean: {
    name: 'Ocean',
    emoji: '🌊',
    description: 'Dive into tranquil depths',
    colors: {
      primary: 'from-blue-600 via-cyan-600 to-teal-700',
      secondary: 'from-blue-500 to-cyan-600',
      accent: 'from-cyan-400 to-teal-500',
      text: 'text-cyan-100',
      textSecondary: 'text-cyan-300',
      background: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-800',
      card: 'bg-cyan-900/30 backdrop-blur-xl border-cyan-500/20',
      userBubble: 'bg-gradient-to-r from-cyan-500 to-teal-500',
      aiBubble: 'bg-gradient-to-r from-blue-500/80 to-cyan-500/80 backdrop-blur-xl',
      glow: 'shadow-cyan-500/30',
      particles: ['🐠', '🫧', '🌊', '🐚', '🦋']
    },
    animation: {
      background: 'animate-pulse',
      particles: true
    }
  }
};

// Message reaction system (for future implementation)
export const messageReactions = {
  love: { emoji: '❤️', label: 'Love it', color: 'text-red-500' },
  wow: { emoji: '🤯', label: 'Mind blown', color: 'text-yellow-500' },
  smart: { emoji: '🧠', label: 'So smart', color: 'text-blue-500' },
  helpful: { emoji: '💡', label: 'Super helpful', color: 'text-orange-500' },
  confused: { emoji: '🤔', label: 'Confused', color: 'text-purple-500' }
};

// Smart suggestion categories (for future implementation)
export const suggestionCategories = {
  creative: {
    name: 'Creative',
    emoji: '🎨',
    color: 'from-pink-500 to-purple-500',
    prompts: [
      'Help me brainstorm ideas for...',
      'Write a creative story about...',
      'Design a concept for...',
      'Come up with unique solutions for...'
    ]
  },
  work: {
    name: 'Work',
    emoji: '💼',
    color: 'from-blue-500 to-cyan-500',
    prompts: [
      'Help me plan my day...',
      'Draft an email about...',
      'Analyze this problem...',
      'Create a strategy for...'
    ]
  },
  learning: {
    name: 'Learning',
    emoji: '📚',
    color: 'from-green-500 to-emerald-500',
    prompts: [
      'Explain this concept...',
      'Teach me about...',
      'Help me understand...',
      'Break down this topic...'
    ]
  },
  fun: {
    name: 'Fun',
    emoji: '🎉',
    color: 'from-yellow-500 to-orange-500',
    prompts: [
      'Let\'s play a game...',
      'Tell me something interesting about...',
      'What would happen if...',
      'Create a fun challenge for...'
    ]
  }
};
