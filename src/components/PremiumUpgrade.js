// 💎 AURA AI - PREMIUM MONETIZATION SYSTEM
// Premium subscription tiers and upgrade interface

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createCinematicTheme } from '../ui/themes/cinematicDesign';

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SparkleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
  </svg>
);

const PremiumUpgrade = ({ onBack, currentTier = 'explorer' }) => {
  const theme = createCinematicTheme('dark');
  const [selectedPlan, setSelectedPlan] = useState('visionary');
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // monthly, yearly

  const subscriptionPlans = {
    explorer: {
      name: 'Explorer',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        '10 AI conversations per day',
        'Basic AI models',
        'Standard response time',
        'Email support',
        'Basic conversation history'
      ],
      limitations: [
        'No premium AI models',
        'No voice features',
        'No advanced analytics',
        'No priority support'
      ],
      color: 'from-slate-600 to-slate-400',
      popular: false
    },
    visionary: {
      name: 'Visionary',
      price: { monthly: 9, yearly: 90 },
      description: 'For serious AI power users',
      features: [
        '50 AI conversations per day',
        'All premium AI models (GPT-4, Claude, etc.)',
        'Voice conversations & synthesis',
        'Advanced conversation analytics',
        'Priority response time (2x faster)',
        'Conversation sharing & export',
        'Custom AI personalities',
        'Advanced memory & context',
        'Priority customer support',
        'Early access to new features'
      ],
      limitations: [],
      color: 'from-teal-600 to-green-600',
      popular: true,
      savings: billingPeriod === 'yearly' ? '17%' : null
    },
    genius: {
      name: 'Genius',
      price: { monthly: 19, yearly: 190 },
      description: 'For teams and professionals',
      features: [
        'Unlimited AI conversations',
        'Everything in Visionary',
        'Team collaboration features',
        'Advanced AI model fine-tuning',
        'Custom API access',
        'White-label options',
        'Advanced security & compliance',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics dashboard',
        'Enterprise-grade support'
      ],
      limitations: [],
      color: 'from-green-600 to-teal-600',
      popular: false,
      savings: billingPeriod === 'yearly' ? '17%' : null
    }
  };

  const handleUpgrade = async (planName) => {
    // TODO: Integrate with payment processor (Stripe, etc.)
    console.log(`Upgrading to ${planName} - ${billingPeriod}`);
    
    // Mock payment flow
    const plan = subscriptionPlans[planName];
    const amount = plan.price[billingPeriod];
    
    // In a real app, this would redirect to payment processor
    alert(`Redirecting to payment for ${plan.name} plan - $${amount}/${billingPeriod}`);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: theme.gradients.background.mesh,
        backgroundColor: theme.colors.bg.primary 
      }}
    >
      {/* Header */}
      <motion.header 
        className="p-6 md:p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBack}
              className="p-2 rounded-xl backdrop-blur-sm border border-white/10 text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
              Upgrade to Premium
            </h1>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex items-center space-x-4">
            <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <motion.button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className={`w-14 h-8 rounded-full transition-colors ${
                billingPeriod === 'yearly' ? 'bg-teal-500' : 'bg-slate-600'
              }`}
              layout
            >
              <motion.div 
                className="w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{ x: billingPeriod === 'yearly' ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
              Yearly
              {billingPeriod === 'yearly' && (
                <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                  Save 17%
                </span>
              )}
            </span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-teal-200 to-green-200 bg-clip-text text-transparent">
              Unlock Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
              AI Potential
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of professionals, creators, and visionaries who use AURA AI 
            to accelerate their thinking and achieve breakthrough results.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(subscriptionPlans).map(([key, plan], index) => (
            <motion.div
              key={key}
              className={`relative p-8 rounded-3xl backdrop-blur-xl border ${
                plan.popular 
                  ? 'border-teal-500/50 ring-2 ring-teal-500/30' 
                  : 'border-white/10'
              } ${selectedPlan === key ? 'ring-2 ring-teal-500/50' : ''}`}
              style={{
                background: plan.popular 
                  ? theme.gradients.glass.secondary 
                  : theme.gradients.glass.primary
              }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedPlan(key)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price[billingPeriod]}
                  </span>
                  <span className="text-slate-400 ml-2">
                    /{billingPeriod === 'yearly' ? 'year' : 'month'}
                  </span>
                  {plan.savings && (
                    <div className="mt-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        Save {plan.savings}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-3 h-3 text-teal-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => handleUpgrade(key)}
                disabled={currentTier === key}
                className={`w-full p-4 rounded-2xl font-semibold transition-all ${
                  currentTier === key
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white hover:shadow-lg hover:shadow-teal-500/50'
                    : 'border border-white/20 text-white hover:bg-white/10'
                }`}
                whileHover={currentTier !== key ? { scale: 1.02 } : {}}
                whileTap={currentTier !== key ? { scale: 0.98 } : {}}
              >
                {currentTier === key ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16 p-8 rounded-3xl backdrop-blur-xl border border-white/10 text-center"
          style={{ background: theme.gradients.glass.primary }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Need Something Custom?
          </h3>
          <p className="text-slate-300 mb-6 text-lg">
            Enterprise solutions, custom AI models, and white-label options available.
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-500 text-white rounded-2xl font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Sales
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1M+</div>
              <div className="text-sm text-slate-400">Conversations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-sm text-slate-400">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgrade;
