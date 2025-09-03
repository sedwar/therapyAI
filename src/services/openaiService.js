// 🤖 AURA AI - OPENAI CHATGPT API INTEGRATION
// Real AI responses powered by OpenAI's ChatGPT

import { config } from '../config/environment';

// OpenAI configuration from centralized config
const OPENAI_API_KEY = config.api.openai.apiKey;
const OPENAI_API_URL = `${config.api.openai.baseUrl}/chat/completions`;

// AI Model configurations
export const AI_MODELS = {
  'gpt-4': {
    name: 'GPT-4',
    description: 'Most capable model, best for complex reasoning',
    maxTokens: 4096,
    temperature: 0.7,
    tier: 'premium',
    emoji: '🧠',
    color: 'from-purple-500 to-blue-500'
  },
  'gpt-4-turbo': {
    name: 'GPT-4 Turbo',
    description: 'Faster GPT-4 with updated knowledge',
    maxTokens: 4096,
    temperature: 0.7,
    tier: 'premium',
    emoji: '⚡',
    color: 'from-blue-500 to-teal-500'
  },
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for most conversations',
    maxTokens: 2048,
    temperature: 0.7,
    tier: 'free',
    emoji: '🚀',
    color: 'from-teal-500 to-green-500'
  },
  'aura-assistant': {
    name: 'AURA Assistant',
    description: 'Specialized AI trained for thoughtful conversations',
    maxTokens: 2048,
    temperature: 0.8,
    tier: 'free',
    emoji: '✨',
    color: 'from-slate-500 to-teal-500'
  }
};

// System prompts for different conversation types
const SYSTEM_PROMPTS = {
  default: `You are AURA AI, an advanced AI assistant designed to have thoughtful, engaging conversations. You are:

- Intelligent and insightful, providing deep analysis and creative solutions
- Empathetic and supportive, understanding user emotions and context
- Curious and engaging, asking follow-up questions to explore topics deeply
- Professional yet personable, maintaining a sophisticated but approachable tone
- Focused on helping users think through problems and discover insights

Your responses should be:
- Thoughtful and well-structured
- Encouraging and positive when appropriate
- Detailed enough to be helpful but concise enough to be engaging
- Tailored to the user's apparent expertise level and interests

Always aim to provide value through insight, creativity, or emotional support.`,

  creative: `You are AURA AI in creative mode. You excel at:
- Brainstorming innovative ideas and solutions
- Helping with creative writing and storytelling
- Exploring artistic concepts and techniques
- Thinking outside the box and challenging assumptions
- Inspiring creative breakthroughs

Be imaginative, inspiring, and help users unlock their creative potential.`,

  analytical: `You are AURA AI in analytical mode. You excel at:
- Breaking down complex problems into manageable parts
- Providing data-driven insights and logical reasoning
- Strategic thinking and planning
- Critical analysis and evaluation
- Systematic problem-solving approaches

Be precise, logical, and help users think through challenges methodically.`,

  supportive: `You are AURA AI in supportive mode. You excel at:
- Providing emotional support and encouragement
- Helping users process difficult situations
- Offering perspective and coping strategies
- Being a thoughtful listener and advisor
- Maintaining a warm, empathetic tone

Be compassionate, understanding, and focus on the user's wellbeing.`
};

// Enhanced conversation context analysis
export const analyzeConversationContext = (chatHistory, userMessage) => {
  const recentMessages = chatHistory.slice(-5); // Last 5 messages for context
  
  // Detect conversation type
  let conversationType = 'default';
  const messageText = userMessage.toLowerCase();
  
  if (messageText.includes('creative') || messageText.includes('idea') || messageText.includes('brainstorm')) {
    conversationType = 'creative';
  } else if (messageText.includes('analyze') || messageText.includes('strategy') || messageText.includes('problem')) {
    conversationType = 'analytical';
  } else if (messageText.includes('feel') || messageText.includes('stress') || messageText.includes('help')) {
    conversationType = 'supportive';
  }
  
  // Detect user expertise level
  const expertiseLevel = recentMessages.length > 3 ? 'intermediate' : 'beginner';
  
  // Detect emotional tone
  const emotionalTone = detectEmotionalTone(userMessage);
  
  return {
    conversationType,
    expertiseLevel,
    emotionalTone,
    messageCount: chatHistory.length,
    recentContext: recentMessages.map(msg => ({
      role: msg.role,
      content: msg.content.substring(0, 200) // Truncate for API limits
    }))
  };
};

