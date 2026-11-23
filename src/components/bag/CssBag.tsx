"use client";
import React from "react";
import { motion } from "framer-motion";

interface CssBagProps {
  size?: "sm" | "md" | "lg";
  isOpen?: boolean;
  isShaking?: boolean;
  className?: string;
  badgeCount?: number;
}

export function CssBag({
  size = "sm",
  isOpen = false,
  isShaking = false,
  className = "",
  badgeCount,
}: CssBagProps) {
  // Dimension scales
  const dimensions = {
    sm: { width: 56, height: 60, handleH: 22, bodyH: 38, radius: 10, font: "text-[9px]" },
    md: { width: 110, height: 120, handleH: 42, bodyH: 78, radius: 18, font: "text-xs" },
    lg: { width: 240, height: 260, handleH: 88, bodyH: 172, radius: 32, font: "text-base" },
  }[size];

  const { width, height, handleH, bodyH, radius } = dimensions;

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center ${isShaking ? "animate-bag-shake" : ""} ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* 3D Drop Shadow underneath bag */}
      <motion.div
        animate={{
          scaleX: isOpen ? 1.25 : 1,
          opacity: isOpen ? 0.35 : 0.22,
          y: isOpen ? 4 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-2 rounded-full blur-md bg-stone-900 pointer-events-none"
        style={{
          width: `${width * 0.82}px`,
          height: `${Math.max(6, width * 0.14)}px`,
        }}
      />

      {/* SVG Canvas Bag */}
      <svg
        viewBox="0 0 240 260"
        className="w-full h-full overflow-visible drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Body Canvas Gradient */}
          <linearGradient id="piwvaBagBodyGrad" x1="20" y1="70" x2="220" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8FAFA0" />
            <stop offset="35%" stopColor="#7B9E87" />
            <stop offset="70%" stopColor="#688E75" />
            <stop offset="100%" stopColor="#557B62" />
          </linearGradient>

          {/* Leather Straps Gradient */}
          <linearGradient id="piwvaLeatherGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4A77C" />
            <stop offset="40%" stopColor="#B38054" />
            <stop offset="100%" stopColor="#7A5230" />
          </linearGradient>

          {/* Bag Interior Cavity Gradient (Depth) */}
          <linearGradient id="piwvaBagInterior" x1="120" y1="50" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#251A13" />
            <stop offset="40%" stopColor="#3E2B20" />
            <stop offset="100%" stopColor="#5E4332" />
          </linearGradient>

          {/* Metallic Brass Studs */}
          <radialGradient id="piwvaBrass" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="45%" stopColor="#E5B869" />
            <stop offset="100%" stopColor="#8A6318" />
          </radialGradient>

          {/* Gold Badge Gradient */}
          <linearGradient id="piwvaGoldBadge" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="50%" stopColor="#E6C280" />
            <stop offset="100%" stopColor="#B88A3E" />
          </linearGradient>

          {/* Canvas Fabric Pattern / Stripes */}
          <pattern id="piwvaFabricWeave" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 4h8 M4 0v8" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>

          {/* Clip path for interior product drop */}
          <clipPath id="piwvaBagInteriorClip">
            <ellipse cx="120" cy="78" rx="88" ry="34" />
          </clipPath>
        </defs>

        {/* ================= BACK HANDLE ================= */}
        <motion.path
          d="M 80 82 C 80 10, 160 10, 160 82"
          stroke="url(#piwvaLeatherGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: isOpen
              ? "M 74 82 C 74 -2, 166 -2, 166 82"
              : "M 80 82 C 80 14, 160 14, 160 82",
            strokeWidth: isOpen ? 12 : 11,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        {/* Back handle stitching */}
        <motion.path
          d="M 80 82 C 80 14, 160 14, 160 82"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* ================= BAG INTERIOR CAVITY (VISIBLE WHEN OPEN) ================= */}
        <motion.ellipse
          cx="120"
          cy="78"
          rx="90"
          ry="32"
          fill="url(#piwvaBagInterior)"
          animate={{
            ry: isOpen ? 36 : 8,
            opacity: isOpen ? 1 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
        />
        {/* Interior rim highlight */}
        <motion.ellipse
          cx="120"
          cy="78"
          rx="89"
          ry="31"
          stroke="#CBB39C"
          strokeWidth="2.5"
          strokeOpacity="0.4"
          fill="none"
          animate={{ ry: isOpen ? 35 : 7 }}
        />

        {/* ================= MAIN TOTE BAG BODY ================= */}
        {/* Natural tote trapezoid with curved bottom corners */}
        <path
          d="M 28 80 
             Q 24 165, 34 220 
             Q 38 245, 68 248 
             L 172 248 
             Q 202 245, 206 220 
             Q 216 165, 212 80 
             Q 120 90, 28 80 Z"
          fill="url(#piwvaBagBodyGrad)"
          filter="drop-shadow(0 6px 12px rgba(0,0,0,0.12))"
        />

        {/* Canvas Texture Overlay */}
        <path
          d="M 28 80 Q 24 165, 34 220 Q 38 245, 68 248 L 172 248 Q 202 245, 206 220 Q 216 165, 212 80 Z"
          fill="url(#piwvaFabricWeave)"
        />

        {/* Side Pleat / Fold Shadows (gives 3D depth) */}
        <path
          d="M 28 80 Q 30 160, 38 230 Q 50 160, 56 83 Z"
          fill="rgba(0,0,0,0.08)"
        />
        <path
          d="M 212 80 Q 210 160, 202 230 Q 190 160, 184 83 Z"
          fill="rgba(0,0,0,0.12)"
        />

        {/* Artisan Edge Stitching (Dashed Lines) */}
        <path
          d="M 38 88 
             Q 34 165, 42 216 
             Q 45 238, 70 240 
             L 170 240 
             Q 195 238, 198 216 
             Q 206 165, 202 88"
          stroke="#E9DFD3"
          strokeWidth="1.8"
          strokeDasharray="4 4"
          fill="none"
          strokeOpacity="0.75"
        />

        {/* Vertical Leather Accent Straps running down body */}
        {/* Left Strap */}
        <path d="M 76 78 L 76 247 L 88 247 L 88 78 Z" fill="url(#piwvaLeatherGrad)" />
        <path d="M 78 80 L 78 245 M 86 80 L 86 245" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Right Strap */}
        <path d="M 152 78 L 152 247 L 164 247 L 164 78 Z" fill="url(#piwvaLeatherGrad)" />
        <path d="M 154 80 L 154 245 M 162 80 L 162 245" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Center Patch Pocket */}
        <path
          d="M 92 125 
             L 148 125 
             Q 152 125, 152 130 
             L 148 185 
             Q 146 195, 136 198 
             L 104 198 
             Q 94 195, 92 185 
             L 88 130 
             Q 88 125, 92 125 Z"
          fill="#6E927A"
          stroke="#557B62"
          strokeWidth="2"
        />
        {/* Pocket stitch */}
        <path
          d="M 94 130 L 146 130 L 142 185 Q 140 193, 132 195 L 108 195 Q 100 193, 98 185 Z"
          stroke="#FDF8F0"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.8"
          fill="none"
        />

        {/* PIWVA Embossed Golden Leather Badge */}
        <rect
          x="97"
          y="142"
          width="46"
          height="28"
          rx="7"
          fill="url(#piwvaGoldBadge)"
          stroke="#8A6318"
          strokeWidth="1.2"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
        />
        <text
          x="120"
          y="157"
          fill="#4A3414"
          fontSize="9.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          PIWVA
        </text>
        {/* Cute Baby Footprint / Leaf Icon on Badge */}
        <circle cx="120" cy="164" r="1.8" fill="#7A5230" />
        <circle cx="117" cy="162" r="0.9" fill="#7A5230" />
        <circle cx="119" cy="161" r="0.9" fill="#7A5230" />
        <circle cx="121" cy="161" r="0.9" fill="#7A5230" />
        <circle cx="123" cy="162" r="0.9" fill="#7A5230" />

        {/* Leather Corner Guards at Bottom */}
        <path d="M 34 220 Q 38 245, 68 248 L 74 248 L 48 200 Z" fill="url(#piwvaLeatherGrad)" />
        <path d="M 206 220 Q 202 245, 172 248 L 166 248 L 192 200 Z" fill="url(#piwvaLeatherGrad)" />

        {/* ================= FRONT HANDLE ================= */}
        <motion.path
          d="M 82 82 C 82 22, 158 22, 158 82"
          stroke="url(#piwvaLeatherGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: isOpen
              ? "M 76 82 C 76 6, 164 6, 164 82"
              : "M 82 82 C 82 22, 158 22, 158 82",
            strokeWidth: isOpen ? 13 : 12,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        {/* Front handle stitching */}
        <motion.path
          d="M 82 82 C 82 22, 158 22, 158 82"
          stroke="#FFF2D6"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
          animate={{
            d: isOpen
              ? "M 76 82 C 76 6, 164 6, 164 82"
              : "M 82 82 C 82 22, 158 22, 158 82",
          }}
        />

        {/* Brass Rivets on Handles */}
        <circle cx="82" cy="80" r="4.2" fill="url(#piwvaBrass)" stroke="#6E4D14" strokeWidth="0.8" />
        <circle cx="158" cy="80" r="4.2" fill="url(#piwvaBrass)" stroke="#6E4D14" strokeWidth="0.8" />
        <circle cx="82" cy="100" r="3.2" fill="url(#piwvaBrass)" stroke="#6E4D14" strokeWidth="0.6" />
        <circle cx="158" cy="100" r="3.2" fill="url(#piwvaBrass)" stroke="#6E4D14" strokeWidth="0.6" />

        {/* Bag Top Rim Trim */}
        <motion.path
          d="M 28 80 Q 120 90, 212 80"
          stroke="#D4A77C"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: isOpen ? "M 28 80 Q 120 108, 212 80" : "M 28 80 Q 120 86, 212 80",
          }}
        />
      </svg>

      {/* Floating Badge Count for miniature state */}
      {typeof badgeCount === "number" && badgeCount > 0 && size === "sm" && (
        <motion.div
          key={badgeCount}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] bg-gradient-to-r from-piwva-peach to-orange-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center px-1.5 shadow-md border-2 border-white pointer-events-none"
        >
          {badgeCount > 99 ? "99+" : badgeCount}
        </motion.div>
      )}
    </div>
  );
}
