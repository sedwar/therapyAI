// 🔧 AURA AI - Environment Configuration
// Centralized configuration management

export const config = {
  // App Information
  app: {
    name: process.env.REACT_APP_APP_NAME || 'AURA AI',
    version: process.env.REACT_APP_APP_VERSION || '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    description: 'Intelligent AI conversation platform'
  },

  // API Configuration
  api: {
    openai: {
      apiKey: process.env.REACT_APP_OPENAI_API_KEY || null,
      baseUrl: 'https://api.openai.com/v1',
      defaultModel: 'gpt-3.5-turbo',
      timeout: 30000
    }
  },

  // Firebase Configuration
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD5h_d08EbvpMB6pGQG9OKCVGm5jHij32M",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "therapy-d027b.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "therapy-d027b",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "therapy-d027b.firebasestorage.app",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "602332150906",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:602332150906:web:63479c4487e1e48cde4fc3",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-4E7KWT2XS1"
  },

  // Feature Flags
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS !== 'false',
    premium: process.env.REACT_APP_ENABLE_PREMIUM !== 'false',
    socialFeatures: process.env.REACT_APP_ENABLE_SOCIAL_FEATURES !== 'false',
    voiceChat: process.env.REACT_APP_ENABLE_VOICE_CHAT === 'true',
    imageGeneration: process.env.REACT_APP_ENABLE_IMAGE_GEN === 'true'
  },

  // Premium Tiers
  subscription: {
    tiers: {
      explorer: {
        name: 'Explorer',
        price: { monthly: 0, yearly: 0 },
        limits: { dailyMessages: 50, models: ['aura-assistant', 'gpt-3.5-turbo'] },
        features: ['Basic AI models', 'Standard response time', 'Email support']
      },
      visionary: {
        name: 'Visionary',
        price: { monthly: 29, yearly: 290 },
        limits: { dailyMessages: null, models: ['all'] },
        features: [
          'Unlimited conversations',
          'All premium AI models',
          'Voice conversations',
          'Priority response time',
          'Advanced analytics',
          'Conversation sharing',
          'Custom AI personalities',
          'Priority support'
        ]
      },
      genius: {
        name: 'Genius',
        price: { monthly: 79, yearly: 790 },
        limits: { dailyMessages: null, models: ['all'] },
        features: [
          'Everything in Visionary',
          'Team collaboration',
          'Custom AI model fine-tuning',
          'API access',
          'White-label options',
          'Enterprise security',
          'Dedicated account manager',
          'Custom integrations'
        ]
      }
    }
  },

  // UI Configuration
  ui: {
    theme: {
      defaultMode: 'dark',
      animations: {
        enabled: true,
        reducedMotion: false
      }
    },
    limits: {
      maxMessageLength: 4000,
      maxConversationHistory: 50,
      maxFileSize: 10 * 1024 * 1024 // 10MB
    }
  },

  // Development Configuration
  development: {
    mockApi: process.env.NODE_ENV === 'development' && !process.env.REACT_APP_OPENAI_API_KEY,
    debugMode: process.env.NODE_ENV === 'development',
    showPerformanceMetrics: process.env.NODE_ENV === 'development'
  }
};

// Validation
export const validateConfig = () => {
  const errors = [];

  // Check required Firebase config
  if (!config.firebase.apiKey) {
    errors.push('Firebase API key is required');
  }

  // Check OpenAI config for production
  if (config.app.environment === 'production' && !config.api.openai.apiKey) {
    console.warn('OpenAI API key not configured - using mock responses');
  }

  if (errors.length > 0) {
    throw new Error(`Configuration errors: ${errors.join(', ')}`);
  }

  return true;
};

// Initialize configuration
validateConfig();

export default config;
