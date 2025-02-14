'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <Image
                src="/Irish Lotto Results.webp"
                alt="Irish Lotto Logo"
                width={40}
                height={40}
                className="rounded-xl"
                priority
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Irish Lotto
                </h1>
                <p className="text-xs text-muted-foreground">Results & History</p>
              </div>
            </div>
            <div className="flex md:hidden items-center gap-2">
              <div className="flex items-center gap-3">
                <Image
                  src="/Irish Lotto Results.webp"
                  alt="Irish Lotto Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                  priority
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-green-600">Irish Lotto</span>
                  <span className="text-xs text-muted-foreground">Results & History</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a 
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-600 aria-[current=page]:bg-green-50 aria-[current=page]:text-green-600" 
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Latest Results
            </a>
            <a 
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-600 aria-[current=page]:bg-green-50 aria-[current=page]:text-green-600"
              href="/results/history"
              aria-current={pathname === "/results/history" ? "page" : undefined}
            >
              Results History
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <nav className="flex flex-col p-4 space-y-2">
              <a 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-600 aria-[current=page]:bg-green-50 aria-[current=page]:text-green-600"
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Latest Results
              </a>
              <a 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-600 aria-[current=page]:bg-green-50 aria-[current=page]:text-green-600"
                href="/results/history"
                aria-current={pathname === "/results/history" ? "page" : undefined}
              >
                Results History
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Progress bar for extra style */}
      <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 w-full opacity-20" />
    </header>
  );
}
