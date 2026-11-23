"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export interface BagItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  ageGroup?: string;
}

export interface BagItemOrigin {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnimatingBagData {
  item: BagItem;
  origin?: BagItemOrigin;
}

interface BagContextType {
  items: BagItem[];
  isOpen: boolean;
  totalCount: number;
  totalPrice: number;
  animatingData: AnimatingBagData | null;
  addItem: (item: Omit<BagItem, "quantity">, origin?: BagItemOrigin) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearBag: () => void;
  toggleBag: () => void;
  openBag: () => void;
  closeBag: () => void;
  lastAdded: string | null;
  clearAnimatingData: () => void;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [animatingData, setAnimatingData] = useState<AnimatingBagData | null>(null);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.discountPrice ?? i.price) * i.quantity, 0);

  const addItem = useCallback((item: Omit<BagItem, "quantity">, origin?: BagItemOrigin) => {
    const fullItem: BagItem = { ...item, quantity: 1 };
    
    // 1. Trigger cinematic bag animation with source origin
    setAnimatingData({ item: fullItem, origin });

    // 2. Add item to internal items list
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, fullItem];
    });

    setLastAdded(item.id);
    setTimeout(() => setLastAdded(null), 1200);
  }, []);

  const clearAnimatingData = useCallback(() => {
    setAnimatingData(null);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    }
  }, []);

  const clearBag = useCallback(() => setItems([]), []);
  const toggleBag = useCallback(() => setIsOpen((o) => !o), []);
  const openBag = useCallback(() => setIsOpen(true), []);
  const closeBag = useCallback(() => setIsOpen(false), []);

  return (
    <BagContext.Provider
      value={{
        items,
        isOpen,
        totalCount,
        totalPrice,
        animatingData,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
        toggleBag,
        openBag,
        closeBag,
        lastAdded,
        clearAnimatingData,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used within BagProvider");
  return ctx;
}
