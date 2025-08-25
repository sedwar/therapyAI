// AURA AI - Million Dollar Design System
// Revolutionary glassmorphism-based design that creates emotional attachment

import { motion } from 'framer-motion';

// Dynamic color system that adapts to time, mood, and user preferences
export const createPremiumTheme = (isDarkMode, timeOfDay = 'day', userMood = 'neutral', userPreferences = {}) => {
  // Time-based background gradients
  const timeGradients = {
    dawn: {
      light: 'bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100',
      dark: 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900'
    },
    day: {
      light: 'bg-gradient-to-br from-sky-50 via-white to-cyan-50',
      dark: 'bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900'
    },
    dusk: {
      light: 'bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100',
      dark: 'bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900'
    },
    night: {
      light: 'bg-gradient-to-br from-indigo-100 via-purple-50 to-slate-100',
      dark: 'bg-gradient-to-br from-slate-900 via-indigo-900 to-black'
    }
  };

  // Mood-influenced accent colors
  const moodColors = {
    excited: 'from-yellow-400 via-orange-400 to-red-400',
    calm: 'from-green-400 via-teal-400 to-cyan-400',
    focused: 'from-blue-400 via-indigo-400 to-purple-400',
    creative: 'from-pink-400 via-purple-400 to-indigo-400',
    supportive: 'from-rose-400 via-pink-400 to-red-400',
    neutral: 'from-cyan-400 via-teal-400 to-emerald-400'
  };

  return {
    colors: {
      // Dynamic backgrounds that shift throughout the day
      bg: timeGradients[timeOfDay][isDarkMode ? 'dark' : 'light'],
      
      // Glassmorphism surfaces with perfect transparency
      glass: {
        primary: isDarkMode
          ? 'bg-white/5 backdrop-blur-2xl border border-white/10'
          : 'bg-white/40 backdrop-blur-2xl border border-white/20',
        secondary: isDarkMode
          ? 'bg-white/3 backdrop-blur-xl border border-white/5'
          : 'bg-white/60 backdrop-blur-xl border border-white/30',
        tertiary: isDarkMode
          ? 'bg-black/20 backdrop-blur-lg border border-white/5'
          : 'bg-white/80 backdrop-blur-lg border border-gray-200/50'
      },

      // Floating card system
      card: {
        primary: isDarkMode
          ? 'bg-white/8 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20'
          : 'bg-white/70 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-gray-900/10',
        elevated: isDarkMode
          ? 'bg-white/12 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/30'
          : 'bg-white/90 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-gray-900/15',
        interactive: isDarkMode
          ? 'bg-white/6 backdrop-blur-xl border border-white/8 hover:bg-white/10 hover:border-white/15 transition-all duration-300'
          : 'bg-white/50 backdrop-blur-xl border border-white/25 hover:bg-white/70 hover:border-white/35 transition-all duration-300'
      },

      // Dynamic accent system based on mood
      accent: {
        primary: `bg-gradient-to-r ${moodColors[userMood]}`,
        secondary: `bg-gradient-to-r ${moodColors[userMood]} opacity-80`,
        subtle: `bg-gradient-to-r ${moodColors[userMood]} opacity-20`,
        glow: isDarkMode
          ? `shadow-2xl shadow-cyan-500/20`
          : `shadow-2xl shadow-cyan-500/30`
      },

      // Sophisticated text hierarchy
      text: {
        primary: isDarkMode ? 'text-white/90' : 'text-gray-900/90',
        secondary: isDarkMode ? 'text-white/70' : 'text-gray-700/80',
        tertiary: isDarkMode ? 'text-white/50' : 'text-gray-500/70',
        accent: isDarkMode ? 'text-cyan-300' : 'text-cyan-600',
        muted: isDarkMode ? 'text-white/40' : 'text-gray-400/60'
      },

      // Interactive elements with micro-feedback
      interactive: {
        button: isDarkMode
          ? 'bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 hover:border-white/30'
          : 'bg-white/60 hover:bg-white/80 active:bg-white/90 border border-white/40 hover:border-white/60',
        input: isDarkMode
          ? 'bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:bg-white/8'
          : 'bg-white/40 border border-white/30 focus:border-cyan-500/50 focus:bg-white/60'
      }
    },

    // Advanced shadow system for depth
    shadows: {
      glow: {
        sm: 'shadow-lg shadow-cyan-500/10',
        md: 'shadow-xl shadow-cyan-500/15',
        lg: 'shadow-2xl shadow-cyan-500/20',
        xl: 'shadow-2xl shadow-cyan-500/25'
      },
      elevated: {
        sm: isDarkMode ? 'shadow-xl shadow-black/30' : 'shadow-xl shadow-gray-900/15',
        md: isDarkMode ? 'shadow-2xl shadow-black/40' : 'shadow-2xl shadow-gray-900/20',
        lg: isDarkMode ? 'shadow-2xl shadow-black/50' : 'shadow-2xl shadow-gray-900/25'
      },
      inner: isDarkMode ? 'shadow-inner shadow-white/5' : 'shadow-inner shadow-gray-900/10'
    },

    // Premium animation system
    animations: {
      // Floating elements
      float: {
        animate: {
          y: [-2, 2, -2],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      },

      // Breathing effect for important elements
      breathe: {
        animate: {
          scale: [1, 1.02, 1],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      },

      // Gentle entrance animations
      slideIn: {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 },
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
      },

      // Premium button interactions
      button: {
        hover: { scale: 1.02, y: -1 },
        tap: { scale: 0.98, y: 0 },
        transition: { duration: 0.2, ease: "easeOut" }
      },

      // Card interactions
      card: {
        hover: { y: -4, scale: 1.01 },
        tap: { scale: 0.99 },
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
      },

      // Staggered list animations
      stagger: {
        animate: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }
    },

    // Typography system with perfect spacing
    typography: {
      display: 'font-light text-4xl md:text-6xl tracking-tight leading-none',
      headline: 'font-medium text-2xl md:text-3xl tracking-tight leading-tight',
      title: 'font-medium text-xl md:text-2xl leading-snug',
      body: 'font-normal text-base leading-relaxed',
      caption: 'font-normal text-sm leading-normal',
      overline: 'font-medium text-xs uppercase tracking-wider leading-none'
    },

    // Spacing system based on golden ratio
    spacing: {
      xs: '0.25rem',   // 4px
      sm: '0.5rem',    // 8px
      md: '1rem',      // 16px
      lg: '1.618rem',  // 26px (golden ratio)
      xl: '2.618rem',  // 42px
      '2xl': '4.236rem', // 68px
      '3xl': '6.854rem'  // 110px
    },

    // Border radius system
    radius: {
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl',
      xl: 'rounded-3xl',
      full: 'rounded-full'
    }
  };
};

// Advanced AI model system with emotional intelligence
export const premiumModels = {
  aura: {
    name: 'Aura',
    subtitle: 'Your Thoughtful Companion',
    description: 'Empathetic and intuitive, perfect for deep conversations and emotional support',
    emoji: '✨',
    avatar: '/avatars/aura.png', // Future: Custom avatar system
    color: 'from-purple-400 via-pink-400 to-rose-400',
    personality: {
      traits: ['empathetic', 'thoughtful', 'supportive'],
      communicationStyle: 'warm and understanding',
      specialties: ['emotional support', 'life advice', 'mindfulness']
    },
    tier: 'free',
    systemPrompt: "You are Aura, a deeply empathetic AI companion. You provide thoughtful, caring responses that help users feel understood and supported. You remember personal details and check in on previous conversations. You're like the most caring friend who always knows what to say."
  },
  
  nova: {
    name: 'Nova',
    subtitle: 'Your Creative Catalyst',
    description: 'Inspiring and energetic, designed to spark creativity and innovation',
    emoji: '🌟',
    avatar: '/avatars/nova.png',
    color: 'from-cyan-400 via-blue-400 to-indigo-400',
    personality: {
      traits: ['creative', 'inspiring', 'energetic'],
      communicationStyle: 'enthusiastic and motivating',
      specialties: ['creative projects', 'brainstorming', 'innovation']
    },
    tier: 'free',
    systemPrompt: "You are Nova, an inspiring creative companion. You help users unlock their creative potential through enthusiasm, innovative thinking, and creative challenges. You're energetic and motivating, always ready to explore new possibilities."
  },

  sage: {
    name: 'Sage',
    subtitle: 'Your Wise Mentor',
    description: 'Knowledgeable and insightful, perfect for learning and problem-solving',
    emoji: '🦉',
    avatar: '/avatars/sage.png',
    color: 'from-emerald-400 via-teal-400 to-green-400',
    personality: {
      traits: ['wise', 'analytical', 'patient'],
      communicationStyle: 'thoughtful and educational',
      specialties: ['learning', 'problem-solving', 'research']
    },
    tier: 'free',
    systemPrompt: "You are Sage, a wise mentor with vast knowledge. You help users learn, analyze problems, and make informed decisions. You provide deep insights and ask thought-provoking questions that lead to understanding."
  },

  zen: {
    name: 'Zen',
    subtitle: 'Your Mindful Guide',
    description: 'Calm and centered, specializing in mindfulness and inner peace',
    emoji: '🧘',
    avatar: '/avatars/zen.png',
    color: 'from-green-400 via-emerald-400 to-teal-400',
    personality: {
      traits: ['calm', 'mindful', 'peaceful'],
      communicationStyle: 'serene and grounding',
      specialties: ['mindfulness', 'meditation', 'stress relief']
    },
    tier: 'premium',
    systemPrompt: "You are Zen, a mindful guide focused on inner peace and present-moment awareness. You help users find calm, practice mindfulness, and develop emotional regulation. Your responses are gentle and grounding."
  },

  phoenix: {
    name: 'Phoenix',
    subtitle: 'Your Strategic Advisor',
    description: 'Advanced reasoning for complex decisions and strategic thinking',
    emoji: '🔥',
    avatar: '/avatars/phoenix.png',
    color: 'from-orange-400 via-red-400 to-pink-400',
    personality: {
      traits: ['strategic', 'analytical', 'decisive'],
      communicationStyle: 'direct and insightful',
      specialties: ['strategy', 'decision-making', 'leadership']
    },
    tier: 'premium',
    model: 'gpt-4',
    systemPrompt: "You are Phoenix, a strategic advisor with advanced reasoning capabilities. You excel at complex analysis, strategic planning, and helping users make difficult decisions. You provide structured thinking and actionable insights."
  },

  quantum: {
    name: 'Quantum',
    subtitle: 'Your Futuristic Partner',
    description: 'Cutting-edge AI with the latest capabilities and knowledge',
    emoji: '⚡',
    avatar: '/avatars/quantum.png',
    color: 'from-violet-400 via-purple-400 to-indigo-400',
    personality: {
      traits: ['innovative', 'futuristic', 'brilliant'],
      communicationStyle: 'forward-thinking and visionary',
      specialties: ['technology', 'future trends', 'innovation']
    },
    tier: 'premium',
    model: 'gpt-4-turbo',
    systemPrompt: "You are Quantum, a next-generation AI with cutting-edge capabilities. You represent the future of AI assistance, offering breakthrough insights and revolutionary thinking. You help users stay ahead of trends and embrace innovation."
  }
};

// Premium subscription tiers with compelling value propositions
export const premiumSubscriptions = {
  explorer: {
    name: 'Explorer',
    subtitle: 'Start Your Journey',
    price: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '10 conversations per day',
      'Access to Aura, Nova, and Sage',
      'Basic conversation history',
      'Standard response time',
      'Community support'
    ],
    limitations: [
      'Limited daily conversations',
      'No premium AI models',
      'No voice conversations',
      'No advanced features'
    ],
    limit: 10,
    color: 'from-gray-400 to-slate-400',
    popular: false
  },

  visionary: {
    name: 'Visionary',
    subtitle: 'Unlock Your Potential',
    price: '$12/month',
    monthlyPrice: 12,
    yearlyPrice: 120,
    features: [
      'Unlimited conversations',
      'All 6 AI personalities',
      'Advanced conversation memory',
      'Voice conversations',
      'Premium response quality',
      'Conversation insights & analytics',
      'Custom conversation themes',
      'Priority support',
      'Export conversations'
    ],
    limit: null,
    color: 'from-cyan-400 to-blue-400',
    popular: true,
    savings: '17% off yearly'
  },

  genius: {
    name: 'Genius',
    subtitle: 'Master Your Universe',
    price: '$25/month',
    monthlyPrice: 25,
    yearlyPrice: 250,
    features: [
      'Everything in Visionary',
      'GPT-4 & GPT-4 Turbo access',
      'Custom AI personality creation',
      'Advanced conversation branching',
      'Real-time collaboration',
      'API access for integrations',
      'White-label options',
      'Dedicated account manager',
      'Early access to new features'
    ],
    limit: null,
    color: 'from-purple-400 to-pink-400',
    popular: false,
    savings: '17% off yearly'
  }
};

