import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDecision } from '../../contexts/DecisionContext';
import { apiService } from '../../services/api';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  RefreshCw,
  Zap,
  HelpCircle
} from 'lucide-react';

export const FloatingAIChat = () => {
  const { aiDrawerOpen, toggleAiDrawer } = useDecision();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Dr. Vance. I am your DecisionSphere AI Architect. Ask me anything about risk mitigation, market strategy, or ROI projection for your current decisions.",
      timestamp: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "Why is Hyderabad favored over Bangalore?",
    "Simulate a 15% budget reallocation",
    "What are the top 3 hidden risks in Q4?",
    "Generate Executive Summary SWOT"
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

    try {
      const res = await apiService.sendAIChatPrompt(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: res.data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: res.data.confidence,
        sources: res.data.sources
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "I experienced a minor latency spike in the Monte Carlo neural node. Please resend your query.",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {aiDrawerOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className={`fixed bottom-6 right-6 z-50 glass-panel rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            isExpanded ? 'w-[640px] h-[720px]' : 'w-96 h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-white/95 backdrop-blur-md border-b border-purple-500/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 p-0.5 shadow-md shadow-purple-500/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-slate-900">DecisionSphere Assistant</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10px] text-purple-700 font-extrabold">Monte Carlo Copilot v4.2 • Active</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-600">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => toggleAiDrawer(false)}
                className="p-1.5 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition-colors"
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
                      ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white rounded-br-none shadow-md shadow-purple-500/20'
                      : 'bg-white border border-purple-500/25 text-slate-900 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.confidence && (
                    <div className="mt-2 pt-2 border-t border-purple-500/20 flex items-center justify-between text-[10px] text-purple-700 font-black">
                      <span>Model Confidence: {msg.confidence}%</span>
                      {msg.sources && <span>Sources: {msg.sources.length}</span>}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 font-bold mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-black text-purple-700 bg-white p-3 rounded-2xl border border-purple-500/25 w-fit shadow-sm">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
                <span>Running multi-variance AI simulations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="p-2.5 bg-white border-t border-purple-500/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-500/20 text-[10px] font-black text-purple-800 transition-all shrink-0 cursor-pointer"
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
            className="p-3 bg-white border-t border-purple-500/25 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask AI Copilot for strategic advice..."
              className="flex-1 bg-white border border-purple-500/25 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || isTyping}
              className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white disabled:opacity-40 hover:from-pink-400 hover:to-purple-500 transition-all shadow-md shadow-purple-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