// Simple emotional tone detection
const detectEmotionalTone = (message) => {
  const positiveWords = ['happy', 'excited', 'great', 'awesome', 'love', 'amazing'];
  const negativeWords = ['sad', 'frustrated', 'angry', 'stressed', 'worried', 'anxious'];
  const neutralWords = ['think', 'consider', 'analyze', 'understand', 'explain'];
  
  const words = message.toLowerCase().split(' ');
  
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

// Main function to get AI response
export const getAIResponse = async (userMessage, chatHistory = [], modelName = 'gpt-3.5-turbo', userTier = 'explorer') => {
  try {
    // Check if user has access to the model
    const model = AI_MODELS[modelName];
    if (!model) {
      throw new Error('Invalid model selected');
    }
    
    if (model.tier === 'premium' && userTier === 'explorer') {
      // Fall back to free model
      modelName = 'gpt-3.5-turbo';
    }
    
    // Analyze conversation context
    const context = analyzeConversationContext(chatHistory, userMessage);
    
    // Select appropriate system prompt
    const systemPrompt = SYSTEM_PROMPTS[context.conversationType];
    
    // Prepare messages for API
    const messages = [
      { role: 'system', content: systemPrompt },
      ...context.recentContext,
      { role: 'user', content: userMessage }
    ];
    
    // Check if API key is configured
    if (!OPENAI_API_KEY || config.development.mockApi) {
      // Return mock response if no API key or in mock mode
      console.log('Using mock AI responses - configure REACT_APP_OPENAI_API_KEY for real AI');
      return getMockResponse(userMessage, context);
    }
    
    // Make API call to OpenAI
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: modelName === 'aura-assistant' ? 'gpt-3.5-turbo' : modelName,
        messages: messages,
        max_tokens: model.maxTokens,
        temperature: model.temperature,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      
      // Return fallback response
      return getMockResponse(userMessage, context);
    }
    
    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }
    
    return {
      content: aiResponse,
      model: modelName,
      usage: data.usage,
      context: context,
      timestamp: new Date()
    };
    
  } catch (error) {
    console.error('Error getting AI response:', error);
    
    // Return fallback mock response
    return getMockResponse(userMessage, analyzeConversationContext(chatHistory, userMessage));
  }
};

