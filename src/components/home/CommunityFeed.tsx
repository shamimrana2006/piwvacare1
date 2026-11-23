"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Heart, MessageCircle, Share2, Bookmark, Flag, MoreHorizontal,
  Plus, Image as ImageIcon, Video, Tag, ChevronDown, BadgeCheck,
  Sparkles, Filter, TrendingUp, Clock, Flame
} from "lucide-react";
import { COMMUNITY_POSTS, POST_CATEGORIES } from "@/lib/data";

const sourceFilters = ["All Posts", "Parents / Public", "Piwva Authority", "Verified Experts"];
const categoryFilters = ["All", "Health", "Food", "Sleep", "Skin Care", "Development", "General"];
const sortFilters = [
  { label: "Latest", icon: Clock },
  { label: "Popular", icon: TrendingUp },
  { label: "Trending", icon: Flame },
];

function PostCard({ post, index }: { post: (typeof COMMUNITY_POSTS)[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked((l) => !l);
    setLikeCount((c) => liked ? c - 1 : c + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="post-card"
    >
      {/* Post Header */}
      <div className="flex items-start justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-piwva-beige ring-offset-1">
            <Image src={post.user.avatar} alt={post.user.name} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 text-sm">{post.user.name}</span>
              {post.isVerified && (
                <span className={`verified-badge ${post.verifiedType === "authority" ? "verified-authority" : "verified-expert"}`}>
                  <BadgeCheck size={10} />
                  {post.verifiedType === "authority" ? "Authority" : "Expert"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400">{post.timestamp}</span>
              {post.babyAge && (
                <>
                  <span className="text-gray-200">•</span>
                  <span className="text-xs text-piwva-sage font-medium">Baby: {post.babyAge}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs px-2 py-1 rounded-full bg-piwva-warm text-piwva-brown font-medium">
            {post.category}
          </span>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-piwva-warm">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-700 text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="relative mx-4 mb-3 rounded-xl overflow-hidden">
          <Image
            src={post.images[0]}
            alt="Post image"
            width={400}
            height={240}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-piwva-sage bg-piwva-sage/10 px-2.5 py-1 rounded-full cursor-pointer hover:bg-piwva-sage/20 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-piwva-beige/40 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
              liked ? "bg-red-50 text-red-500" : "text-gray-500 hover:bg-piwva-warm"
            }`}
          >
            <Heart size={16} className={liked ? "fill-red-500 text-red-500" : ""} />
            <span>{likeCount}</span>
          </motion.button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-piwva-warm transition-colors">
            <MessageCircle size={16} />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-piwva-warm transition-colors">
            <Share2 size={16} />
            <span>{post.shares}</span>
          </button>
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setSaved((s) => !s)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-colors ${
            saved ? "text-piwva-sage bg-piwva-sage/10" : "text-gray-400 hover:bg-piwva-warm"
          }`}
        >
          <Bookmark size={16} className={saved ? "fill-piwva-sage" : ""} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function CreatePostBox() {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-piwva-beige/60 overflow-hidden mb-5 shadow-sm"
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-piwva-sage to-piwva-green flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <button
            onClick={() => setExpanded(true)}
            className="flex-1 h-10 px-4 rounded-xl bg-piwva-warm border border-piwva-beige text-gray-400 text-sm text-left hover:border-piwva-sage/50 transition-colors"
          >
            Share your parenting experience...
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-3"
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Share your baby care experience..."
                className="w-full p-3 rounded-xl bg-piwva-warm border border-piwva-beige text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-piwva-sage resize-none"
                rows={3}
                autoFocus
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-piwva-warm border border-piwva-beige text-sm text-gray-600 outline-none focus:border-piwva-sage"
              >
                <option value="">Select Category</option>
                {POST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-piwva-sage bg-piwva-sage/10 hover:bg-piwva-sage/20 text-xs font-medium transition-colors">
                    <ImageIcon size={14} />
                    Photo
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-piwva-brown bg-piwva-brown/10 hover:bg-piwva-brown/20 text-xs font-medium transition-colors">
                    <Video size={14} />
                    Video
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-blue-500 bg-blue-50 hover:bg-blue-100 text-xs font-medium transition-colors">
                    <Tag size={14} />
                    Tags
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setExpanded(false)} className="px-4 py-2 rounded-xl text-sm text-gray-500 hover:bg-piwva-warm">
                    Cancel
                  </button>
                  <button className="px-5 py-2 rounded-xl bg-piwva-sage text-white text-sm font-semibold hover:bg-piwva-green transition-colors">
                    Post
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-piwva-beige/40">
            <button className="flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-xl text-gray-500 hover:bg-piwva-warm text-xs font-medium transition-colors">
              <ImageIcon size={14} className="text-piwva-sage" /> Photo
            </button>
            <button className="flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-xl text-gray-500 hover:bg-piwva-warm text-xs font-medium transition-colors">
              <Video size={14} className="text-piwva-brown" /> Video
            </button>
            <button className="flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-xl text-gray-500 hover:bg-piwva-warm text-xs font-medium transition-colors">
              <Tag size={14} className="text-blue-500" /> Tag
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function CommunityFeed() {
  const [activeSource, setActiveSource] = useState("All Posts");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Latest");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Feed */}
        <div className="flex-1 min-w-0">
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-piwva-sage/15 flex items-center justify-center">
              <Sparkles size={20} className="text-piwva-sage" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Community Feed</h2>
              <p className="text-sm text-gray-400">Share, learn, and connect with parents</p>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-5 space-y-3">
            {/* Source Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {sourceFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveSource(f)}
                  className={`filter-pill flex-shrink-0 ${activeSource === f ? "active" : ""}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Category + Sort */}
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
                {categoryFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveCategory(f)}
                    className={`filter-pill flex-shrink-0 text-xs ${activeCategory === f ? "active" : ""}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {sortFilters.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setActiveSort(s.label)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeSort === s.label
                        ? "bg-piwva-sage text-white"
                        : "text-gray-500 hover:bg-piwva-warm"
                    }`}
                  >
                    <s.icon size={12} />
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Create Post */}
          <CreatePostBox />

          {/* Posts */}
          <div className="space-y-0">
            {COMMUNITY_POSTS.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl border-2 border-piwva-beige text-piwva-brown font-semibold hover:border-piwva-sage hover:text-piwva-sage transition-all hover:scale-105">
              Load More Posts
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          {/* AI Assistant Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-piwva-sage to-piwva-green rounded-2xl p-5 text-white mb-4 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} />
              <span className="font-bold">AI Baby Assistant</span>
            </div>
            <p className="text-sm text-white/85 mb-4">Get personalized baby care guidance powered by AI.</p>
            <input
              type="text"
              placeholder="Ask anything about baby care..."
              className="w-full h-9 px-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-sm text-white placeholder:text-white/60 outline-none focus:bg-white/30 mb-3"
            />
            <button className="w-full h-9 rounded-xl bg-white text-piwva-sage font-semibold text-sm hover:bg-white/90 transition-colors">
              Ask AI Assistant
            </button>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-piwva-beige/60 p-4 mb-4"
          >
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-piwva-peach" />
              Trending Topics
            </h3>
            {["#tummytime", "#breastfeeding", "#solidfoods", "#teething", "#sleeptraining"].map((tag) => (
              <div key={tag} className="flex items-center justify-between py-2 border-b border-piwva-beige/30 last:border-0">
                <span className="text-sm text-piwva-sage font-medium cursor-pointer hover:text-piwva-green">{tag}</span>
                <span className="text-xs text-gray-400">{Math.floor(Math.random() * 500 + 100)} posts</span>
              </div>
            ))}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-piwva-beige/60 p-4"
          >
            <h3 className="font-bold text-gray-800 mb-3">Quick Access</h3>
            {[
              { emoji: "🛒", label: "Shop Baby Products", href: "/products" },
              { emoji: "🚨", label: "Emergency Guide", href: "/emergency" },
              { emoji: "👶", label: "Baby Milestones", href: "/emergency?age=0-3" },
              { emoji: "🤖", label: "AI Assistant", href: "/ai-assistant" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="flex items-center gap-3 py-2.5 text-sm text-gray-600 hover:text-piwva-sage transition-colors border-b border-piwva-beige/30 last:border-0">
                <span>{item.emoji}</span>
                {item.label}
              </a>
            ))}
          </motion.div>
        </aside>
      </div>
    </section>
  );
}
