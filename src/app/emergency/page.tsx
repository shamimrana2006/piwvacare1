"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, ChevronRight, X, Phone, Shield, Clock, Baby } from "lucide-react";
import { EMERGENCY_INFO, AGE_GROUPS } from "@/lib/data";
import { Footer } from "@/components/layout/Footer";

const emergencyTopics = [
  { title: "Breathing Difficulty", emoji: "🫁", color: "#EF4444", severity: "critical", signs: ["Blue or pale skin", "Rapid or labored breathing", "Nostrils flaring", "Retractions (skin pulling in around ribs)"], action: "Call emergency services IMMEDIATELY. Do not wait. Keep baby calm and upright if possible." },
  { title: "High Fever", emoji: "🌡️", color: "#F59E0B", severity: "warning", signs: ["Temperature above 38°C in newborns", "Above 39°C in older infants", "Stiff neck", "Rash with fever"], action: "For babies under 3 months: ANY fever is an emergency. Call doctor immediately. For older babies: use age-appropriate fever reducer, monitor closely." },
  { title: "Seizures", emoji: "⚡", color: "#EF4444", severity: "critical", signs: ["Uncontrolled shaking or jerking", "Body stiffening", "Eyes rolling back", "Temporary loss of consciousness"], action: "Call emergency services immediately. Do NOT restrain the baby. Place on a flat, safe surface. Turn on their side to prevent choking." },
  { title: "Severe Allergic Reaction", emoji: "⚠️", color: "#EF4444", severity: "critical", signs: ["Swelling of face, lips, throat", "Difficulty swallowing", "Hives or rash spreading rapidly", "Vomiting with breathing issues"], action: "Call emergency services immediately. If prescribed, use epinephrine auto-injector. Keep baby still and calm." },
  { title: "Dehydration", emoji: "💧", color: "#F59E0B", severity: "warning", signs: ["No wet diapers for 6+ hours", "Sunken soft spot (fontanelle)", "No tears when crying", "Dry mouth and eyes"], action: "Offer breast milk or formula frequently. Seek immediate medical care if symptoms are severe." },
  { title: "Choking", emoji: "🚨", color: "#EF4444", severity: "critical", signs: ["Cannot cry or make sound", "Cannot breathe", "Face turning red then blue", "Weak, ineffective cough"], action: "For infants: 5 back blows + 5 chest thrusts. For toddlers: Heimlich maneuver. Call emergency while performing rescue." },
];

const detailedInfo: Record<string, {
  whatIsIt: string;
  whyHappens: string;
  symptoms: string[];
  whatToDo: string[];
  whatToAvoid: string[];
  whenMedical: string;
  additional: string;
}> = {
  ei1: {
    whatIsIt: "Newborns sleep 16–18 hours per day in short 2–4 hour stretches. Safe sleep practices are critical for preventing Sudden Infant Death Syndrome (SIDS).",
    whyHappens: "Babies have underdeveloped sleep cycles and need frequent feeding. Their nervous systems require constant stimulation to regulate breathing.",
    symptoms: ["Sleeping for more than 4 hours without feeding (in first weeks)", "Difficulty waking for feeds", "Unusual quietness"],
    whatToDo: ["Always place baby on their BACK to sleep", "Use a firm, flat sleep surface", "Keep the sleep area free of soft objects", "Maintain room temperature at 68–72°F (20–22°C)", "Consider room-sharing (not bed-sharing) for first 6 months"],
    whatToAvoid: ["Never use soft bedding, pillows, or bumpers", "Avoid overheating", "Never leave baby unattended on adult beds or sofas", "Avoid smoke exposure"],
    whenMedical: "If baby sleeps more than 5 hours without feeding in the first month, has difficulty breathing during sleep, or shows color changes.",
    additional: "The AAP recommends offering a pacifier at nap and bedtime after breastfeeding is established.",
  },
};

function InfoCardModal({ info, onClose }: { info: (typeof EMERGENCY_INFO)["0-3"][0]; onClose: () => void }) {
  const detail = detailedInfo[info.id];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between p-5 border-b border-gray-100 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{info.icon}</span>
            <div>
              <h3 className="font-bold text-gray-800">{info.title}</h3>
              <span className="text-xs text-gray-400 bg-piwva-warm px-2 py-0.5 rounded-full">{info.category}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {detail ? (
            <>
              <Section title="What is it?" content={detail.whatIsIt} />
              <Section title="Why does it happen?" content={detail.whyHappens} />
              <ListSection title="✅ What Parents Should Do" items={detail.whatToDo} color="green" />
              <ListSection title="❌ What Parents Should Avoid" items={detail.whatToAvoid} color="red" />
              <div className="emergency-card emergency-warning">
                <h4 className="font-bold text-amber-800 mb-2">🏥 When to Seek Medical Help</h4>
                <p className="text-sm text-amber-700">{detail.whenMedical}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
                <p className="font-semibold mb-1">💡 Additional Note</p>
                <p>{detail.additional}</p>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">Detailed information coming soon. Please consult your pediatrician for personalized guidance.</p>
          )}

          <div className="bg-piwva-warm rounded-xl p-4 text-xs text-gray-500 border border-piwva-beige">
            ⚕️ <strong>Disclaimer:</strong> This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="font-bold text-gray-800 mb-1.5 text-sm">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
}

