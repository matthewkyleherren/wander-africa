import Link from "next/link";
import { Instagram, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      <div className="container-wide py-16">
        {/* Newsletter Section (Optional) */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <div className="max-w-md">
            <h3 className="font-display text-heading-lg mb-2">
              Stay in the know
            </h3>
            <p className="text-white/70 mb-4">
              Get travel inspiration, member deals, and updates delivered to
              your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button
                variant="primary"
                size="default"
                className="rounded-full px-6"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="font-medium text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/newsroom"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Safety
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h4 className="font-medium text-white mb-4">Hosting</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/host"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Become a Host
                </Link>
              </li>
              <li>
                <Link
                  href="/host/resources"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Host Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/host/community"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/host/protection"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Host Protection
                </Link>
              </li>
              <li>
                <Link
                  href="/host/standards"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Quality Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-medium text-white mb-4">Connect</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-foreground font-bold text-lg">W</span>
            </div>
            <span className="font-display text-xl font-semibold">Wander</span>
          </Link>

          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/50">
            <span>© {currentYear} Wander. All rights reserved.</span>
            <span className="hidden md:inline">·</span>
            <Link
              href="/sitemap"
              className="hover:text-white/70 transition-colors"
            >
              Sitemap
            </Link>
            <span className="hidden md:inline">·</span>
            <Link
              href="/accessibility"
              className="hover:text-white/70 transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
