"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from 'app/Lib/api';

// Define the type for the test object
interface FullLengthTest {
    id: string;
    name: string;
    price_points: number;
    question_count: number; // Assuming this key comes from the API
    duration_minutes: number;
}

// Define the type for the API response when checking status
interface UnlockStatus {
    is_unlocked: boolean;
    can_afford: boolean;
    user_points: number;
}

// --- 1. UPDATE THE PROPS TO ACCEPT PARENT IDs ---
// The component now needs examId and subExamId to build the correct URL
export default function FullLengthTestCard({ test, examId, subExamId }: { 
    test: FullLengthTest,
    examId: string,
    subExamId: string 
}) {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleViewClick = async () => {
        setIsProcessing(true);
        try {
            // Check the latest unlock status from the server
            const statusRes = await api.get(`exams/api/test-cards/${test.id}/check_unlock_status/`);
            const currentStatus: UnlockStatus = statusRes.data;

            // --- 2. BUILD THE CORRECT DYNAMIC URL ---
            // The path must match your file structure: /dashboard/full-length-tests/[id]/[subId]/...
            const questionsUrl = `/dashboard/exam/${examId}/${subExamId}/testcards/${test.id}/questions`;

            // If already unlocked, navigate directly
            if (currentStatus.is_unlocked) {
                router.push(questionsUrl);
                return; 
            }

            // If not unlocked, check if the user can afford it
            if (currentStatus.can_afford) {
                const confirmed = window.confirm(
                    `This test costs ${test.price_points} points. Would you like to unlock it?`
                );

                if (confirmed) {
                    // Call the unlock endpoint
                    await api.post(`exams/api/test-cards/${test.id}/unlock_full_length_test/`);
                    // Immediately redirect to questions after unlocking
                    router.push(questionsUrl);
                }
            } else {
                // If the user cannot afford it
                alert(`You need ${test.price_points} points to unlock this test, but you only have ${currentStatus.user_points}.`);
            }
        } catch (error) {
            console.error("An error occurred during the unlock process:", error);
            alert("An error occurred. Please refresh the page and try again.");
        } finally {
            setIsProcessing(false);
        }
    };
    
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{test.name}</h3>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                        <span className="mr-1.5">📝</span>
                        {/* --- 3. FIX A MINOR TYPO --- */}
                        {/* The interface used question_count, so we use that here */}
                        <span>{test.question_count} MCQs</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-1.5">⏱️</span>
                        <span>{test.duration_minutes} Minutes</span>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 p-4 flex justify-between items-center rounded-b-xl">
                <div className="text-lg font-bold text-purple-600 flex items-center">
                    <span className="mr-2">💎</span>
                    {test.price_points} Points
                </div>
                <button 
                    onClick={handleViewClick}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isProcessing ? 'Processing...' : 'View Test'}
                </button>
            </div>
        </div>
    );
}
