"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export function Navbar({ variant = "solid" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = variant === "transparent" && !isScrolled;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-md border-b border-border/50 shadow-soft-sm"
        }`}
        initial={false}
        animate={{
          backgroundColor: isTransparent
            ? "rgba(255, 255, 255, 0)"
            : "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div className="container-wide flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 z-10"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent flex items-center justify-center">
              <span
                className={`font-bold text-lg md:text-xl ${
                  isTransparent ? "text-white" : "text-white"
                }`}
              >
                W
              </span>
            </div>
            <span
              className={`font-display text-xl md:text-2xl font-semibold transition-colors ${
                isTransparent ? "text-white" : "text-foreground"
              }`}
            >
              Wander
            </span>
          </Link>

          {/* Center Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 justify-center px-8">
            <motion.div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer ${
                isTransparent
                  ? "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  : "bg-white border-border shadow-soft-sm hover:shadow-soft-md"
              }`}
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className={`text-sm font-medium ${
                  isTransparent ? "text-white" : "text-foreground"
                }`}
              >
                Anywhere
              </span>
              <span
                className={`${
                  isTransparent ? "text-white/40" : "text-border"
                }`}
              >
                |
              </span>
              <span
                className={`text-sm font-medium ${
                  isTransparent ? "text-white" : "text-foreground"
                }`}
              >
                Any week
              </span>
              <span
                className={`${
                  isTransparent ? "text-white/40" : "text-border"
                }`}
              >
                |
              </span>
              <span
                className={`text-sm ${
                  isTransparent ? "text-white/70" : "text-foreground-muted"
                }`}
              >
                Add guests
              </span>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center ml-2">
                <Search className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 mr-4">
            <Link href="/explore">
              <Button
                variant="ghost"
                size="sm"
                className={
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-foreground"
                }
              >
                Explore
              </Button>
            </Link>
            <Link href="/concierge">
              <Button
                variant="ghost"
                size="sm"
                className={
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-foreground"
                }
              >
                Concierge
              </Button>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <Link href="/host" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className={
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-foreground"
                }
              >
                Become a host
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon-sm"
              className={`md:hidden ${
                isTransparent ? "text-white hover:bg-white/10" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            {/* Desktop Menu Button */}
            <Button
              variant="ghost"
              size="icon-sm"
              className={`hidden md:block ${
                isTransparent ? "text-white hover:bg-white/10" : ""
              }`}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* User Avatar */}
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-white rounded-b-3xl shadow-soft-xl overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6 space-y-1">
                <Link
                  href="/explore"
                  className="block px-4 py-3 rounded-xl hover:bg-background-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-medium">Explore</span>
                </Link>
                <Link
                  href="/concierge"
                  className="block px-4 py-3 rounded-xl hover:bg-background-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-medium">Concierge</span>
                </Link>
                <Link
                  href="/host"
                  className="block px-4 py-3 rounded-xl hover:bg-background-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-medium">Become a host</span>
                </Link>
                <div className="pt-4 mt-4 border-t border-border">
                  <Link
                    href="/login"
                    className="block px-4 py-3 rounded-xl hover:bg-background-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Log in</span>
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-3 rounded-xl hover:bg-background-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Sign up</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
