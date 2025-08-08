import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Login: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH !== 'false';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (bypassAuth) {
          void router.replace('/');
          return;
        }
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          void router.push('/');
        }
      } catch (error) {
        // User not authenticated, stay on login page
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();
  }, [router, bypassAuth]);

  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };

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

  return (
    <>
      <Head>
        <title>Sign in - AI Chat Playground</title>
        <meta name="description" content="Sign in to AI Chat Playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-md px-6">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 h-12 w-12 rounded bg-green-500 flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to AI Chat Playground
            </h1>
            <p className="text-gray-600">
              Sign in to start chatting with AI
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full flex justify-center items-center px-4 py-3 text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Continue with Auth0
            </button>
            
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                By continuing, you agree to our terms of service and privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 