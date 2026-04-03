"use client";
import { aiAgentAPI } from "@/services/ai.services";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  isNew: boolean;
};

export default function SynthetixChat() {
  // Initialize with your specific greeting format
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Synthetix AI. Ask me anything about our company documents.",
      sender: "ai",
      isNew: false,
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();

    // 1. Add User Message
    const userMsg: Message = {
      id: uuidv4(),
      text: userText,
      sender: "user",
      isNew: true,
    };

    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // 2. Prepare History for API (Last 5 messages)
    const historyForAPI = messages.slice(-5).map((m) => ({
      id: m.id,
      sender: m.sender === "user" ? "user" : "assistant",
      text: m.text,
    }));

    // 3. Call API
    const response = await aiAgentAPI({
      question: userText,
      history: historyForAPI,
    });

    // 4. Add AI Response
    if (response) {
      const aiMsg: Message = {
        id: uuidv4(),
        text: response?.answer || "I couldn't process that request.",
        sender: "ai",
        isNew: true, // Set to true so you can trigger a typing animation if desired
      };
      setMessages((prev) => [...prev, aiMsg]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: "Connection error. Please try again.",
          sender: "ai",
          isNew: true,
        },
      ]);
    }

    setIsLoading(false);
  };

  const startNewChat = () => {
    setMessages([
      {
        id: uuidv4(),
        text: "Hello! I'm Synthetix AI. Ask me anything about our company documents.",
        sender: "ai",
        isNew: false,
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <h1 className="font-semibold text-slate-700 tracking-tight">
            Omni-Agent v1
          </h1>
        </div>
        <button
          onClick={startNewChat}
          className="text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-md transition-colors border border-slate-200"
        >
          + New Chat
        </button>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 md:px-20 lg:px-60">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <p className="text-sm">How can I assist you today?</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl text-sm shadow-sm ${
                msg.sender === "user"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-700"
              }`}
            >
              {/* If isNew is true, you could wrap this in a Typewriter component */}
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Footer */}
      <footer className="p-4 bg-white border-t border-slate-200 shrink-0 md:px-20 lg:px-60">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your query..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1.5 p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-colors"
          >
            <svg
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          Omni-Agent may provide inaccurate information. Verify critical data.
        </p>
      </footer>
    </div>
  );
}
