// App.js
import React, { useState, useEffect, useRef } from 'react';
import { Send, Heart, Settings, Crown, Calendar, BookOpen, User, Moon, Sun, Menu, X, Sparkles, Zap } from 'lucide-react';

const App = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [currentScreen, setCurrentScreen] = useState('onboarding'); // onboarding, chat, settings, upgrade, journal
    const [isTyping, setIsTyping] = useState(false);
    const [dailyMessageCount, setDailyMessageCount] = useState(0);
    const [isPlus, setIsPlus] = useState(false);
    const [isPro, setIsPro] = useState(false);
    const [selectedTherapist, setSelectedTherapist] = useState('selene');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [journalEntry, setJournalEntry] = useState('');
    const [prompt, setPrompt] = useState('How are you feeling today?');

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Therapist personalities
    const therapists = {
        selene: {
            name: 'Selene',
            description: 'Warm and nurturing, specializes in anxiety and stress',
            emoji: '🌙',
            systemPrompt: "You are Selene, a warm, empathetic AI therapist. You speak with gentle compassion, validate emotions, and help users process their feelings. Keep responses conversational but therapeutic. Use 'I' statements to show empathy. Ask thoughtful follow-up questions."
        },
        aurora: {
            name: 'Aurora',
            description: 'Energetic and motivational, great for confidence building',
            emoji: '🌅',
            systemPrompt: "You are Aurora, an encouraging AI therapist who focuses on building confidence and motivation. You're upbeat but sensitive, helping users see their strengths and potential. Balance optimism with validation of their struggles."
        },
        sage: {
            name: 'Sage',
            description: 'Wise and grounding, perfect for life transitions',
            emoji: '🌿',
            systemPrompt: "You are Sage, a wise and grounding AI therapist. You help users find clarity and perspective during difficult times. You're calm, thoughtful, and help people see the bigger picture while acknowledging their current pain."
        }
    };

    const FREE_DAILY_LIMIT = 5;

    // Real OpenAI API call
    const callOpenAI = async (messages, model) => {
        const therapist = therapists[selectedTherapist];

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
                            content: therapist.systemPrompt + " Keep responses warm, conversational, and under 150 words. Ask thoughtful follow-up questions to encourage deeper reflection."
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
                "I'm having a brief connection issue, but I'm still here for you. Can you tell me more about what you're feeling?",
                "I want to make sure I can give you my full attention. While I reconnect, would you like to share what's been on your mind lately?",
                "I'm experiencing a technical moment, but your feelings and thoughts are important to me. What would be most helpful to talk about right now?"
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
                therapist: selectedTherapist
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
            setCurrentScreen(isSignUp ? 'therapist-select' : 'chat');
            setEmail('');
            setPassword('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleUpgrade = (tier) => {
        if (tier === 'plus') {
            setIsPlus(true);
            setIsPro(false);
            alert('Welcome to Plus! 🎉 You now have unlimited access to all GPT-3.5 features.');
        } else if (tier === 'pro') {
            setIsPlus(false);
            setIsPro(true);
            alert('Welcome to Pro! 🎉 You now have unlimited access to all GPT-4 features.');
        }
        setCurrentScreen('chat');
    };

    const saveJournalEntry = () => {
        alert('Journal entry saved! 📖');
        setJournalEntry('');
    };

    const getTheme = () => {
        return isDarkMode ? {
            bg: 'bg-charcoal',
            cardBg: 'bg-zinc-800/80',
            text: 'text-coolGray',
            textSecondary: 'text-zinc-400',
            border: 'border-zinc-700',
            input: 'bg-zinc-800/50 text-coolGray placeholder-zinc-500'
        } : {
            bg: 'bg-gradient-to-br from-cream via-lavender to-sage',
            cardBg: 'bg-white/80',
            text: 'text-gray-800',
            textSecondary: 'text-gray-600',
            border: 'border-white/50',
            input: 'bg-white/70 text-gray-800 placeholder-gray-500'
        };
    };

    const theme = getTheme();

    if (currentScreen === 'onboarding') {
        return (
            <div className={`min-h-screen ${theme.bg} flex flex-col items-center justify-center p-4`}>
                <div className="w-full max-w-sm mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-20 h-20 bg-gradient-to-r from-teal to-gold rounded-full flex items-center justify-center shadow-xl">
                                <Heart className="text-white w-10 h-10" />
                            </div>
                        </div>
                        <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>Therapy AI</h1>
                        <p className={`${theme.textSecondary} text-sm`}>A safe space to talk. Whenever you need it.</p>
                    </div>

                    <div className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl shadow-xl border ${theme.border}`}>
                        <div className="space-y-4">
                            <input
                                type="email"
                                className={`w-full p-4 border ${theme.border} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-base transition-all duration-200 ${theme.input}`}
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className={`w-full p-4 border ${theme.border} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent text-base transition-all duration-200 ${theme.input}`}
                                placeholder="Create a password (min 6 chars)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="w-full bg-gradient-to-r from-teal to-gold text-white p-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                                onClick={() => handleAuth(true)}
                            >
                                Start My Journey
                            </button>
                            <button
                                className={`w-full ${theme.cardBg} ${theme.text} border ${theme.border} p-4 rounded-xl font-medium hover:shadow-md transform hover:scale-[1.02] transition-all duration-200`}
                                onClick={() => handleAuth(false)}
                            >
                                I Have an Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (currentScreen === 'therapist-select') {
        return (
            <div className={`min-h-screen ${theme.bg} p-4`}>
                <div className="max-w-md mx-auto pt-8">
                    <div className="text-center mb-8">
                        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Choose Your Therapist</h2>
                        <p className={`${theme.textSecondary}`}>Each has their own unique approach to support you</p>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(therapists).map(([key, therapist]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedTherapist(key);
                                    setCurrentScreen('chat');
                                }}
                                className={`w-full ${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border} hover:shadow-lg transition-all duration-200 text-left`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-3xl">{therapist.emoji}</div>
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-semibold ${theme.text}`}>{therapist.name}</h3>
                                        <p className={`text-sm ${theme.textSecondary}`}>{therapist.description}</p>
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
                    <div className="w-10 h-10 bg-gradient-to-r from-teal to-gold rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">{therapists[selectedTherapist].emoji}</span>
                    </div>
                    <div>
                        <h1 className={`text-lg font-bold ${theme.text}`}>{therapists[selectedTherapist].name}</h1>
                        <p className={`text-xs ${theme.textSecondary}`}>
                            {isPro ? 'Pro' : isPlus ? 'Plus' : `${dailyMessageCount}/${FREE_DAILY_LIMIT} daily messages`}
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
                        <span className={theme.text}>Journal {!isPro && '(Pro)'}</span>
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
                            <span>Upgrade to Plus or Pro</span>
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
                        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Unlock More with Plus & Pro</h2>
                        <p className={`${theme.textSecondary}`}>Get unlimited access and more powerful features</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => handleUpgrade('plus')}
                            className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border} hover:shadow-lg transition-all duration-200 text-left w-full`}
                        >
                            <div className="flex items-center space-x-4 mb-2">
                                <Zap className={`w-8 h-8 text-teal`} />
                                <h3 className={`text-xl font-bold ${theme.text}`}>Plus - $9.99/mo</h3>
                            </div>
                            <p className={`${theme.textSecondary} mb-4`}>Unlimited messages with GPT-3.5-turbo, chat history, and dark mode.</p>
                            <span className="bg-teal/20 text-teal text-xs font-semibold px-2 py-1 rounded-full">Great Value</span>
                        </button>

                        <button
                            onClick={() => handleUpgrade('pro')}
                            className={`${theme.cardBg} backdrop-blur-sm p-6 rounded-2xl border ${theme.border} hover:shadow-lg transition-all duration-200 text-left w-full`}
                        >
                            <div className="flex items-center space-x-4 mb-2">
                                <Sparkles className={`w-8 h-8 text-gold`} />
                                <h3 className={`text-xl font-bold ${theme.text}`}>Pro - $19.99/mo</h3>
                            </div>
                            <p className={`${theme.textSecondary} mb-4`}>Everything in Plus, plus access to GPT-4-turbo, multiple AIs, and journaling.</p>
                            <span className="bg-gold/20 text-gold text-xs font-semibold px-2 py-1 rounded-full">Most Powerful</span>
                        </button>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => setCurrentScreen('chat')}
                            className={`w-full ${theme.cardBg} ${theme.text} border ${theme.border} p-4 rounded-xl font-medium hover:shadow-md transition-all duration-200`}
                        >
                            Continue with Free
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
                        <p className={`${theme.textSecondary}`}>Customize your experience</p>
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
                            <h3 className={`font-medium ${theme.text} mb-4`}>Choose Your Therapist</h3>
                            <div className="space-y-3">
                                {Object.entries(therapists).map(([key, therapist]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedTherapist(key)}
                                        className={`w-full p-3 rounded-lg border transition-all duration-200 flex items-center space-x-3 ${
                                            selectedTherapist === key
                                                ? 'border-teal bg-teal/50'
                                                : `border-gray-200 hover:${theme.cardBg}`
                                        }`}
                                    >
                                        <span className="text-2xl">{therapist.emoji}</span>
                                        <div className="text-left">
                                            <div className={`font-medium ${theme.text}`}>{therapist.name}</div>
                                            <div className={`text-sm ${theme.textSecondary}`}>{therapist.description}</div>
                                        </div>
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
                        <div className="text-center py-8">
                            <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl p-6 shadow-sm border ${theme.border} max-w-md mx-auto`}>
                                <div className="text-4xl mb-3">{therapists[selectedTherapist].emoji}</div>
                                <p className={`${theme.text} mb-2`}>Hi! I'm {therapists[selectedTherapist].name}</p>
                                <p className={`${theme.textSecondary} text-sm`}>{therapists[selectedTherapist].description}</p>
                                <p className={`${theme.textSecondary} text-sm mt-2`}>I'm here to listen and support you. What's on your mind?</p>
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
                                        ? 'bg-gradient-to-r from-teal to-gold text-white rounded-br-md'
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
                                    <span className="text-2xl">{therapists[selectedTherapist].emoji}</span>
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                        className="bg-gradient-to-r from-teal to-gold text-white p-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:shadow-none"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;