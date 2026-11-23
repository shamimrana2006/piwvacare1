"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Zap, Heart, Eye } from "lucide-react";
import { useBag } from "@/context/BagContext";
import type { BagItem } from "@/context/BagContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  image: string;
  rating: number;
  reviews: number;
  ageGroup: string;
  category: string;
  brand: string;
  isNew?: boolean;
  isBestSelling?: boolean;
  inStock?: boolean;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useBag();
  const [wishlisted, setWishlisted] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToBag = () => {
    const item: Omit<BagItem, "quantity"> = {
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice ?? undefined,
      image: product.image,
      ageGroup: product.ageGroup,
    };
    const rect = imgRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
      : undefined;

    addItem(item, origin);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="product-card group"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-piwva-warm aspect-square">
        <Image
          ref={imgRef}
          src={product.image}
          alt={product.name}
          fill
          className="product-img object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-piwva-sage text-white shadow-sm">New</span>
          )}
          {product.isBestSelling && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-piwva-peach text-white shadow-sm">Best Selling</span>
          )}
          {discount > 0 && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white shadow-sm">-{discount}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={15} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>

        {/* Quick View */}
        <Link
          href={`/products/${product.id}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
        >
          <Eye size={13} />
          Quick View
        </Link>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-xs text-piwva-brown bg-piwva-beige/60 px-2 py-0.5 rounded-full">{product.ageGroup}</span>
        </div>

        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-400 mb-3 line-clamp-1">{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-800">
            ৳{(product.discountPrice ?? product.price).toLocaleString()}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-400 line-through">৳{product.price.toLocaleString()}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAddToBag}
            className={`flex items-center justify-center gap-1.5 flex-1 h-10 rounded-xl text-sm font-semibold transition-all ${
              addedFlash
                ? "bg-piwva-green text-white scale-95"
                : "bg-piwva-sage/15 text-piwva-sage hover:bg-piwva-sage hover:text-white"
            }`}
          >
            <ShoppingBag size={15} />
            {addedFlash ? "Added!" : "Add to Bag"}
          </motion.button>
          <Link
            href={`/checkout?product=${product.id}`}
            className="flex items-center justify-center gap-1 h-10 px-3 rounded-xl bg-piwva-sage text-white text-sm font-semibold hover:bg-piwva-green transition-colors"
          >
            <Zap size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
