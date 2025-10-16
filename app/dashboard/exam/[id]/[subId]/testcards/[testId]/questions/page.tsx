'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import { Clock, Flag, AlertCircle } from 'lucide-react';
import api from 'app/Lib/api';

// Types
interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  section: string;
  topic: string;
  difficulty: string;
  positive_marks: number;
  negative_marks: number;
}

interface TestCard {
  id: string | number;
  name: string;
  sub_exam: string;
  test_type: string;
  duration_minutes: number;
  questions: Question[];
}

interface Answer {
  question_id: number;
  selected_option: string | null;
  is_marked: boolean;
  mark_reason?: string;
}


export default function QuestionsPage() {
  const params = useParams<{ id: string; subId: string; testId:string }>();
  const router = useRouter(); // CHANGED: Initialize the router
  const { id, subId, testId } = params;

  // State
  const [testCard, setTestCard] = useState<TestCard | null>(null);
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, Answer>>(new Map());
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Start test and fetch questions
  useEffect(() => {
    if (!params || !testId) {
      setLoading(false);
      setError('Invalid URL parameters');
      return;
    }

    const handlestartTest = async () => {
      try {
        // CHANGED: Corrected API path
        const response = await api.post('exams/api/submissions/start_test/', {
          test_card_id: testId,
        });
        
        const data = response.data;
        setSubmissionId(data.submission_id);
        setTestCard(data.test_card);
        setTimeLeft(data.test_card.duration_minutes * 60);
      } catch (err: any) {
        let errorMessage = 'An unexpected error occurred.';
        if (err.response) {
            if (typeof err.response.data === 'string' && err.response.data.trim().startsWith('<!DOCTYPE')) {
                errorMessage = 'The server returned an unexpected HTML response instead of JSON. This might be due to an authentication issue (please try logging in again) or a server error.';
            } else {
                errorMessage = err.response.data?.error || err.message || 'Failed to load test';
            }
        } else {
            errorMessage = err.message || 'A network error occurred.';
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    handlestartTest();
  }, [params, testId]);

  // Submit test logic
  const submitTest = useCallback(async () => {
    if (!testCard || submissionId === null) return;

    setIsSubmitting(true);

    try {
      const answersArray = Array.from(answers.values());
      // CHANGED: Corrected API path
      const response = await api.post(
        `exams/api/submissions/${submissionId}/submit_test/`,
        { answers: answersArray }
      );

      const result = response.data;

      if (result.requires_mark_review && result.marked_questions?.length > 0) {
            // --- THIS IS THE CORRECTED PART ---
            // 1. Prepare data for the URL
         const markedQuestionsParam = encodeURIComponent(JSON.stringify(result.marked_questions));
         const submissionIdParam = submissionId.toString();
         // 2. Build the URL with query params and redirect
         const markReasonsUrl = `/dashboard/exam/${id}/${subId}/testcards/${testId}/mark-reasons?submissionId=${submissionIdParam}&markedQuestions=${markedQuestionsParam}`;
        router.push(markReasonsUrl);

      } else {
            // This logic for the main results page is correct
             const resultsUrl = `/dashboard/exam/${id}/${subId}/testcards/${testId}/results?submissionId=${result.id}`;
            router.replace(resultsUrl);
      }
    } catch (err: any) {
        let errorMessage = 'An unexpected error occurred during submission.';
        if (err.response) {
            if (typeof err.response.data === 'string' && err.response.data.trim().startsWith('<!DOCTYPE')) {
                errorMessage = 'The server returned an unexpected HTML response. Please try logging in again or contact support if the issue persists.';
            } else {
                errorMessage = err.response.data?.error || err.message || 'Failed to submit test';
            }
        } else {
            errorMessage = err.message || 'A network error occurred.';
        }
        setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [testCard, submissionId, answers, id, subId, testId, router]); // CHANGED: Added router to dependencies

  // Auto submit when time runs out
  const handleAutoSubmit = useCallback(async () => {
    if (isSubmitting) return;
    await submitTest();
  }, [isSubmitting, submitTest]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || !testCard) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, testCard, handleAutoSubmit]);

  // Format time display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (!testCard) return;

    const currentQuestion = testCard.questions[currentQuestionIndex];
    const existingAnswer = answers.get(currentQuestion.id);

    const newAnswer: Answer = {
      question_id: currentQuestion.id,
      selected_option: option,
      is_marked: existingAnswer?.is_marked || false,
      mark_reason: existingAnswer?.mark_reason,
    };

    // CHANGED: Correct, immutable state update
    setAnswers(new Map(answers).set(currentQuestion.id, newAnswer));
  };

  // Toggle mark for review
  const toggleMarkForReview = () => {
    if (!testCard) return;

    const currentQuestion = testCard.questions[currentQuestionIndex];
    const existingAnswer = answers.get(currentQuestion.id);

    const newAnswer: Answer = {
      question_id: currentQuestion.id,
      selected_option: existingAnswer?.selected_option || null,
      is_marked: !existingAnswer?.is_marked,
      mark_reason: existingAnswer?.mark_reason,
    };

    // CHANGED: Correct, immutable state update
    setAnswers(new Map(answers).set(currentQuestion.id, newAnswer));
  };

  // Navigation
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (testCard && currentQuestionIndex < testCard.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Get question status
  const getQuestionStatus = (questionId: number) => {
    const answer = answers.get(questionId);
    if (!answer || !answer.selected_option) {
        return answer?.is_marked ? 'marked' : 'unanswered';
    }
    return answer.is_marked ? 'marked' : 'answered';
  };

  // Confirm submit
  const handleSubmitClick = () => {
    setShowConfirmDialog(true);
  };

  const confirmSubmit = () => {
    setShowConfirmDialog(false);
    submitTest();
  };

  // Loading and Error States (no changes needed here)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Error</h2>
          <p className="mt-2 text-gray-600 max-w-md">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!testCard) return null;

  const currentQuestion = testCard.questions[currentQuestionIndex];
  const currentAnswer = answers.get(currentQuestion.id);
  const answeredCount = Array.from(answers.values()).filter(a => a.selected_option).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{testCard.name}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {testCard.questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className={`text-lg font-semibold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {currentQuestion.section}
                    </span>
                    <span className="text-sm text-gray-500">{currentQuestion.topic}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Marks: +{currentQuestion.positive_marks} | -{currentQuestion.negative_marks}
                  </p>
                </div>
                <button
                  onClick={toggleMarkForReview}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentAnswer?.is_marked
                      ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Flag className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {currentAnswer?.is_marked ? 'Marked' : 'Mark for Review'}
                  </span>
                </button>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-lg text-gray-900 whitespace-pre-wrap">
                  {currentQuestion.question_text}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {['A', 'B', 'C', 'D'].map((option) => {
                  const optionKey = `option_${option.toLowerCase()}` as keyof Question;
                  const optionText = currentQuestion[optionKey] as string;
                  const isSelected = currentAnswer?.selected_option === option;

                  return (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {option}
                        </div>
                        <span className="flex-1 text-gray-900">{optionText}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentQuestionIndex === testCard.questions.length - 1 ? (
                <button
                  onClick={handleSubmitClick}
                  className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {/* Sidebar - Question Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>
              
              <div className="grid grid-cols-5 gap-2">
                {testCard.questions.map((q, index) => {
                  const status = getQuestionStatus(q.id);
                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(index)}
                      className={`w-10 h-10 rounded font-semibold text-sm ${
                        index === currentQuestionIndex
                          ? 'ring-2 ring-offset-2 ring-blue-600'
                          : ''
                      } ${
                        status === 'answered'
                          ? 'bg-green-500 text-white'
                          : status === 'marked'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSubmitClick}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Test?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit? You have answered {answeredCount} out of{' '}
              {testCard.questions.length} questions.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}