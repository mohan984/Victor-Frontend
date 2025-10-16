"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CheckCircle2, Award, TrendingUp, BookOpen, Clock, ArrowRight, Star, HelpCircle } from 'lucide-react';
import { useUser } from './context/UserContext';
import api from 'app/Lib/api'; // Make sure your API instance is imported

// ----------------- INTERFACES (Added TestCard) -----------------
// This interface matches the data from your /api/test-cards/ endpoint
interface TestCard {
  id: string;
  name: string;
  duration_minutes: number;
  num_questions: number;
  reward_points_earned?: number;
}

interface Stat {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface Result {
  id: string;
  testName: string;
  score: number;
  completedAt: string;
}

// --- NEW: Interface for data from the /api/dashboard/ endpoint ---
interface SubjectPerformance {
  section_test_card__sub_exam__name: string;
  avg_percentage: number;
}

const performanceata = [
  { name: 'History', score: 62 },
  { name: 'Geography', score: 76 },
  { name: 'English', score: 85 },
];


export default function DashboardPage() {
  const user = useUser();
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentResults, setRecentResults] = useState<Result[]>([]);

  // --- NEW: State for weekly quiz and challenge test ---
  const [weeklyQuiz, setWeeklyQuiz] = useState<TestCard | null>(null);
  const [challengeTest, setChallengeTest] = useState<TestCard | null>(null);
  const [quizzesLoading, setQuizzesLoading] = useState(true);
  const [SubjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  // --- NEW: useEffect to fetch quiz and challenge data ---
  useEffect(() => {
    const fetchQuizzesAndChallenges = async () => {
      try {
        setQuizzesLoading(true);
        const [quizRes, challengeRes ,resultsRes , Subjectres] = await Promise.all([
          api.get('exams/api/weekly-quizzes/'),
          api.get('exams/api/challenges/'),
          api.get('exams/api/submissions/my_results/'),
          api.get(`exams/api/performance-hub/`)
        ]);

        // CHANGED: Set Subject Performance Data
        // CORRECTED: Set Subject Performance Data
        if (Subjectres.data && Subjectres.data.subject_performance) {
             // 1. Access the correct nested array from the API response
           const formattedData = Subjectres.data.subject_performance.map((item: any) => ({
           name: item.test_card__sub_exam__name,
            score: Math.round(item.score) // The field is 'score', not 'avg_percentage' in this endpoint
          }));

            // 2. Call the state setter function to update the component
          setSubjectPerformance(formattedData); 
         }
        // Assuming the API returns a list, we take the most recent one (the first)
        if (quizRes.data && quizRes.data.length > 0) {
          setWeeklyQuiz(quizRes.data[0]);
        }
        if (challengeRes.data && challengeRes.data.length > 0) {
          setChallengeTest(challengeRes.data[0]);
        }
        // CHANGED: Process and set recent results
        if (resultsRes.data && resultsRes.data.length > 0) {
          // The backend sends many results, so we slice the most recent 3
          const latestResults = resultsRes.data.slice(0, 3).map((item: any) => ({
            id: item.id,
            testName: item.test_card.name,
            score: Math.round(item.percentage),
            completedAt: new Date(item.finished_at).toLocaleDateString(),
          }));
          setRecentResults(latestResults);
        }
      } catch (error) {
        console.error("Failed to fetch quizzes or challenges:", error);
      } finally {
        setQuizzesLoading(false);
      }
    };

    fetchQuizzesAndChallenges();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const updatedStats: Stat[] = [
      { title: "Completed Tests", value: user.completed_tests_today.toString(), icon: CheckCircle2, color: "text-green-500" },
      { title: "Average Score", value: `${Math.round(user.average_score_today)}%`, icon: Award, color: "text-blue-500" },
      { title: "Current Streak", value: `Day ${user.current_streak} `, icon: TrendingUp, color: "text-orange-500" },
    ];
    setStats(updatedStats);
  }, [user]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // --- NEW: Reusable component for displaying Quiz/Challenge Card ---
  const ChallengeCard = ({ test, type }: { test: TestCard | null, type: 'quiz' | 'challenge' }) => {
    if (!test) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-6 h-full">
            <HelpCircle className="w-10 h-10 text-gray-300 mb-3"/>
            <h3 className="font-semibold text-gray-700">No {type === 'quiz' ? 'Weekly Quiz' : 'Challenge'} Available</h3>
            <p className="text-sm text-gray-400 mt-1">Check back later for new tests.</p>
        </div>
      );
    }
    
    return (
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${type === 'quiz' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
            {type === 'quiz' ? <BookOpen className="w-4 h-4"/> : <Star className="w-4 h-4"/>}
            <span>{type === 'quiz' ? 'Weekly Quiz' : 'Challenge Test'}</span>
          </div>
          <p className="font-semibold text-gray-800 mt-3">{test.name}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {test.duration_minutes} min</div>
            <div className="flex items-center"><HelpCircle className="w-4 h-4 mr-1.5" /> {test.num_questions} Questions</div>
          </div>
        </div>
        <Link href={`/dashboard/exam/some-exam-id/some-sub-id/testcards/${test.id}/questions`} passHref>
          <button className={`w-full mt-4 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-colors shadow-sm hover:shadow-md ${type === 'quiz' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-500 hover:bg-orange-600'}`}>
            {type === 'quiz' ? 'Start Quiz' : 'Start Challenge'}
          </button>
        </Link>
      </div>
    );
  };


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.username} 👋</h1>
        <p className="text-gray-500 mt-1">Here's your performance snapshot. Keep up the great work!</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-all hover:shadow-md hover:scale-105">
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}><stat.icon className="w-6 h-6" /></div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- REPLACED: "Upcoming Exams" is now "Weekly Quiz & Challenge Test" --- */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Quiz & Challenge Test</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {quizzesLoading ? (
                <div className="h-48 flex items-center justify-center">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <ChallengeCard test={weeklyQuiz} type="quiz" />
                  <div className="border-t md:border-t-0 md:border-l border-gray-100">
                    <ChallengeCard test={challengeTest} type="challenge" />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Performance Overview</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SubjectPerformance} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                  <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Results</h2>
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md">
                  <div>
                    <p className="font-semibold text-gray-800">{result.testName}</p>
                    <p className="text-sm text-gray-500">Completed: {result.completedAt}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${getScoreColor(result.score)}`}>{result.score}%</span>
                    <a href="#" className="text-gray-400 hover:text-blue-600"><ArrowRight className="w-5 h-5" /></a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}