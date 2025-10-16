// app/pricing/page.tsx
'use client';

import Link from 'next/link';
import { CheckCircle2, Star, Building, Users } from 'lucide-react';

// --- Updated Pricing Plan Data ---
const pricingPlans = [
  {
    name: 'Free',
    price: 'Free',
    billing_period: 'Forever',
    description: 'Perfect for getting started and exploring our platform.',
    features: [
      { text: '5 Mock Tests / month', included: true },
      { text: 'Basic Performance Stats', included: true },
      { text: 'Access to Free Practice Questions', included: true },
      { text: 'Limited Subject-wise Tests', included: true },
      { text: 'Detailed Analytics & Insights', included: false },
    ],
    isPopular: false,
    cta: 'Start for Free',
    link: '/login',
  },
  {
    name: 'Pro',
    price: '₹239',
    billing_period: '/ 6 months',
    description: '6 months of unlimited access and analysis to ace your exams.',
    features: [
      { text: 'Unlimited Mock Tests', included: true },
      { text: 'Detailed Analytics & Insights', included: true },
      { text: 'Access All Subject-wise Tests', included: true },
      { text: 'Weekly Quiz competetion', included: true },
      { text: 'Priority Support', included: true },
      { text: 'AI-Powered Doubt Solver', included: true },
    ],
    isPopular: true,
    cta: 'Choose Pro Plan',
    link: '/login',
  },
  {
    name: 'Institutions',
    price: 'Custom',
    billing_period: 'Per Student',
    description: 'Empower your students with our robust, white-labeled testing platform.',
    features: [
      { text: 'Admin Dashboard for Student Management', included: true },
      { text: 'Custom Branding (Your Logo & Colors)', included: true },
      { text: 'Bulk Student Enrollment', included: true },
      { text: 'Advanced Analytics for Cohorts', included: true },
      { text: 'Dedicated Account Manager', included: true },
    ],
    isPopular: false,
    cta: 'Contact Us',
    link: '/contact', // This now links to a contact page
  },
];

export default function PricingPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center">
          <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
            Our Pricing
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Plans for Individuals & Institutions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Choose a plan that fits your learning goals. Individual plans require login to proceed.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg border p-8 transition-all duration-300 flex flex-col h-full ${
                plan.isPopular ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-500 text-white text-sm font-bold rounded-full">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex-grow">
                <div className="flex items-center gap-3">
                    {plan.name === 'Institutions' ? <Building className="w-7 h-7 text-blue-600" /> : <Users className="w-7 h-7 text-blue-600" />}
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                <p className="mt-4 text-gray-500 h-12">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">
                    {plan.billing_period}
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-green-500 mr-3" />
                      <span className='text-gray-800'>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={plan.link}>
                <div className={`mt-10 block w-full text-center py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  plan.isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}