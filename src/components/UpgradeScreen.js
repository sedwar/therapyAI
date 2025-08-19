import React from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Zap, 
  Sparkles, 
  Check, 
  ArrowLeft,
  Heart,
  Brain,
  Mic,
  MessageCircle,
  BarChart3,
  Headphones
} from 'lucide-react';

const UpgradeScreen = ({ theme, onBack, currentTier }) => {
  const tiers = [
    {
      id: 'free',
      name: 'Explorer',
      price: 'Free',
      description: 'Perfect for getting started',
      icon: Heart,
      gradient: 'from-slate-400 to-slate-600',
      features: [
        '5 conversations per day',
        'Basic AI models (Aura, Nova, Zen, Sage)',
        'Standard response time',
        'Community support'
      ],
      limitations: [
        'Limited daily usage',
        'No advanced models',
        'No journal access',
        'No voice features'
      ]
    },
    {
      id: 'premium',
      name: 'Visionary',
      price: '$9.99/month',
      description: 'Unlock the full potential',
      icon: Sparkles,
      gradient: 'from-cyan-500 to-teal-500',
      popular: true,
      features: [
        'Unlimited conversations',
        'GPT-4 & Phoenix model access',
        'Personal AI journal',
        'Voice conversations',
        'Priority response time',
        'Premium support',
        'Advanced mood tracking'
      ],
      benefits: [
        'No daily limits',
        'Smarter AI responses',
        'Private reflection space',
        'Natural voice chat'
      ]
    },
    {
      id: 'pro',
      name: 'Genius',
      price: '$19.99/month',
      description: 'For the ultimate experience',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'Everything in Visionary',
        'GPT-4 Turbo & Quantum model',
        'Custom AI personalities',
        'Advanced conversation analytics',
        'API access for developers',
        'White-glove support',
        'Early access to new features',
        'Personal AI insights dashboard'
      ],
      benefits: [
        'Cutting-edge AI models',
        'Tailored experiences',
        'Deep conversation insights',
        'Developer-friendly'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`min-h-screen ${theme.colors.bg} p-4 md:p-6`}>
      {/* Header */}
      <motion.header 
        className="max-w-6xl mx-auto mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={onBack}
          className={`mb-4 md:mb-6 flex items-center space-x-2 ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Crown className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
          <h1 className={`text-2xl md:text-4xl font-light ${theme.colors.text} mb-3 md:mb-4`}>
            Unlock Your AI Potential
          </h1>
          <p className={`${theme.colors.textSecondary} text-base md:text-xl max-w-2xl mx-auto px-4`}>
            Choose the plan that fits your journey. Upgrade anytime, cancel anytime.
          </p>
        </div>
      </motion.header>

      {/* Pricing Cards */}
      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tiers.map((tier, index) => {
          const IconComponent = tier.icon;
          const isCurrentTier = currentTier === tier.id;
          const isPopular = tier.popular;

          return (
            <motion.div
              key={tier.id}
              className={`relative ${theme.colors.card} border rounded-3xl p-8 ${theme.shadows.glow} ${
                isPopular ? 'border-cyan-500/50 shadow-cyan-500/20' : ''
              } ${isCurrentTier ? 'ring-2 ring-green-500/50' : ''}`}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Current Tier Badge */}
              {isCurrentTier && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>Current</span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${tier.gradient} flex items-center justify-center`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-medium ${theme.colors.text} mb-2`}>
                  {tier.name}
                </h3>
                <p className={`${theme.colors.textSecondary} mb-4`}>
                  {tier.description}
                </p>
                <div className={`text-3xl font-light ${theme.colors.text}`}>
                  {tier.price}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${tier.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className={`${theme.colors.text} text-sm`}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {!isCurrentTier && (
                <motion.button
                  className={`w-full py-4 rounded-2xl font-medium transition-all ${
                    tier.id === 'free' 
                      ? `border ${theme.colors.text} hover:${theme.colors.card}`
                      : `bg-gradient-to-r ${tier.gradient} text-white hover:shadow-lg`
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tier.id === 'free' ? 'Current Plan' : `Upgrade to ${tier.name}`}
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Feature Comparison */}
      <motion.div 
        className={`max-w-4xl mx-auto ${theme.colors.card} border rounded-3xl p-8 ${theme.shadows.glow}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className={`text-2xl font-light ${theme.colors.text} mb-8 text-center`}>
          What You Get With Premium
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Brain,
              title: 'Advanced AI Models',
              description: 'Access GPT-4 and our premium Phoenix & Quantum models'
            },
            {
              icon: MessageCircle,
              title: 'Unlimited Conversations',
              description: 'No daily limits. Chat as much as you want, whenever you want'
            },
            {
              icon: Heart,
              title: 'Personal Journal',
              description: 'Private AI-powered journaling with mood tracking and insights'
            },
            {
              icon: Mic,
              title: 'Voice Conversations',
              description: 'Natural voice chat with your AI companions'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className={`font-medium ${theme.colors.text} mb-2`}>
                {feature.title}
              </h3>
              <p className={`${theme.colors.textSecondary} text-sm`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ/Trust Signals */}
      <motion.div 
        className="max-w-2xl mx-auto mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className={`text-lg font-medium ${theme.colors.text} mb-2`}>
              ✨ No Commitment
            </div>
            <p className={`${theme.colors.textSecondary} text-sm`}>
              Cancel anytime. No hidden fees.
            </p>
          </div>
          <div>
            <div className={`text-lg font-medium ${theme.colors.text} mb-2`}>
              🔒 Private & Secure
            </div>
            <p className={`${theme.colors.textSecondary} text-sm`}>
              Your conversations are encrypted and private.
            </p>
          </div>
          <div>
            <div className={`text-lg font-medium ${theme.colors.text} mb-2`}>
              ⚡ Instant Access
            </div>
            <p className={`${theme.colors.textSecondary} text-sm`}>
              Upgrade now, start using immediately.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpgradeScreen;
