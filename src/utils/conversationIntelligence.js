// AURA AI - Advanced Conversation Intelligence System
// Million-dollar conversation memory and analysis capabilities

import { detectUserMood, conversationMoods } from './premiumDesignSystem';

// Advanced emotional tone detection with context awareness
export const detectEmotionalContext = (message, conversationHistory = []) => {
  const emotionalMarkers = {
    distressed: {
      keywords: ['overwhelmed', 'can\'t handle', 'breaking down', 'crisis', 'help me', 'desperate', 'panic'],
      intensity: 'high',
      urgency: 'immediate',
      supportType: 'crisis'
    },
    sad: {
      keywords: ['sad', 'depressed', 'down', 'crying', 'heartbroken', 'devastated', 'miserable', 'hopeless'],
      intensity: 'medium',
      urgency: 'moderate',
      supportType: 'emotional'
    },
    anxious: {
      keywords: ['anxious', 'worried', 'nervous', 'panic', 'scared', 'terrified', 'stressed', 'overwhelmed'],
      intensity: 'medium',
      urgency: 'moderate',
      supportType: 'calming'
    },
    excited: {
      keywords: ['excited', 'amazing', 'incredible', 'awesome', 'fantastic', 'thrilled', 'pumped', 'stoked'],
      intensity: 'high',
      urgency: 'low',
      supportType: 'celebratory'
    },
    confused: {
      keywords: ['confused', 'don\'t understand', 'lost', 'uncertain', 'unclear', 'puzzled'],
      intensity: 'low',
      urgency: 'low',
      supportType: 'clarifying'
    },
    grateful: {
      keywords: ['thank', 'grateful', 'appreciate', 'blessed', 'lucky', 'thankful'],
      intensity: 'medium',
      urgency: 'low',
      supportType: 'affirming'
    },
    frustrated: {
      keywords: ['frustrated', 'annoyed', 'irritated', 'angry', 'mad', 'pissed off', 'furious'],
      intensity: 'medium',
      urgency: 'moderate',
      supportType: 'validating'
    },
    hopeful: {
      keywords: ['hope', 'optimistic', 'positive', 'looking forward', 'excited about', 'possibility'],
      intensity: 'medium',
      urgency: 'low',
      supportType: 'encouraging'
    }
  };

  const messageLower = message.toLowerCase();
  let detectedEmotion = 'neutral';
  let confidence = 0;

  // Analyze current message
  for (const [emotion, data] of Object.entries(emotionalMarkers)) {
    const matches = data.keywords.filter(keyword => messageLower.includes(keyword));
    if (matches.length > 0) {
      const currentConfidence = matches.length / data.keywords.length;
      if (currentConfidence > confidence) {
        confidence = currentConfidence;
        detectedEmotion = emotion;
      }
    }
  }

  // Consider conversation context for emotion persistence
  const recentEmotions = conversationHistory.slice(-3)
    .map(msg => msg.emotionalTone)
    .filter(Boolean);

  const emotionPersistence = recentEmotions.filter(e => e === detectedEmotion).length;
  if (emotionPersistence >= 2) {
    confidence = Math.min(confidence + 0.3, 1.0);
  }

  return {
    emotion: detectedEmotion,
    confidence,
    context: emotionalMarkers[detectedEmotion] || { intensity: 'low', urgency: 'low', supportType: 'general' },
    previousEmotions: recentEmotions
  };
};

