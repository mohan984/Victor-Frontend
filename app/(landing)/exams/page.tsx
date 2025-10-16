'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// --- KEY CHANGE 1: Import your custom API instance ---
import api from 'app/Lib/api'; // Adjust the path if your file structure is different

// Define a type for your exam data
interface Exam {
  id: string;
  name: string;
  description: string;
 
}

// Exam data fetching hook
function useExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // --- KEY CHANGE 2: Replace fetch with your 'api' instance ---
        // The baseURL is already set in api.ts, so you only need the endpoint.
        // Authorization headers and token refresh are handled automatically.
        const response = await api.get('exams/api/exams/');

        // Axios provides the JSON data directly in the `data` property.
        setExams(response.data);

      } catch (error) {
        // Axios automatically throws an error for non-2xx responses,
        // so the `if (!res.ok)` check is no longer needed.
        setError('Failed to fetch exams. Please try again later.');
        console.error("Failed to fetch exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []); // The empty dependency array ensures this runs only once on mount
return { exams, loading, error };
}

// Search and filter component
function SearchAndFilter({ 
  searchTerm, 
  setSearchTerm, 
  examCount 
}: { 
  searchTerm: string; 
  setSearchTerm: (term: string) => void;
  examCount: number;
}) {
  return (
    <div className="relative mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border-2 border-transparent bg-white rounded-2xl shadow-lg focus:border-blue-500 focus:ring-0 transition-all duration-200 placeholder-gray-400"
            placeholder="Search exams..."
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        {/* Results count */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-md">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>{examCount} exams available</span>
        </div>
      </div>
    </div>
  );
}

// Enhanced exam card that now links to the login page
function ExamCard({ exam, index }: { exam: Exam; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  

  return (
    // The Link component now directs to /login for every card
    <Link href="/login">
      <div 
        className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 cursor-pointer"
        style={{ 
          animationDelay: `${index * 100}ms`,
          animation: 'slideUp 0.6s ease-out forwards'
        }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 z-20">
          
        </div>

        {/* Image section with loading effect */}
       
        {/* Content section */}
        <div className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {exam.name}
            </h3>
            <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
              New
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {exam.description}
          </p>

          {/* Action button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Login to start</span>
            </div>
            
            <div className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              View
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full transform translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
      </div>
    </Link>
  );
}

// Loading shimmer component
function LoadingCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-16 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default function ExamsPage() {
  const { exams, loading, error } = useExams();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter exams based on search term
  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Animated header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
              🎯 Exam Portal
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Master Your
            </span>
            <br />
            <span className="text-gray-900">Knowledge</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive exam collection designed to challenge and elevate your expertise
          </p>
        </div>

        {/* Search and filter */}
        {!loading && <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} examCount={filteredExams.length} />}

        {/* Exams grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
          ) : filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => (
              <ExamCard key={exam.id} exam={exam} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No exams found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}