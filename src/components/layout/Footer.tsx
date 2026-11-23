"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

// Social SVG Icons
const FbIcon = ({ size = 16 }: { size?: number }) => <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.62 23.1 24 18.1 24 12.07z"/></svg>;
const IgIcon = ({ size = 16 }: { size?: number }) => <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const LiIcon = ({ size = 16 }: { size?: number }) => <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const TwIcon = ({ size = 16 }: { size?: number }) => <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 5.886zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YtIcon = ({ size = 16 }: { size?: number }) => <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

const socialLinks = [
  { icon: FbIcon, href: "#", label: "Facebook" },
  { icon: IgIcon, href: "#", label: "Instagram" },
  { icon: LiIcon, href: "#", label: "LinkedIn" },
  { icon: TwIcon, href: "#", label: "X/Twitter" },
  { icon: YtIcon, href: "#", label: "YouTube" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Emergency Info", href: "/emergency" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Shipping Information", href: "#" },
  { label: "Return & Refund Policy", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="relative h-8 w-28">
                <Image
                  src="/logo/piwva-white.png"
                  alt="Piwva"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your trusted baby care companion. Quality products, trusted information, and a supportive community — all in one place.
            </p>
            <p className="text-xs font-semibold text-piwva-sage italic mb-5">"Caring for Every Little Beginning"</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-piwva-sage transition-colors"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-piwva-sage-light transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Customer Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-gray-400 hover:text-piwva-sage-light transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-piwva-sage mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <a href="mailto:support@piwva.com" className="text-sm text-gray-300 hover:text-piwva-sage-light">support@piwva.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-piwva-sage mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Hotline</p>
                  <a href="tel:+8801700000000" className="text-sm text-gray-300 hover:text-piwva-sage-light">+880 170 000 0000</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-piwva-sage mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Address</p>
                  <p className="text-sm text-gray-300">Dhaka, Bangladesh</p>
                </div>
              </li>
              <li>
                <p className="text-xs text-gray-500">Support Hours</p>
                <p className="text-sm text-gray-300 mt-0.5">Sat–Thu: 9AM – 9PM</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Copyright &copy; 2026 <span className="text-piwva-sage font-semibold">Piwva</span>. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1.5">
            Made with <Heart size={12} className="text-piwva-peach fill-piwva-peach" /> for every little beginning
          </p>
        </div>
      </div>
    </footer>
  );
}