// Advanced topic classification with relationship mapping
export const classifyConversationTopic = (message, conversationHistory = []) => {
  const topicCategories = {
    relationships: {
      keywords: ['girlfriend', 'boyfriend', 'partner', 'relationship', 'dating', 'love', 'breakup', 'marriage', 'crush', 'romance'],
      subcategories: ['romantic', 'family', 'friends', 'workplace'],
      priority: 'high',
      sensitivity: 'high'
    },
    career: {
      keywords: ['job', 'work', 'career', 'boss', 'interview', 'promotion', 'salary', 'coworker', 'office', 'business'],
      subcategories: ['job_search', 'workplace_issues', 'career_growth', 'entrepreneurship'],
      priority: 'high',
      sensitivity: 'medium'
    },
    mental_health: {
      keywords: ['anxious', 'depression', 'therapy', 'mental health', 'stress', 'overwhelmed', 'panic', 'therapy'],
      subcategories: ['anxiety', 'depression', 'stress', 'self_care', 'therapy'],
      priority: 'critical',
      sensitivity: 'very_high'
    },
    education: {
      keywords: ['school', 'college', 'university', 'exam', 'study', 'homework', 'grade', 'professor', 'class'],
      subcategories: ['academic', 'exams', 'career_prep', 'student_life'],
      priority: 'medium',
      sensitivity: 'low'
    },
    family: {
      keywords: ['mom', 'dad', 'parent', 'family', 'sibling', 'brother', 'sister', 'children', 'kids'],
      subcategories: ['parents', 'siblings', 'children', 'extended_family'],
      priority: 'high',
      sensitivity: 'high'
    },
    health: {
      keywords: ['health', 'sick', 'doctor', 'medical', 'hospital', 'pain', 'tired', 'sleep'],
      subcategories: ['physical_health', 'mental_health', 'fitness', 'sleep'],
      priority: 'high',
      sensitivity: 'high'
    },
    creativity: {
      keywords: ['creative', 'art', 'music', 'writing', 'design', 'project', 'inspiration', 'idea'],
      subcategories: ['artistic', 'music', 'writing', 'design', 'projects'],
      priority: 'medium',
      sensitivity: 'low'
    },
    personal_growth: {
      keywords: ['goal', 'growth', 'improve', 'better', 'change', 'habit', 'development', 'learn'],
      subcategories: ['goals', 'habits', 'learning', 'self_improvement'],
      priority: 'medium',
      sensitivity: 'medium'
    },
    social: {
      keywords: ['friends', 'social', 'party', 'lonely', 'group', 'community', 'people'],
      subcategories: ['friendships', 'social_anxiety', 'loneliness', 'social_events'],
      priority: 'medium',
      sensitivity: 'medium'
    },
    finances: {
      keywords: ['money', 'budget', 'expensive', 'broke', 'debt', 'saving', 'financial', 'bills'],
      subcategories: ['budgeting', 'debt', 'savings', 'investments'],
      priority: 'medium',
      sensitivity: 'medium'
    }
  };

  const messageLower = message.toLowerCase();
  let primaryTopic = 'general';
  let confidence = 0;
  let subcategory = null;

  // Find primary topic
  for (const [topic, data] of Object.entries(topicCategories)) {
    const matches = data.keywords.filter(keyword => messageLower.includes(keyword));
    if (matches.length > 0) {
      const currentConfidence = matches.length / data.keywords.length;
      if (currentConfidence > confidence) {
        confidence = currentConfidence;
        primaryTopic = topic;
      }
    }
  }

  // Determine subcategory
  if (primaryTopic !== 'general') {
    const category = topicCategories[primaryTopic];
    // Simple subcategory detection based on keywords
    if (primaryTopic === 'relationships') {
      if (messageLower.includes('family') || messageLower.includes('parent')) subcategory = 'family';
      else if (messageLower.includes('friend')) subcategory = 'friends';
      else if (messageLower.includes('work') || messageLower.includes('coworker')) subcategory = 'workplace';
      else subcategory = 'romantic';
    }
  }

  // Consider conversation history for topic continuity
  const recentTopics = conversationHistory.slice(-5)
    .map(msg => msg.topic)
    .filter(Boolean);

  const topicContinuity = recentTopics.filter(t => t === primaryTopic).length;
  if (topicContinuity >= 2) {
    confidence = Math.min(confidence + 0.2, 1.0);
  }

  return {
    primaryTopic,
    subcategory,
    confidence,
    priority: topicCategories[primaryTopic]?.priority || 'low',
    sensitivity: topicCategories[primaryTopic]?.sensitivity || 'low',
    continuity: topicContinuity,
    relatedTopics: recentTopics.filter(t => t !== primaryTopic)
  };
};

