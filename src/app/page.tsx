"use client";
import React from "react";
import { CommunityFeed } from "@/components/home/CommunityFeed";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="pt-16">
      <HeroSection />
      <CommunityFeed />
      <Footer />
    </div>
  );
}
