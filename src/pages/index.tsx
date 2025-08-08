import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { ChatContent, type ChatItem } from "../components/ChatContent";
import { ChatInput } from "../components/ChatInput";
import { Header } from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [waiting, setWaiting] = useState<boolean>(false);
  const scrollToRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(
      () => scrollToRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  const generatedTextMutation = api.ai.generateText.useMutation({
    onSuccess: (data) => {
      setChatItems([
        ...chatItems,
        {
          content: data.generatedText,
          author: "AI",
        },
      ]);
    },

    onError: (error) => {
      setChatItems([
        ...chatItems,
        {
          content: error.message ?? "An error occurred",
          author: "AI",
          isError: true,
        },
      ]);
    },

    onSettled: () => {
      setWaiting(false);
      scrollToBottom();
    },
  });

  const resetMutation = api.ai.reset.useMutation();

  const handleUpdate = (prompt: string) => {
    setWaiting(true);

    setChatItems([
      ...chatItems,
      {
        content: prompt.replace(/\n/g, "\n\n"),
        author: "User",
      },
    ]);

    scrollToBottom();

    generatedTextMutation.mutate({ prompt });
  };

  const handleReset = () => {
    setChatItems([]);
    resetMutation.mutate();
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>AI Chat Playground</title>
        <meta name="description" content="AI Chat Playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col bg-white">
        <Header />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            {chatItems.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How can I help you today?</h3>
                  <p className="text-gray-500">I'm ready to assist you with any questions or tasks.</p>
                </div>
              </div>
            ) : (
              <ChatContent chatItems={chatItems} />
            )}
            <div ref={scrollToRef} />
          </div>
        </main>

        <ChatInput
          onUpdate={handleUpdate}
          onReset={handleReset}
          waiting={waiting}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Home;
