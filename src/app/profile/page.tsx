"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  User, Camera, Edit2, Grid3X3, Heart, Bookmark, MessageCircle,
  Users, Package, Star, Calendar, MapPin, Link as LinkIcon
} from "lucide-react";
import { COMMUNITY_POSTS } from "@/lib/data";
import { Footer } from "@/components/layout/Footer";

const activityTabs = [
  { label: "Posts", icon: Grid3X3, count: 24 },
  { label: "Liked", icon: Heart, count: 156 },
  { label: "Saved", icon: Bookmark, count: 89 },
  { label: "Comments", icon: MessageCircle, count: 312 },
  { label: "Following", icon: Users, count: 67 },
  { label: "Orders", icon: Package, count: 8 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="pt-16 min-h-screen">
      {/* Cover */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-piwva-sage/40 via-piwva-beige to-piwva-peach/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <button className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 text-sm font-medium text-gray-700 hover:bg-white transition-colors">
          <Camera size={15} />
          Edit Cover
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Info */}
        <div className="relative -mt-16 mb-6 flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-piwva-warm flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-piwva-sage to-piwva-green flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>
            <button className="absolute bottom-2 right-2 w-8 h-8 rounded-xl bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors">
              <Camera size={14} className="text-gray-600" />
            </button>
          </div>

          <div className="flex-1 pb-2">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Sarah Parent</h1>
                <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
                  <MapPin size={13} />
                  Dhaka, Bangladesh
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                  <Calendar size={13} />
                  Joined November 2026
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-piwva-beige text-gray-700 font-medium text-sm hover:border-piwva-sage hover:text-piwva-sage transition-colors">
                <Edit2 size={15} />
                Edit Profile
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed max-w-lg">
              Mom of 2 beautiful babies 👶🏻 Passionate about natural parenting and evidence-based baby care. 🌿
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {activityTabs.map((tab) => (
            <motion.button
              key={tab.label}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.label)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${
                activeTab === tab.label
                  ? "border-piwva-sage bg-piwva-sage/10"
                  : "border-piwva-beige bg-white hover:border-piwva-sage/40"
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.label ? "text-piwva-sage" : "text-gray-400"} />
              <span className={`text-sm font-bold ${activeTab === tab.label ? "text-piwva-sage" : "text-gray-800"}`}>{tab.count}</span>
              <span className="text-xs text-gray-400">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="mb-10">
          {activeTab === "Posts" && (
            <div className="space-y-4">
              {COMMUNITY_POSTS.slice(0, 2).map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="post-card p-4"
                >
                  <p className="text-gray-700 text-sm">{post.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Heart size={14} /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={14} /> {post.comments}</span>
                    <span className="ml-auto text-xs">{post.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "Orders" && (
            <div className="space-y-3">
              {[
                { id: "#PW-001", product: "Organic Cotton Baby Onesie Set", status: "Delivered", date: "Nov 20", price: 999, color: "green" },
                { id: "#PW-002", product: "Natural Teething Toy Ring", status: "In Transit", date: "Nov 23", price: 449, color: "blue" },
                { id: "#PW-003", product: "Gentle Baby Shampoo & Wash", status: "Pending", date: "Nov 24", price: 450, color: "yellow" },
              ].map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-piwva-beige/60"
                >
                  <div className="w-12 h-12 rounded-xl bg-piwva-warm flex items-center justify-center">
                    <Package size={20} className="text-piwva-sage" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{order.product}</p>
                    <p className="text-xs text-gray-400">{order.id} · {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-sm">৳{order.price}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
                      order.color === "green" ? "bg-green-100 text-green-700" :
                      order.color === "blue" ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {["Liked", "Saved", "Comments", "Following"].includes(activeTab) && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">
                {activeTab === "Liked" ? "❤️" : activeTab === "Saved" ? "🔖" : activeTab === "Comments" ? "💬" : "👥"}
              </div>
              <p className="text-gray-500 font-medium">{activeTab} content will appear here</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
