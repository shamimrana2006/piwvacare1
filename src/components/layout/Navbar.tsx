"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Bell, User, Menu, X, Search, ChevronDown, LogOut, Settings, Package, Baby, Sparkles } from "lucide-react";
import { useBag } from "@/context/BagContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/emergency", label: "Emergency Info" },
  { href: "/about", label: "About" },
];

const profileMenu = [
  { icon: User, label: "My Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Package, label: "My Orders", href: "/profile" },
  { icon: Baby, label: "My Baby", href: "/settings" },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalCount, openBag } = useBag();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-piwva-beige/60"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                <Image
                  src="/logo/piwva.jpeg"
                  alt="Piwva"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-display font-bold text-xl gradient-text hidden sm:block">
                Piwva
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-piwva-sage/15 text-piwva-sage font-semibold"
                      : "text-gray-600 hover:bg-piwva-sage/10 hover:text-piwva-sage"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, posts..."
                      className="w-full h-9 px-4 rounded-xl bg-piwva-warm border border-piwva-beige text-sm outline-none focus:border-piwva-sage transition-colors"
                      onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setSearchOpen((o) => !o)}
                className="hidden md:flex w-9 h-9 rounded-xl items-center justify-center text-gray-500 hover:bg-piwva-warm hover:text-piwva-sage transition-all"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* AI Assistant */}
              <Link
                href="/ai-assistant"
                className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-gradient-to-r from-piwva-sage to-piwva-green text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all hover:scale-105"
              >
                <Sparkles size={14} />
                <span>AI</span>
              </Link>

              {/* Notifications */}
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-piwva-warm hover:text-piwva-sage transition-all">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-piwva-peach rounded-full" />
              </button>

              {/* Shopping Bag */}
              <button
                onClick={openBag}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-piwva-warm hover:text-piwva-sage transition-all"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={18} />
                {totalCount > 0 && (
                  <motion.span
                    key={totalCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-piwva-peach text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </button>

              {/* Profile */}
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2 h-9 px-2 rounded-xl hover:bg-piwva-warm transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-piwva-sage to-piwva-green flex items-center justify-center">
                    <User size={15} className="text-white" />
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-piwva-beige/60 overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b border-piwva-beige/50">
                        <p className="text-sm font-semibold text-gray-800">Welcome back!</p>
                        <p className="text-xs text-gray-400">parent@piwva.com</p>
                      </div>
                      {profileMenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-piwva-warm hover:text-piwva-sage transition-colors"
                        >
                          <item.icon size={16} />
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-piwva-beige/50 mt-2 pt-2">
                        <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:bg-piwva-warm transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mobile-menu pt-20"
          >
            {/* Mobile Search */}
            <div className="relative mb-6">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, posts..."
                className="w-full h-11 pl-9 pr-4 rounded-xl bg-piwva-warm border border-piwva-beige text-sm outline-none focus:border-piwva-sage"
              />
            </div>

            {/* Mobile Nav */}
            <nav className="space-y-1 mb-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-piwva-sage/15 text-piwva-sage"
                        : "text-gray-600 hover:bg-piwva-warm"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-piwva-beige/50 pt-4 space-y-1">
              {profileMenu.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + i) * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-piwva-warm"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 w-full">
                <LogOut size={18} />
                Logout
              </button>
            </div>

            {/* AI Assistant Mobile */}
            <div className="mt-6">
              <Link
                href="/ai-assistant"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-gradient-to-r from-piwva-sage to-piwva-green text-white font-semibold shadow-md"
              >
                <Sparkles size={18} />
                AI Baby Care Assistant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
