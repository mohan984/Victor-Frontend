// components/Hero.tsx
"use client";

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 sm:py-28">
          
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block text-gray-900">Ace Your Exams with</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mt-2">
                Real Mock Tests
              </span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Practice online exams anytime with instant results and detailed analytics designed to help you succeed.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/login">
                <div className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transform transition-all duration-300 cursor-pointer">
                  Start Practicing
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </Link>
              <Link href="/exams">
                <div className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-700 text-base font-semibold rounded-full shadow-md hover:bg-gray-100 transform transition-colors duration-300 cursor-pointer border border-gray-200">
                  View Exams
                </div>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center lg:text-left">
              Trusted by 10,000+ students nationwide.
            </p>
          </div>

          {/* Right Column: Illustration */}
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-md animate-float">
              {/* Custom SVG Illustration */}
              <svg width="100%" height="100%" viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="20" width="400" height="380" rx="40" fill="white"/>
                <rect x="40" y="20" width="400" height="380" rx="40" fill="url(#paint0_linear_1_2)" fillOpacity="0.1"/>
                <g filter="url(#filter0_d_1_2)">
                  <rect x="64" y="88" width="352" height="244" rx="20" fill="white"/>
                  <path d="M88 284L154.5 215L221.5 246L293.5 174.5L383 227" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <g filter="url(#filter1_d_1_2)">
                  <rect x="300" y="44" width="120" height="80" rx="16" fill="#10B981"/>
                  <path d="M318 84L334 100L366 68" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <g filter="url(#filter2_d_1_2)">
                  <rect x="64" y="44" width="160" height="40" rx="12" fill="white"/>
                  <rect x="80" y="58" width="128" height="12" rx="6" fill="#E5E7EB"/>
                </g>
                <defs>
                  <filter id="filter0_d_1_2" x="48" y="76" width="384" height="276" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="8"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.31 0 0 0 0 0.27 0 0 0 0 0.89 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape"/>
                  </filter>
                  <filter id="filter1_d_1_2" x="284" y="32" width="152" height="112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="8"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.06 0 0 0 0 0.72 0 0 0 0 0.51 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape"/>
                  </filter>
                  <filter id="filter2_d_1_2" x="52" y="36" width="184" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="6"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape"/>
                  </filter>
                  <linearGradient id="paint0_linear_1_2" x1="40" y1="20" x2="440" y2="400" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A5B4FC"/>
                    <stop offset="1" stopColor="#C4B5FD"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add this style block for the animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}