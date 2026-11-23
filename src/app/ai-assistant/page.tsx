"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Baby, AlertTriangle, Info, ChevronRight } from "lucide-react";
import { AGE_GROUPS } from "@/lib/data";
import { Footer } from "@/components/layout/Footer";

interface Message {
  role: "user" | "ai";
  content: string;
  time: string;
  suggestions?: string[];
}

const starterQuestions = [
  "My baby is 4 months old. What should I expect?",
  "How often should a newborn feed?",
  "My baby won't sleep more than 2 hours",
  "When should I start solid foods?",
  "What are the signs of teething?",
  "How do I know if my baby is getting enough milk?",
];

const aiResponses: Record<string, { content: string; suggestions: string[] }> = {
  default: {
    content: "Thank you for your question! I'm Piwva AI, your baby care assistant. I can help you with questions about baby feeding, sleep, development, hygiene, and general care. \n\n**Please remember:** I provide general educational information based on medical guidelines. Always consult your pediatrician for personalized medical advice, diagnosis, or treatment. In emergencies, contact local emergency services immediately.",
    suggestions: ["Tell me about newborn feeding", "Sleep schedule for 3-month-old", "Baby development milestones", "Common baby health concerns"],
  },
  feeding: {
    content: "**Breastfeeding Guidelines (WHO 2024):**\n\n- Exclusive breastfeeding for the first **6 months**\n- Breastfeed on demand — typically every **2–3 hours** for newborns\n- Signs baby is getting enough: 6+ wet diapers/day, steady weight gain\n- Feed from both sides when possible\n\n**Formula Feeding:**\n- Follow formula preparation instructions carefully\n- Never dilute formula to 'save' formula\n- Sterilize bottles for newborns under 3 months\n\n⚕️ *This is educational information. Consult your pediatrician for personalized feeding guidance.*",
    suggestions: ["Signs of adequate milk intake", "When to introduce solids", "Breastfeeding positions", "Formula feeding tips"],
  },
  sleep: {
    content: "**Safe Sleep Guidelines (AAP):**\n\n- Always place baby on their **BACK** to sleep — never on stomach or side\n- Use a **firm, flat** sleep surface (crib, bassinet with AAP-approved mattress)\n- **Room-share** but NOT bed-share for first 6 months\n- Keep sleep area **free of soft bedding** (blankets, pillows, bumpers)\n- Maintain room temperature at **68–72°F (20–22°C)**\n- Offer a **pacifier** at naptime/bedtime after breastfeeding is established\n\n🚨 *If your baby shows unusual breathing patterns, stops breathing, or turns blue — call emergency services immediately.*",
    suggestions: ["Sleep schedule by age", "Sleep training methods", "Dealing with night wakings", "Safe sleep environment checklist"],
  },
};

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-piwva-sage to-piwva-green flex items-center justify-center flex-shrink-0">
        <Sparkles size={14} className="text-white" />
      </div>
      <div className="bg-white border border-piwva-beige/60 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [-3, 0, -3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              className="w-2 h-2 rounded-full bg-piwva-sage"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantPage() {
  const [selectedAge, setSelectedAge] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "👋 Hi! I'm **Piwva AI**, your baby care assistant. I'm here to provide educational guidance on baby care, development, feeding, sleep, and more.\n\n**Please select your baby's age** to get personalized information, or ask me any baby care question!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestions: ["Tell me about newborn care", "Feeding guidelines", "Sleep safety tips", "Development milestones"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let response = aiResponses.default;
      if (lower.includes("feed") || lower.includes("milk") || lower.includes("breast") || lower.includes("formula")) {
        response = aiResponses.feeding;
      } else if (lower.includes("sleep") || lower.includes("night") || lower.includes("wak")) {
        response = aiResponses.sleep;
      }

      const aiMsg: Message = {
        role: "ai",
        content: response.content,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-piwva-sage to-piwva-green flex items-center justify-center shadow-lg shadow-piwva-sage/30">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AI Baby Care Assistant</h1>
            <p className="text-gray-500 text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Online · Educational guidance only
            </p>
          </div>
        </div>

        {/* Age Selection */}
        <div className="mb-5 p-4 bg-white rounded-2xl border border-piwva-beige/60">
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Baby size={16} className="text-piwva-sage" />
            Select your baby's age for personalized guidance:
          </p>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map((ag) => (
              <button
                key={ag.id}
                onClick={() => { setSelectedAge(ag.id); sendMessage(`My baby is ${ag.label}. Tell me about care at this age.`); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedAge === ag.id
                    ? "bg-piwva-sage text-white border-piwva-sage"
                    : "bg-white text-gray-600 border-piwva-beige hover:border-piwva-sage"
                }`}
              >
                {ag.emoji} {ag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl mb-5">
          <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-600">
            <strong>Emergency:</strong> If your baby shows signs of a medical emergency, call local emergency services immediately. Do not rely on AI responses.
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-2xl border border-piwva-beige/60 overflow-hidden flex flex-col" style={{ minHeight: "500px" }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 mb-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-piwva-sage to-piwva-green flex items-center justify-center flex-shrink-0">
                    <Sparkles size={14} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === "user" ? "" : ""}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-piwva-sage text-white rounded-br-sm"
                        : "bg-piwva-warm border border-piwva-beige/60 text-gray-700 rounded-bl-sm"
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                  />
                  <p className={`text-xs text-gray-400 mt-1 ${msg.role === "user" ? "text-right" : ""}`}>{msg.time}</p>

                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-piwva-sage/30 text-xs text-piwva-sage font-medium hover:bg-piwva-sage hover:text-white transition-colors"
                        >
                          {s}
                          <ChevronRight size={12} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-5 py-3 border-t border-piwva-beige/40">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {starterQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-piwva-warm border border-piwva-beige text-xs text-gray-600 hover:border-piwva-sage hover:text-piwva-sage transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-piwva-beige/40">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) sendMessage(input); }}
                placeholder="Ask about baby care, feeding, sleep, development..."
                className="flex-1 h-11 px-4 rounded-xl bg-piwva-warm border border-piwva-beige text-sm outline-none focus:border-piwva-sage"
                disabled={isTyping}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 rounded-xl bg-piwva-sage text-white flex items-center justify-center hover:bg-piwva-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </motion.button>
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <Info size={11} />
              AI responses are for educational purposes only. Not a substitute for medical advice.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
