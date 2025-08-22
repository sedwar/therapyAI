// AURA AI - Revolutionary Conversation Themes
export const conversationThemes = {
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
  },
  
  forest: {
    name: 'Forest',
    emoji: '🌲',
    description: 'Find peace in nature',
    colors: {
      primary: 'from-green-600 via-emerald-600 to-teal-700',
      secondary: 'from-green-500 to-emerald-600',
      accent: 'from-emerald-400 to-green-500',
      text: 'text-emerald-100',
      textSecondary: 'text-emerald-300',
      background: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-800',
      card: 'bg-emerald-900/30 backdrop-blur-xl border-emerald-500/20',
      userBubble: 'bg-gradient-to-r from-emerald-500 to-green-500',
      aiBubble: 'bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-xl',
      glow: 'shadow-emerald-500/30',
      particles: ['🍃', '🌿', '🦋', '🌺', '🍀']
    },
    animation: {
      background: 'animate-pulse',
      particles: true
    }
  },
  
  neon: {
    name: 'Neon',
    emoji: '⚡',
    description: 'Electric cyberpunk vibes',
    colors: {
      primary: 'from-pink-600 via-purple-600 to-cyan-600',
      secondary: 'from-pink-500 to-purple-600',
      accent: 'from-cyan-400 to-pink-500',
      text: 'text-pink-100',
      textSecondary: 'text-pink-300',
      background: 'bg-gradient-to-br from-black via-purple-900 to-pink-900',
      card: 'bg-pink-900/30 backdrop-blur-xl border-pink-500/20',
      userBubble: 'bg-gradient-to-r from-pink-500 to-cyan-500',
      aiBubble: 'bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-xl',
      glow: 'shadow-pink-500/50',
      particles: ['⚡', '💫', '🔮', '✨', '🌈']
    },
    animation: {
      background: 'animate-pulse',
      particles: true
    }
  },
  
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
  }
};

// Message reaction system
export const messageReactions = {
  love: { emoji: '❤️', label: 'Love it', color: 'text-red-500' },
  wow: { emoji: '🤯', label: 'Mind blown', color: 'text-yellow-500' },
  smart: { emoji: '🧠', label: 'So smart', color: 'text-blue-500' },
  funny: { emoji: '😂', label: 'Hilarious', color: 'text-green-500' },
  helpful: { emoji: '💡', label: 'Super helpful', color: 'text-orange-500' },
  confused: { emoji: '🤔', label: 'Confused', color: 'text-purple-500' }
};

// Smart suggestion categories
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

// Mood detection keywords
export const moodDetection = {
  excited: {
    keywords: ['amazing', 'awesome', 'excited', 'love', 'fantastic', '!', 'wow'],
    theme: 'neon',
    response: 'I can feel your excitement! ⚡'
  },
  calm: {
    keywords: ['peaceful', 'calm', 'relaxed', 'meditate', 'quiet', 'tranquil'],
    theme: 'ocean',
    response: 'Let\'s keep this peaceful energy flowing 🌊'
  },
  creative: {
    keywords: ['create', 'art', 'design', 'imagine', 'dream', 'inspire'],
    theme: 'cosmic',
    response: 'Your creativity is shining bright! ✨'
  },
  focused: {
    keywords: ['work', 'focus', 'productive', 'plan', 'organize', 'task'],
    theme: 'minimal',
    response: 'Let\'s get things done with clarity 💭'
  },
  nature: {
    keywords: ['nature', 'outside', 'forest', 'trees', 'garden', 'earth'],
    theme: 'forest',
    response: 'Nature has so much wisdom to share 🌿'
  }
};

// Auto-complete suggestions based on context
export const autoCompleteSuggestions = {
  'help me': [
    'help me write a story about',
    'help me plan my day',
    'help me understand',
    'help me brainstorm ideas for'
  ],
  'what is': [
    'what is the best way to',
    'what is the meaning of',
    'what is happening with',
    'what is the difference between'
  ],
  'how to': [
    'how to improve my',
    'how to learn',
    'how to create',
    'how to solve'
  ],
  'can you': [
    'can you explain',
    'can you help me',
    'can you create',
    'can you analyze'
  ]
};
