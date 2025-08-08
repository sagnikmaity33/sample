'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface User {
  name?: string;
  email?: string;
}

interface ApiResponse {
  user: User;
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Default bypass unless explicitly disabled
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH !== 'false';

  useEffect(() => {
    const checkUser = async (): Promise<void> => {
      try {
        if (bypassAuth) {
          setUser({ name: 'Test User' });
          return;
        }

        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json() as ApiResponse;
          setUser(data.user);
        }
      } catch {
        // User not authenticated, do nothing
      } finally {
        setIsLoading(false);
      }
    };

    void checkUser();
  }, [bypassAuth]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-green-500"></div>
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
            <svg
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user.name || user.email}
          </span>
        </div>
        {bypassAuth ? (
          <span className="rounded-md px-3 py-2 text-xs font-medium text-gray-500 bg-gray-100">
            Bypass
          </span>
        ) : (
          <Link
            href="/api/auth/logout"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign out
          </Link>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      Sign in
    </Link>
  );
}
