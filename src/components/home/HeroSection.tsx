"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, ShieldCheck, Sparkles, ArrowRight, Baby } from "lucide-react";

const stats = [
  { icon: Users, value: "50K+", label: "Parents" },
  { icon: Heart, value: "200K+", label: "Posts Shared" },
  { icon: ShieldCheck, value: "100%", label: "Safe Products" },
  { icon: Baby, value: "5K+", label: "Baby Guides" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background Blobs */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-piwva-sage/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-piwva-peach/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-piwva-beige/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-piwva-sage/15 border border-piwva-sage/30 text-piwva-sage text-sm font-medium mb-6"
          >
            <Sparkles size={14} />
            <span>Gentle, Natural, Thoughtful Baby Care</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gray-800 leading-tight mb-6"
          >
            Caring for Every{" "}
            <span className="gradient-text">Little Beginning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Join thousands of parents sharing experiences, discovering quality baby products,
            and accessing trusted age-based baby care guides — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/products"
              className="flex items-center gap-2 h-12 px-8 rounded-2xl bg-gradient-to-r from-piwva-sage to-piwva-green text-white font-semibold shadow-lg shadow-piwva-sage/30 hover:shadow-xl hover:shadow-piwva-sage/40 transition-all hover:scale-105"
            >
              Shop Baby Products
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/emergency"
              className="flex items-center gap-2 h-12 px-8 rounded-2xl bg-white border-2 border-piwva-beige text-gray-700 font-semibold hover:border-piwva-sage hover:text-piwva-sage transition-all hover:scale-105"
            >
              <ShieldCheck size={18} />
              Baby Care Guide
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex flex-col items-center gap-2 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-piwva-beige/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-piwva-sage/15 flex items-center justify-center">
                  <stat.icon size={20} className="text-piwva-sage" />
                </div>
                <span className="text-2xl font-bold text-gray-800 font-display">{stat.value}</span>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