// Generate intelligent conversation insights
export const generateConversationInsights = (conversationHistory) => {
  if (conversationHistory.length < 4) return null;

  const emotions = conversationHistory.map(msg => msg.emotionalTone).filter(Boolean);
  const topics = conversationHistory.map(msg => msg.topic).filter(Boolean);
  
  // Emotional journey analysis
  const emotionalJourney = emotions.slice(-10); // Last 10 emotions
  const dominantEmotion = getMostFrequent(emotions);
  const emotionalVariability = new Set(emotionalJourney).size;
  
  // Topic analysis
  const dominantTopic = getMostFrequent(topics);
  const topicVariability = new Set(topics.slice(-10)).size;
  
  // Conversation depth
  const avgMessageLength = conversationHistory.reduce((sum, msg) => sum + msg.content.length, 0) / conversationHistory.length;
  const depth = avgMessageLength > 100 ? 'deep' : avgMessageLength > 50 ? 'moderate' : 'surface';
  
  // Growth indicators
  const growthKeywords = ['learned', 'understand', 'realize', 'insight', 'perspective', 'progress'];
  const growthMentions = conversationHistory.filter(msg => 
    growthKeywords.some(keyword => msg.content.toLowerCase().includes(keyword))
  ).length;
  
  return {
    emotionalJourney: {
      dominant: dominantEmotion,
      variability: emotionalVariability,
      trend: getEmotionalTrend(emotionalJourney),
      stability: emotionalVariability < 3 ? 'stable' : 'varied'
    },
    topicAnalysis: {
      dominant: dominantTopic,
      variability: topicVariability,
      focus: topicVariability < 3 ? 'focused' : 'exploratory'
    },
    conversationDepth: depth,
    growthIndicators: {
      mentions: growthMentions,
      level: growthMentions > 2 ? 'high' : growthMentions > 0 ? 'moderate' : 'low'
    },
    sessionLength: conversationHistory.length,
    engagement: calculateEngagementScore(conversationHistory)
  };
};

// Generate beautiful conversation title
export const generateIntelligentTitle = (conversationHistory) => {
  if (conversationHistory.length === 0) return "New Conversation";
  
  const userMessages = conversationHistory.filter(msg => msg.role === 'user');
  if (userMessages.length === 0) return "New Conversation";
  
  const firstMessage = userMessages[0].content;
  const topics = conversationHistory.map(msg => msg.topic).filter(Boolean);
  const emotions = conversationHistory.map(msg => msg.emotionalTone).filter(Boolean);
  
  const dominantTopic = getMostFrequent(topics);
  const dominantEmotion = getMostFrequent(emotions);
  
  // Create contextual titles
  const titleTemplates = {
    relationships: {
      excited: "💕 Relationship Joy",
      sad: "💔 Relationship Support",
      confused: "🤔 Relationship Guidance",
      default: "💭 Relationship Chat"
    },
    career: {
      excited: "🚀 Career Growth",
      anxious: "💼 Work Stress Support",
      hopeful: "✨ Career Planning",
      default: "👔 Career Discussion"
    },
    mental_health: {
      sad: "🌙 Emotional Support",
      anxious: "🧘 Anxiety Relief",
      hopeful: "🌱 Mental Wellness",
      default: "💚 Wellbeing Chat"
    },
    creativity: {
      excited: "🎨 Creative Inspiration",
      frustrated: "💡 Creative Block",
      hopeful: "✨ Creative Ideas",
      default: "🎭 Creative Chat"
    },
    family: {
      grateful: "👨‍👩‍👧‍👦 Family Love",
      frustrated: "🏠 Family Support",
      sad: "💙 Family Care",
      default: "🏡 Family Talk"
    },
    general: {
      excited: "✨ Exciting Chat",
      thoughtful: "💭 Deep Conversation",
      supportive: "🤗 Supportive Talk",
      default: "💬 Friendly Chat"
    }
  };
  
  const topicTitles = titleTemplates[dominantTopic] || titleTemplates.general;
  const title = topicTitles[dominantEmotion] || topicTitles.default;
  
  // Add personalization based on first message
  if (firstMessage.length < 50) {
    const preview = firstMessage.charAt(0).toUpperCase() + firstMessage.slice(1, 30);
    return `${title}: "${preview}${firstMessage.length > 30 ? '...' : ''}"`;
  }
  
  return title;
};