function ListSection({ title, items, color }: { title: string; items: string[]; color: "green" | "red" }) {
  return (
    <div>
      <h4 className={`font-bold mb-2 text-sm ${color === "green" ? "text-green-800" : "text-red-800"}`}>{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className={`mt-0.5 flex-shrink-0 ${color === "green" ? "text-green-500" : "text-red-500"}`}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EmergencyPage() {
  const [selectedAge, setSelectedAge] = useState("0-3");
  const [selectedCard, setSelectedCard] = useState<(typeof EMERGENCY_INFO)["0-3"][0] | null>(null);

  const infoCards = EMERGENCY_INFO[selectedAge as keyof typeof EMERGENCY_INFO] || EMERGENCY_INFO["0-3"];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-red-50/60 via-piwva-warm to-transparent py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Shield size={20} className="text-red-500" />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-display font-bold text-gray-800"
              >
                Emergency Baby Care Guide
              </motion.h1>
              <p className="text-sm text-gray-500">Age-based information, medical awareness & emergency guidance</p>
            </div>
          </div>

          {/* Emergency Notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 flex items-center gap-3 p-4 rounded-2xl bg-red-50 border-2 border-red-200"
          >
            <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-700">In a Life-Threatening Emergency</p>
              <p className="text-xs text-red-600 mt-0.5">Call your local emergency number immediately. Do NOT wait for AI or website responses.</p>
            </div>
            <a href="tel:999" className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors flex-shrink-0">
              <Phone size={14} />
              Call 999
            </a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Age Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Baby size={20} className="text-piwva-sage" />
            Select Your Baby's Age Group
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {AGE_GROUPS.map((ag) => (
              <motion.button
                key={ag.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedAge(ag.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all ${
                  selectedAge === ag.id
                    ? "bg-piwva-sage border-piwva-sage text-white shadow-lg shadow-piwva-sage/30"
                    : "bg-white border-piwva-beige text-gray-600 hover:border-piwva-sage/50"
                }`}
              >
                <span className="text-2xl">{ag.emoji}</span>
                <span className="text-xs font-bold leading-tight text-center">{ag.label}</span>
                <span className={`text-[10px] ${selectedAge === ag.id ? "text-white/80" : "text-gray-400"}`}>{ag.desc}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-800">
              Care Guide for <span className="text-piwva-sage">{AGE_GROUPS.find((a) => a.id === selectedAge)?.label}</span>
            </h2>
            <span className="text-sm text-gray-400">{infoCards.length} topics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="info-card cursor-pointer"
                onClick={() => setSelectedCard(card)}
              >
                <div className="info-card-glow" />
                <div
                  className="info-card-icon w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: card.color + "25" }}
                >
                  {card.icon}
                </div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{card.category}</span>
                <h3 className="font-bold text-gray-800 mt-1 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{card.shortDesc}</p>
                <div className="flex items-center gap-1 text-piwva-sage text-xs font-semibold">
                  Read More <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency Topics */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" />
            Emergency Situations – What to Do
          </h2>
          <p className="text-sm text-gray-500 mb-5">Recognize warning signs and take immediate action</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyTopics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`emergency-card ${topic.severity === "critical" ? "emergency-critical" : "emergency-warning"}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{topic.emoji}</span>
                  <div>
                    <h3 className={`font-bold ${topic.severity === "critical" ? "text-red-800" : "text-amber-800"}`}>{topic.title}</h3>
                    <span className={`text-xs font-semibold uppercase ${topic.severity === "critical" ? "text-red-500" : "text-amber-500"}`}>
                      {topic.severity === "critical" ? "⚡ Critical" : "⚠️ Warning"}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-600 mb-1.5">Warning Signs:</p>
                  <ul className="space-y-1">
                    {topic.signs.slice(0, 3).map((sign, si) => (
                      <li key={si} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5">•</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-3 rounded-xl text-xs ${topic.severity === "critical" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                  <p className="font-bold mb-1">Immediate Action:</p>
                  <p>{topic.action}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-6 bg-gradient-to-r from-piwva-sage/15 to-piwva-blue/15 rounded-3xl border border-piwva-sage/30"
        >
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-xl mb-2">Need More Help?</h3>
              <p className="text-gray-600 text-sm">Our support team and AI assistant are here to provide personalized baby care guidance.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/ai-assistant" className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-piwva-sage text-white font-semibold text-sm hover:bg-piwva-green transition-colors">
                <Info size={16} />
                Ask AI Assistant
              </a>
              <a href="/contact" className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-piwva-beige text-gray-700 font-semibold text-sm hover:border-piwva-sage">
                <Phone size={16} />
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <InfoCardModal info={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