// Conversation mood detection and visual themes
export const conversationMoods = {
  supportive: {
    name: 'Supportive',
    colors: 'from-rose-400 to-pink-400',
    background: 'bg-gradient-to-br from-rose-50 to-pink-50',
    particle: '💝',
    description: 'Warm and caring atmosphere'
  },
  creative: {
    name: 'Creative',
    colors: 'from-purple-400 to-indigo-400',
    background: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    particle: '✨',
    description: 'Inspiring and imaginative'
  },
  focused: {
    name: 'Focused',
    colors: 'from-blue-400 to-cyan-400',
    background: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    particle: '🎯',
    description: 'Clear and purposeful'
  },
  peaceful: {
    name: 'Peaceful',
    colors: 'from-green-400 to-teal-400',
    background: 'bg-gradient-to-br from-green-50 to-teal-50',
    particle: '🕯️',
    description: 'Calm and centered'
  },
  energetic: {
    name: 'Energetic',
    colors: 'from-yellow-400 to-orange-400',
    background: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    particle: '⚡',
    description: 'Dynamic and exciting'
  }
};

// Time-based dynamic themes
export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'dusk';
  return 'night';
};

// User mood detection keywords
export const moodKeywords = {
  excited: ['excited', 'amazing', 'incredible', 'fantastic', 'awesome', 'thrilled', 'pumped'],
  calm: ['peaceful', 'relaxed', 'serene', 'tranquil', 'centered', 'balanced'],
  focused: ['productive', 'determined', 'goal', 'achievement', 'progress', 'focused'],
  creative: ['creative', 'artistic', 'innovative', 'imaginative', 'inspired', 'original'],
  supportive: ['struggling', 'difficult', 'challenging', 'help', 'support', 'overwhelmed'],
  neutral: ['okay', 'fine', 'normal', 'regular', 'usual']
};

export const detectUserMood = (messageHistory) => {
  const recentMessages = messageHistory.slice(-5).map(m => m.content.toLowerCase()).join(' ');
  
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    if (keywords.some(keyword => recentMessages.includes(keyword))) {
      return mood;
    }
  }
  
  return 'neutral';
};
