"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Shield, Truck, CreditCard, Smartphone, Building } from "lucide-react";
import { useBag } from "@/context/BagContext";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";

const paymentMethods = [
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
  { id: "bkash", label: "bKash", icon: "📱" },
  { id: "nagad", label: "Nagad", icon: "📱" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "bank", label: "Bank Transfer", icon: "🏦" },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearBag } = useBag();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);

  const deliveryCharge = totalPrice >= 999 ? 0 : 60;
  const grandTotal = totalPrice + deliveryCharge;

  if (placed) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="text-7xl mb-6"
          >
            🎉
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Order Placed Successfully!</h1>
          <p className="text-gray-500 mb-6">Thank you! Your order has been received and is being processed.</p>
          <div className="bg-piwva-warm rounded-2xl p-5 mb-6 text-left">
            <p className="text-sm text-gray-600"><strong>Order ID:</strong> #PW-{Date.now().toString().slice(-6)}</p>
            <p className="text-sm text-gray-600 mt-1"><strong>Total:</strong> ৳{grandTotal.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1"><strong>Payment:</strong> {paymentMethods.find(p => p.id === payment)?.label}</p>
          </div>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-piwva-sage text-white font-semibold hover:bg-piwva-green transition-colors">
            Continue Shopping
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {["Delivery Info", "Payment", "Review"].map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${step === i + 1 ? "text-piwva-sage" : step > i + 1 ? "text-green-500" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${step === i + 1 ? "border-piwva-sage bg-piwva-sage text-white" : step > i + 1 ? "border-green-500 bg-green-500 text-white" : "border-gray-300"}`}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className="font-medium text-sm hidden sm:block">{s}</span>
              </div>
              {i < 2 && <ChevronRight size={16} className="text-gray-300" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-5">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl border border-piwva-beige/60 p-6">
                <h2 className="font-bold text-gray-800 text-lg mb-5">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Full Name", "Phone Number"].map((f) => (
                    <div key={f}>
                      <label className="text-sm font-semibold text-gray-700">{f}</label>
                      <input className="mt-1.5 w-full h-11 px-4 rounded-xl border border-piwva-beige text-sm outline-none focus:border-piwva-sage" placeholder={`Enter ${f.toLowerCase()}`} />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input type="email" className="mt-1.5 w-full h-11 px-4 rounded-xl border border-piwva-beige text-sm outline-none focus:border-piwva-sage" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Shipping Address</label>
                    <textarea rows={3} className="mt-1.5 w-full p-3 rounded-xl border border-piwva-beige text-sm outline-none focus:border-piwva-sage resize-none" placeholder="House/Road/Area, City, District" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">City</label>
                    <input className="mt-1.5 w-full h-11 px-4 rounded-xl border border-piwva-beige text-sm outline-none focus:border-piwva-sage" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">District</label>
                    <input className="mt-1.5 w-full h-11 px-4 rounded-xl border border-piwva-beige text-sm outline-none focus:border-piwva-sage" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-piwva-sage text-white font-semibold hover:bg-piwva-green transition-colors">
                  Continue to Payment <ChevronRight size={16} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl border border-piwva-beige/60 p-6">
                <h2 className="font-bold text-gray-800 text-lg mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((pm) => (
                    <label key={pm.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${payment === pm.id ? "border-piwva-sage bg-piwva-sage/5" : "border-piwva-beige hover:border-piwva-sage/40"}`}>
                      <input type="radio" name="payment" value={pm.id} checked={payment === pm.id} onChange={() => setPayment(pm.id)} className="accent-piwva-sage" />
                      <span className="text-xl">{pm.icon}</span>
                      <span className="font-medium text-gray-700">{pm.label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-xl border-2 border-piwva-beige text-gray-600 font-medium hover:border-piwva-sage">Back</button>
                  <button onClick={() => setStep(3)} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-piwva-sage text-white font-semibold hover:bg-piwva-green">
                    Review Order <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl border border-piwva-beige/60 p-6">
                <h2 className="font-bold text-gray-800 text-lg mb-5">Review Your Order</h2>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-piwva-warm rounded-xl">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm">৳{((item.discountPrice ?? item.price) * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  {items.length === 0 && <p className="text-gray-400 text-center py-4">No items in bag</p>}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-5 py-2.5 rounded-xl border-2 border-piwva-beige text-gray-600 font-medium hover:border-piwva-sage">Back</button>
                  <button
                    onClick={() => { clearBag(); setPlaced(true); }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-piwva-sage text-white font-semibold hover:bg-piwva-green flex-1 justify-center"
                  >
                    <Shield size={16} />
                    Confirm Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-white rounded-2xl border border-piwva-beige/60 p-5">
              <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({items.length} items)</span>
                  <span>৳{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-green-600 font-semibold" : ""}>{deliveryCharge === 0 ? "Free" : `৳${deliveryCharge}`}</span>
                </div>
                {deliveryCharge > 0 && <p className="text-xs text-piwva-sage">Add ৳{(999 - totalPrice).toLocaleString()} more for free delivery</p>}
                <div className="flex justify-between font-bold text-gray-800 text-base pt-3 border-t border-piwva-beige/50">
                  <span>Grand Total</span>
                  <span className="text-piwva-sage">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="p-3 bg-piwva-warm rounded-xl text-xs text-gray-500 flex items-center gap-2">
                <Shield size={14} className="text-piwva-sage flex-shrink-0" />
                Secure checkout. Your information is protected.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
