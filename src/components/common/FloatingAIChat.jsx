import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDecision } from '../../contexts/DecisionContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  RefreshCw,
  Route
} from 'lucide-react';

// TODO: Backend endpoint POST /api/ai/chat is missing. Preserving UI with interactive copilot response simulation.
export const FloatingAIChat = () => {
  const { aiDrawerOpen, toggleAiDrawer } = useDecision();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your Smart Mobility Assistant. Ask me anything about route optimization, traffic forecasts, fuel efficiency, or best departure times.",
      timestamp: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "What is the best route from Hyderabad to Bangalore?",
    "Simulate a 15-min earlier departure time",
    "What are the top 3 traffic bottlenecks today?",
    "Calculate fuel savings for Outer Ring Road"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (aiDrawerOpen) scrollToBottom();
  }, [messages, aiDrawerOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Based on live AI traffic sensors, taking the Outer Ring Expressway saves 18 minutes while maintaining 96% route confidence.";
      if (query.toLowerCase().includes('hyderabad') || query.toLowerCase().includes('bangalore')) {
        reply = "Taking the NH44 Expressway route from Hyderabad to Bangalore provides an optimal 22-minute time savings compared to city center transit.";
      } else if (query.toLowerCase().includes('departure') || query.toLowerCase().includes('time')) {
        reply = "Shifting departure 15 minutes earlier to 08:30 AM allows you to clear the Silk Board flyover before peak surge, saving 24 minutes in total transit.";
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 98,
        sources: ['Live Traffic Radar v4', 'National Highway Index 2026']
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {aiDrawerOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className={`fixed bottom-6 right-6 z-50 glass-panel rounded-3xl border border-blue-500/30 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            isExpanded ? 'w-[640px] h-[720px]' : 'w-96 h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-white/95 backdrop-blur-md border-b border-blue-500/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-500 p-0.5 shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Route className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-slate-900">Smart Mobility Assistant</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10px] text-blue-600 font-extrabold">AI Route Copilot v4.2 • Active</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-600">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => toggleAiDrawer(false)}
                className="p-1.5 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-bold leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white rounded-br-none shadow-md shadow-blue-500/20'
                      : 'bg-white border border-blue-500/25 text-slate-900 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.confidence && (
                    <div className="mt-2 pt-2 border-t border-blue-500/20 flex items-center justify-between text-[10px] text-blue-700 font-black">
                      <span>Precision Score: {msg.confidence}%</span>
                      {msg.sources && <span>Sensors: {msg.sources.length}</span>}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 font-bold mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-black text-blue-700 bg-white p-3 rounded-2xl border border-blue-500/25 w-fit shadow-sm">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Evaluating real-time traffic corridors...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="p-2.5 bg-white border-t border-blue-500/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-500/20 text-[10px] font-black text-blue-800 transition-all shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-blue-500/25 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask AI Copilot for optimal route advice..."
              className="flex-1 bg-white border border-blue-500/25 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || isTyping}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white disabled:opacity-40 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