// Enhanced conversation memory with visual elements
export const saveConversationWithIntelligence = (history, modelId, userId) => {
  try {
    const insights = generateConversationInsights(history);
    const title = generateIntelligentTitle(history);
    const lastMessage = history[history.length - 1];
    
    const conversationData = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      history,
      modelId,
      userId,
      createdAt: new Date().toISOString(),
      lastMessageAt: new Date().toISOString(),
      messageCount: history.length,
      insights,
      metadata: {
        primaryTopic: insights?.topicAnalysis?.dominant || 'general',
        primaryEmotion: insights?.emotionalJourney?.dominant || 'neutral',
        depth: insights?.conversationDepth || 'surface',
        engagement: insights?.engagement || 0,
        mood: detectUserMood(history),
        themes: generateConversationThemes(history)
      },
      tags: generateSmartTags(history),
      summary: generateConversationSummary(history),
      visualElements: {
        color: getConversationColor(insights),
        emoji: getConversationEmoji(insights),
        mood: insights?.emotionalJourney?.dominant || 'neutral'
      }
    };
    
    // Save to localStorage with enhanced indexing
    const existingConversations = JSON.parse(localStorage.getItem('aura_conversations') || '[]');
    const updatedConversations = [conversationData, ...existingConversations.slice(0, 99)]; // Keep last 100
    
    localStorage.setItem('aura_conversations', JSON.stringify(updatedConversations));
    localStorage.setItem('aura_current_conversation', JSON.stringify(conversationData));
    
    // Save user insights for personalization
    updateUserInsights(userId, insights);
    
    return conversationData;
  } catch (error) {
    console.error('Error saving conversation:', error);
    return null;
  }
};

// Helper functions
const getMostFrequent = (arr) => {
  if (!arr.length) return null;
  const frequency = {};
  arr.forEach(item => frequency[item] = (frequency[item] || 0) + 1);
  return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
};

const getEmotionalTrend = (emotions) => {
  if (emotions.length < 3) return 'stable';
  
  const positiveEmotions = ['excited', 'grateful', 'hopeful', 'confident'];
  const negativeEmotions = ['sad', 'anxious', 'frustrated', 'distressed'];
  
  const recent = emotions.slice(-3);
  const early = emotions.slice(0, 3);
  
  const recentPositive = recent.filter(e => positiveEmotions.includes(e)).length;
  const earlyPositive = early.filter(e => positiveEmotions.includes(e)).length;
  
  if (recentPositive > earlyPositive) return 'improving';
  if (recentPositive < earlyPositive) return 'declining';
  return 'stable';
};

const calculateEngagementScore = (history) => {
  const factors = {
    length: Math.min(history.length / 20, 1) * 30, // Max 30 points
    avgMessageLength: Math.min(history.reduce((sum, msg) => sum + msg.content.length, 0) / history.length / 100, 1) * 25, // Max 25 points
    emotionalVariety: Math.min(new Set(history.map(msg => msg.emotionalTone).filter(Boolean)).size / 5, 1) * 20, // Max 20 points
    topicDepth: history.filter(msg => (msg.topic !== 'general' && msg.topic)).length / history.length * 25 // Max 25 points
  };
  
  return Math.round(Object.values(factors).reduce((sum, score) => sum + score, 0));
};

const generateConversationThemes = (history) => {
  const themes = [];
  const topics = history.map(msg => msg.topic).filter(Boolean);
  const emotions = history.map(msg => msg.emotionalTone).filter(Boolean);
  
  if (topics.includes('personal_growth')) themes.push('growth');
  if (emotions.includes('grateful')) themes.push('gratitude');
  if (topics.includes('creativity')) themes.push('creative');
  if (emotions.includes('distressed') || emotions.includes('sad')) themes.push('support');
  if (topics.includes('career')) themes.push('professional');
  
  return themes;
};

