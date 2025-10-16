"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserProvider, UserProfile } from "./context/UserContext";
import Link from "next/link";
import api from 'app/Lib/api'; // <-- 1. IMPORT YOUR API INSTANCE


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);

  const isFullscreenPage = pathname.includes('/questions') || pathname.includes('/results');

  // Fetch user profile once on mount
  useEffect(() => {
    // Check for token existence to prevent unnecessary API calls
    if (!localStorage.getItem("access")) {
        router.replace("/login");
        return;
    }

    // --- 2. REPLACED FETCH WITH API INSTANCE ---
    api.get("/accounts/profile/")
      .then((res) => {
        // With Axios, the JSON data is directly in `res.data`
        setUser(res.data as UserProfile);
      })
      .catch((error) => {
        // Your interceptor handles 401 errors (token refresh).
        // If it still fails, or another error occurs, we redirect to login.
        console.error("Failed to fetch profile or refresh token:", error);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        router.replace("/login");
      });
    // ---------------------------------------------
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.replace("/login");
  };

  // The loading state while fetching the user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
    
  // Fullscreen layout for questions and results pages
  if (isFullscreenPage) {
    return (
      <UserProvider userProfile={user}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </UserProvider>
    );
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "🏠", current: pathname === "/dashboard" },
    { name: "Exams", href: "/dashboard/exam", icon: "📚", current: pathname.startsWith("/dashboard/exam") && !isFullscreenPage },
    { name: "Full Length Tests", href: "/dashboard/full-length-tests", icon: "⏱️", current: pathname.startsWith("/dashboard/full-length-tests") },
    { name: "Performance", href: "/dashboard/performance", icon: "📈", current: pathname === "/dashboard/performance" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️", current: pathname === "/dashboard/settings" }
  ];

  return (
    <UserProvider userProfile={user}>
      <div className="min-h-screen bg-gray-50 flex">
        <div className="flex-1 flex flex-col">
          {/* Top header */}
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎓</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">MockExam</h1>
              </div>

              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zm-4-5V5a7 7 0 10-14 0v7L4 17h8z" />
                  </svg>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>

                <button
                  onClick={() => setProfileSidebarOpen(!profileSidebarOpen)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                    profileSidebarOpen ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="hidden md:block font-medium">{user.username}</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${profileSidebarOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Content with Profile Sidebar */}
          <div className="flex-1 flex relative">
            <main className={`flex-1 transition-all duration-300 ${profileSidebarOpen ? 'mr-80' : 'mr-0'}`}>
              {children}
            </main>

            {/* Profile Sidebar */}
            <div className={`fixed right-0 top-16 bottom-0 w-80 bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-20 overflow-y-auto ${
              profileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Profile & Navigation</h2>
                  <button onClick={() => setProfileSidebarOpen(false)} className="text-white hover:bg-white/20 p-1 rounded">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3 mx-auto">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold">{user.username}</h3>
                  <p className="text-blue-100">{user.email}</p>
                </div>
              </div>

                                {/* --- NEW: Reward Points Display --- */}
                  <div className="mt-4 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-cyan-300 text-lg mr-2">💎</span>
                    <span className="font-bold text-lg">{user.reward_points}</span>
                    <span className="ml-2 text-sm text-black-100">Reward Points</span>
                  </div>


              {/* Navigation */}
              <div className="p-6 border-b">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Navigation</h4>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        item.current ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      }`}
                      onClick={() => setProfileSidebarOpen(false)}
                    >
                      <span className="mr-3 text-xl">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Quick Stats */}
              <div className="p-6 border-b">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Today's Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.completed_tests_today}</div>
                    <div className="text-xs text-blue-500">Tests Today</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{Math.round(user.average_score_today)}%</div>
                    <div className="text-xs text-green-500">Avg Score</div>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <div className="p-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
                >
                  <span className="mr-3 text-xl">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {profileSidebarOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 lg:hidden" onClick={() => setProfileSidebarOpen(false)}></div>
        )}
      </div>
    </UserProvider>
  );
}