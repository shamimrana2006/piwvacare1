"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Baby, Lock, Bell, Eye, Globe, Trash2, Plus, Camera,
  ChevronRight, Save
} from "lucide-react";

// Social SVG Icons
const FbIcon = ({ size = 18, style }: { size?: number; style?: React.CSSProperties }) => <svg viewBox="0 0 24 24" width={size} height={size} style={style} className="fill-current"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.62 23.1 24 18.1 24 12.07z"/></svg>;
const IgIcon = ({ size = 18, style }: { size?: number; style?: React.CSSProperties }) => <svg viewBox="0 0 24 24" width={size} height={size} style={style} className="fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const LiIcon = ({ size = 18, style }: { size?: number; style?: React.CSSProperties }) => <svg viewBox="0 0 24 24" width={size} height={size} style={style} className="fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const TwIcon = ({ size = 18, style }: { size?: number; style?: React.CSSProperties }) => <svg viewBox="0 0 24 24" width={size} height={size} style={style} className="fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 5.886zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YtIcon = ({ size = 18, style }: { size?: number; style?: React.CSSProperties }) => <svg viewBox="0 0 24 24" width={size} height={size} style={style} className="fill-current"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
import { Footer } from "@/components/layout/Footer";

const settingsTabs = [
  { id: "account", label: "Account", icon: User },
  { id: "baby", label: "My Baby", icon: Baby },
  { id: "parent", label: "Parent Info", icon: User },
  { id: "social", label: "Social Links", icon: Globe },
  { id: "privacy", label: "Privacy", icon: Eye },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

const babies = [
  { id: "b1", name: "Ayaan", dob: "2026-08-15", gender: "Boy", age: "3 months", avatar: "👶" },
];

function InputField({ label, type = "text", value, onChange, placeholder }: {
  label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl border border-piwva-beige bg-white text-sm text-gray-700 outline-none focus:border-piwva-sage focus:ring-2 focus:ring-piwva-sage/15 transition-all"
      />
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${checked ? "bg-piwva-sage" : "bg-gray-200"}`}
    >
      <motion.div
        animate={{ x: checked ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Sarah Parent");
  const [email, setEmail] = useState("sarah@example.com");
  const [phone, setPhone] = useState("+880 170 000 0000");
  const [bio, setBio] = useState("Mom of 2 beautiful babies 👶🏻 Passionate about natural parenting.");
  const [location, setLocation] = useState("Dhaka, Bangladesh");

  const [notifications, setNotifications] = useState({
    community: true,
    comments: true,
    orders: true,
    products: false,
    reminders: true,
    alerts: true,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    publicPosts: true,
    allowComments: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account, baby info, and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-piwva-beige/60 overflow-hidden">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors border-b border-piwva-beige/40 last:border-0 ${
                    activeTab === tab.id
                      ? "bg-piwva-sage/10 text-piwva-sage font-semibold"
                      : "text-gray-600 hover:bg-piwva-warm"
                  }`}
                >
                  <tab.icon size={16} />
                  <span className="flex-1 text-left">{tab.label}</span>
                  <ChevronRight size={14} className={activeTab === tab.id ? "text-piwva-sage" : "text-gray-300"} />
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-piwva-beige/60 p-6"
              >
                {/* Account */}
                {activeTab === "account" && (
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg mb-6">Account Settings</h2>
                    <div className="flex items-center gap-4 mb-6 p-4 bg-piwva-warm rounded-2xl">
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-piwva-sage to-piwva-green flex items-center justify-center">
                        <User size={28} className="text-white" />
                        <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-white border-2 border-piwva-beige flex items-center justify-center hover:bg-piwva-sage hover:text-white transition-colors">
                          <Camera size={12} />
                        </button>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{name}</p>
                        <p className="text-sm text-gray-400">{email}</p>
                        <button className="text-xs text-piwva-sage font-medium mt-1 hover:underline">Change photo</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField label="Full Name" value={name} onChange={setName} />
                      <InputField label="Email Address" type="email" value={email} onChange={setEmail} />
                      <InputField label="Phone Number" type="tel" value={phone} onChange={setPhone} />
                      <InputField label="Location" value={location} onChange={setLocation} />
                    </div>
                    <div className="mt-5">
                      <label className="text-sm font-semibold text-gray-700">Bio</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="mt-1.5 w-full p-3 rounded-xl border border-piwva-beige bg-white text-sm outline-none focus:border-piwva-sage resize-none"
                      />
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <button
                        onClick={handleSave}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                          saved ? "bg-green-500 text-white" : "bg-piwva-sage text-white hover:bg-piwva-green"
                        }`}
                      >
                        <Save size={15} />
                        {saved ? "Saved!" : "Save Changes"}
                      </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-piwva-beige/50">
                      <h3 className="font-bold text-red-600 mb-3">Danger Zone</h3>
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">
                        <Trash2 size={15} />
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}

                {/* Baby Info */}
                {activeTab === "baby" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-bold text-gray-800 text-lg">My Baby Information</h2>
                      <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-piwva-sage/15 text-piwva-sage text-sm font-semibold hover:bg-piwva-sage hover:text-white transition-colors">
                        <Plus size={15} />
                        Add Baby
                      </button>
                    </div>

                    {babies.map((baby) => (
                      <div key={baby.id} className="p-5 bg-piwva-warm rounded-2xl border border-piwva-beige mb-5">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm">
                            {baby.avatar}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{baby.name}</h3>
                            <p className="text-sm text-gray-500">{baby.gender} · Age: {baby.age}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField label="Baby Name" value={baby.name} onChange={() => {}} />
                          <InputField label="Date of Birth" type="date" value={baby.dob} onChange={() => {}} />
                          <div>
                            <label className="text-sm font-semibold text-gray-700">Gender (Optional)</label>
                            <select className="mt-1.5 w-full h-11 px-4 rounded-xl border border-piwva-beige bg-white text-sm outline-none focus:border-piwva-sage">
                              <option>Boy</option>
                              <option>Girl</option>
                              <option>Prefer not to say</option>
                            </select>
                          </div>
                          <InputField label="Birth Weight (Optional)" value="" onChange={() => {}} placeholder="e.g. 3.2 kg" />
                          <InputField label="Current Weight (Optional)" value="" onChange={() => {}} placeholder="e.g. 6.5 kg" />
                        </div>
                        <div className="mt-4">
                          <label className="text-sm font-semibold text-gray-700">Allergies (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. Lactose, Peanuts"
                            className="mt-1.5 w-full h-11 px-4 rounded-xl border border-piwva-beige bg-white text-sm outline-none focus:border-piwva-sage"
                          />
                        </div>
                        <div className="mt-4">
                          <label className="text-sm font-semibold text-gray-700">Additional Notes</label>
                          <textarea rows={2} className="mt-1.5 w-full p-3 rounded-xl border border-piwva-beige bg-white text-sm outline-none focus:border-piwva-sage resize-none" />
                        </div>
                      </div>
                    ))}

                    <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? "bg-green-500 text-white" : "bg-piwva-sage text-white hover:bg-piwva-green"}`}>
                      <Save size={15} />
                      {saved ? "Saved!" : "Save Baby Information"}
                    </button>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === "notifications" && (
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, val]) => {
                        const labels: Record<string, { title: string; desc: string }> = {
                          community: { title: "Community Notifications", desc: "New posts, reactions, mentions" },
                          comments: { title: "Comment Notifications", desc: "Replies to your posts and comments" },
                          orders: { title: "Order Updates", desc: "Shipping, delivery, and order status" },
                          products: { title: "Product Updates", desc: "New arrivals and price changes" },
                          reminders: { title: "Baby Care Reminders", desc: "Vaccination, milestone alerts" },
                          alerts: { title: "Important Alerts", desc: "Safety recalls and critical updates" },
                        };
                        const info = labels[key];
                        return (
                          <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-piwva-beige/60 hover:bg-piwva-warm/50 transition-colors">
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{info.title}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{info.desc}</p>
                            </div>
                            <ToggleSwitch
                              checked={val}
                              onChange={(v) => setNotifications((prev) => ({ ...prev, [key]: v }))}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Privacy */}
                {activeTab === "privacy" && (
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg mb-6">Privacy Settings</h2>
                    <div className="space-y-4">
                      {Object.entries(privacy).map(([key, val]) => {
                        const labels: Record<string, { title: string; desc: string }> = {
                          publicProfile: { title: "Public Profile", desc: "Anyone can view your profile" },
                          publicPosts: { title: "Public Posts", desc: "Anyone can see your posts" },
                          allowComments: { title: "Allow Comments", desc: "Others can comment on your posts" },
                        };
                        const info = labels[key];
                        return (
                          <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-piwva-beige/60">
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{info.title}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{info.desc}</p>
                            </div>
                            <ToggleSwitch checked={val} onChange={(v) => setPrivacy((prev) => ({ ...prev, [key]: v }))} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Social */}
                {activeTab === "social" && (
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg mb-6">Social Media Links</h2>
                    <div className="space-y-4">
                      {[
                        { icon: FbIcon, label: "Facebook", placeholder: "https://facebook.com/yourprofile", color: "#1877F2" },
                        { icon: IgIcon, label: "Instagram", placeholder: "https://instagram.com/yourprofile", color: "#E4405F" },
                        { icon: LiIcon, label: "LinkedIn", placeholder: "https://linkedin.com/in/yourprofile", color: "#0A66C2" },
                        { icon: TwIcon, label: "X / Twitter", placeholder: "https://x.com/yourprofile", color: "#000" },
                        { icon: YtIcon, label: "YouTube", placeholder: "https://youtube.com/@yourchannel", color: "#FF0000" },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.color + "15" }}>
                            <s.icon size={18} style={{ color: s.color }} />
                          </div>
                          <input
                            type="url"
                            placeholder={s.placeholder}
                            className="flex-1 h-10 px-4 rounded-xl border border-piwva-beige bg-white text-sm outline-none focus:border-piwva-sage"
                          />
                        </div>
                      ))}
                    </div>
                    <button onClick={handleSave} className={`mt-6 flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? "bg-green-500 text-white" : "bg-piwva-sage text-white hover:bg-piwva-green"}`}>
                      <Save size={15} />
                      {saved ? "Saved!" : "Save Links"}
                    </button>
                  </div>
                )}

                {activeTab === "parent" && (
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg mb-6">Parent Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField label="Parent Name" value={name} onChange={setName} />
                      <InputField label="Email" type="email" value={email} onChange={setEmail} />
                      <InputField label="Phone Number" value={phone} onChange={setPhone} />
                      <InputField label="Location" value={location} onChange={setLocation} />
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Parent Role</label>
                        <select className="mt-1.5 w-full h-11 px-4 rounded-xl border border-piwva-beige bg-white text-sm outline-none focus:border-piwva-sage">
                          <option value="">Prefer not to say</option>
                          <option>Mother</option>
                          <option>Father</option>
                          <option>Guardian</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-5">
                      <label className="text-sm font-semibold text-gray-700">Short Bio</label>
                      <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1.5 w-full p-3 rounded-xl border border-piwva-beige bg-white text-sm outline-none focus:border-piwva-sage resize-none" />
                    </div>
                    <button onClick={handleSave} className={`mt-5 flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? "bg-green-500 text-white" : "bg-piwva-sage text-white hover:bg-piwva-green"}`}>
                      <Save size={15} />
                      {saved ? "Saved!" : "Save Changes"}
                    </button>
                  </div>
                )}

                {activeTab === "security" && (
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg mb-6">Security</h2>
                    <div className="space-y-4">
                      <InputField label="Current Password" type="password" value="" onChange={() => {}} placeholder="Enter current password" />
                      <InputField label="New Password" type="password" value="" onChange={() => {}} placeholder="Enter new password" />
                      <InputField label="Confirm New Password" type="password" value="" onChange={() => {}} placeholder="Confirm new password" />
                    </div>
                    <button className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-piwva-sage text-white font-semibold text-sm hover:bg-piwva-green transition-colors">
                      <Lock size={15} />
                      Update Password
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
