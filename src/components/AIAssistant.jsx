import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, Bot, Star, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function AIAssistant() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const PRESET_PROMPTS = [
    {
      id: 1,
      title: t('ai.preset1'),
      text: 'Recommend a luxury family resort in Antalya with a private pool, ladies-only beach, and 100% halal food.',
      response: {
        text: "As-salamu alaykum! Based on your preference for privacy and luxury, I highly recommend the **Adenya Hotel & Resort** in Antalya. It offers outstanding private amenities tailored for Muslim families.",
        hotels: [
          {
            name: 'Adenya Hotel & Resort',
            location: 'Antalya, Turkey',
            rating: 4.7,
            price: 280,
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
            features: ['Women-Only Private Beach', '100% Halal Dining', 'Alcohol-Free Premises'],
          }
        ]
      }
    },
    {
      id: 2,
      title: t('ai.preset2'),
      text: 'Suggest premium accommodation in Makkah with direct Kaaba views, prayer facilities, and easy access for elderly parents.',
      response: {
        text: "Certainly. For direct Haram convenience and premium support, the **Conrad Makkah Jabal Omar** is an exceptional choice, located right next to the gates with direct courtyard access.",
        hotels: [
          {
            name: 'Conrad Makkah Jabal Omar',
            location: 'Makkah, Saudi Arabia',
            rating: 4.8,
            price: 450,
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
            features: ['Kaaba Views', 'Wheelchair Accessible', 'In-room Haram Audio Feed'],
          }
        ]
      }
    },
    {
      id: 3,
      title: t('ai.preset3'),
      text: 'Find a boutique, alcohol-free hotel in Istanbul close to Blue Mosque with authentic Islamic history.',
      response: {
        text: "For an authentic spiritual and historical experience in Istanbul, **Ajwa Hotel Sultanahmet** is a masterpiece. It features traditional Ottoman architecture, custom prayer rooms, and is fully alcohol-free.",
        hotels: [
          {
            name: 'Ajwa Hotel Sultanahmet',
            location: 'Istanbul, Turkey',
            rating: 4.9,
            price: 320,
            image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80',
            features: ['No Alcohol Onsite', 'Ottoman-style Hammam', 'Halal Verified Kitchen'],
          }
        ]
      }
    }
  ];

  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: 'bot',
      text: t('ai.greeting'),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const prevMsgCount = useRef(messages.length);

  useEffect(() => {
    // Only scroll when a NEW message is added (not on initial mount)
    if (messages.length > prevMsgCount.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMsgCount.current = messages.length;
  }, [messages]);

  // Scroll to bottom when typing indicator appears (already inside chat box)
  useEffect(() => {
    if (isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Check if preset matches
    const preset = PRESET_PROMPTS.find(
      (p) => text.toLowerCase().includes(p.title.toLowerCase()) || p.text === text
    );

    setTimeout(() => {
      setIsTyping(false);
      if (preset) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: preset.response.text,
            hotels: preset.response.hotels,
          }
        ]);
      } else {
        // Generic fallback response
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: `Barakallahu feek! I have processed your request for "${text}". Here is a highly matching destination based on our global halal compliance network:`,
            hotels: [
              {
                name: 'Jumeirah Dar Al Masyaf',
                location: 'Dubai, UAE',
                rating: 4.9,
                price: 650,
                image: 'https://images.unsplash.com/photo-1582672093685-704155248536?auto=format&fit=crop&w=600&q=80',
                features: ['Ultra-Private Villas', 'Verified Halal Gastronomy', 'Prayer Mat in Room'],
              }
            ],
          }
        ]);
      }
    }, 1500);
  };

  return (
    <section id="ai-assistant" className="py-24 bg-brand-emerald-50/50 dark:bg-brand-emerald-950/10 relative overflow-hidden">
      {/* Glow lights */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-emerald-500/10 rounded-full ambient-glow" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-brand-gold-500/10 rounded-full ambient-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Context Info */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-gold-500/30 bg-brand-gold-50 dark:bg-brand-emerald-950/50 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-brand-gold-600 dark:text-brand-gold-500 animate-spin-slow" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald-800 dark:text-brand-gold-200 font-sans">
                {t('ai.sectionLabel')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-emerald-950 dark:text-white leading-tight font-sans mb-6">
              {t('ai.heading1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald-700 to-brand-gold-600 dark:from-brand-gold-200 dark:to-brand-gold-500 font-serif italic font-normal">
                {t('ai.heading2')}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {t('ai.subtext')}
            </p>

            {/* Prompt presets trigger buttons */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                {t('ai.tryAsking')}
              </p>
              {PRESET_PROMPTS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSendMessage(preset.text)}
                  className="w-full text-left px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-brand-emerald-800/50 bg-white/80 dark:bg-brand-emerald-950/20 hover:border-brand-gold-500 dark:hover:border-brand-gold-500 transition-all duration-300 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:shadow-sm flex items-center justify-between group cursor-pointer"
                >
                  <span>{preset.title}</span>
                  {isRTL
                    ? <ArrowLeft className="w-4 h-4 text-brand-gold-500 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                    : <ArrowRight className="w-4 h-4 text-brand-gold-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: High Fidelity Chat Terminal Mockup */}
          <div className="lg:col-span-7">
            <div className="w-full max-w-2xl mx-auto rounded-3xl border border-slate-200/80 dark:border-brand-emerald-800/40 bg-white/70 dark:bg-brand-emerald-950/30 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-[520px]">

              {/* Chat Terminal Header */}
              <div className="px-6 py-4 border-b border-slate-200/60 dark:border-brand-emerald-900/60 flex items-center justify-between bg-slate-50/50 dark:bg-brand-emerald-950/40">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-brand-emerald-500 dark:bg-brand-emerald-800 flex items-center justify-center text-white">
                      <Sparkles className="w-5 h-5 text-brand-gold-500" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-brand-emerald-950 rounded-full" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                      {t('ai.chatTitle')}
                    </h4>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                      {t('ai.chatStatus')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-brand-emerald-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-brand-emerald-800" />
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-brand-gold-500">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${msg.sender === 'user'
                          ? 'bg-slate-100 dark:bg-brand-emerald-900 border-slate-200 dark:border-brand-emerald-800 text-slate-700 dark:text-brand-gold-500'
                          : 'bg-brand-emerald-500 dark:bg-brand-emerald-850 border-brand-emerald-600 dark:border-brand-emerald-800 text-white'
                        }`}
                    >
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-brand-gold-500" />}
                    </div>

                    {/* Text + Cards */}
                    <div className="space-y-3">
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed text-left ${msg.sender === 'user'
                            ? 'bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 font-medium rounded-tr-none'
                            : 'bg-slate-55/90 dark:bg-brand-emerald-900/40 border border-slate-200/50 dark:border-brand-emerald-800/30 text-slate-800 dark:text-slate-200 rounded-tl-none'
                          }`}
                      >
                        {msg.text}
                      </div>

                      {/* Display Recommended Hotel Cards inside Chat Feed */}
                      {msg.hotels && (
                        <div className="space-y-3 mt-3">
                          {msg.hotels.map((hotel) => (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              key={hotel.name}
                              className="rounded-2xl overflow-hidden border border-slate-200/60 dark:border-brand-emerald-850 bg-white dark:bg-brand-emerald-950/60 flex flex-col sm:flex-row text-left shadow-md hover:shadow-lg transition-all"
                            >
                              <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-full sm:w-32 h-32 sm:h-auto object-cover"
                              />
                              <div className="p-4 flex-grow flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-brand-emerald-950 dark:text-white">
                                      {hotel.name}
                                    </span>
                                    <div className="flex items-center gap-0.5 text-xs font-bold text-slate-800 dark:text-brand-gold-500">
                                      <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
                                      {hotel.rating}
                                    </div>
                                  </div>
                                  <div className="text-[10px] text-slate-450 dark:text-slate-400 flex items-center gap-1 mb-2">
                                    <MapPin className="w-3 h-3 text-brand-gold-500" />
                                    {hotel.location}
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {hotel.features.map((feat) => (
                                      <span
                                        key={feat}
                                        className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900 text-brand-emerald-800 dark:text-brand-gold-200"
                                      >
                                        {feat}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-brand-emerald-900/30">
                                  <span className="text-xs font-bold text-slate-900 dark:text-slate-250">
                                    ${hotel.price} <span className="text-[10px] font-normal text-slate-400">{t('ai.perNight')}</span>
                                  </span>
                                  <button
                                    type="button"
                                    className="px-3 py-1.5 rounded-lg bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 text-[10px] font-bold transition cursor-pointer"
                                  >
                                    {t('ai.viewDetails')}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Simulated Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 mr-auto max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-brand-emerald-500 dark:bg-brand-emerald-850 flex items-center justify-center text-white border dark:border-brand-emerald-800">
                      <Bot className="w-4 h-4 text-brand-gold-500" />
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-emerald-900/40 border border-slate-200/50 dark:border-brand-emerald-850 text-slate-800 dark:text-slate-200 rounded-tl-none flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-brand-gold-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-brand-gold-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-brand-gold-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Area */}
              <div className="p-4 border-t border-slate-200/60 dark:border-brand-emerald-900/60 bg-slate-50/50 dark:bg-brand-emerald-950/40">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputText);
                  }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('ai.placeholder')}
                    className="w-full py-3.5 pl-5 pr-14 rounded-2xl border border-slate-250 dark:border-brand-emerald-800/65 bg-white dark:bg-brand-emerald-900/25 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500/20 text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 p-2.5 rounded-xl bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 hover:opacity-90 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
