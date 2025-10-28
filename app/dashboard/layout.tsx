"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserProvider, UserProfile } from "./context/UserContext";
import Link from "next/link";
import api from 'app/Lib/api';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);

  const isFullscreenPage = pathname.includes('/questions') || pathname.includes('/results');

  useEffect(() => {
    if (!localStorage.getItem("access")) {
        router.replace("/login");
        return;
    }

    api.get("/accounts/profile/")
      .then((res) => {
        setUser(res.data as UserProfile);
      })
      .catch((error) => {
        console.error("Failed to fetch profile or refresh token:", error);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        router.replace("/login");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.replace("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-gray-700 font-medium text-lg">Loading your experience...</p>
          <div className="flex justify-center gap-1 mt-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }
    
  if (isFullscreenPage) {
    return (
      <UserProvider userProfile={user}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          {children}
        </div>
      </UserProvider>
    );
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "🏠", current: pathname === "/dashboard", gradient: "from-blue-500 to-cyan-500" },
    { name: "Exams", href: "/dashboard/exam", icon: "📚", current: pathname.startsWith("/dashboard/exam") && !isFullscreenPage, gradient: "from-purple-500 to-pink-500" },
    { name: "Full Length Tests", href: "/dashboard/full-length-tests", icon: "⏱️", current: pathname.startsWith("/dashboard/full-length-tests"), gradient: "from-orange-500 to-red-500" },
    { name: "Performance & Analytics", href: "/dashboard/performance", icon: "📈", current: pathname === "/dashboard/performance", gradient: "from-green-500 to-teal-500" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️", current: pathname === "/dashboard/settings", gradient: "from-gray-500 to-slate-600" }
  ];

  return (
    <UserProvider userProfile={user}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="flex-1 flex flex-col relative z-10">
          {/* Enhanced Top Header */}
          <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Victor
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Your Learning Companion</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 group">
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                </button>

                <button
                  onClick={() => setProfileSidebarOpen(!profileSidebarOpen)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    profileSidebarOpen 
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-lg' 
                      : 'border-gray-200 bg-white/60 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {user.username.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <span className="hidden md:block font-semibold">{user.username}</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${profileSidebarOpen ? 'rotate-180' : ''}`}
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

            {/* Enhanced Profile Sidebar */}
            <div className={`fixed right-0 top-16 bottom-0 w-80 bg-white/90 backdrop-blur-xl shadow-2xl border-l border-white/20 transform transition-transform duration-300 ease-in-out z-20 overflow-y-auto ${
              profileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              {/* Profile Header with Gradient */}
              <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 text-white overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      Profile Center
                    </h2>
                    <button 
                      onClick={() => setProfileSidebarOpen(false)} 
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200 hover:rotate-90"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 bg-white/30  rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-2xl ring-4 ring-white/50">
                        {user.username.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{user.username}</h3>
                    <p className="text-blue-100 text-sm">{user.email}</p>
                  </div>

                  {/* Reward Points with Enhanced Design */}
                  <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/30 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl filter drop-shadow-lg">💎</span>
                        <div>
                          <div className="font-bold text-2xl">{user.reward_points}</div>
                          <div className="text-xs text-blue-100">Reward Points</div>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* --- CHANGES START: Subscription Status --- */}
                {user.has_active_subscription ? (
                  <div className="mt-4 bg-green-100/30 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/30 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl filter drop-shadow-lg">👑</span>
                        <div>
                          <div className="font-bold text-lg text-white">Premium Member</div>
                          <div className="text-xs text-blue-100">
                            Expires: {user.subscription_end_date ? new Date(user.subscription_end_date).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 bg-yellow-100/30 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/30 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl filter drop-shadow-lg">⚠️</span>
                        <div>
                          <div className="font-bold text-lg text-white">No Plan Active</div>
                          <div className="text-xs text-blue-100">Unlock all features</div>
                        </div>
                      </div>
                      <Link 
                        href="/dashboard/price" // <-- This links to your pricing page
                        onClick={() => setProfileSidebarOpen(false)}
                        className="bg-white/90 text-sm text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-white transition-all transform hover:scale-105"
                      >
                        Upgrade
                      </Link>
                    </div>
                  </div>
                )}
                {/* --- CHANGES END --- */}



                </div>
              </div>

              {/* Enhanced Navigation */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                  Quick Navigation
                </h4>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        item.current 
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-blue-600'
                      }`}
                      onClick={() => setProfileSidebarOpen(false)}
                    >
                      <span className={`mr-3 text-2xl transform transition-transform duration-300 ${item.current ? 'scale-110' : 'group-hover:scale-125'}`}>
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.name}</span>
                      {item.current && (
                        <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Enhanced Quick Stats */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></span>
                  Today's Progress
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{user.completed_tests_today}</div>
                      <div className="text-xs text-blue-600 font-medium">Tests Completed</div>
                      <div className="mt-2 text-2xl">🎯</div>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold text-green-600 mb-1">{Math.round(user.average_score_today)}%</div>
                      <div className="text-xs text-green-600 font-medium">Average Score</div>
                      <div className="mt-2 text-2xl">🌟</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Logout */}
              <div className="p-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-red-600 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 border-2 border-red-100 hover:border-red-300 hover:shadow-lg transform hover:scale-105 group"
                >
                  <span className="mr-3 text-2xl group-hover:animate-bounce">🚪</span>
                  <span>Sign Out</span>
                  <svg className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {profileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-gradient-to-br from-gray-900/50 to-blue-900/50  z-10 lg:hidden transition-opacity duration-300" 
            onClick={() => setProfileSidebarOpen(false)}
          ></div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </UserProvider>
  );
}