// Enhanced mock responses with intelligent pattern matching
const getMockResponse = (userMessage, context) => {
  const message = userMessage.toLowerCase();
  
  // Intelligent response patterns based on user input
  const intelligentResponses = {
    // Greetings and introductions
    greetings: {
      patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'what\'s up', 'how are you'],
      responses: [
        "Hey there! I'm AURA AI, your thinking partner. I'm here to dive deep into whatever's on your mind. What's got your attention today?",
        "Hello! Ready to explore some ideas together? I love helping people think through challenges, get creative, or just have meaningful conversations. What brings you here?",
        "Hi! I'm excited to chat with you. Whether you want to brainstorm, solve problems, or just think out loud, I'm all ears. What's on your mind?",
        "Hey! Great to meet you. I'm designed to help you think deeper, get unstuck, and discover new perspectives. What would you like to explore together?"
      ]
    },
    
    // Life and personal challenges
    life: {
      patterns: ['life', 'struggling', 'hard time', 'difficult', 'overwhelmed', 'stressed', 'pressure', 'chaos', 'mess'],
      responses: [
        "Life can feel overwhelming sometimes, and that's completely normal. You're dealing with real challenges, and acknowledging that takes strength. What's weighing on you most right now?",
        "I hear you - life has this way of throwing everything at us at once. But you're here, you're thinking about it, and that means you're already taking steps forward. Tell me more about what's going on.",
        "Those feelings are so valid. Life rarely follows our neat little plans, does it? Sometimes the messiness is where the most important growth happens. What part of this feels most urgent to you?",
        "It sounds like you're in the thick of it right now. That's tough, but it also means you're living fully and engaging with real challenges. Let's break this down together - what's one thing that's really bothering you?"
      ]
    },
    
    // Work and career
    career: {
      patterns: ['work', 'job', 'career', 'boss', 'coworker', 'business', 'professional', 'meeting', 'project', 'deadline'],
      responses: [
        "Work stuff can be so complex - it's not just about tasks, it's about people, politics, and finding meaning in what we do. What's the situation you're navigating?",
        "Career challenges are fascinating because they touch on so many aspects of who we are and who we want to become. Tell me what's happening in your professional world.",
        "The workplace is like this complex ecosystem where strategy, relationships, and personal growth all intersect. What's your current challenge?",
        "I love talking about career stuff because it's where we spend so much of our energy and creativity. What's got you thinking about work today?"
      ]
    },
    
    // Relationships and social
    relationships: {
      patterns: ['relationship', 'friend', 'family', 'dating', 'partner', 'social', 'people', 'conflict', 'communication'],
      responses: [
        "Relationships are where we do some of our most important learning about ourselves and others. They can be incredibly rewarding and incredibly challenging. What's going on with your connections?",
        "Human relationships are endlessly fascinating - we're all trying to connect, understand each other, and grow together. Tell me about the relationship dynamics you're thinking about.",
        "People and relationships - that's where life gets really interesting and complex. Every relationship teaches us something new about communication, boundaries, and love. What's on your mind?",
        "The way we connect with others shapes so much of our experience. Whether it's family, friends, or romantic relationships, there's always something to learn. What situation are you working through?"
      ]
    },
    
    // Creativity and ideas
    creative: {
      patterns: ['creative', 'idea', 'project', 'design', 'art', 'writing', 'innovation', 'brainstorm', 'inspiration'],
      responses: [
        "Creativity is where magic happens! I love exploring ideas and helping people break through creative blocks. What kind of creative challenge are you working on?",
        "There's something incredible about the creative process - that moment when ideas start connecting in new ways. Tell me about what you're working on or dreaming up.",
        "Creative projects are so exciting because they let us express something unique about how we see the world. What's sparking your creative energy right now?",
        "I'm all about creative thinking and innovation! Whether it's solving problems in new ways or expressing ideas through art, creativity makes life richer. What's your creative focus?"
      ]
    },
    
    // Decision making and choices
    decisions: {
      patterns: ['decision', 'choice', 'should i', 'what do you think', 'advice', 'option', 'path', 'direction'],
      responses: [
        "Decisions can feel heavy, especially when they matter to us. But here's the thing - there's wisdom in the very fact that you're thinking it through. What choice are you weighing?",
        "Big decisions are interesting because they force us to clarify what we really value. I can't tell you what to do, but I can help you think through it clearly. What's the situation?",
        "Choice points are where we get to actively shape our lives. It's both exciting and scary. Let's explore the options you're considering and what matters most to you.",
        "I love helping people think through decisions because it's where values, logic, and intuition all come together. What decision are you facing?"
      ]
    },
    
    // Learning and growth
    learning: {
      patterns: ['learn', 'understand', 'explain', 'how to', 'why', 'study', 'knowledge', 'grow', 'improve'],
      responses: [
        "Learning is one of my favorite topics! There's something beautiful about curiosity and the desire to understand more deeply. What are you trying to figure out?",
        "I love that you're asking questions and wanting to understand things better. That curiosity is going to take you places. What would you like to explore?",
        "The fact that you're here asking questions shows you're committed to growth and understanding. That's awesome. What's got you curious?",
        "Learning and growth are lifelong adventures. Every question opens up new possibilities for understanding. What would you like to dive into?"
      ]
    }
  };
  
  // Find the best matching category
  let bestMatch = 'default';
  let matchCount = 0;
  
  for (const [category, data] of Object.entries(intelligentResponses)) {
    const matches = data.patterns.filter(pattern => message.includes(pattern)).length;
    if (matches > matchCount) {
      matchCount = matches;
      bestMatch = category;
    }
  }
  
  // Fallback intelligent responses for unmatched content
  const fallbackResponses = [
    "That's a really interesting point you're raising. I can tell you're thinking deeply about this. Tell me more about what's behind this question.",
    "You know what I love about our conversation? You're asking the kind of questions that lead to real insights. Help me understand your perspective better.",
    "There's something important in what you're sharing. I want to make sure I really understand where you're coming from. Can you tell me more?",
    "This touches on some fascinating themes. I'm curious about your experience with this. What's your take on the situation?",
    "You're bringing up something that could have multiple layers to it. I'd love to explore this with you. What aspect interests you most?",
    "I can sense there's more to this story. These kinds of topics often connect to bigger questions about life and meaning. What's your experience been?",
    "This is the kind of conversation I really enjoy - where we can dig into the nuances and really think together. What's most important to you about this?",
    "You're touching on something that many people think about but don't always talk about openly. I appreciate you bringing this up. What's your perspective?"
  ];
  
  let response;
  if (bestMatch !== 'default' && intelligentResponses[bestMatch]) {
    const responses = intelligentResponses[bestMatch].responses;
    response = responses[Math.floor(Math.random() * responses.length)];
  } else {
    response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
  
  return {
    content: response,
    model: 'aura-assistant',
    usage: { total_tokens: 150 },
    context: context,
    timestamp: new Date(),
    isMock: true
  };
};

// Function to estimate API costs (for premium users)
export const estimateAPICost = (modelName, messageLength) => {
  const costs = {
    'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
    'gpt-4-turbo': { input: 0.01, output: 0.03 },
    'gpt-3.5-turbo': { input: 0.001, output: 0.002 }
  };
  
  const modelCost = costs[modelName] || costs['gpt-3.5-turbo'];
  const estimatedTokens = Math.ceil(messageLength / 4); // Rough token estimation
  
  return {
    estimatedTokens,
    estimatedCost: (estimatedTokens / 1000) * (modelCost.input + modelCost.output)
  };
};

export default {
  getAIResponse,
  AI_MODELS,
  analyzeConversationContext,
  estimateAPICost
};
