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
  Brain,
  History,
  FileText
} from 'lucide-react';

export const FloatingAIChat = () => {
  const { aiDrawerOpen, toggleAiDrawer } = useDecision();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your DecisionSphere AI Assistant. Ask me anything about scenario simulations, risk bounds, CapEx allocation, or strategic recommendations.",
      timestamp: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "Evaluate Hyderabad vs Bangalore expansion",
    "Simulate a $2.5M capital allocation scenario",
    "What are our top 3 risk factors this quarter?",
    "Calculate P95 confidence for regional R&D hub"
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
      let reply = "DecisionSphere AI model suggests allocating CapEx toward Tier-1 technology hubs with municipal tax subsidies, delivering 14.2-month payback and 96% P95 confidence.";
      if (query.toLowerCase().includes('hyderabad') || query.toLowerCase().includes('bangalore')) {
        reply = "Hyderabad provides 18% lower lease overhead and 34% higher ML engineering talent density compared to Bangalore Whitefield.\n\n### Strategic Comparison Matrix:\n| Metric | Hyderabad Hub | Bangalore Hub |\n| :--- | :--- | :--- |\n| CapEx Payback | 14.2 Months | 22.6 Months |\n| Lease Subsidy | 18% Tax Credit | Standard |\n| Confidence | 96.2% | 88.5% |";
      } else if (query.toLowerCase().includes('risk') || query.toLowerCase().includes('factor')) {
        reply = "Top strategic risk factor: Q3 LOI filing deadline for municipal tax exemptions. Executing LOI within 30 days reduces CapEx variance by 14%.";
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 96,
        sources: ['Monte Carlo Neural Simulator v4.2', 'APAC Real Estate Arbitrage Index']
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
          className={`fixed bottom-6 right-6 z-50 glass-panel rounded-3xl border border-[#6C63FF]/20 shadow-2xl overflow-hidden flex flex-col bg-white transition-all duration-300 ${
            isExpanded ? 'w-[640px] h-[720px]' : 'w-96 h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] p-0.5 shadow-md shadow-[#FF2DAA]/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#6C63FF]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-[#0F172A]">Decision AI Assistant</h4>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <p className="text-[10px] text-[#6C63FF] font-extrabold">AI Strategy Copilot v4.2 • Active</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#64748B]">
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="p-1.5 rounded-lg hover:text-[#6C63FF] hover:bg-slate-200 transition-colors cursor-pointer"
                title="Conversation History"
              >
                <History className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:text-[#6C63FF] hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => toggleAiDrawer(false)}
                className="p-1.5 rounded-lg hover:text-[#6C63FF] hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F8F7FC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-semibold leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white rounded-br-none shadow-md shadow-[#6C63FF]/20 font-bold'
                      : 'bg-white border border-slate-200 text-[#0F172A] rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  {msg.confidence && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#6C63FF] font-black">
                      <span>Confidence Score: {msg.confidence}%</span>
                      {msg.sources && <span>Models: {msg.sources.length}</span>}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-[#64748B] font-bold mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-black text-[#6C63FF] bg-white p-3 rounded-2xl border border-slate-200 w-fit shadow-sm">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#6C63FF]" />
                <span>Processing stochastic scenario bounds...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 border border-[#6C63FF]/20 text-[10px] font-black text-[#6C63FF] transition-all shrink-0 cursor-pointer"
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
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask AI Assistant for strategic recommendations..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#6C63FF]"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || isTyping}
              className="p-2 rounded-xl bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white disabled:opacity-40 hover:from-[#FF2DAA] hover:to-[#5B52E0] transition-all shadow-md shadow-[#6C63FF]/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
