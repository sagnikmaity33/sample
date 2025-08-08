import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = {
  onUpdate: (prompt: string) => void;
  onReset: () => void;
  waiting: boolean;
};

export const ChatInput = ({ onUpdate, onReset, waiting }: Props) => {
  const [prompt, setPrompt] = useState<string>("");
  const [rows, setRows] = useState<number>(1);

  useEffect(() => {
    const lines = prompt.split(/\r*\n/).length;
    setRows(Math.max(1, Math.min(lines, 6)));
  }, [prompt]);

  const handleUpdate = () => {
    if (prompt.trim()) {
      setPrompt("");
      onUpdate(prompt);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative">
          <div className="relative">
            <textarea
              className={clsx(
                "w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500",
                {
                  "opacity-50 cursor-not-allowed": waiting,
                }
              )}
              placeholder="Message AI Chat Playground..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleUpdate();
                }
              }}
              disabled={waiting}
              rows={rows}
              style={{ minHeight: '44px', maxHeight: '200px' }}
            />
            <button
              className={clsx(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                {
                  "opacity-50 cursor-not-allowed": waiting || !prompt.trim(),
                  "text-green-600 hover:text-green-700": prompt.trim() && !waiting,
                }
              )}
              onClick={handleUpdate}
              disabled={waiting || !prompt.trim()}
            >
              {waiting ? (
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <button
              className={clsx(
                "rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                {
                  "opacity-50 cursor-not-allowed": waiting,
                }
              )}
              onClick={onReset}
              disabled={waiting}
            >
              Clear conversation
            </button>
            
            <div className="text-xs text-gray-400">
              AI Chat Playground can make mistakes. Consider checking important information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
