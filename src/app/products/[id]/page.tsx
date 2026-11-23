"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Zap, ChevronLeft, Shield, Truck, RefreshCw, Heart } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useBag } from "@/context/BagContext";
import { ProductCard } from "@/components/products/ProductCard";
import { Footer } from "@/components/layout/Footer";
import type { BagItem } from "@/context/BagContext";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const { addItem } = useBag();
  const [mainImg, setMainImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(1);
  const detailImgRef = React.useRef<HTMLDivElement>(null);

  const images = [product.image, product.image, product.image];
  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToBag = () => {
    const rect = detailImgRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
      : undefined;

    for (let i = 0; i < qty; i++) {
      addItem(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice ?? undefined,
          image: product.image,
          ageGroup: product.ageGroup,
        },
        origin
      );
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-piwva-sage">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-piwva-sage">Products</Link>
          <span>/</span>
          <span className="text-gray-600 truncate">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Image Gallery */}
          <div>
            <div ref={detailImgRef} className="relative aspect-square rounded-3xl overflow-hidden bg-piwva-warm mb-4 shadow-sm">
              <Image src={images[mainImg]} alt={product.name} fill className="object-cover" priority />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center shadow-sm"
              >
                <Heart size={20} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
            </div>
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${mainImg === i ? "border-piwva-sage shadow-md" : "border-piwva-beige"}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-xs text-piwva-brown bg-piwva-beige/60 px-2 py-1 rounded-full">{product.ageGroup}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-3 mb-2">{product.name}</h1>
            <p className="text-gray-500 text-sm mb-4">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />)}</div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-800">৳{(product.discountPrice ?? product.price).toLocaleString()}</span>
              {product.discountPrice && <span className="text-xl text-gray-400 line-through">৳{product.price.toLocaleString()}</span>}
              {discount > 0 && <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Save {discount}%</span>}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 border border-piwva-beige rounded-xl px-3 py-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-7 h-7 rounded-lg bg-piwva-warm flex items-center justify-center hover:bg-piwva-sage hover:text-white transition-colors font-bold">-</button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-7 h-7 rounded-lg bg-piwva-warm flex items-center justify-center hover:bg-piwva-sage hover:text-white transition-colors font-bold">+</button>
              </div>
              <span className="text-sm text-gray-400">In Stock</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToBag}
                className={`flex items-center justify-center gap-2 flex-1 h-12 rounded-2xl font-semibold transition-all ${added ? "bg-green-500 text-white" : "bg-piwva-sage/15 text-piwva-sage hover:bg-piwva-sage hover:text-white"}`}
              >
                <ShoppingBag size={18} />
                {added ? "Added to Bag!" : "Add to Bag"}
              </motion.button>
              <Link
                href={`/checkout?product=${product.id}&qty=${qty}`}
                className="flex items-center justify-center gap-2 flex-1 h-12 rounded-2xl bg-piwva-sage text-white font-semibold hover:bg-piwva-green transition-colors"
              >
                <Zap size={18} />
                Buy Now
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, text: "Safe & Certified" },
                { icon: Truck, text: "Free Delivery" },
                { icon: RefreshCw, text: "Easy Returns" },
              ].map((b) => (
                <div key={b.text} className="flex flex-col items-center gap-1 p-3 bg-piwva-warm rounded-xl text-center">
                  <b.icon size={18} className="text-piwva-sage" />
                  <span className="text-xs text-gray-600 font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
