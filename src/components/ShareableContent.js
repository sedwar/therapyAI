// AURA AI - Viral Sharing System
// Beautiful shareable conversation cards for social media

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share, 
  Download, 
  Copy, 
  Twitter, 
  Facebook, 
  Instagram, 
  Link,
  X,
  Sparkles,
  Heart,
  Quote
} from 'lucide-react';
import { createPremiumTheme, getTimeOfDay } from '../utils/premiumDesignSystem';
import html2canvas from 'html2canvas';

const ShareableContent = ({ 
  message, 
  aiResponse, 
  aiName, 
  aiEmoji, 
  onClose, 
  isDarkMode,
  theme 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareFormat, setShareFormat] = useState('quote'); // quote, conversation, insight
  const cardRef = useRef(null);

  // Share formats
  const shareFormats = {
    quote: {
      name: 'Inspirational Quote',
      description: 'Beautiful quote card perfect for social sharing',
      icon: Quote
    },
    conversation: {
      name: 'Conversation Highlight',
      description: 'Show the full conversation exchange',
      icon: Sparkles
    },
    insight: {
      name: 'AI Insight',
      description: 'Focus on the AI\'s wisdom and advice',
      icon: Heart
    }
  };

  // Generate shareable image
  const generateImage = async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        height: 800,
        width: 600
      });
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aura-ai-${shareFormat}-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy link to clipboard
  const copyLink = () => {
    const shareText = shareFormat === 'quote' 
      ? `"${aiResponse}" - AURA AI\n\nGet your own AI companion at aura.ai`
      : `Amazing conversation with AURA AI! Check it out at aura.ai`;
    
    navigator.clipboard.writeText(shareText);
    // TODO: Show toast notification
  };

  // Social media sharing
  const shareToSocial = (platform) => {
    const text = encodeURIComponent(`"${aiResponse}" - AURA AI`);
    const url = encodeURIComponent('https://aura.ai');
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=AURA,AI,Wisdom`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Render different share formats
  const renderShareCard = () => {
    const gradients = {
      quote: 'from-purple-400 via-pink-400 to-red-400',
      conversation: 'from-blue-400 via-cyan-400 to-teal-400',
      insight: 'from-green-400 via-emerald-400 to-cyan-400'
    };

    if (shareFormat === 'quote') {
      return (
        <div className="relative w-96 h-96 mx-auto">
          {/* Background with gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients.quote} rounded-3xl`} />
          
          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-center text-center text-white">
            {/* Quote Icon */}
            <Quote className="w-8 h-8 mx-auto mb-4 opacity-80" />
            
            {/* Quote Text */}
            <blockquote className="text-lg font-medium leading-relaxed mb-6 flex-1 flex items-center">
              "{aiResponse.slice(0, 200)}{aiResponse.length > 200 ? '...' : ''}"
            </blockquote>
            
            {/* Attribution */}
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl">{aiEmoji}</span>
                <span className="font-semibold">{aiName}</span>
              </div>
              <p className="text-sm opacity-80">AURA AI - Your Perfect Companion</p>
              <p className="text-xs opacity-60 mt-1">aura.ai</p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-white/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="absolute bottom-4 left-4 text-white/20">
            <Heart className="w-4 h-4" />
          </div>
        </div>
      );
    }

    if (shareFormat === 'conversation') {
      return (
        <div className="relative w-96 h-96 mx-auto">
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients.conversation} rounded-3xl`} />
          
          {/* Content */}
          <div className="relative z-10 p-6 h-full flex flex-col text-white">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">{aiEmoji}</span>
              </div>
              <div>
                <p className="font-semibold">{aiName}</p>
                <p className="text-xs opacity-80">AURA AI</p>
              </div>
            </div>
            
            {/* User Message */}
            <div className="mb-4">
              <div className="bg-white/20 rounded-2xl rounded-tr-md p-3 ml-8">
                <p className="text-sm">{message.slice(0, 100)}{message.length > 100 ? '...' : ''}</p>
              </div>
            </div>
            
            {/* AI Response */}
            <div className="flex-1">
              <div className="bg-white/30 rounded-2xl rounded-tl-md p-3 mr-8">
                <p className="text-sm leading-relaxed">
                  {aiResponse.slice(0, 150)}{aiResponse.length > 150 ? '...' : ''}
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-sm font-medium">AURA AI - Your Perfect Companion</p>
              <p className="text-xs opacity-60">aura.ai</p>
            </div>
          </div>
        </div>
      );
    }

    if (shareFormat === 'insight') {
      return (
        <div className="relative w-96 h-96 mx-auto">
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients.insight} rounded-3xl`} />
          
          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-center text-center text-white">
            {/* AI Avatar */}
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">{aiEmoji}</span>
            </div>
            
            {/* Insight Label */}
            <p className="text-sm opacity-80 mb-2">AI Insight from {aiName}</p>
            
            {/* Insight Text */}
            <div className="flex-1 flex items-center">
              <p className="text-lg font-medium leading-relaxed">
                {aiResponse.slice(0, 180)}{aiResponse.length > 180 ? '...' : ''}
              </p>
            </div>
            
            {/* Footer */}
            <div className="border-t border-white/20 pt-4">
              <p className="font-semibold">AURA AI</p>
              <p className="text-sm opacity-80">Your Perfect AI Companion</p>
              <p className="text-xs opacity-60 mt-1">aura.ai</p>
            </div>
          </div>
          
          {/* Decorative sparkles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/20"
              style={{
                top: `${20 + i * 15}%`,
                right: `${10 + i * 5}%`,
                transform: `rotate(${i * 72}deg)`
              }}
            >
              <Sparkles className="w-3 h-3" />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`${theme.colors.card.primary} rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${theme.colors.text.primary}`}>
              Share Your Conversation
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${theme.colors.interactive.button}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Format Selector */}
          <div className="mb-6">
            <p className={`text-sm ${theme.colors.text.secondary} mb-3`}>Choose your share format:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(shareFormats).map(([key, format]) => (
                <button
                  key={key}
                  onClick={() => setShareFormat(key)}
                  className={`p-3 rounded-lg border transition-all ${
                    shareFormat === key
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <format.icon className={`w-5 h-5 mx-auto mb-2 ${
                    shareFormat === key ? 'text-cyan-400' : theme.colors.text.secondary
                  }`} />
                  <p className={`font-medium text-sm ${theme.colors.text.primary}`}>
                    {format.name}
                  </p>
                  <p className={`text-xs ${theme.colors.text.tertiary}`}>
                    {format.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <p className={`text-sm ${theme.colors.text.secondary} mb-3`}>Preview:</p>
            <div 
              ref={cardRef}
              className="bg-white rounded-lg p-4 flex items-center justify-center"
              style={{ minHeight: '400px' }}
            >
              {renderShareCard()}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {/* Download & Copy */}
            <div className="flex space-x-3">
              <motion.button
                onClick={generateImage}
                disabled={isGenerating}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-medium ${
                  isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                } transition-all`}
                whileHover={!isGenerating ? { scale: 1.02 } : {}}
                whileTap={!isGenerating ? { scale: 0.98 } : {}}
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? 'Generating...' : 'Download Image'}</span>
              </motion.button>

              <motion.button
                onClick={copyLink}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 ${theme.colors.interactive.button} rounded-lg font-medium`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Copy className="w-4 h-4" />
                <span>Copy Text</span>
              </motion.button>
            </div>

            {/* Social Sharing */}
            <div>
              <p className={`text-sm ${theme.colors.text.secondary} mb-3`}>Share to social media:</p>
              <div className="flex space-x-3">
                <motion.button
                  onClick={() => shareToSocial('twitter')}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </motion.button>

                <motion.button
                  onClick={() => shareToSocial('facebook')}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </motion.button>

                <motion.button
                  onClick={() => shareToSocial('linkedin')}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-700 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link className="w-4 h-4" />
                  <span>LinkedIn</span>
                </motion.button>
              </div>
            </div>

            {/* Referral Message */}
            <div className={`${theme.colors.card.secondary} rounded-lg p-4 text-center`}>
              <p className={`text-sm ${theme.colors.text.secondary} mb-2`}>
                💝 Sharing AURA AI helps others discover their perfect AI companion!
              </p>
              <p className={`text-xs ${theme.colors.text.tertiary}`}>
                Each share spreads the love and helps build our community
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareableContent;
