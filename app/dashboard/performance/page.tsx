'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { 
    TrendingUp, Award, Clock, Activity, Sparkles, ChevronDown, BarChart3, Percent, 
    CheckCircle2, XCircle, MinusCircle, BookOpen, Target, Brain, Trophy, Flame, Star, 
    ChevronRight, Users, TrendingDown 
} from 'lucide-react';
import api from 'app/Lib/api';

// --- TypeScript Interfaces for Live Data ---
interface QuickStats {
    total_tests_completed: number;
    avg_score: number;
    study_streak: number;
    accuracy: number;
}
interface PerformanceTrendPoint {
    week: string;
    score: number;
    tests: number;
}
interface SubjectPerformance {
    test_card__sub_exam__name: string;
    score: number;
    tests: number;
    accuracy: number;
}
interface RecentActivity {
    id: number;
    test_card__name: string;
    percentage: number;
    finished_at: string;
    test_card_id: string;
    test_card__sub_exam_id: string;
    test_card__sub_exam__exam_id: string;
}
interface QuestionAnalysis {
    question__topic: string;
    correct: number;
    wrong: number;
    skipped: number;
    total: number;
}
interface LearningPattern {
    hour: string;
    focus: number;
    tests: number;
}
interface AnalyticsData {
    quick_stats: QuickStats;
    performance_trend: PerformanceTrendPoint[];
    subject_performance: SubjectPerformance[];
    recent_activity: RecentActivity[];
    question_analysis: QuestionAnalysis[];
    learning_pattern: LearningPattern[];
    achievements: string[];
}

export default function ModernAnalyticsDashboard() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeFilter, setTimeFilter] = useState('month');

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const response = await api.get(`exams/api/performance-hub/?filter=${timeFilter}`);
                setAnalytics(response.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Could not load performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [timeFilter]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading Performance Hub...</div>;
    }
    if (error || !analytics || (analytics as any).message) {
        const message = error || (analytics as any).message || "No data available. Complete a test to see your performance.";
        return <div className="min-h-screen flex items-center justify-center text-red-400">{message}</div>;
    }

    // --- TRANSFORM DATA for UI ---
    const quickStatsData = [
        { title: 'Total Tests', value: analytics.quick_stats.total_tests_completed, change: `in ${timeFilter}`, isPositive: true, icon: BookOpen, gradient: 'from-amber-400 via-orange-500 to-red-500' },
        { title: 'Avg Score', value: `${Math.round(analytics.quick_stats.avg_score)}%`, change: 'Avg', isPositive: true, icon: TrendingUp, gradient: 'from-emerald-400 via-green-500 to-teal-500' },
        { title: 'Study Streak', value: `${analytics.quick_stats.study_streak} Days`, change: 'Active', isPositive: true, icon: Activity, gradient: 'from-violet-400 via-purple-500 to-indigo-500' },
        { title: 'Avg Accuracy', value: `${Math.round(analytics.quick_stats.accuracy)}%`, change: 'Overall', isPositive: true, icon: Target, gradient: 'from-cyan-400 via-blue-500 to-indigo-500' },
    ];
    
    const performanceTrendData = analytics.performance_trend.map(p => ({
        week: new Date(p.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: p.score,
        tests: p.tests,
    }));

    const recentActivityData = analytics.recent_activity.map(a => ({
        submissionId: a.id,
        test: a.test_card__name,
        score: Math.round(a.percentage),
        date: new Date(a.finished_at).toLocaleDateString(),
        status: a.percentage >= 90 ? 'excellent' : a.percentage >= 75 ? 'good' : 'average',
        examId: a.test_card__sub_exam__exam_id,
        subId: a.test_card__sub_exam_id,
        testId: a.test_card_id,
    }));
    
    const learningPatternData = analytics.learning_pattern.map(p => ({
        hour: `${p.hour}:00`,
        focus: p.focus
    }));

    const questionAnalysisData = analytics.question_analysis.map(item => ({
        type: item.question__topic || 'General',
        ...item
    }));
    
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'excellent': return 'from-green-500 to-emerald-600';
            case 'good': return 'from-blue-500 to-cyan-600';
            case 'average': return 'from-yellow-500 to-orange-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-6 text-white">
            {/* Animated BG */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
            </div>
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-5xl font-black text-white">Performance Hub</h1>
                            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                        </div>
                        <p className="text-gray-400 text-lg">Your journey to excellence starts here</p>
                    </div>
                    <div className="relative">
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="appearance-none px-6 py-2.5 pr-10 bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium cursor-pointer"
                        >
                            <option value="week" className="bg-gray-900">Last 7 Days</option>
                            <option value="month" className="bg-gray-900">Last 30 Days</option>
                            <option value="all-time" className="bg-gray-900">All Time</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {quickStatsData.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} className="group relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                                <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        {stat.isPositive && (
                                            <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-full">
                                                <span className="text-green-400 text-sm font-bold">{stat.change}</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm mb-1 capitalize">{stat.title}</p>
                                    <p className="text-white text-3xl font-bold mb-1">{stat.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Performance Trajectory</h2>
                        <ResponsiveContainer width="100%" height={320}>
                            <ComposedChart data={performanceTrendData}>
                                <defs><linearGradient id="scoreArea" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient></defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                                <XAxis dataKey="week" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                                <YAxis yAxisId="left" stroke="#06b6d4" tick={{ fill: '#94a3b8' }} />
                                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tick={{ fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }} labelStyle={{ color: '#f1f5f9' }}/>
                                <Area yAxisId="left" type="monotone" dataKey="score" fill="url(#scoreArea)" stroke="#06b6d4" strokeWidth={3} />
                                <Line yAxisId="right" type="monotone" dataKey="tests" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 5 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                        <h2 className="text-xl font-bold text-white mb-6">Peak Hours</h2>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={learningPatternData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                                <XAxis dataKey="hour" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }} labelStyle={{ color: '#f1f5f9' }}/>
                                <Bar dataKey="focus" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Topic-wise Analysis</h2>
                        <div className="space-y-4">
                            {questionAnalysisData.length > 0 ? questionAnalysisData.map((item, idx) => {
                                const accuracy = ((item.correct / item.total) * 100).toFixed(1);
                                return (
                                    <div key={idx} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-white font-semibold capitalize">{item.type}</span>
                                            <span className="text-cyan-400 font-bold text-lg">{accuracy}%</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 mb-2">
                                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /><span className="text-gray-400 text-sm">{item.correct}</span></div>
                                            <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /><span className="text-gray-400 text-sm">{item.wrong}</span></div>
                                            <div className="flex items-center gap-2"><MinusCircle className="w-4 h-4 text-yellow-500" /><span className="text-gray-400 text-sm">{item.skipped}</span></div>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full flex">
                                                <div className="bg-green-500" style={{ width: `${(item.correct / item.total) * 100}%` }}></div>
                                                <div className="bg-red-500" style={{ width: `${(item.wrong / item.total) * 100}%` }}></div>
                                                <div className="bg-yellow-500" style={{ width: `${(item.skipped / item.total) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : <p className="text-gray-500 text-center py-8">No topic data available for this period. Add topics to your questions!</p>}
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                        <div className="space-y-3">
                            {recentActivityData.map((activity) => (
                                <Link key={activity.submissionId} href={`/dashboard/exam/${activity.examId}/${activity.subId}/testcards/${activity.testId}/results?submissionId=${activity.submissionId}`} passHref>
                                    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">{activity.test}</h3>
                                                <p className="text-gray-500 text-sm">{activity.date}</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getStatusColor(activity.status)} text-white text-sm font-bold`}>
                                                {activity.score}%
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

