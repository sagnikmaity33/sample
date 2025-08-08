import AuthButton from './AuthButton';

export const Header = () => (
  <header className="border-b border-gray-200 bg-white px-4 py-3">
    <div className="flex justify-between items-center max-w-4xl mx-auto">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded bg-green-500 flex items-center justify-center">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">AI Chat Playground</h1>
      </div>
      <AuthButton />
    </div>
  </header>
);
