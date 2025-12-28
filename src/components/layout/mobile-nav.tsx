"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Heart, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/lib/hooks";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export function MobileNav() {
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();

  const navItems: NavItem[] = [
    {
      id: "explore",
      label: "Explore",
      icon: <Search className="w-5 h-5" />,
      href: "/",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <Heart className="w-5 h-5" />,
      href: "/wishlist",
    },
    {
      id: "trips",
      label: "Trips",
      icon: <Calendar className="w-5 h-5" />,
      href: "/trips",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      href: "/profile",
    },
  ];

  return (
    <AnimatePresence>
      {scrollDirection === "up" && (
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="mx-4 mb-4 rounded-2xl bg-white/80 backdrop-blur-lg border border-border/50 shadow-soft-lg">
            <div className="flex items-center justify-around px-2 py-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="relative flex flex-col items-center gap-1 px-4 py-2 min-w-[72px] group"
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-accent/10 rounded-xl"
                        layoutId="mobile-nav-active"
                        transition={{
                          type: "spring",
                          damping: 25,
                          stiffness: 300,
                        }}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 transition-colors ${
                        isActive
                          ? "text-accent"
                          : "text-foreground-muted group-hover:text-foreground"
                      }`}
                    >
                      {item.icon}
                    </div>

                    {/* Label */}
                    <span
                      className={`relative z-10 text-xs font-medium transition-colors ${
                        isActive
                          ? "text-accent"
                          : "text-foreground-muted group-hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
