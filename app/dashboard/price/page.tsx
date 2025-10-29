"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// 🟢 NEW: Import toast for professional notifications
import { toast } from "react-toastify";
import api from "app/Lib/api"; // Make sure this path is correct

// 1. Define the Plan interface to match your backend serializer
interface Plan {
  id: number;
  name: string;
  price: string;
  duration_days: number;
}

// 2. Helper function to load the Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // For button loading
  const router = useRouter();

  // 3. Fetch the subscription plans from your Django backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await api.get("api/subscriptions/plans/");
        setPlans(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch plans", err);
        setError("Could not load pricing plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // 4. Handle the entire payment flow
  const handlePayment = async (plan: Plan) => {
    setIsProcessing(true);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway. Please check your Internet connection.");
      setIsProcessing(false);
      return;
    }

    try {
      // 5. Create the order on your backend
      const orderResponse = await api.post(
        `api/subscriptions/plans/${plan.id}/create_order/`
      );
      const orderData = orderResponse.data;

      // 6. Configure and open the Razorpay checkout modal
      const options = {
        key: orderData.razorpay_key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Victor - Exam Platform", // Your app name
        description: orderData.plan_name,
        order_id: orderData.order_id,
        
        // 7. Success handler
        handler: async function (response: any) {

          console.log("Razorpay Response:", response);
          toast.success("Payment Successful! Your subscription is now active.");
          // Redirect to dashboard. The dashboard layout's useEffect
          // will automatically refetch the user's profile.
          setIsProcessing(false);
          router.push("/dashboard");
        },
        prefill: {
          name: orderData.user_name,
          email: orderData.user_email,
        },
        theme: {
          color: "#2563EB", // Blue color
        },
        modal: {
        ondismiss: function() {
          console.log("Checkout form closed by user");
          setIsProcessing(false); // Stop processing if user closes modal before paying
        }
      },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      if (err.response?.data?.error) {
        alert(`Error: ${err.response.data.error}`);
      } else {
        alert("An unknown error occurred. Please try again.");
      }
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // 8. Render loading, error, or no-plans state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-700">No subscription plans are available at this time.</p>
      </div>
    );
  }

  // 9. Render the pricing page UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Find the Perfect Plan
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Start your learning journey with our all-access plan.
          </p>
        </div>

        {/* Since you only have one plan, we highlight it as the main option */}
        <div className="mt-12 flex justify-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="w-full max-w-md transform rounded-2xl bg-white shadow-2xl ring-4 ring-blue-600 transition-all hover:scale-[1.02]"
            >
              {/* Best Value Badge */}
              <div className="relative -top-5 mx-auto w-32 rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-lg">
                BEST VALUE
              </div>

              {/* Plan Details */}
              <div className="px-8 pb-8 pt-4">
                <h2 className="text-center text-2xl font-bold text-gray-900">
                  {plan.name}
                </h2>
                <p className="mt-2 text-center text-gray-500">
                  All features, one simple price.
                </p>

                {/* Price */}
                <div className="my-6 text-center">
                  <span className="flex items-baseline justify-center">
                    <span className="text-4xl font-medium text-gray-900 line-through mr-3">
                      ₹649
                    </span>
                    <span className="text-5xl font-extrabold text-gray-900">
                      ₹{plan.price}
                    </span>
                    <span className="ml-2 text-xl font-medium text-gray-500">
                      / {plan.duration_days} days
                    </span>
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {[
                    "Access all Subject-wise Tests",
                    "Access all Full-Length Mock Tests",
                    "Detailed Performance Analytics",
                    "Personalized Revision Log",
                    "Challenge & Weekly Quizzes",
                    "Use Reward Points for Mock Tests",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Call to Action Button */}
                <button
                  onClick={() => handlePayment(plan)}
                  disabled={isProcessing}
                  className={`mt-10 w-full rounded-lg px-6 py-4 text-lg font-semibold text-white transition-all duration-300
                    ${isProcessing
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-blue-600 shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1"
                    }`}
                >
                  {isProcessing ? "Processing..." : "Get Full Access"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}