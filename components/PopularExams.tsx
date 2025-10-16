// components/PopularExams.tsx
"use client";

import React from 'react';

// Define the structure for our exam data
interface Exam {
  name: string;
  category: string;
  icon: React.ReactNode;
}

// Data for popular exams
const popularExams: Exam[] = [

  {
    name: "JEE",
    category: "Engineering",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  },
  {
    name: "NEET",
    category: "Medical Entrance",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12l-7.5-7.5-7.5 7.5m15 6l-7.5-7.5-7.5 7.5" /></svg>
  },
  {
    name: "CAT",
    category: "Common Entrance Test",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9m0 18a9 9 0 00-9-9m9-9v18" /></svg>
  },
  {
    name: "GATE",
    category: "Engg entrance",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6" /></svg>
  }
];

export default function PopularExams() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Start Your Journey
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Exams Available
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Select an exam category to see available mock tests and practice papers.
          </p>
        </div>

        {/* Exams Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {popularExams.map((exam, index) => (
            <div
              key={exam.name}
              className="group relative bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer text-center animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {exam.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{exam.name}</h3>
              <p className="text-gray-500 text-sm mb-6">{exam.category}</p>
              
              {/* Button */}
              <button className="w-full px-4 py-2 font-semibold text-blue-600 bg-blue-50 rounded-full transition-all duration-300 hover:bg-blue-100">
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS for animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}