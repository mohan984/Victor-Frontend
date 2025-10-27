import React from 'react';

// This is the main component for your Terms and Conditions page.
// In a Next.js app, you would save this file as, for example, `pages/terms.jsx`
// and it would be accessible at the `/terms` route.
export default function App() {
  return (
    // Page container with a light gray background
    <div className="bg-gray-100 min-h-screen font-inter antialiased text-gray-900">
      
      {/* Main content container, centered with max-width */}
    <main className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
        
        {/* The main white card holding the T&C content */}
                 
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Terms and Conditions
            </h1>
            <p className="text-sm text-gray-500">
              Last Updated: October 26, 2025
            </p>
          </div>
          
          {/* Introduction Paragraph */}
          <section className="mb-8">
            <p className="text-base text-gray-700 leading-relaxed">
              Welcome to <strong className="font-semibold text-gray-800">MockMaster</strong>, an online platform that provides access to digital mock exams, practice tests, and performance analytics. By using our website or mobile application (collectively, the “Platform”), you agree to comply with and be bound by these Terms and Conditions (“Terms”). Please read them carefully before accessing or using our services.
            </p>
          </section>

          {/* Wrapper for all the numbered sections */}
          <div className="space-y-8">
            
            {/* Section 1: Acceptance of Terms */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By creating an account, purchasing a subscription, or accessing any part of the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <strong className="font-semibold">Privacy Policy</strong>. If you do not agree, you must not use the Platform.
              </p>
            </section>

            {/* Section 2: Eligibility */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Eligibility</h2>
              <p className="text-gray-700 leading-relaxed">
                You must be at least <strong className="font-semibold">13 years old</strong> (or the legal minimum age in your jurisdiction) to create an account. If you are under 18, you represent that you have obtained consent from a parent or legal guardian to use this Platform. Accounts are personal and non-transferable.
              </p>
            </section>

            {/* Section 3: User Accounts */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> User Accounts</h2>
              <p className="text-gray-700 leading-relaxed">
                To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.
                If you suspect unauthorized access, you must notify us immediately at <a href="mailto:support@mockmaster.com" className="text-blue-600 hover:underline">support@mockmaster.com</a>. MockMaster is not liable for any losses caused by unauthorized account use.
              </p>
            </section>

            {/* Section 4: Purchases and Payments */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Purchases and Payments</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 leading-relaxed">
                <li>Access to mock exams or premium features may require payment.</li>
                <li>All prices are displayed in your local currency unless otherwise stated.</li>
                <li>Payments are processed securely through third-party payment gateways.</li>
                <li>
                  <strong className="font-semibold text-gray-800">Refund Policy:</strong> Refunds are only available in cases of accidental duplicate payments or verified technical issues preventing access. Refund requests must be made within <strong className="font-semibold">7 days</strong> of purchase.
                </li>
                <li>MockMaster reserves the right to change pricing or features at any time.</li>
              </ul>
            </section>

            {/* Section 5: Use of the Platform */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Use of the Platform</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  You agree to use MockMaster solely for personal educational purposes. You must <strong className="font-semibold text-gray-800">not</strong>:
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2">
                  <li>Share or distribute exam content, questions, or answers publicly.</li>
                  <li>Attempt to copy, reverse-engineer, or interfere with the Platform’s systems.</li>
                  <li>Use bots, scripts, or automated tools to access or attempt exams.</li>
                  <li>Engage in any conduct that could damage or disrupt the Platform.</li>
                </ul>
                <p>
                  Violation of these rules may result in immediate suspension or termination of your account.
                </p>
              </div>
            </section>

            {/* Section 6: Intellectual Property Rights */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Intellectual Property Rights</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  All content on the Platform—including but not limited to mock exams, software, design, graphics, and trademarks—is the exclusive property of MockMaster or its content partners. You are granted a limited, non-transferable license to use the Platform for personal, non-commercial purposes.
                </p>
                <p>
                  You may not copy, reproduce, modify, or redistribute any part of the content without prior written permission.
                </p>
              </div>
            </section>

            {/* Section 7: Data Privacy */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Data Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. We collect and process personal data as described in our <strong className="font-semibold">Privacy Policy</strong>, which complies with applicable data protection laws. By using the Platform, you consent to the collection and use of your data as outlined there.
              </p>
            </section>

            {/* Section 8: Limitation of Liability */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  MockMaster provides its services “as is” and does not guarantee that mock exams or analytics are error-free or that results will guarantee real exam success.
                </p>
                <p>
                  To the maximum extent permitted by law, MockMaster shall not be liable for any indirect, incidental, or consequential damages arising from your use or inability to use the Platform.
                </p>
              </div>
            </section>

            {/* Section 9: Account Suspension and Termination */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Account Suspension and Termination</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We reserve the right to suspend or permanently delete any account that violates these Terms or engages in fraudulent or abusive activity.
                </p>
                <p>
                  Users may terminate their account at any time by contacting <a href="mailto:support@mockmaster.com" className="text-blue-600 hover:underline">support@mockmaster.com</a>.
                </p>
              </div>
            </section>

            {/* Section 10: Changes to Terms */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                MockMaster may update or revise these Terms from time to time. Updated versions will be posted on this page with a revised “Last Updated” date. Continued use of the Platform after changes take effect constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Section 11: Governing Law and Jurisdiction */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of <strong className="font-semibold">[Insert Country or State]</strong>, without regard to conflict of law principles. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong className="font-semibold">[Insert Location]</strong>.
              </p>
            </section>

            {/* Section 12: Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions or concerns about these Terms, please contact us at:
                <br />
                {/* Email link with an icon */}
                <a 
                  href="mailto:support@mockmaster.com" 
                  className="text-blue-600 hover:underline inline-flex items-center mt-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                  support@mockmaster.com
                </a>
              </p>
            </section>

           {/* End of sections wrapper */}
          
        </div> {/* End of white card */}
    </main>
    </div>
  );
}
