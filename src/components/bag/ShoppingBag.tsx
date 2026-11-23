"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowRight, Sparkles, Heart } from "lucide-react";
import { useBag } from "@/context/BagContext";
import { CssBag } from "@/components/bag/CssBag";

export function ShoppingBag() {
  const {
    items,
    isOpen,
    totalCount,
    totalPrice,
    toggleBag,
    removeItem,
    updateQuantity,
    lastAdded,
    animatingData,
    clearAnimatingData,
  } = useBag();

  const dockRef = useRef<HTMLButtonElement>(null);
  const [isDockShaking, setIsDockShaking] = useState(false);
  const [animStage, setAnimStage] = useState<
    "idle" | "expanding" | "flying" | "entering" | "closing" | "returning"
  >("idle");

  const [dockPos, setDockPos] = useState({ x: 28, y: 700 });
  const [screenCenter, setScreenCenter] = useState({ x: 400, y: 400 });

  // Update positions for responsive animation coordinates
  useEffect(() => {
    const updatePositions = () => {
      if (typeof window !== "undefined") {
        setScreenCenter({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        });

        if (dockRef.current) {
          const r = dockRef.current.getBoundingClientRect();
          setDockPos({ x: r.left, y: r.top });
        } else {
          setDockPos({ x: 28, y: window.innerHeight - 90 });
        }
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  // Trigger shake on bottom-left docked bag
  useEffect(() => {
    if (lastAdded) {
      setIsDockShaking(true);
      const timer = setTimeout(() => setIsDockShaking(false), 700);
      return () => clearTimeout(timer);
    }
  }, [lastAdded]);

  // Master sequence when animatingData is triggered
  useEffect(() => {
    if (!animatingData) {
      setAnimStage("idle");
      return;
    }

    if (dockRef.current) {
      const r = dockRef.current.getBoundingClientRect();
      setDockPos({ x: r.left, y: r.top });
    }

    // Step 1: Bag expands from bottom-left to center and opens mouth
    setAnimStage("expanding");

    // Step 2: Product lifts from card and flies in arc towards bag
    const t1 = setTimeout(() => {
      setAnimStage("flying");
    }, 450);

    // Step 3: Product dives into bag cavity, sparkles burst, bag squishes
    const t2 = setTimeout(() => {
      setAnimStage("entering");
    }, 950);

    // Step 4: Bag snaps shut
    const t3 = setTimeout(() => {
      setAnimStage("closing");
    }, 1350);

    // Step 5: Bag shrinks and glides back to original bottom-left dock
    const t4 = setTimeout(() => {
      setAnimStage("returning");
    }, 1650);

    // Step 6: Sequence finished
    const t5 = setTimeout(() => {
      setAnimStage("idle");
      clearAnimatingData();
      setIsDockShaking(true);
      setTimeout(() => setIsDockShaking(false), 600);
    }, 2150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [animatingData, clearAnimatingData]);

  const origin = animatingData?.origin;
  const product = animatingData?.item;

  // Center coordinates for large bag (size: 240px x 260px)
  const targetBagX = screenCenter.x - 120;
  const targetBagY = screenCenter.y - 110;

  // Product arc path calculations
  const prodStartX = origin ? origin.x + origin.width / 2 - 36 : screenCenter.x - 36;
  const prodStartY = origin ? origin.y + origin.height / 2 - 36 : 140;
  const prodMidY = Math.min(prodStartY, targetBagY - 140) - 40;
  const prodTargetX = targetBagX + 120 - 36;
  const prodTargetY = targetBagY + 50 - 36; // inside the open cavity

  return (
    <>
      {/* ================= CINEMATIC EXPAND -> ENTER -> RETURN OVERLAY ================= */}
      <AnimatePresence>
        {animStage !== "idle" && product && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] pointer-events-none"
            style={{
              backgroundColor: "rgba(22, 28, 24, 0.45)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            {/* Click to skip background */}
            <div
              className="absolute inset-0 pointer-events-auto"
              onClick={() => {
                setAnimStage("idle");
                clearAnimatingData();
              }}
            />

            {/* 1. TRAVELING PRODUCT (ARCS FROM CLICKED CARD INTO BAG) */}
            <AnimatePresence>
              {(animStage === "flying" || animStage === "entering") && (
                <motion.div
                  initial={{
                    x: prodStartX,
                    y: prodStartY,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                  }}
                  animate={
                    animStage === "flying"
                      ? {
                          x: [prodStartX, (prodStartX + prodTargetX) / 2, prodTargetX],
                          y: [prodStartY, prodMidY, prodTargetY - 45],
                          scale: [1, 1.15, 0.75],
                          rotate: [0, -18, 8],
                          opacity: 1,
                        }
                      : {
                          x: prodTargetX,
                          y: [prodTargetY - 45, prodTargetY + 40],
                          scale: [0.75, 0.12],
                          rotate: [8, 25],
                          opacity: [1, 0],
                        }
                  }
                  transition={{
                    duration: animStage === "flying" ? 0.5 : 0.4,
                    ease: animStage === "flying" ? "easeOut" : "easeInOut",
                  }}
                  className="fixed z-[100001] pointer-events-none"
                  style={{ width: "72px", height: "72px" }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.35)] border-2 border-white ring-4 ring-piwva-sage/40">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. SPARKLE BURST & HEARTS WHEN PRODUCT LANDS IN BAG */}
            <AnimatePresence>
              {animStage === "entering" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.3, 1.5, 2] }}
                  transition={{ duration: 0.65 }}
                  className="fixed z-[100002] pointer-events-none flex items-center justify-center"
                  style={{
                    left: `${targetBagX + 80}px`,
                    top: `${targetBagY + 40}px`,
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <Sparkles className="w-16 h-16 text-yellow-300 drop-shadow-[0_0_12px_rgba(255,225,100,0.9)] animate-spin" />
                  <Heart className="absolute w-8 h-8 text-piwva-peach fill-piwva-peach animate-ping" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. HERO BAG THAT EXPANDS FROM DOCKED SPOT, OPENS, CLOSES & RETURNS */}
            <motion.div
              initial={{
                x: dockPos.x,
                y: dockPos.y,
                scale: 0.24,
              }}
              animate={
                animStage === "expanding" || animStage === "flying"
                  ? {
                      x: targetBagX,
                      y: targetBagY,
                      scale: 1,
                    }
                  : animStage === "entering"
                  ? {
                      x: targetBagX,
                      y: targetBagY,
                      scale: [1, 1.08, 0.94, 1], // Elastic squish when item drops in!
                    }
                  : animStage === "closing"
                  ? {
                      x: targetBagX,
                      y: targetBagY,
                      scale: 1,
                    }
                  : animStage === "returning"
                  ? {
                      x: dockPos.x,
                      y: dockPos.y,
                      scale: 0.24, // Shrinks back to exact docked bottom-left position
                    }
                  : {
                      x: dockPos.x,
                      y: dockPos.y,
                      scale: 0.24,
                    }
              }
              transition={{
                type: "spring",
                stiffness: animStage === "returning" ? 280 : 230,
                damping: animStage === "returning" ? 24 : 18,
              }}
              className="fixed z-[100000] pointer-events-none origin-top-left"
              style={{ width: "240px", height: "260px" }}
            >
              <CssBag
                size="lg"
                isOpen={
                  animStage === "expanding" ||
                  animStage === "flying" ||
                  animStage === "entering"
                }
                isShaking={animStage === "entering"}
              />
            </motion.div>

            {/* Subtitle / Feedback Toast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100003] px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-2xl border border-piwva-beige flex items-center gap-2.5 pointer-events-auto"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-piwva-sage animate-pulse" />
              <p className="text-xs font-bold text-gray-800">
                {animStage === "expanding" || animStage === "flying"
                  ? `Adding "${product.name}" to Bag...`
                  : animStage === "entering"
                  ? "✨ Product placed inside!"
                  : animStage === "closing"
                  ? "🔒 Bag safely closed!"
                  : "Returning to Bag..."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FIXED FLOATING BAG (DOCKED ON LEFT SIDE) ================= */}
      <div className="piwva-bag-container">
        <button
          ref={dockRef}
          onClick={toggleBag}
          className={`piwva-bag-trigger group ${
            isDockShaking ? "bag-shake" : ""
          } ${animStage !== "idle" ? "opacity-30" : "opacity-100"} transition-opacity`}
          aria-label="Shopping bag"
          title="Open Shopping Bag"
        >
          {/* Custom CSS Canvas Bag */}
          <CssBag
            size="sm"
            isOpen={isOpen}
            isShaking={isDockShaking}
            badgeCount={totalCount}
          />
        </button>

        {/* ================= BAG DRAWER (SLIDES OPEN ON LEFT SIDE) ================= */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 24, x: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 24, x: -10 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="piwva-bag-drawer"
            >
              {/* Header */}
              <div className="bag-drawer-header flex items-center justify-between px-5 py-4 bg-gradient-to-r from-piwva-sage to-piwva-green text-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center">
                    <CssBag size="sm" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">Your Baby Bag</h3>
                    <p className="text-[11px] text-white/80">
                      {totalCount} {totalCount === 1 ? "item" : "items"} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleBag}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Body */}
              <div className="bag-drawer-body flex-1 overflow-y-auto p-4 space-y-2">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-piwva-warm flex items-center justify-center mb-4 shadow-inner">
                      <CssBag size="md" />
                    </div>
                    <p className="text-gray-600 font-bold text-sm">Your bag is empty</p>
                    <p className="text-gray-400 text-xs mt-1">Explore our gentle baby care products</p>
                    <Link
                      href="/products"
                      onClick={toggleBag}
                      className="mt-4 px-4 py-2 rounded-xl bg-piwva-sage text-white text-xs font-semibold hover:bg-piwva-green transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      className="bag-item"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-piwva-warm border border-piwva-beige/60">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-piwva-sage font-extrabold mt-0.5">
                          ৳{(item.discountPrice ?? item.price).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bag-qty-btn"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bag-qty-btn"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                        <p className="text-xs font-bold text-gray-800">
                          ৳{((item.discountPrice ?? item.price) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="bag-drawer-footer p-4 border-t border-piwva-beige/60 bg-white">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-800">৳{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Delivery</span>
                    <span className="text-piwva-sage font-semibold">
                      {totalPrice >= 999 ? "Free" : "৳60"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-base text-gray-800 mb-4 pt-2 border-t border-piwva-beige/40">
                    <span>Total</span>
                    <span className="text-piwva-sage font-extrabold text-lg">
                      ৳{(totalPrice + (totalPrice >= 999 ? 0 : 60)).toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={toggleBag}
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-gradient-to-r from-piwva-sage to-piwva-green text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
