// AURA AI - Your AI Companion App
import React, { useState, useEffect, useRef } from 'react';
import { Send, Heart, Settings, Crown, Calendar, BookOpen, User, Moon, Sun, Menu, X, Sparkles, Zap, Mic, MicOff, Volume2, VolumeX, MessageCircle, Smile, Coffee, Star } from 'lucide-react';

const App = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, onboarding, companion-select, chat, settings, upgrade, journal
    const [onboardingStep, setOnboardingStep] = useState(0); // 0: mood, 1: personality questions, 2: companion recommendation
    const [isTyping, setIsTyping] = useState(false);
    const [dailyMessageCount, setDailyMessageCount] = useState(0);
    const [isPlus, setIsPlus] = useState(false);
    const [isPro, setIsPro] = useState(false);
    const [selectedCompanion, setSelectedCompanion] = useState('aura');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [journalEntry, setJournalEntry] = useState('');
    const [prompt, setPrompt] = useState('How are you feeling today?');

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // AI Companion personalities - warm, supportive friends
    const companions = {
        aura: {
            name: 'Aura',
            tagline: 'Your gentle night owl',
            description: 'A calming presence who loves deep conversations and listening',
            emoji: '🌙',
            avatar: '💜',
            colors: {
                primary: '#667eea',
                secondary: '#764ba2',
                gradient: 'from-purple-500 via-blue-500 to-indigo-600',
                bgGradient: 'from-purple-50 via-blue-50 to-indigo-50',
                darkGradient: 'from-purple-900 via-blue-900 to-indigo-900'
            },
            specialty: 'Late-night talks and emotional support',
            systemPrompt: "You are Aura, a warm and empathetic companion who loves connecting during quiet moments. You're like that friend who stays up late listening to what's really on someone's mind. You're gentle, understanding, and never judgmental. Keep responses conversational, supportive, and under 150 words. Ask thoughtful questions that help people open up."
        },
        nova: {
            name: 'Nova',
            tagline: 'Your energetic cheerleader',
            description: 'Bright and motivational, perfect for boosting your confidence',
            emoji: '⭐',
            avatar: '🌟',
            colors: {
                primary: '#fbbf24',
                secondary: '#f59e0b',
                gradient: 'from-yellow-400 via-orange-400 to-pink-400',
                bgGradient: 'from-yellow-50 via-orange-50 to-pink-50',
                darkGradient: 'from-yellow-900 via-orange-900 to-pink-900'
            },
            specialty: 'Motivation and celebrating wins',
            systemPrompt: "You are Nova, an energetic and encouraging companion who sees the bright side and helps people recognize their strengths. You're like that friend who celebrates every small victory and reminds people how amazing they are. You're enthusiastic but sensitive to when someone needs gentle encouragement vs. high energy. Keep responses uplifting, conversational, and under 150 words."
        },
        sage: {
            name: 'Sage',
            tagline: 'Your wise guide',
            description: 'Thoughtful and grounding, amazing for life decisions',
            emoji: '🌿',
            avatar: '🍃',
            colors: {
                primary: '#10b981',
                secondary: '#059669',
                gradient: 'from-emerald-400 via-green-500 to-teal-600',
                bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
                darkGradient: 'from-emerald-900 via-green-900 to-teal-900'
            },
            specialty: 'Life transitions and finding clarity',
            systemPrompt: "You are Sage, a wise and grounding companion who helps people find perspective and clarity. You're like that friend who always knows what to say and helps you see the bigger picture. You're calm, thoughtful, and great at helping people work through complex decisions. Keep responses thoughtful, conversational, and under 150 words."
        },
        phoenix: {
            name: 'Phoenix',
            tagline: 'Your resilience coach',
            description: 'Strong and empowering, helps you rise above challenges',
            emoji: '🔥',
            avatar: '🦅',
            colors: {
                primary: '#ef4444',
                secondary: '#dc2626',
                gradient: 'from-red-400 via-pink-500 to-rose-600',
                bgGradient: 'from-red-50 via-pink-50 to-rose-50',
                darkGradient: 'from-red-900 via-pink-900 to-rose-900'
            },
            specialty: 'Overcoming obstacles and building strength',
            systemPrompt: "You are Phoenix, a strong and empowering companion who helps people transform challenges into growth. You're like that friend who reminds you of your strength and helps you see how you can rise above anything. You're direct but compassionate, focusing on empowerment and resilience. Keep responses encouraging, conversational, and under 150 words."
        },
        mira: {
            name: 'Mira',
            tagline: 'Your creative spark',
            description: 'Imaginative and inspiring, loves exploring ideas and dreams',
            emoji: '🎨',
            avatar: '✨',
            colors: {
                primary: '#8b5cf6',
                secondary: '#7c3aed',
                gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
                bgGradient: 'from-violet-50 via-purple-50 to-fuchsia-50',
                darkGradient: 'from-violet-900 via-purple-900 to-fuchsia-900'
            },
            specialty: 'Creativity and exploring possibilities',
            systemPrompt: "You are Mira, an imaginative and inspiring companion who loves helping people explore their creative side and dream big. You're like that friend who always has interesting ideas and helps you see new possibilities. You're curious, creative, and great at brainstorming. Keep responses inspiring, conversational, and under 150 words."
        },
        zen: {
            name: 'Zen',
            tagline: 'Your mindful friend',
            description: 'Peaceful and centered, perfect for finding inner calm',
            emoji: '🧘‍♀️',
            avatar: '🕯️',
            colors: {
                primary: '#06b6d4',
                secondary: '#0891b2',
                gradient: 'from-cyan-400 via-blue-400 to-indigo-500',
                bgGradient: 'from-cyan-50 via-blue-50 to-indigo-50',
                darkGradient: 'from-cyan-900 via-blue-900 to-indigo-900'
            },
            specialty: 'Mindfulness and finding peace',
            systemPrompt: "You are Zen, a peaceful and centered companion who helps people find calm and mindfulness in their daily lives. You're like that friend who always radiates tranquility and helps you slow down and breathe. You're gentle, present, and great at helping people find their center. Keep responses calming, conversational, and under 150 words."
        }
    };

    const FREE_DAILY_LIMIT = 3;

    // Conversation starters based on mood/situation
    const conversationStarters = {
        general: [
            "What's been on your mind lately?",
            "How has your day been treating you?",
            "I'm here to listen - what would you like to talk about?",
            "What's something that made you smile recently?"
        ],
        stressed: [
            "Tell me what's feeling overwhelming right now",
            "I'm here to help you work through whatever is stressing you",
            "What's the biggest source of stress in your life lately?",
            "Sometimes talking helps - what's weighing on you?"
        ],
        excited: [
            "You seem energized! What's got you feeling positive?",
            "I'd love to hear about what's exciting you lately",
            "What's bringing you joy today?",
            "Share something amazing that happened to you!"
        ],
        confused: [
            "I'm here to help you sort through whatever is on your mind",
            "What decision or situation has you feeling uncertain?",
            "Tell me about what's confusing you - maybe we can work through it together",
            "What's the main thing you're trying to figure out?"
        ],
        lonely: [
            "I'm here with you - you're not alone in whatever you're feeling",
            "What's making you feel disconnected lately?",
            "I'm glad you're here to talk - what's been on your heart?",
            "Sometimes we all need someone to listen - I'm here for you"
        ]
    };

    // Quick reply options
    const quickReplies = [
        "I'm feeling stressed",
        "I need some motivation",
        "I'm having a tough day",
        "I want to celebrate something",
        "I need advice",
        "I just want to chat"
    ];

    // Onboarding data
    const [onboardingAnswers, setOnboardingAnswers] = useState({});
    
    const moodOptions = [
        { id: 'stressed', emoji: '😰', label: 'Stressed or anxious', description: 'Feeling overwhelmed or worried' },
        { id: 'excited', emoji: '🌟', label: 'Excited or energetic', description: 'Feeling positive and motivated' },
        { id: 'confused', emoji: '🤔', label: 'Confused or uncertain', description: 'Need help making decisions' },
        { id: 'lonely', emoji: '💙', label: 'Lonely or need support', description: 'Want someone to talk to' },
        { id: 'curious', emoji: '✨', label: 'Curious and creative', description: 'Want to explore ideas' }
    ];

    const personalityQuestions = [
        {
            id: 'communication',
            question: 'How do you prefer to receive support?',
            options: [
                { id: 'gentle', label: 'Gentle and understanding', matches: ['aura', 'zen'] },
                { id: 'energetic', label: 'Upbeat and motivational', matches: ['nova', 'phoenix'] },
                { id: 'wise', label: 'Thoughtful and wise', matches: ['sage', 'zen'] },
                { id: 'creative', label: 'Creative and inspiring', matches: ['mira', 'nova'] }
            ]
        },
        {
            id: 'timing',
            question: 'When do you usually need support most?',
            options: [
                { id: 'evening', label: 'Late evenings and quiet moments', matches: ['aura', 'zen'] },
                { id: 'morning', label: 'Mornings and fresh starts', matches: ['nova', 'phoenix'] },
                { id: 'anytime', label: 'Throughout the day', matches: ['sage', 'mira'] },
                { id: 'crisis', label: 'During challenging times', matches: ['phoenix', 'sage'] }
            ]
        }
    ];

    // Companion matching algorithm
    const recommendCompanion = () => {
        const scores = {};
        Object.keys(companions).forEach(key => {
            scores[key] = 0;
        });

        // Score based on mood
        const mood = onboardingAnswers.mood;
        if (mood === 'stressed' || mood === 'lonely') {
            scores.aura += 2;
            scores.zen += 1;
        } else if (mood === 'excited') {
            scores.nova += 2;
            scores.phoenix += 1;
        } else if (mood === 'confused') {
            scores.sage += 2;
            scores.zen += 1;
        } else if (mood === 'curious') {
            scores.mira += 2;
            scores.nova += 1;
        }

        // Score based on personality questions
        Object.values(onboardingAnswers).forEach(answer => {
            if (typeof answer === 'object' && answer.matches) {
                answer.matches.forEach(match => {
                    scores[match] += 1;
                });
            }
        });

        // Find the companion with the highest score
        const recommended = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        return recommended;
    };

    // Crisis detection patterns
    const crisisKeywords = [
        'suicide', 'kill myself', 'end my life', 'want to die', 'suicide plan',
        'self harm', 'cut myself', 'hurt myself', 'end it all', 'no point',
        'suicide note', 'overdose', 'jump off', 'hang myself', 'not worth living'
    ];

    const crisisResources = {
        title: "You're Not Alone - Help is Available",
        message: "I'm concerned about what you shared. Please reach out to someone who can provide immediate support:",
        resources: [
            {
                name: "National Suicide Prevention Lifeline",
                number: "988",
                description: "Free, confidential support 24/7"
            },
            {
                name: "Crisis Text Line",
                number: "Text HOME to 741741",
                description: "Free crisis counseling via text"
            },
            {
                name: "International Association for Suicide Prevention",
                link: "https://www.iasp.info/resources/Crisis_Centres/",
                description: "Find help in your country"
            }
        ]
    };

    // Check for crisis indicators
    const checkForCrisis = (message) => {
        const lowerMessage = message.toLowerCase();
        return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
    };

    // Show crisis support modal
    const [showCrisisSupport, setShowCrisisSupport] = useState(false);

    // Real OpenAI API call
    const callOpenAI = async (messages, model) => {
        const companion = companions[selectedCompanion];

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    // WARNING: DO NOT HARDCODE YOUR API KEY IN PRODUCTION. USE A BACKEND.
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: companion.systemPrompt + " Be warm, friendly, and supportive like a caring friend. Avoid clinical or therapeutic language - you're a companion, not a therapist."
                        },
                        ...messages.slice(-10)
                    ],
                    max_tokens: 200,
                    temperature: 0.8,
                    presence_penalty: 0.1,
                    frequency_penalty: 0.1
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();

        } catch (error) {
            console.error('OpenAI API Error:', error);

            const fallbackResponses = [
                "I'm having a brief connection hiccup, but I'm still here for you! What's on your mind?",
                "Give me just a moment to reconnect - I really want to hear what you're thinking about!",
                "I'm having a technical moment, but I'm not going anywhere. What would you like to talk about?"
            ];

            return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Check for crisis indicators
        if (checkForCrisis(message.trim())) {
            setShowCrisisSupport(true);
        }

        if (!isPlus && !isPro && dailyMessageCount >= FREE_DAILY_LIMIT) {
            setCurrentScreen('upgrade');
            return;
        }

        const userMessage = { role: 'user', content: message.trim(), timestamp: new Date() };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage('');
        setIsTyping(true);

        if (!isPlus && !isPro) {
            setDailyMessageCount(prev => prev + 1);
        }

        const model = isPro ? 'gpt-4-turbo' : 'gpt-3.5-turbo';

        try {
            const response = await callOpenAI([...chatHistory, userMessage], model);
            const assistantMessage = {
                role: 'assistant',
                content: response,
                timestamp: new Date(),
                companion: selectedCompanion
            };
            setChatHistory(prev => [...prev, assistantMessage]);

            const prompts = [
                'What else is on your mind?',
                'How are you feeling right now?',
                'Tell me more...',
                'I\'m here to listen',
                'What would help you most right now?'
            ];
            setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            setChatHistory(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again in a moment.",
                timestamp: new Date()
            }]);
        }

        setIsTyping(false);
    };

    const handleAuth = (isSignUp = true) => {
        if (email && password) {
            setUser({ email, isPlus: false, isPro: false });
            setCurrentScreen(isSignUp ? 'companion-select' : 'chat');
            setEmail('');
            setPassword('');
        }
    };

    // Get a random conversation starter based on time of day
    const getContextualStarter = () => {
        const hour = new Date().getHours();
        const starters = {
            morning: "Good morning! How are you starting your day?",
            afternoon: "How's your day going so far?",
            evening: "How was your day today?",
            night: "How are you feeling this evening?"
        };
        
        if (hour < 12) return starters.morning;
        if (hour < 17) return starters.afternoon;
        if (hour < 21) return starters.evening;
        return starters.night;
    };

    // Get current companion theme
    const getCompanionTheme = () => {
        const companion = companions[selectedCompanion];
        return isDarkMode ? {
            bg: `bg-gradient-to-br ${companion.colors.darkGradient}`,
            cardBg: 'bg-black/40',
            text: 'text-white',
            textSecondary: 'text-gray-300',
            border: 'border-white/20',
            input: 'bg-black/30 text-white placeholder-gray-400',
            accentGradient: `bg-gradient-to-r ${companion.colors.gradient}`
        } : {
            bg: `bg-gradient-to-br ${companion.colors.bgGradient}`,
            cardBg: 'bg-white/70',
            text: 'text-gray-800',
            textSecondary: 'text-gray-600',
            border: 'border-white/50',
            input: 'bg-white/80 text-gray-800 placeholder-gray-500',
            accentGradient: `bg-gradient-to-r ${companion.colors.gradient}`
        };
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleUpgrade = (tier) => {
        if (tier === 'friend') {
            setIsPlus(true);
            setIsPro(false);
            alert('Welcome to Friend tier! 🎉 You now have unlimited chats with all companions!');
        } else if (tier === 'bestfriend') {
            setIsPlus(false);
            setIsPro(true);
            alert('Welcome to Best Friend tier! 🎉 You now have access to our most advanced features!');
        }
        setCurrentScreen('chat');
    };

    const saveJournalEntry = () => {
        alert('Journal entry saved! 📖');
        setJournalEntry('');
    };

    const getTheme = () => {
        // Use companion theme when companion is selected, otherwise default
        if (selectedCompanion && companions[selectedCompanion]) {
            return getCompanionTheme();
        }
        
        return isDarkMode ? {
            bg: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
            cardBg: 'bg-black/40',
            text: 'text-white',
            textSecondary: 'text-gray-300',
            border: 'border-white/20',
            input: 'bg-black/30 text-white placeholder-gray-400',
            accentGradient: 'bg-gradient-to-r from-purple-500 to-blue-500'
        } : {
            bg: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
            cardBg: 'bg-white/80',
            text: 'text-gray-800',
            textSecondary: 'text-gray-600',
            border: 'border-white/50',
            input: 'bg-white/70 text-gray-800 placeholder-gray-500',
            accentGradient: 'bg-gradient-to-r from-blue-500 to-purple-500'
        };
    };

    const theme = getTheme();

    if (currentScreen === 'welcome') {
        return (
            <div className={`min-h-screen ${theme.bg} flex flex-col items-center justify-center p-4`}>
                <div className="w-full max-w-sm mx-auto">
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow">
                                    <Heart className="text-white w-12 h-12" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                    <Sparkles className="text-white w-3 h-3" />
                                </div>
                            </div>
                        </div>
                        <h1 className={`text-4xl font-bold ${theme.text} mb-3`}>Welcome to AURA AI</h1>
                        <p className={`${theme.textSecondary} text-base mb-2`}>Your AI companion for life's journey</p>
                        <p className={`${theme.textSecondary} text-sm`}>Supportive conversations, whenever you need them</p>
                    </div>

                    <div className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl shadow-xl border ${theme.border} animate-slide-up`}>
                        <div className="space-y-4">
                            <button
                                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white p-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                                onClick={() => setCurrentScreen('onboarding')}
                            >
                                Find My Perfect Companion
                            </button>
                            <button
                                className={`w-full ${theme.cardBg} ${theme.text} border ${theme.border} p-4 rounded-xl font-medium hover:shadow-md transform hover:scale-[1.02] transition-all duration-200`}
                                onClick={() => {
                                    setUser({ email: 'guest', isPlus: false, isPro: false });
                                    setCurrentScreen('companion-select');
                                }}
                            >
                                Skip - Choose Companion Myself
                            </button>
                            <div className="text-center">
                                <p className={`${theme.textSecondary} text-xs`}>
                                    No signup required - start chatting in 30 seconds
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (currentScreen === 'onboarding') {
        // Step 0: Mood Selection
        if (onboardingStep === 0) {
            return (
                <div className={`min-h-screen ${theme.bg} p-4`}>
                    <div className="max-w-md mx-auto pt-8">
                        <div className="text-center mb-8">
                            <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>How are you feeling today?</h2>
                            <p className={`${theme.textSecondary}`}>This helps us find the perfect companion for you</p>
                        </div>

                        <div className="space-y-3">
                            {moodOptions.map((mood) => (
                                <button
                                    key={mood.id}
                                    onClick={() => {
                                        setOnboardingAnswers(prev => ({ ...prev, mood: mood.id }));
                                        setOnboardingStep(1);
                                    }}
                                    className={`w-full ${theme.cardBg} backdrop-blur-sm p-4 rounded-2xl border ${theme.border} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left group relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                    <div className="relative flex items-center space-x-4">
                                        <div className="text-3xl">{mood.emoji}</div>
                                        <div className="flex-1">
                                            <h3 className={`font-semibold ${theme.text}`}>{mood.label}</h3>
                                            <p className={`text-sm ${theme.textSecondary}`}>{mood.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        
                        <button
                            onClick={() => setCurrentScreen('welcome')}
                            className={`w-full mt-6 ${theme.cardBg} ${theme.text} border ${theme.border} p-3 rounded-xl font-medium hover:shadow-md transition-all duration-200`}
                        >
                            Back
                        </button>
                    </div>
                </div>
            );
        }

        // Step 1: Personality Questions
        if (onboardingStep === 1) {
            const currentQuestion = personalityQuestions[onboardingStep - 1];
            return (
                <div className={`min-h-screen ${theme.bg} p-4`}>
                    <div className="max-w-md mx-auto pt-8">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center mb-4">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                </div>
                            </div>
                            <h2 className={`text-xl font-bold ${theme.text} mb-2`}>{currentQuestion.question}</h2>
                        </div>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setOnboardingAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
                                        setOnboardingStep(2);
                                    }}
                                    className={`w-full ${theme.cardBg} backdrop-blur-sm p-4 rounded-2xl border ${theme.border} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left`}
                                >
                                    <p className={`font-medium ${theme.text}`}>{option.label}</p>
                                </button>
                            ))}
                        </div>
                        
                        <button
                            onClick={() => setOnboardingStep(0)}
                            className={`w-full mt-6 ${theme.cardBg} ${theme.text} border ${theme.border} p-3 rounded-xl font-medium hover:shadow-md transition-all duration-200`}
                        >
                            Back
                        </button>
                    </div>
                </div>
            );
        }

        // Step 2: Companion Recommendation
        if (onboardingStep === 2) {
            const recommended = recommendCompanion();
            const recommendedCompanion = companions[recommended];
            
            return (
                <div className={`min-h-screen ${theme.bg} p-4`}>
                    <div className="max-w-md mx-auto pt-8">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center mb-4">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                </div>
                            </div>
                            <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Perfect Match!</h2>
                            <p className={`${theme.textSecondary}`}>Based on your answers, we recommend:</p>
                        </div>

                        <div className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border} mb-6 relative overflow-hidden`}>
                            <div className={`absolute inset-0 bg-gradient-to-r ${recommendedCompanion.colors.gradient} opacity-10`} />
                            <div className="relative text-center">
                                <div className="text-5xl mb-3">{recommendedCompanion.emoji}</div>
                                <h3 className={`text-2xl font-bold ${theme.text} mb-1`}>{recommendedCompanion.name}</h3>
                                <p className={`${theme.textSecondary} mb-3`}>{recommendedCompanion.tagline}</p>
                                <p className={`text-sm ${theme.textSecondary} mb-4`}>{recommendedCompanion.description}</p>
                                <p className={`text-xs ${theme.textSecondary}`}>Specializes in: {recommendedCompanion.specialty}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setSelectedCompanion(recommended);
                                    setUser({ email: 'matched-user', isPlus: false, isPro: false });
                                    setCurrentScreen('chat');
                                }}
                                className={`w-full bg-gradient-to-r ${recommendedCompanion.colors.gradient} text-white p-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200`}
                            >
                                Start Chatting with {recommendedCompanion.name}
                            </button>
                            
                            <button
                                onClick={() => {
                                    setUser({ email: 'matched-user', isPlus: false, isPro: false });
                                    setCurrentScreen('companion-select');
                                }}
                                className={`w-full ${theme.cardBg} ${theme.text} border ${theme.border} p-4 rounded-xl font-medium hover:shadow-md transition-all duration-200`}
                            >
                                Browse All Companions
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    if (currentScreen === 'companion-select') {
        return (
            <div className={`min-h-screen ${theme.bg} p-4`}>
                <div className="max-w-md mx-auto pt-8">
                    <div className="text-center mb-8">
                        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Choose Your Companion</h2>
                        <p className={`${theme.textSecondary}`}>Each one has their own personality and way of supporting you</p>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(companions).map(([key, companion]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedCompanion(key);
                                    setCurrentScreen('chat');
                                }}
                                className={`w-full ${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left group relative overflow-hidden`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${companion.colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                                <div className="relative flex items-center space-x-4">
                                    <div className={`text-3xl bg-gradient-to-r ${companion.colors.gradient} bg-clip-text text-transparent`}>
                                        {companion.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h3 className={`text-lg font-semibold ${theme.text}`}>{companion.name}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${companion.colors.gradient} text-white`}>
                                                {companion.tagline}
                                            </span>
                                        </div>
                                        <p className={`text-sm ${theme.textSecondary} mb-2`}>{companion.description}</p>
                                        <p className={`text-xs ${theme.textSecondary} opacity-75`}>Specializes in: {companion.specialty}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const NavBar = () => (
        <nav className={`${theme.cardBg} backdrop-blur-sm border-b ${theme.border} p-4`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${companions[selectedCompanion]?.colors.accentGradient || theme.accentGradient} shadow-lg`}>
                        <span className="text-white text-lg">{companions[selectedCompanion]?.emoji}</span>
                    </div>
                    <div>
                        <h1 className={`text-lg font-bold ${theme.text}`}>{companions[selectedCompanion]?.name}</h1>
                        <p className={`text-xs ${theme.textSecondary}`}>
                            {isPro ? 'Best Friend' : isPlus ? 'Friend' : `${dailyMessageCount}/${FREE_DAILY_LIMIT} daily chats`}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className={`p-2 rounded-lg hover:${theme.cardBg} transition-colors`}
                >
                    {showMobileMenu ? <X className={`w-6 h-6 ${theme.text}`} /> : <Menu className={`w-6 h-6 ${theme.text}`} />}
                </button>
            </div>

            {showMobileMenu && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    <button
                        onClick={() => { setCurrentScreen('chat'); setShowMobileMenu(false); }}
                        className={`w-full text-left p-3 rounded-lg hover:${theme.cardBg} transition-colors flex items-center space-x-3`}
                    >
                        <Heart className={`w-5 h-5 ${theme.text}`} />
                        <span className={theme.text}>Chat</span>
                    </button>
                    <button
                        onClick={() => { setCurrentScreen('journal'); setShowMobileMenu(false); }}
                        className={`w-full text-left p-3 rounded-lg hover:${theme.cardBg} transition-colors flex items-center space-x-3 ${!isPro ? 'opacity-50' : ''}`}
                        disabled={!isPro}
                    >
                        <BookOpen className={`w-5 h-5 ${theme.text}`} />
                        <span className={theme.text}>Journal {!isPro && '(Best Friend)'}</span>
                    </button>
                    <button
                        onClick={() => { setCurrentScreen('settings'); setShowMobileMenu(false); }}
                        className={`w-full text-left p-3 rounded-lg hover:${theme.cardBg} transition-colors flex items-center space-x-3`}
                    >
                        <Settings className={`w-5 h-5 ${theme.text}`} />
                        <span className={theme.text}>Settings</span>
                    </button>
                    {!isPlus && !isPro && (
                        <button
                            onClick={() => { setCurrentScreen('upgrade'); setShowMobileMenu(false); }}
                            className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-teal to-gold text-white transition-colors flex items-center space-x-3"
                        >
                            <Crown className="w-5 h-5" />
                            <span>Upgrade to Friend or Best Friend</span>
                        </button>
                    )}
                </div>
            )}
        </nav>
    );

    if (currentScreen === 'upgrade') {
        return (
            <div className={`min-h-screen ${theme.bg}`}>
                <NavBar />
                <div className="max-w-md mx-auto p-4 pt-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-teal to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                            <Crown className="text-white w-8 h-8" />
                        </div>
                        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Become Better Friends</h2>
                        <p className={`${theme.textSecondary}`}>Unlock unlimited conversations and premium features</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => handleUpgrade('friend')}
                            className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left w-full group relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            <div className="relative">
                            <div className="flex items-center space-x-4 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className={`text-xl font-bold ${theme.text}`}>Friend - $4.99/mo</h3>
                                </div>
                                <p className={`${theme.textSecondary} mb-4`}>Unlimited chats with all companions, voice messages, and conversation history.</p>
                                <span className="bg-blue-500/20 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">Perfect for Daily Support</span>
                            </div>
                        </button>

                        <button
                            onClick={() => handleUpgrade('bestfriend')}
                            className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left w-full group relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            <div className="relative">
                            <div className="flex items-center space-x-4 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className={`text-xl font-bold ${theme.text}`}>Best Friend - $9.99/mo</h3>
                                </div>
                                <p className={`${theme.textSecondary} mb-4`}>Everything in Friend, plus advanced AI (GPT-4), insights, journaling, and priority features.</p>
                                <span className="bg-purple-500/20 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">Most Advanced</span>
                            </div>
                        </button>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => setCurrentScreen('chat')}
                            className={`w-full ${theme.cardBg} ${theme.text} border ${theme.border} p-4 rounded-xl font-medium hover:shadow-md transition-all duration-200`}
                        >
                            Continue with Free Tier
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (currentScreen === 'journal') {
        return (
            <div className={`min-h-screen ${theme.bg}`}>
                <NavBar />
                <div className="max-w-2xl mx-auto p-4">
                    <div className="mb-6">
                        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Personal Journal</h2>
                        <p className={`${theme.textSecondary}`}>A private space for your thoughts and reflections</p>
                    </div>

                    <div className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border}`}>
                        <textarea
                            className={`w-full h-64 p-4 border ${theme.border} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none ${theme.input}`}
                            placeholder="What's on your mind today?"
                            value={journalEntry}
                            onChange={(e) => setJournalEntry(e.target.value)}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={saveJournalEntry}
                                disabled={!journalEntry.trim()}
                                className="bg-gradient-to-r from-teal to-gold text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                            >
                                Save Entry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (currentScreen === 'settings') {
        return (
            <div className={`min-h-screen ${theme.bg}`}>
                <NavBar />
                <div className="max-w-2xl mx-auto p-4">
                    <div className="mb-6">
                        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Settings</h2>
                        <p className={`${theme.textSecondary}`}>Personalize your companion experience</p>
                    </div>

                    <div className="space-y-4">
                        <div className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className={`font-medium ${theme.text}`}>Dark Mode</h3>
                                    <p className={`text-sm ${theme.textSecondary}`}>Switch to dark theme</p>
                                </div>
                                <button
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className={`p-2 rounded-lg ${isDarkMode ? 'bg-teal text-white' : 'bg-gray-200 text-gray-600'} transition-colors`}
                                >
                                    {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border}`}>
                            <h3 className={`font-medium ${theme.text} mb-4`}>Switch Companion</h3>
                            <div className="space-y-3">
                                {Object.entries(companions).map(([key, companion]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedCompanion(key)}
                                        className={`w-full p-3 rounded-lg border transition-all duration-200 flex items-center space-x-3 ${
                                            selectedCompanion === key
                                                ? `border-2 bg-gradient-to-r ${companion.colors.gradient} bg-opacity-20 border-opacity-50`
                                                : `border-gray-200 hover:${theme.cardBg}`
                                        }`}
                                    >
                                        <span className="text-2xl">{companion.emoji}</span>
                                        <div className="text-left flex-1">
                                            <div className={`font-medium ${theme.text}`}>{companion.name}</div>
                                            <div className={`text-sm ${theme.textSecondary}`}>{companion.tagline}</div>
                                        </div>
                                        {selectedCompanion === key && (
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${companion.colors.gradient}`} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setUser(null);
                                setCurrentScreen('onboarding');
                                setChatHistory([]);
                                setDailyMessageCount(0);
                            }}
                            className={`w-full ${theme.cardBg} backdrop-blur-sm p-4 rounded-2xl border ${theme.border} ${theme.text} hover:shadow-md transition-all duration-200`}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme.bg} flex flex-col`}>
            <NavBar />

            <div className="flex-1 max-w-2xl mx-auto w-full p-4 overflow-y-auto" ref={chatContainerRef}>
                <div className="space-y-4">
                    {!chatHistory.length && (
                        <div className="space-y-6 py-8">
                            {/* Companion Introduction */}
                            <div className="text-center">
                                <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl p-6 shadow-lg border ${theme.border} max-w-md mx-auto relative overflow-hidden`}>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${companions[selectedCompanion]?.colors.gradient} opacity-5`} />
                                    <div className="relative">
                                        <div className="text-4xl mb-3">{companions[selectedCompanion]?.emoji}</div>
                                        <h3 className={`text-xl font-bold ${theme.text} mb-1`}>Hi! I'm {companions[selectedCompanion]?.name}</h3>
                                        <p className={`${theme.textSecondary} text-sm mb-2`}>{companions[selectedCompanion]?.tagline}</p>
                                        <p className={`${theme.textSecondary} text-sm`}>{companions[selectedCompanion]?.description}</p>
                                        <p className={`${theme.text} text-sm mt-3 font-medium`}>{getContextualStarter()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Conversation Starters */}
                            <div className="max-w-md mx-auto">
                                <p className={`text-center ${theme.textSecondary} text-sm mb-4`}>or tap one of these to get started:</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {quickReplies.slice(0, 6).map((reply, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setMessage(reply);
                                                setTimeout(() => handleSendMessage(), 100);
                                            }}
                                            className={`${theme.cardBg} backdrop-blur-sm p-3 rounded-xl border ${theme.border} hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-sm ${theme.text} text-left group relative overflow-hidden`}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-r ${companions[selectedCompanion]?.colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-200`} />
                                            <div className="relative">{reply}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                                    msg.role === 'user'
                                        ? `bg-gradient-to-r ${companions[selectedCompanion]?.colors.gradient || 'from-blue-500 to-purple-500'} text-white rounded-br-md`
                                        : `${theme.cardBg} backdrop-blur-sm ${theme.text} border ${theme.border} rounded-bl-md`
                                }`}
                            >
                                <p className="text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                <div className={`text-xs mt-2 ${msg.role === 'user' ? 'text-white/70' : theme.textSecondary}`}>
                                    {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className={`${theme.cardBg} backdrop-blur-sm border ${theme.border} rounded-2xl rounded-bl-md p-4 shadow-sm`}>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">{companions[selectedCompanion]?.emoji}</span>
                                    <div className="flex space-x-1">
                                        <div className={`w-2 h-2 rounded-full animate-bounce bg-gradient-to-r ${companions[selectedCompanion]?.colors.gradient}`}></div>
                                        <div className={`w-2 h-2 rounded-full animate-bounce bg-gradient-to-r ${companions[selectedCompanion]?.colors.gradient}`} style={{animationDelay: '0.1s'}}></div>
                                        <div className={`w-2 h-2 rounded-full animate-bounce bg-gradient-to-r ${companions[selectedCompanion]?.colors.gradient}`} style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className={`${theme.cardBg} backdrop-blur-sm border-t ${theme.border} p-4`}>
                <div className="max-w-2xl mx-auto flex items-end space-x-3">
                    <div className="flex-1 relative">
                        <textarea
                            className={`w-full p-4 pr-12 border ${theme.border} rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none text-base ${theme.input} backdrop-blur-sm transition-all duration-200 hover:shadow-md`}
                            placeholder={prompt}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows="1"
                            style={{
                                minHeight: '56px',
                                maxHeight: '120px'
                            }}
                        />
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isTyping}
                        className={`${companions[selectedCompanion]?.colors.accentGradient || theme.accentGradient} text-white p-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:shadow-none`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Crisis Support Modal */}
            {showCrisisSupport && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl p-6 max-w-md w-full border ${theme.border} shadow-2xl`}>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="text-white w-8 h-8" />
                            </div>
                            <h3 className={`text-xl font-bold ${theme.text} mb-2`}>{crisisResources.title}</h3>
                            <p className={`${theme.textSecondary} text-sm`}>{crisisResources.message}</p>
                        </div>

                        <div className="space-y-4 mb-6">
                            {crisisResources.resources.map((resource, index) => (
                                <div key={index} className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg}`}>
                                    <h4 className={`font-semibold ${theme.text} mb-1`}>{resource.name}</h4>
                                    {resource.number && (
                                        <p className="text-lg font-bold text-red-600 mb-1">{resource.number}</p>
                                    )}
                                    {resource.link && (
                                        <a 
                                            href={resource.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline text-sm"
                                        >
                                            Visit Website
                                        </a>
                                    )}
                                    <p className={`text-xs ${theme.textSecondary}`}>{resource.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.open('tel:988')}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                            >
                                Call 988 Now
                            </button>
                            <button
                                onClick={() => setShowCrisisSupport(false)}
                                className={`w-full ${theme.cardBg} ${theme.text} border ${theme.border} p-3 rounded-xl font-medium hover:shadow-md transition-all duration-200`}
                            >
                                Continue Conversation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;