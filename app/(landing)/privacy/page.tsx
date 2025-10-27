import React from 'react';

// This component displays the MockMaster Privacy Policy, formatted with Tailwind CSS.
// In a Next.js app, this would typically reside in your 'pages' directory 
// (e.g., 'pages/privacy.jsx').
export default function App() {
  const tableHeaderClasses = "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableCellClasses = "px-4 py-4 whitespace-normal text-sm text-gray-700 align-top border-t border-gray-200";

  return (
    // Page container with a light gray background and Inter font
    <div className="bg-gray-100 min-h-screen font-inter antialiased text-gray-900">
      
      {/* Main content container, centered with max-width */}
      <main className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
        
        {/* The main white card holding the Privacy Policy content */}
        
          
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Privacy Policy for MockMaster
            </h1>
            <p className="text-sm text-gray-500">
              Effective Date: October 26, 2025
            </p>
          </div>
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Introduction</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              This Privacy Policy explains how **MockMaster** (the "Platform," "we," "us," or "our") collects, uses, stores, and protects your personal information when you access and use our online mock exam platform, website, and related services.
              <br/><br/>
              By using the Platform, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not access or use the Platform.
            </p>
          </section>

          {/* Wrapper for all the numbered sections */}
          <div className="space-y-10">
            
            {/* Section 1: Information We Collect */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4"> Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information to provide and improve our services, including data you provide directly, data collected automatically, and data from third parties.
              </p>
              
              {/* Subsection A */}
              <h3 className="text-lg font-medium text-gray-700 mb-2">A. Information You Provide Directly</h3>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 leading-relaxed">
                <li><strong className="font-semibold">Identity Data:</strong> Your name, email address, username, and password.</li>
                <li><strong className="font-semibold">Payment Data:</strong> If you purchase premium access or mock exams, we collect payment card details (processed securely by our third-party payment provider and **never stored directly by us**), billing address, and transaction history.</li>
                <li><strong className="font-semibold">Communication Data:</strong> Information you provide when contacting us for support (e.g., support tickets, emails).</li>
              </ul>
              
              {/* Subsection B */}
              <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">B. Exam and Performance Data</h3>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 leading-relaxed">
                <li><strong className="font-semibold">Exam Attempt Data:</strong> Answers submitted, time spent per question, duration of the exam, and score results.</li>
                <li><strong className="font-semibold">Performance Analytics:</strong> Detailed metrics derived from your exam attempts, including accuracy rates, subject-area weaknesses, and progress tracking.</li>
              </ul>
              
              {/* Subsection C */}
              <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">C. Usage Data and Tracking Technologies</h3>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 leading-relaxed">
                <li><strong className="font-semibold">Technical Data:</strong> Internet Protocol (IP) address, browser type and version, device type, operating system, and login data.</li>
                <li><strong className="font-semibold">Usage Patterns:</strong> Pages visited, features used, and the sequence of actions on the Platform.</li>
                <li><strong className="font-semibold">Cookies and Tracking Pixels:</strong> We use cookies and similar technologies (like local storage and tracking pixels) to remember your preferences, keep you logged in, analyze trends, and administer the website.</li>
              </ul>
            </section>

            {/* Section 2: How We Use Your Information (Table) */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4"> How We Use Your Information</h2>
              <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className={tableHeaderClasses}>Purpose</th>
                      <th className={tableHeaderClasses}>Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className={tableCellClasses}><strong>Service Delivery</strong></td>
                      <td className={tableCellClasses}>To create and manage your account, verify your identity, process your purchases, and provide access to paid content.</td>
                    </tr>
                    <tr>
                      <td className={tableCellClasses}><strong>Core Functionality</strong></td>
                      <td className={tableCellClasses}>To allow you to attempt mock exams, generate test results, and provide you with personalized performance analytics and feedback.</td>
                    </tr>
                    <tr>
                      <td className={tableCellClasses}><strong>Communication</strong></td>
                      <td className={tableCellClasses}>To send you service updates, receipts, responses to support inquiries, and, if you opt-in, promotional or marketing communications.</td>
                    </tr>
                    <tr>
                      <td className={tableCellClasses}><strong>Security & Improvement</strong></td>
                      <td className={tableCellClasses}>To monitor the platform for security risks, detect fraud, analyze user behavior to improve the layout and features of the Platform, and ensure system integrity.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Legal Basis for Processing (Table) */}
           

            {/* Section 4: Data Storage and Security */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Data Storage and Security</h2>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700 leading-relaxed">
                <li><strong className="font-semibold">Security:</strong> We implement appropriate technical and organizational security measures to protect your personal data against accidental loss, unauthorized access, alteration, or disclosure. These measures include data encryption (at rest and in transit), access controls, and regular security audits.</li>
                <li><strong className="font-semibold">Location:</strong> Your data may be stored and processed on servers located outside of your jurisdiction. By using the Platform, you consent to the transfer of your data to these locations. We ensure that any such transfer complies with applicable data protection laws, often through standard contractual clauses.</li>
              </ul>
            </section>
            
            {/* Section 5: Sharing of Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Sharing of Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We **do not** sell your personal data. We only share your information with trusted third parties necessary for running our business or when legally required:
              </p>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700 leading-relaxed">
                <li><strong className="font-semibold">Payment Processors:</strong> Companies like Stripe or PayPal, which securely handle payment information and transaction processing.</li>
                <li><strong className="font-semibold">Analytics Providers:</strong> Services like Google Analytics, which help us understand usage patterns to improve the Platform. This data is usually aggregated or anonymized where possible.</li>
                <li><strong className="font-semibold">Cloud Hosting Providers:</strong> Entities that provide the infrastructure (servers and storage) on which MockMaster runs.</li>
                <li><strong className="font-semibold">Legal Compliance:</strong> If required by law, subpoena, or legal process, or if we believe sharing is necessary to protect our rights, safety, or property, or the rights, safety, or property of others.</li>
              </ul>
            </section>
            
            {/* Section 6: Cookies and Tracking Technologies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use cookies and similar tracking technologies to track activity on our Platform and hold certain information.
              </p>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700 leading-relaxed">
                <li><strong className="font-semibold">Essential Cookies:</strong> Required for the operation of the Platform (e.g., keeping you logged in).</li>
                <li><strong className="font-semibold">Analytics Cookies:</strong> Used to analyze how users interact with the Platform, helping us improve functionality and content.</li>
                <li><strong className="font-semibold">Preference Cookies:</strong> Used to remember your settings and preferences.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                You have the option to accept or refuse cookies. Most browsers allow you to manage cookie settings; however, if you choose to refuse cookies, you may not be able to use some portions of our Service.
              </p>
            </section>

            {/* Section 7: User Rights */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> User Rights (GDPR and Global Standards)</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Depending on your jurisdiction, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700 leading-relaxed">
                <li><strong className="font-semibold">Right of Access:</strong> The right to request copies of the personal data we hold about you.</li>
                <li><strong className="font-semibold">Right to Rectification:</strong> The right to request that we correct any information you believe is inaccurate or incomplete.</li>
                <li><strong className="font-semibold">Right to Erasure ('Right to be Forgotten'):</strong> The right to request that we delete your personal data under certain conditions.</li>
                <li><strong className="font-semibold">Right to Restrict Processing:</strong> The right to request that we limit the way we use your personal data.</li>
                <li><strong className="font-semibold">Right to Data Portability:</strong> The right to request that we transfer the data we have collected to another organization or directly to you, under certain conditions.</li>
                <li><strong className="font-semibold">Right to Object to Processing:</strong> The right to object to our processing of your personal data, particularly where we are relying on legitimate interests.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                To exercise any of these rights, please contact us using the contact information provided below.
              </p>
            </section>
            
            {/* Section 8: Data Retention */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for satisfying any legal, accounting, or reporting requirements.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                The criteria used to determine our retention periods include:
              </p>
              <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700 leading-relaxed">
                <li>The length of time you have an active **MockMaster** account.</li>
                <li>The nature and sensitivity of the data (e.g., exam performance data is kept to demonstrate academic progress).</li>
                <li>Any legal or regulatory obligations we are subject to (e.g., retaining payment records).</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Upon account termination or after a period of prolonged inactivity, we will either delete or anonymize your data.
              </p>
            </section>
            
            {/* Section 9: Third-Party Links or Services */}
           
            
            {/* Section 10: Children’s Privacy */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Children’s Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                The Platform is not directed at or intended for individuals under the age of **13**. We do not knowingly collect personally identifiable information from anyone under 13 years of age. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us immediately. If we become aware that we have collected personal data from a child under 13 without verification of parental consent, we will take steps to remove that information from our servers.
              </p>
            </section>
            
            {/* Section 11: Changes to This Policy */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of the policy. We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>
            
            {/* Section 12: Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or wish to exercise any of your rights, please contact our Data Protection Team at:
                <br />
                <strong className="font-semibold">Email:</strong> 
                <a 
                  href="mailto:support@mockmaster.com" 
                  className="text-blue-600 hover:underline inline-flex items-center ml-1"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                  support@mockmaster.com
                </a>
              </p>
            </section>

          </div> {/* End of sections wrapper */}
          
         {/* End of white card */}
      </main>
    </div>
  );
}
