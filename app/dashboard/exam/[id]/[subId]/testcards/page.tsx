'use client';

import Link from "next/link";
import { useState, useEffect, use } from 'react';
import api from 'app/Lib/api';

// Define types
interface TestCard {
  id: string;
  name: string;
  test_type: string;        // <-- ADD THIS
  order: number;            // <-- ADD THIS
  price_points: number;     // <-- ADD THIS
  duration_minutes: number;
  num_questions: number;
   // You can define a more specific type if needed
}



interface TestAttempt {
  testId: string;
  completed: boolean;
  score?: number;
  totalQuestions?: number;
  completedAt?: string;
  duration?: number;
}


// Custom hook for fetching test cards
function useTestCards(subId: string) {
  const [testCards, setTestCards] = useState<TestCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subId) return;

    const fetchTestCards = async () => {
      try {
        // --- CORRECTED API ENDPOINT ---
        // Hits /api/test-cards/ and filters by the sub_exam ID
        const res = await api.get(`exams/api/test-cards/?sub_exam=${subId}`);
        setTestCards(res.data);
      } catch (error) {
        setError("Failed to load test cards");
        console.error("Error fetching test cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestCards();
  }, [subId]);

  return { testCards, loading, error };
}


// Custom hook for managing test attempts
// NOTE: This uses localStorage. For a more robust app, you could fetch
// real submission data from your `/api/submissions/my_results/` endpoint.
function useTestAttempts() {
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);

  useEffect(() => {
    const savedAttempts = localStorage.getItem('testAttempts');
    if (savedAttempts) {
      setAttempts(JSON.parse(savedAttempts));
    }
  }, []);

  const getAttempt = (testId: string) => {
    return attempts.find(attempt => attempt.testId === testId);
  };

  return { getAttempt };
}


// No changes are needed in the components below this line
// ...

// Enhanced test card component
function TestCardComponent({ 
  testCard, 
  attempt, 
  examId, 
  subId, 
  index 
}: { 
  testCard: TestCard; 
  attempt?: TestAttempt; 
  examId: string; 
  subId: string; 
  index: number;
}) {
  const isCompleted = attempt?.completed || false;
  const score = attempt?.score;
  const totalQuestions = attempt?.totalQuestions || testCard.num_questions;
  const scorePercentage = score && totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'slideUp 0.6s ease-out forwards',
        opacity: 0 // Start with opacity 0 for the animation
      }}
    >
      {isCompleted && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Completed</span>
          </div>
        </div>
      )}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">{isCompleted ? "✅" : "📝"}</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              {isCompleted ? "Reattempt" : "New Test"}
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 h-14">
          {testCard.name}
        </h2>
        {isCompleted && score !== undefined && (
          <div className={`inline-flex items-center px-3 py-2 rounded-xl mb-4 ${getScoreColor(scorePercentage)}`}>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold">{scorePercentage}%</span>
            <span className="ml-1 text-sm">({score}/{totalQuestions})</span>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl">
            <span className="text-blue-600 text-lg">⏱️</span>
            <div>
              <div className="text-xs font-medium text-blue-700">Duration</div>
              <div className="text-sm font-bold text-blue-800">{testCard.duration_minutes} mins</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl">
            <span className="text-green-600 text-lg">📊</span>
            <div>
              <div className="text-xs font-medium text-green-700">Questions</div>
              <div className="text-sm font-bold text-green-800">{testCard.num_questions} MCQs</div>
            </div>
          </div>
        </div>
        {isCompleted && attempt?.completedAt && (
          <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg mb-4">
            Last completed: {new Date(attempt.completedAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </div>
        )}
      </div>  
      <div className="px-6 pb-6">
        <Link
          href={`/dashboard/exam/${examId}/${subId}/testcards/${testCard.id}/questions `}
          className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-[1.02] shadow-lg hover:shadow-xl ${
            isCompleted
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
          }`}
        >
          <span className="mr-2 text-lg">{isCompleted ? "🔄" : "🚀"}</span>
          {isCompleted ? "Reattempt Test" : "Start Test"}
        </Link>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {isCompleted 
              ? "Improve your score • Review answers" 
              : "Multiple attempts allowed • Auto-save progress"
            }
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="h-12 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
}

function TestStatistics({ 
  totalTests, 
  completedTests, 
  averageScore 
}: { 
  totalTests: number; 
  completedTests: number; 
  averageScore: number;
}) {
  const completionRate = totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
            <p className="text-sm text-gray-500">Total Tests</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
            <p className="text-sm text-gray-500">Completion Rate</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
            <p className="text-sm text-gray-500">Average Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestCardsPage({
  params,
}: {
  params: Promise<{ id: string; subId: string }>;
}) {
  const resolvedParams = use(params);
  const { testCards, loading, error } = useTestCards(resolvedParams.subId);
  const { getAttempt } = useTestAttempts();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter test cards based on search query
  const filteredTestCards = testCards.filter(test => 
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedTests = testCards.filter(test => getAttempt(test.id)?.completed).length;
  const completedAttempts = testCards.map(test => getAttempt(test.id)).filter((attempt): attempt is TestAttempt => !!(attempt?.completed && attempt.score !== undefined));
  const averageScore = completedAttempts.length > 0 
    ? Math.round(completedAttempts.reduce((sum, attempt) => sum + ((attempt.score || 0) / (attempt.totalQuestions || 1) * 100), 0) / completedAttempts.length)
    : 0;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load</h2>
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
            <Link href={`/dashboard/exam/${resolvedParams.id}`} className="hover:text-blue-600 transition-colors">
              Topics
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-600 font-medium">Test Cards</span>
          </nav>
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <span className="text-lg mr-2">🎯</span>
              Practice Tests
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Test Yourself?
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Challenge your knowledge with our comprehensive practice tests and track your progress
            </p>
          </div>
        </div>

        {!loading && testCards.length > 0 && (
          <>
            <TestStatistics 
              totalTests={testCards.length}
              completedTests={completedTests}
              averageScore={averageScore}
            />
            
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search test cards by name..."
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Found <span className="font-semibold text-blue-600">{filteredTestCards.length}</span> test{filteredTestCards.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <LoadingSkeleton key={i} />)}
          </div>
        ) : testCards.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Test Cards Available</h3>
            <p className="text-gray-500 mb-6">Test cards for this section are coming soon.</p>
            <Link
              href={`/dashboard/exam/${resolvedParams.id}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Topics
            </Link>
          </div>
        ) : filteredTestCards.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Tests Found</h3>
            <p className="text-gray-500 mb-6">No test cards match your search "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredTestCards.map((testCard, index) => (
              <TestCardComponent
                key={testCard.id}
                testCard={testCard}
                attempt={getAttempt(testCard.id)}
                examId={resolvedParams.id}
                subId={resolvedParams.subId}
                index={index}
              />
            ))}
          </div>
        )}
        
        {testCards.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">📋</span>
              Test Instructions
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🚀</span>
                  Before Starting:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span>Ensure stable internet connection</li>
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span>Use a desktop/laptop for best experience</li>
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span>Close unnecessary applications</li>
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span>Keep your focus and concentration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">⏱️</span>
                  During Test:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="mr-2 text-blue-500">•</span>Your progress is automatically saved</li>
                  <li className="flex items-start"><span className="mr-2 text-blue-500">•</span>You can resume if interrupted</li>
                  <li className="flex items-start"><span className="mr-2 text-blue-500">•</span>Mark questions for review</li>
                  <li className="flex items-start"><span className="mr-2 text-blue-500">•</span>Submit before timer expires</li>
                </ul>
              </div>
            </div>
          </div>
        )}
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