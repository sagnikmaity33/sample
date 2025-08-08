import { Avatar } from "./Avatar";
import clsx from "clsx";
import { type Author } from "../utils/types";
import ReactMarkdown from "react-markdown";

export type ChatItem = {
  author: Author;
  content: string;
  isError?: boolean;
};

type Props = {
  chatItems: ChatItem[];
};

export const ChatContent = ({ chatItems }: Props) => (
  <div className="max-w-4xl mx-auto">
    {chatItems.map((chatItem, index) => (
      <div
        key={index}
        className={clsx("py-6", {
          "bg-gray-50": chatItem.author === "User",
          "bg-white": chatItem.author === "AI",
        })}
      >
        <div className="flex max-w-3xl mx-auto px-4">
          <div className="flex-shrink-0 mr-4">
            <Avatar author={chatItem.author} />
          </div>

          <div className="flex-1 min-w-0">
            <div
              className={clsx("prose prose-sm max-w-none", {
                "text-gray-900": !chatItem.isError,
                "text-red-600": chatItem.isError,
              })}
            >
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                      {children}
                    </pre>
                  ),
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold mb-3 text-gray-900">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold mb-2 text-gray-900">{children}</h3>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {chatItem.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
