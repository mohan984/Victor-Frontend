"use client";

import { createContext, useContext, ReactNode } from 'react';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  reward_points: number;
  completed_tests_today: number;
  average_score_today: number;
  current_streak: number;
  has_active_subscription: boolean;
  subscription_end_date: string | null;
}

const UserContext = createContext<UserProfile | null>(null);

export function UserProvider({ 
  children, 
  userProfile 
}: { 
  children: ReactNode; 
  userProfile: UserProfile 
}) {
  return (
    <UserContext.Provider value={userProfile}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

