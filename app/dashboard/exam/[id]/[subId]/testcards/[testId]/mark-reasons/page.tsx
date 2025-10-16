'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import api from 'app/Lib/api';

// Types - This should include the options to display them
interface MarkedQuestion {
  id: number; // Use 'id' to match the serializer
  question_text: string;
}

interface ReasonPayload {
  question_id: number;
  reason: 'GUESS' | 'TIME' | 'CONCEPT';
}

function MarkReasonComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ id: string; subId: string; testId: string }>();

  // --- CHANGED: Read all data from the URL search parameters ---
  const submissionId = searchParams.get('submissionId');
  const markedQuestionsParam = searchParams.get('markedQuestions');

  const [markedQuestions, setMarkedQuestions] = useState<MarkedQuestion[]>([]);
  const [reasons, setReasons] = useState<Record<number, ReasonPayload['reason']>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- CHANGED: useEffect now parses data from the URL ---
  useEffect(() => {
    if (markedQuestionsParam) {
      try {
        // Decode and parse the JSON string from the URL
        const parsedQuestions = JSON.parse(decodeURIComponent(markedQuestionsParam));
        setMarkedQuestions(parsedQuestions);
      } catch (e) {
        setError('Failed to load marked questions. The data in the URL may be corrupted.');
        console.error("URL parsing error:", e);
      }
    } else {
        setError('No marked questions found in the URL.');
    }
  }, [markedQuestionsParam]);

  const handleReasonChange = (questionId: number, reason: ReasonPayload['reason']) => {
    setReasons(prev => ({ ...prev, [questionId]: reason }));
  };

  const handleFinalize = async () => {
    if (Object.keys(reasons).length !== markedQuestions.length) {
      alert('Please provide a reason for all marked questions.');
      return;
    }
    
    setSubmitting(true);
    try {
      const payload: ReasonPayload[] = Object.entries(reasons).map(([qid, reason]) => ({
        question_id: Number(qid),
        reason: reason,
      }));
      
      // --- CHANGED: Corrected the API endpoint path ---
      await api.post(`exams/api/submissions/${submissionId}/save_mark_reasons/`, {
        reasons: payload,
      });

      // --- CHANGED: Simplified redirect to the final results page ---
      router.push(
        `/dashboard/exam/${params.id}/${params.subId}/testcards/${params.testId}/results?submissionId=${submissionId}`
      );

    } catch (error) {
      console.error('Failed to save mark reasons:', error);
      alert('Could not save your reasons. Please try again.');
      setSubmitting(false);
    }
  };
  
  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Review Your Marked Questions</h1>
      <p className="text-gray-600 mb-8">This feedback helps improve your personalized revision plan.</p>

      {markedQuestions.length === 0 && !error && (
         <div className="text-center text-gray-500 p-8">Loading questions...</div>
      )}

      <div className="space-y-6">
        {markedQuestions.map((q, index) => (
            <div key={`${q.id}-${index}`}className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
 
            <p className="font-semibold text-gray-800 mb-4">{index + 1}. {q.question_text}</p>
            
            {/* Displaying the options for context */}

            
            <p className="text-sm font-medium text-gray-700 mb-3">Why did you mark this question for review?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex-1 p-3 border rounded-md has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 cursor-pointer transition-all">
                <input type="radio" name={`reason-${q.id}`} className="mr-2"
                  onChange={() => handleReasonChange(q.id, 'GUESS')} />
                Just a Guess
              </label>
              <label className="flex-1 p-3 border rounded-md has-[:checked]:bg-yellow-50 has-[:checked]:border-yellow-500 cursor-pointer transition-all">
                <input type="radio" name={`reason-${q.id}`} className="mr-2"
                  onChange={() => handleReasonChange(q.id, 'TIME')} />
                Time Pressure
              </label>
              <label className="flex-1 p-3 border rounded-md has-[:checked]:bg-red-50 has-[:checked]:border-red-500 cursor-pointer transition-all">
                <input type="radio" name={`reason-${q.id}`} className="mr-2"
                  onChange={() => handleReasonChange(q.id, 'CONCEPT')} />
                Concept Error
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleFinalize}
        disabled={submitting || Object.keys(reasons).length !== markedQuestions.length}
        className="mt-8 w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? 'Saving...' : 'Finalize & View Results'}
      </button>
    </div>
  );
}

// Wrap the component in Suspense for useSearchParams
export default function MarkReasonPage() {
    return (
        <Suspense fallback={<div className="text-center p-8">Loading Page...</div>}>
            <MarkReasonComponent />
        </Suspense>
    );
}