'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { CheckCircle, XCircle, Clock, Award, AlertCircle, Download, Share2, Eye, Target, BookOpen, Zap, ThumbsUp, ThumbsDown } from 'lucide-react';
import api from 'app/Lib/api'; // Make sure this path is correct

// --- Types (to match the new backend response) ---
interface PerformanceStats {
    correct: number;
    total: number;
    percentage: number;
}
interface PerformanceAnalysis {
    accuracy: number;
    by_section: Record<string, PerformanceStats>;
    by_difficulty: Record<string, PerformanceStats>;
}
interface QuestionResult {
    id: number;
    question_text: string;
    correct_option: string;
    section: string;
    topic: string;
    difficulty: string;
}
interface AnswerResult {
    id: number;
    question: QuestionResult;
    selected_option: string | null;
    is_correct: boolean;
    marks?: number; // Add marks if available from backend
    time?: string; // Add time if available
}
interface SubmissionResult {
    id: number;
    score: number;
    percentage: number;
    finished_at: string;
    test_card: {
        id: string | number;
        name: string;
        duration_minutes: number;
    };
    performance_analysis: PerformanceAnalysis;
    answers: AnswerResult[];
}

// --- Helper Functions ---
const getDifficultyBadge = (difficulty: string) => {
    const colors: { [key: string]: string } = {
        'Easy': 'bg-green-500/20 text-green-400 border-green-500/30',
        'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Hard': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[difficulty] || colors['Medium'];
};

const getStatusIcon = (status: boolean, selected_option: string | null) => {
    if (selected_option === null) return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    if (status) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
};


// --- Main Page Component ---
function ExamResultsComponent() {
    const searchParams = useSearchParams();
    const submissionId = searchParams.get('submissionId');

    const [resultData, setResultData] = useState<SubmissionResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [showSolutions, setShowSolutions] = useState(false);
    const [selectedSection, setSelectedSection] = useState('all');

    useEffect(() => {
        if (!submissionId) {
            setError("Submission ID not found in URL.");
            setLoading(false);
            return;
        }

        const fetchResults = async () => {
            try {
                const response = await api.get(`exams/api/submissions/${submissionId}/`);
                setResultData(response.data);
            } catch (err) {
                console.error("Failed to fetch results:", err);
                setError("Could not load results from the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [submissionId]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading your advanced report...</div>;
    }
    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;
    }
    if (!resultData) {
        return <div className="min-h-screen flex items-center justify-center text-gray-400">No data available for this submission.</div>;
    }

    // --- DERIVED DATA: Create constants from resultData to use in JSX ---
    const { performance_analysis, percentage, test_card, answers, score, finished_at } = resultData;

    const correctCount = answers.filter(a => a.is_correct).length;
    const attemptedCount = answers.filter(a => a.selected_option !== null).length;
    const incorrectCount = attemptedCount - correctCount;
    const unansweredCount = answers.length - attemptedCount;

    const performanceGrade = percentage >= 90 ? 'Excellent' : percentage >= 75 ? 'Very Good' : percentage >= 60 ? 'Good' : 'Needs Improvement';
    const gradeColor = percentage >= 90 ? 'from-green-500 to-emerald-600' : percentage >= 75 ? 'from-blue-500 to-cyan-600' : percentage >= 60 ? 'from-yellow-500 to-orange-600' : 'from-red-500 to-pink-600';

    const sectionChartData = Object.entries(performance_analysis.by_section).map(([section, data], index) => ({
        section,
        marks: data.percentage, // Using percentage as a stand-in for marks
        accuracy: data.percentage,
        time: 'N/A', // This would need to come from the backend
        attempted: data.total,
        color: ['#3b82f6', '#10b981', '#f59e0b'][index % 3]
    }));

    const difficultyChartData = Object.entries(performance_analysis.by_difficulty).map(([name, data]) => ({
        name,
        correct: data.correct,
        incorrect: data.total - data.correct,
        color: name === 'Easy' ? '#10b981' : name === 'Medium' ? '#f59e0b' : '#ef4444'
    }));

    const topicChartData = Object.entries(performance_analysis.by_section).map(([topic, data]) => ({
        topic,
        score: data.percentage
    }));

    const questionReviewData = answers.map((answer, index) => ({
        qNo: index + 1,
        section: answer.question.section,
        topic: answer.question.topic,
        difficulty: answer.question.difficulty,
        your: answer.selected_option || '-',
        correct: answer.question.correct_option,
        marks: answer.marks ?? (answer.is_correct ? 4 : (answer.selected_option ? -1 : 0)), // Example marks
        status: answer.selected_option === null ? 'unanswered' : (answer.is_correct ? 'correct' : 'incorrect'),
        time: answer.time || 'N/A' // Example time
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 p-6 text-white">
            {/* Header with Score Card */}
            <div className="mb-8">
                <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 shadow-2xl border border-violet-400/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-start justify-between flex-wrap gap-6 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Award className="w-8 h-8 text-yellow-300" />
                                    <h1 className="text-4xl font-black text-white">{test_card.name}</h1>
                                </div>
                                <div className="flex items-center gap-4 text-violet-200">
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {new Date(finished_at).toLocaleDateString()}
                                    </span>
                                    <span>•</span>
                                    <span>{test_card.duration_minutes} mins</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white rounded-xl font-semibold transition-all flex items-center gap-2 border border-white/30">
                                    <Share2 className="w-4 h-4" /> Share
                                </button>
                                <button className="px-5 py-2.5 bg-white text-violet-600 hover:bg-gray-100 rounded-xl font-semibold transition-all flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Download
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            <div className="text-center">
                                <div className="text-5xl font-black text-white mb-1">{Math.round(score)}</div>
                                <div className="text-violet-200 text-sm">Your Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-black text-yellow-300 mb-1">{Math.round(percentage)}%</div>
                                <div className="text-violet-200 text-sm">Percentage</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-black text-cyan-300 mb-1">#N/A</div>
                                <div className="text-violet-200 text-sm">Your Rank</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-black text-green-300 mb-1">{Math.round(performance_analysis.accuracy)}%</div>
                                <div className="text-violet-200 text-sm">Accuracy</div>
                            </div>
                            <div className="text-center">
                                <div className={`px-4 py-3 rounded-xl bg-gradient-to-r ${gradeColor} inline-block`}>
                                    <div className="text-2xl font-black text-white">{performanceGrade}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/20 rounded-lg"><CheckCircle className="w-5 h-5 text-green-400" /></div>
                        <span className="text-gray-400 text-sm">Correct</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{correctCount}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-500/20 rounded-lg"><XCircle className="w-5 h-5 text-red-400" /></div>
                        <span className="text-gray-400 text-sm">Incorrect</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{incorrectCount}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-500/20 rounded-lg"><AlertCircle className="w-5 h-5 text-yellow-400" /></div>
                        <span className="text-gray-400 text-sm">Unanswered</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{unansweredCount}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/20 rounded-lg"><Clock className="w-5 h-5 text-purple-400" /></div>
                        <span className="text-gray-400 text-sm">Time Spent</span>
                    </div>
                    <div className="text-3xl font-bold text-white">N/A</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart className="w-6 h-6 text-cyan-400" /> Section-wise Performance
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={sectionChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="section" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '12px' }} labelStyle={{ color: '#f1f5f9' }} />
                            <Bar dataKey="marks" radius={[8, 8, 0, 0]}>
                                {sectionChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Target className="w-6 h-6 text-orange-400" /> By Difficulty
                    </h2>
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie data={difficultyChartData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(Number(percent || 0)*100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="correct">
                                {difficultyChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* More Charts and Review Table... */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-400" /> Topic-wise Analysis
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={topicChartData}>
                    <PolarGrid stroke="#475569" />
                    <PolarAngleAxis dataKey="topic" stroke="#94a3b8" tick={{ fill: '#cbd5e1' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#475569" />
                    <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '12px' }}/>
                  </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Eye className="w-6 h-6 text-blue-400" /> Question Review
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-gray-400 font-semibold py-3 px-4">Q.No</th>
                        <th className="text-left text-gray-400 font-semibold py-3 px-4">Section</th>
                        <th className="text-left text-gray-400 font-semibold py-3 px-4">Difficulty</th>
                        <th className="text-left text-gray-400 font-semibold py-3 px-4">Your Answer</th>
                        <th className="text-left text-gray-400 font-semibold py-3 px-4">Correct Answer</th>
                        <th className="text-left text-gray-400 font-semibold py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionReviewData.map((question, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 text-white font-semibold">{question.qNo}</td>
                          <td className="py-4 px-4 text-gray-300">{question.section}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyBadge(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-lg font-bold ${ question.status === 'correct' ? 'bg-green-500/20 text-green-400' : question.status === 'incorrect' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400' }`}>
                              {question.your}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 font-bold">
                              {question.correct}
                            </span>
                          </td>
                          <td className="py-4 px-4">{getStatusIcon(question.status === 'correct', question.your as string | null)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    );
}


// Wrapper component to use Suspense
export default function ExamResultsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
            <ExamResultsComponent />
        </Suspense>
    )
}