const generateSmartTags = (history) => {
  const tags = new Set();
  
  history.forEach(msg => {
    if (msg.topic) tags.add(msg.topic);
    if (msg.emotionalTone) tags.add(msg.emotionalTone);
  });
  
  return Array.from(tags).slice(0, 5); // Limit to 5 tags
};

const generateConversationSummary = (history) => {
  if (history.length < 4) return "Brief conversation";
  
  const userMessages = history.filter(msg => msg.role === 'user');
  const topics = [...new Set(history.map(msg => msg.topic).filter(Boolean))];
  const emotions = [...new Set(history.map(msg => msg.emotionalTone).filter(Boolean))];
  
  const topicText = topics.length > 0 ? topics.slice(0, 2).join(' and ') : 'various topics';
  const emotionText = emotions.length > 0 ? ` with ${emotions.slice(0, 2).join(' and ')} tones` : '';
  
  return `Discussed ${topicText}${emotionText} over ${userMessages.length} messages`;
};

const getConversationColor = (insights) => {
  const emotion = insights?.emotionalJourney?.dominant;
  const colors = {
    excited: 'from-yellow-400 to-orange-400',
    grateful: 'from-green-400 to-emerald-400',
    hopeful: 'from-blue-400 to-cyan-400',
    sad: 'from-blue-400 to-indigo-400',
    anxious: 'from-purple-400 to-pink-400',
    frustrated: 'from-red-400 to-orange-400',
    creative: 'from-pink-400 to-purple-400',
    default: 'from-gray-400 to-slate-400'
  };
  
  return colors[emotion] || colors.default;
};

const getConversationEmoji = (insights) => {
  const topic = insights?.topicAnalysis?.dominant;
  const emotion = insights?.emotionalJourney?.dominant;
  
  if (topic === 'relationships') return '💕';
  if (topic === 'career') return '💼';
  if (topic === 'creativity') return '🎨';
  if (topic === 'mental_health') return '🧠';
  if (topic === 'family') return '👨‍👩‍👧‍👦';
  
  if (emotion === 'excited') return '✨';
  if (emotion === 'grateful') return '🙏';
  if (emotion === 'sad') return '💙';
  if (emotion === 'creative') return '💡';
  
  return '💭';
};

const updateUserInsights = (userId, insights) => {
  try {
    const userInsights = JSON.parse(localStorage.getItem(`aura_user_insights_${userId}`) || '{}');
    
    // Track conversation patterns
    userInsights.totalConversations = (userInsights.totalConversations || 0) + 1;
    userInsights.lastActive = new Date().toISOString();
    
    // Track emotional patterns
    if (!userInsights.emotionalPatterns) userInsights.emotionalPatterns = {};
    const emotion = insights?.emotionalJourney?.dominant;
    if (emotion) {
      userInsights.emotionalPatterns[emotion] = (userInsights.emotionalPatterns[emotion] || 0) + 1;
    }
    
    // Track topic preferences
    if (!userInsights.topicPreferences) userInsights.topicPreferences = {};
    const topic = insights?.topicAnalysis?.dominant;
    if (topic) {
      userInsights.topicPreferences[topic] = (userInsights.topicPreferences[topic] || 0) + 1;
    }
    
    localStorage.setItem(`aura_user_insights_${userId}`, JSON.stringify(userInsights));
  } catch (error) {
    console.error('Error updating user insights:', error);
  }
};

export const getUserInsights = (userId) => {
  try {
    return JSON.parse(localStorage.getItem(`aura_user_insights_${userId}`) || '{}');
  } catch (error) {
    console.error('Error loading user insights:', error);
    return {};
  }
};

