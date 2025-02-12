'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Latest Results', href: '/' },
    { name: 'Results History', href: '/results/history' },
  ];

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-green-50 text-green-600"
                    : "text-muted-foreground hover:bg-green-50 hover:text-green-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-green-50 text-green-600"
                      : "text-muted-foreground hover:bg-green-50 hover:text-green-600"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Progress bar for extra style */}
      <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 w-full opacity-20" />
    </header>
  );
}
