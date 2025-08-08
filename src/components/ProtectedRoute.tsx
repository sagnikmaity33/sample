'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Default to bypass unless explicitly disabled
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH !== 'false';

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      if (bypassAuth) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          await router.push('/login');
        }
      } catch (error) {
        await router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    // Run and explicitly ignore returned promise from `useEffect`
    void checkAuth();
  }, [router, bypassAuth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-green-500"></div>
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-green-500"></div>
          <span className="text-lg text-gray-600">Redirecting to sign in...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
