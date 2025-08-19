import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LandingPage = ({ onGetStarted, onGuestAccess, theme }) => {
  return (
    <div className={`min-h-screen ${theme.colors.bg} flex items-center justify-center p-4`}>
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div 
          className="mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className={`w-24 h-24 mx-auto rounded-3xl ${theme.colors.accent} ${theme.shadows.glow} flex items-center justify-center mb-6`}>
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className={`text-5xl font-extralight ${theme.colors.text} mb-3 tracking-tight`}>
            AURA AI
          </h1>
          <p className={`${theme.colors.textSecondary} text-xl font-light`}>
            The future of conversation
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.button
            className={`w-full ${theme.colors.card} border rounded-2xl p-5 ${theme.shadows.glow} hover:${theme.shadows.glowLg} transition-all duration-300`}
            onClick={onGetStarted}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={`${theme.colors.text} font-medium text-lg`}>
              Start Conversation
            </span>
          </motion.button>
          
          <motion.button
            className={`${theme.colors.textMuted} text-sm hover:${theme.colors.textSecondary} transition-colors`}
            onClick={onGuestAccess}
            whileHover={{ y: -1 }}
          >
            Continue as guest
          </motion.button>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className={`${theme.colors.textMuted} text-sm mt-12 font-light`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Elegant • Intelligent • Revolutionary
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
