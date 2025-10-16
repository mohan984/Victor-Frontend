'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // <-- 1. IMPORT useParams
import api from 'app/Lib/api';

// Define a type for the sub-exam data
interface SubExam {
  id: string;
  name: string;
}

// Custom hook for fetching sub-exams
function useSubExams(examId: string) {
  const [subExams, setSubExams] = useState<SubExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!examId) return;

    const fetchSubExams = async () => {
      try {
        const res = await api.get(`exams/api/sub-exams/?exam=${examId}`);
        setSubExams(res.data);
      } catch (error) {
        setError("Error connecting to backend");
        console.error("Error connecting to backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubExams();
  }, [examId]);

  return { subExams, loading, error };
}

// Search and filter component
function SearchAndFilter({ 
  searchTerm, 
  setSearchTerm, 
  topicCount 
}: { 
  searchTerm: string; 
  setSearchTerm: (term: string) => void;
  topicCount: number;
}) {
  return (
    <div className="relative mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
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
            placeholder="Search topics..."
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        {/* Results count */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-md">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>{topicCount} topics available</span>
        </div>
      </div>
    </div>
  );
}

// Enhanced sub-exam card component
function SubExamCard({ 
  subExam, 
  examId, 
  index 
}: { 
  subExam: SubExam; 
  examId: string; 
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <Link href={`/dashboard/exam/${examId}/${subExam.id}/testcards`}>
      <div 
        className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
        style={{ 
          animationDelay: `${index * 150}ms`,
          animation: 'fadeInUp 0.8s ease-out forwards',
          opacity: 0
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Status indicator */}
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center space-x-2">
            
          </div>
        </div>

        {/* Difficulty badge */}

        {/* Image section with advanced effects */}
        

        {/* Content section */}
        <div className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {subExam.name}
              </h3>
            </div>
          </div>

          {/* Stats and action */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
           
              </div>
              <div className="flex items-center space-x-1">
                
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600">
                Start Learning
                <svg className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

// --- 3. UPDATED PAGE COMPONENT ---
export default function SubExamsPage() { // Removed props
  const params = useParams<{ id: string }>(); // Get params using the hook
  const examId = params.id as string; // Ensure examId is a string
  const { subExams, loading, error } = useSubExams(examId);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubExams = subExams.filter(subExam =>
    subExam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Topics</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/dashboard/exam" className="hover:text-blue-600 transition-colors">
              Exams
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-600 font-medium">Topics</span>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Learning Topics
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Study Path
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore specialized topics designed to deepen your understanding and expertise
            </p>
          </div>
        </div>

        {!loading && <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} topicCount={filteredSubExams.length} />}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <LoadingSkeleton key={i} />)
          ) : filteredSubExams.length > 0 ? (
            filteredSubExams.map((subExam, index) => (
              <SubExamCard
                key={subExam.id}
                subExam={subExam}
                examId={examId}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Topics Available</h3>
              <p className="text-gray-500 mb-6">This exam doesn't have any study topics yet.</p>
              <Link
                href="/dashboard/exam"
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Other Exams
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

