"use client";

import { useState, useEffect } from 'react';
import api from 'app/Lib/api';
import FullLengthTestCard from '../components/FullLengthTestCard'; 

// --- 1. UPDATE THE INTERFACE ---
// Make sure your API sends the parent exam's ID (e.g., "banking")
interface SubExamWithTests {
    id: string;
    name: string;
    exam_id: string; // <-- ADD THIS FIELD
    full_length_tests: FullLengthTest[];
}

interface FullLengthTest {
    id: string;
    name: string;
    price_points: number;
    question_count: number;
    duration_minutes: number;
}

export default function FullLengthTestsPage() {
    const [subExams, setSubExams] = useState<SubExamWithTests[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        api.get('exams/api/sub-exams/with_full_length_tests/')
            .then(res => {
                setSubExams(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch full length tests by sub-exam:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Filter subExams based on search query
    const filteredSubExams = subExams.map(subExam => ({
        ...subExam,
        full_length_tests: subExam.full_length_tests.filter(test =>
            test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subExam.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(subExam => subExam.full_length_tests.length > 0);

    // Calculate statistics
    const totalTests = subExams.reduce((sum, subExam) => sum + subExam.full_length_tests.length, 0);
    const totalCategories = subExams.length;
    const displayedSubExams = searchQuery ? filteredSubExams : subExams;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                            <span className="text-lg mr-2">🎯</span>
                            Full Length Mock Tests
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Master Your{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Exam Preparation
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Challenge yourself with complete exam simulations and track your progress in real-time
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    {!isLoading && totalTests > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📚</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
                                        <p className="text-sm text-gray-500">Total Mock Tests</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">🎓</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
                                        <p className="text-sm text-gray-500">Exam Categories</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">⏱️</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-2xl font-bold text-gray-900">Real-Time</p>
                                        <p className="text-sm text-gray-500">Instant Results</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search Bar */}
                    {!isLoading && totalTests > 0 && (
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
                                    placeholder="Search mock tests by name or category..."
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
                                        Found <span className="font-semibold text-blue-600">{filteredSubExams.reduce((sum, se) => sum + se.full_length_tests.length, 0)}</span> test{filteredSubExams.reduce((sum, se) => sum + se.full_length_tests.length, 0) !== 1 ? 's' : ''} matching "{searchQuery}"
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center h-96">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"></div>
                        </div>
                        <p className="mt-6 text-gray-600 font-medium">Loading mock tests...</p>
                    </div>
                ) : subExams.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">📝</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Mock Tests Available</h3>
                        <p className="text-gray-500">Mock tests will be available soon. Check back later!</p>
                    </div>
                ) : displayedSubExams.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">🔍</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Tests Found</h3>
                        <p className="text-gray-500 mb-6">No mock tests match your search "{searchQuery}"</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {displayedSubExams.map((subExam, sectionIndex) => (
                            <section 
                                key={subExam.id}
                                className="animate-fadeIn"
                                style={{
                                    animationDelay: `${sectionIndex * 100}ms`,
                                    opacity: 0,
                                    animation: 'fadeIn 0.6s ease-out forwards'
                                }}
                            >
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{subExam.name.charAt(0)}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {subExam.name}
                                        </h2>
                                        <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                            {subExam.full_length_tests.length} Test{subExam.full_length_tests.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full w-20"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {subExam.full_length_tests.map((test, testIndex) => (
                                        <div 
                                            key={test.id}
                                            style={{
                                                animationDelay: `${(sectionIndex * 100) + (testIndex * 50)}ms`,
                                                opacity: 0,
                                                animation: 'slideUp 0.6s ease-out forwards'
                                            }}
                                        >
                                            <FullLengthTestCard 
                                                test={test}
                                                examId={subExam.exam_id}
                                                subExamId={subExam.id}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                {/* Info Section */}
                {!isLoading && totalTests > 0 && (
                    <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-3 flex items-center">
                                    <span className="mr-3">💡</span>
                                    Pro Tips for Mock Tests
                                </h3>
                                <ul className="space-y-2 text-blue-50">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        Simulate real exam conditions for best results
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        Review your answers thoroughly after completion
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        Track your progress across multiple attempts
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">🏆</div>
                                    <p className="text-sm font-medium">Achieve Excellence</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
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
            `}</style>
        </div>
    );
}