import React from 'react';

// This component provides a concise "About Us" page for the MockMaster platform.
// It uses Tailwind CSS for consistent, clean, and responsive web design.
export default function App() {
  return (
    // Page container with a light gray background and Inter font, matching legal pages
    <div className="bg-gray-100 min-h-screen font-inter antialiased text-gray-900">
      
      {/* Main content container, centered with max-w-4xl */}
      <main className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
        
        {/* The main white card holding the content */}
        
          
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              About MockMaster
            </h1>
            <p className="text-lg text-blue-600 font-medium">
              Turning Exam Prep into Proven Success
            </p>
          </div>
          
          {/* Core Content */}
          <section className="space-y-6 text-gray-700 leading-relaxed">
            
            <p className="text-xl font-semibold text-gray-800">
              Our Mission
            </p>
            <p>
              **MockMaster** was founded on a single principle: that the best preparation for any test is realistic, high-quality practice. We are dedicated to helping students and professionals across the globe conquer their exams by providing a robust, authentic, and highly analytical practice environment.
            </p>
            
            <p className="text-xl font-semibold text-gray-800 pt-4">
              What We Offer
            </p>
            
            <p>
              We provide an extensive library of simulated mock exams designed to mirror the structure, timing, and difficulty of real tests. But we don't just stop at scoring. Our platform uses advanced **Performance Analytics** to deliver instant, in-depth feedback. This includes identifying your key subject weaknesses, tracking your progress over time, and offering personalized insights to guide your study plan.
            </p>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Our Value Proposition</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-700">
                <li><strong className="font-semibold">Authentic Simulation:</strong> Practice under true exam conditions.</li>
                <li><strong className="font-semibold">Personalized Learning:</strong> Analytics that tell you *why* you got a question wrong, not just *that* you did.</li>
                <li><strong className="font-semibold">Measurable Progress:</strong> Track your improvement and readiness score with clarity.</li>
              </ul>
            </div>
            
            <p className="text-lg font-medium text-gray-800 pt-4">
              Join the thousands of users who are turning exam stress into confidence with **MockMaster**. Your success story starts here.
            </p>
          </section>
          
         {/* End of white card */}
      </main>
    </div>
  );
}
