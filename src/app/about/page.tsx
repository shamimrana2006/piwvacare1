"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Shield, Users, BookOpen, Sparkles, MessageSquare, Award, Target, Eye, ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

const values = [
  { icon: Shield, title: "Baby Safety First", desc: "Every product and piece of information is vetted for safety.", color: "#7B9E87" },
  { icon: Heart, title: "Trust & Transparency", desc: "We're honest about what we know and what we don't.", color: "#F4A88A" },
  { icon: Users, title: "Parent Empowerment", desc: "Giving parents the knowledge to make confident decisions.", color: "#A8C5D6" },
  { icon: Award, title: "Quality & Care", desc: "Curating only the best products for your little one.", color: "#E8D5B7" },
  { icon: BookOpen, title: "Continuous Learning", desc: "Staying updated with the latest pediatric research.", color: "#A8C5B0" },
];

const offerings = [
  { emoji: "🛒", title: "Quality Baby Products", desc: "Carefully curated, age-appropriate products from trusted brands." },
  { emoji: "👥", title: "Parenting Community", desc: "Connect with parents, share experiences, and learn together." },
  { emoji: "📋", title: "Age-Based Baby Guide", desc: "Personalized care information for every stage of development." },
  { emoji: "⚕️", title: "Medical Awareness", desc: "Evidence-based health information from reliable medical sources." },
  { emoji: "🤖", title: "AI Baby Care Assistant", desc: "24/7 personalized baby care guidance powered by AI." },
  { emoji: "💬", title: "Parent Support System", desc: "Direct access to our support team whenever you need help." },
];

const commitments = [
  "Providing only evidence-based, medically reviewed information",
  "Responsibly selecting safe, quality baby products",
  "Creating a supportive, judgment-free parenting community",
  "Offering 24/7 customer support",
  "Continuously improving based on parent feedback",
];

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 hero-gradient">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-piwva-sage blur-3xl" />
          <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-piwva-peach blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex h-12 w-40 relative mx-auto mb-6"
          >
            <Image src="/logo/piwva.png" alt="Piwva" fill className="object-contain" priority />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-5"
          >
            About <span className="gradient-text">Piwva</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            A complete digital baby care ecosystem — where community, commerce, and care come together.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-piwva-sage font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl font-display font-bold text-gray-800 mt-2 mb-6">How Piwva Began</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Piwva was born from a simple observation: new parents are overwhelmed. When a baby arrives, parents are flooded with conflicting advice, unreliable information, and an endless array of products — with no way to know what's safe or what actually works.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We set out to create something different. A platform where parents could find <strong>trusted, evidence-based guidance</strong>, connect with a <strong>supportive community</strong>, and discover <strong>quality baby products</strong> — all in one gentle, thoughtful space.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our inspiration came from the parents themselves — their fears, their questions, and their incredible love for their little ones. That's what drives everything we do at Piwva.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-piwva-sage/20 to-piwva-peach/20 rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">🍼</div>
                <p className="font-display font-bold text-2xl text-gray-800 italic mb-2">"Every child deserves the best start in life."</p>
                <p className="text-piwva-sage font-semibold">— The Piwva Team</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-piwva-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-piwva-sage font-semibold text-sm uppercase tracking-widest">Our Purpose</span>
            <h2 className="text-3xl font-display font-bold text-gray-800 mt-2">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-piwva-beige/60 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-piwva-sage/15 flex items-center justify-center mb-5">
                <Target size={28} className="text-piwva-sage" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To make reliable baby care information and quality products accessible to every parent — regardless of their background or experience level. We believe every parent deserves support, not judgment.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-piwva-beige/60 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-piwva-peach/25 flex items-center justify-center mb-5">
                <Eye size={28} className="text-piwva-peach" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To build the world's most trusted parenting community — a place where parents learn from each other, where babies thrive, and where every little beginning is celebrated and supported.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-piwva-sage font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl font-display font-bold text-gray-800 mt-2">Everything Parents Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-piwva-beige/60 hover:border-piwva-sage/40 hover:shadow-md transition-all"
              >
                <div className="text-3xl flex-shrink-0">{o.emoji}</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{o.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{o.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-piwva-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-piwva-sage font-semibold text-sm uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-3xl font-display font-bold text-gray-800 mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-piwva-beige/60 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: v.color + "25" }}>
                  <v.icon size={26} style={{ color: v.color }} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-piwva-sage font-semibold text-sm uppercase tracking-widest">Our Promise</span>
            <h2 className="text-3xl font-display font-bold text-gray-800 mt-2">Our Commitment to You</h2>
          </div>
          <div className="bg-gradient-to-br from-piwva-sage/10 to-piwva-peach/10 rounded-3xl p-8 border border-piwva-sage/20">
            <ul className="space-y-4">
              {commitments.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-piwva-sage/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-piwva-sage text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{c}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-5">👶</div>
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">
            Join the Piwva Community
          </h2>
          <p className="text-gray-500 mb-8">Start your journey with thousands of parents who trust Piwva for baby care.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="flex items-center justify-center gap-2 h-12 px-8 rounded-2xl bg-piwva-sage text-white font-semibold hover:bg-piwva-green transition-colors">
              <Users size={18} />
              Join Community
            </Link>
            <Link href="/products" className="flex items-center justify-center gap-2 h-12 px-8 rounded-2xl bg-white border-2 border-piwva-beige text-gray-700 font-semibold hover:border-piwva-sage">
              Shop Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