// Generate contextual AI responses based on emotional state and topic
export const generateContextualResponse = (message, modelData, topic, emotionalTone, conversationHistory) => {
  const responses = {
    // Emergency/Crisis responses
    distressed: [
      "I can hear that you're really struggling right now. You're not alone in this. Let's take this one step at a time.",
      "It sounds like you're feeling overwhelmed. That's completely understandable. What's the most pressing thing on your mind right now?",
      "I'm here with you. When everything feels like too much, sometimes the best thing we can do is focus on just breathing for a moment."
    ],
    
    // Topic-specific responses
    relationships: {
      sad: "Relationship struggles can be so painful. Your feelings are completely valid. Want to tell me more about what's happening?",
      angry: "It sounds like you're really hurt by what happened. Those feelings make complete sense. Sometimes we need to feel angry before we can heal.",
      confused: "Relationships can be so complex and confusing. Let's talk through what's making you feel uncertain.",
      excited: "It's wonderful to see you excited about your relationship! Tell me more about what's making you feel so positive.",
      default: "Relationships are such an important part of our lives. What's on your mind about your connections with others?"
    },
    
    career: {
      stressed: "Work stress is so real and exhausting. You're dealing with a lot. What's feeling most overwhelming about your work situation?",
      anxious: "Job anxiety can be really consuming. Remember that your worth isn't defined by your work performance. What's causing the most worry?",
      excited: "It's wonderful to hear you're excited about something at work! What's got you feeling so positive?",
      frustrated: "Work frustrations can be so draining. It sounds like you're dealing with some real challenges. What's the biggest issue right now?",
      default: "Career decisions and work challenges can be complex. What's happening in your professional life?"
    },
    
    mental_health: {
      sad: "I hear the sadness in your words, and I want you to know that what you're feeling is valid and important.",
      anxious: "Anxiety can feel so overwhelming. You're brave for talking about it. What would help you feel more grounded right now?",
      hopeful: "It's beautiful to hear hope in your voice. That takes real strength, especially during difficult times.",
      frustrated: "Mental health struggles can be so frustrating. You're not alone in feeling this way.",
      default: "Your mental health and wellbeing matter deeply. How are you taking care of yourself today?"
    },
    
    creativity: {
      excited: "I love your creative energy! There's something magical about that spark of inspiration. What's got you so excited?",
      frustrated: "Creative blocks can be so frustrating, but they're also part of the process. Sometimes stepping back helps us see new possibilities.",
      hopeful: "Creative hope is powerful - it's the beginning of bringing something new into the world. What are you envisioning?",
      confused: "Creative confusion often means you're on the edge of a breakthrough. What's feeling unclear right now?",
      default: "Creativity is such a beautiful expression of who you are. What's inspiring you lately?"
    },
    
    family: {
      grateful: "Family gratitude is so heartwarming. Those moments of appreciation can be really grounding.",
      frustrated: "Family can push our buttons like no one else can. It's normal to feel frustrated. What's been happening?",
      sad: "Family relationships can bring such deep emotions. Your feelings about this are important and valid.",
      confused: "Family dynamics can be so complex. It makes sense that you're feeling uncertain about how to navigate this.",
      default: "Family relationships shape us in such profound ways. What's on your mind about your family?"
    },
    
    personal_growth: {
      excited: "I love your enthusiasm for growth! That energy and commitment to becoming your best self is inspiring.",
      frustrated: "Growth can be frustrating when progress feels slow. But the fact that you're committed to improving shows real strength.",
      hopeful: "Hope for personal growth is so powerful. You're already taking the most important step by believing change is possible.",
      confused: "Growth can feel confusing when we're not sure which direction to go. What feels most important to you right now?",
      default: "Personal growth takes courage and commitment. What area of your life are you focusing on developing?"
    },
    
    general: {
      excited: "I can feel your excitement! It's wonderful to see you feeling so positive. What's got you energized?",
      sad: "I hear that you're feeling down, and I want you to know that your feelings matter. What's weighing on your heart?",
      anxious: "Anxiety can feel so overwhelming. You're not alone in this feeling. What would help you feel more settled right now?",
      frustrated: "Frustration is such a natural response when things aren't going as we'd hoped. What's feeling most challenging?",
      confused: "Feeling confused is completely understandable. Sometimes talking through things helps bring clarity. What's on your mind?",
      grateful: "Gratitude is such a beautiful feeling. It's wonderful that you're noticing the good in your life. What are you appreciating?",
      hopeful: "Hope is such a powerful force. Even in difficult times, that spark of possibility can light the way forward.",
      default: "I'm here to listen and support you. What's on your mind today?"
    }
  };

  // Get appropriate response based on emotion and topic
  let response;
  
  if (responses[emotionalTone] && Array.isArray(responses[emotionalTone])) {
    // Emergency/crisis responses
    response = responses[emotionalTone][Math.floor(Math.random() * responses[emotionalTone].length)];
  } else if (responses[topic] && responses[topic][emotionalTone]) {
    // Topic + emotion specific
    response = responses[topic][emotionalTone];
  } else if (responses[topic] && responses[topic].default) {
    // Topic default
    response = responses[topic].default;
  } else {
    // General responses based on emotion
    const generalResponses = responses.general;
    response = generalResponses[emotionalTone] || generalResponses.default;
  }

  // Add model personality touch
  const personalityPrefix = getPersonalityPrefix(modelData, emotionalTone);
  const finalResponse = personalityPrefix ? `${personalityPrefix} ${response}` : response;

  return {
    content: finalResponse,
    tone: emotionalTone,
    topic: topic,
    hasContext: conversationHistory.length > 2
  };
};

