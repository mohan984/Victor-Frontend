// components/Header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/exams', label: 'Exams' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-2xl">🎓</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MockExam
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className={`text-base font-medium transition-colors hover:text-blue-600 ${
                  pathname === link.href ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <div className="px-5 py-2 text-base font-semibold text-gray-700 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer">
                Login
              </div>
            </Link>
            <Link href="/signup">
              <div className="px-5 py-2 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer">
                Sign Up
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col items-center gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div 
                  className={`w-full text-center py-2 text-lg font-medium transition-colors hover:text-blue-600 ${
                    pathname === link.href ? 'text-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="w-full border-t border-gray-200 my-2"></div>
            <Link href="/login" className="w-full">
              <div className="w-full text-center py-3 text-lg font-semibold text-gray-700 bg-gray-50 rounded-full border border-gray-200">Login</div>
            </Link>
            <Link href="/signup" className="w-full">
              <div className="w-full text-center py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">Sign Up</div>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}