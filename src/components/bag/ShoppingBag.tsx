"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag as BagIcon, Trash2, ArrowRight } from "lucide-react";
import { useBag } from "@/context/BagContext";

export function ShoppingBag() {
  const { items, isOpen, totalCount, totalPrice, toggleBag, removeItem, updateQuantity, lastAdded } = useBag();
  const bagBtnRef = useRef<HTMLButtonElement>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [countBounce, setCountBounce] = useState(false);

  // Trigger shake + count bounce on item add
  useEffect(() => {
    if (lastAdded) {
      setIsShaking(true);
      setCountBounce(true);
      setTimeout(() => setIsShaking(false), 600);
      setTimeout(() => setCountBounce(false), 500);
    }
  }, [lastAdded]);

  const handleAddToCart = useCallback((productId: string, imageEl: HTMLImageElement | null, bagBtn: HTMLButtonElement | null) => {
    if (!imageEl || !bagBtn) return;
    const imgRect = imageEl.getBoundingClientRect();
    const bagRect = bagBtn.getBoundingClientRect();

    const flyEl = document.createElement("div");
    flyEl.className = "flying-product";
    flyEl.style.left = `${imgRect.left + imgRect.width / 2 - 28}px`;
    flyEl.style.top = `${imgRect.top + imgRect.height / 2 - 28}px`;

    const imgCopy = document.createElement("img");
    imgCopy.src = imageEl.src;
    flyEl.appendChild(imgCopy);
    document.body.appendChild(flyEl);

    const targetX = bagRect.left + bagRect.width / 2 - 28;
    const targetY = bagRect.top + bagRect.height / 2 - 28;
    const startX = parseFloat(flyEl.style.left);
    const startY = parseFloat(flyEl.style.top);
    const dx = targetX - startX;
    const dy = targetY - startY;

    const anim = flyEl.animate(
      [
        { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 0.4}px, ${dy * 0.3 - 60}px) scale(0.8) rotate(-10deg)`, opacity: 0.9, offset: 0.4 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.15) rotate(15deg)`, opacity: 0 },
      ],
      { duration: 700, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fill: "forwards" }
    );

    anim.onfinish = () => {
      flyEl.remove();
    };
  }, []);

  // Expose addToCart globally so ProductCard can call it
  useEffect(() => {
    (window as any).__piwvaAddToCart = handleAddToCart;
    (window as any).__piwvaBagBtn = bagBtnRef.current;
  }, [handleAddToCart]);

  useEffect(() => {
    (window as any).__piwvaBagBtn = bagBtnRef.current;
  });

  return (
    <>
      {/* Floating Bag Button */}
      <div className="piwva-bag-container">
        <button
          ref={bagBtnRef}
          onClick={toggleBag}
          className={`piwva-bag-trigger ${isShaking ? "bag-shake" : ""}`}
          aria-label="Shopping bag"
        >
          <BagIcon className="piwva-bag-icon" />
          <AnimatePresence>
            {totalCount > 0 && (
              <motion.span
                key={totalCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className={`piwva-bag-count ${countBounce ? "bounce" : ""}`}
              >
                {totalCount > 99 ? "99+" : totalCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Bag Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="piwva-bag-drawer"
              style={{ transformOrigin: "bottom right" }}
            >
              {/* Header */}
              <div className="bag-drawer-header">
                <div className="flex items-center gap-2">
                  <BagIcon size={20} />
                  <span className="font-semibold text-lg">Your Bag</span>
                  {totalCount > 0 && (
                    <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {totalCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={toggleBag}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="bag-drawer-body">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-piwva-warm flex items-center justify-center mb-4">
                      <BagIcon size={32} className="text-piwva-sage/40" />
                    </div>
                    <p className="text-gray-500 font-medium">Your bag is empty</p>
                    <p className="text-gray-400 text-sm mt-1">Add some baby products!</p>
                  </div>
                ) : (
                  <div>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bag-item"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-piwva-warm">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                          <p className="text-xs text-piwva-sage font-bold mt-0.5">
                            ৳{(item.discountPrice ?? item.price).toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bag-qty-btn"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bag-qty-btn"
                            >
                              <Plus size={12} />
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
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="bag-drawer-footer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Subtotal</span>
                    <span className="font-bold text-gray-800">৳{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Delivery</span>
                    <span className="text-sm text-piwva-sage font-medium">Free above ৳999</span>
                  </div>
                  <div className="flex items-center justify-between mb-4 pt-3 border-t border-piwva-beige/50">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-xl text-piwva-sage">৳{totalPrice.toLocaleString()}</span>
                  </div>
                  <a
                    href="/checkout"
                    className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-gradient-to-r from-piwva-sage to-piwva-green text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