// Get personality-specific response prefix
const getPersonalityPrefix = (modelData, emotionalTone) => {
  const personalityTouches = {
    aura: {
      sad: "I sense you're going through something difficult.",
      excited: "Your excitement is beautiful to witness.",
      anxious: "I can feel your worry, and I'm here with you.",
      default: ""
    },
    nova: {
      excited: "Yes! That creative energy is amazing!",
      frustrated: "Even the greatest creators face blocks.",
      confused: "Sometimes confusion is the first step toward breakthrough.",
      default: "What if we looked at this from a fresh angle?"
    },
    zen: {
      anxious: "Let's breathe together for a moment.",
      frustrated: "This frustration is information about what matters to you.",
      sad: "Pain, like joy, is part of the human experience.",
      default: "In this moment, what do you need most?"
    },
    sage: {
      confused: "Confusion often precedes understanding.",
      frustrated: "What might this frustration be teaching you?",
      excited: "Wisdom often comes disguised as excitement for learning.",
      default: "What deeper truth might be emerging here?"
    },
    phoenix: {
      frustrated: "Strategic thinking requires working through challenges.",
      excited: "Let's channel this energy into actionable plans.",
      confused: "Complex situations require systematic analysis.",
      default: "From a strategic perspective,"
    },
    quantum: {
      excited: "Innovation thrives on this kind of energy!",
      confused: "The future often looks confusing until it becomes clear.",
      frustrated: "Revolutionary thinking often comes from pushing through resistance.",
      default: "Looking at the cutting edge of possibility,"
    }
  };

  const personality = modelData.personality || 'aura';
  const touches = personalityTouches[personality] || personalityTouches.aura;
  
  return touches[emotionalTone] || touches.default;
};

// Get encouraging messages for errors (moved from old file)
export const getEncouragingMessage = () => {
  const messages = [
    "Technical hiccups happen, but our conversation is still meaningful.",
    "Even when technology fails, human connection remains strong.",
    "I may be having connection issues, but I'm still here for you.",
    "Sometimes the best conversations happen when we're just present with each other.",
    "Technology is imperfect, but our connection is real.",
    "Let's try that again - I'm here and ready to listen.",
    "Connection restored! What were you sharing with me?",
    "I'm back! Sometimes even AI needs a moment to regroup."
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

// Legacy function aliases for backward compatibility
export const detectConversationTopic = (message, conversationHistory = []) => {
  const result = classifyConversationTopic(message, conversationHistory);
  return result.primaryTopic;
};

export const generateConversationTitle = (conversationHistory) => {
  return generateIntelligentTitle(conversationHistory);
};
