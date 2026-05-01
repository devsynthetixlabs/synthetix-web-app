"use client";
import { useAuth } from "@/context/AuthContext";
import { aiAgentAPI } from "@/services/ai.services";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import WelcomeState from "@/components/WelcomeState";
import MessageRow from "@/components/MessageRow";
import LoadingDots from "@/components/LoadingDots";
import ChatInput from "@/components/ChatInput";
import styles from "@/styles/dashboard.module.css";

type Source = {
  file_name: string;
  page?: number;
};

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  isNew: boolean;
  sources?: Source[];
};

const SUGGESTIONS = [
  "What were our Q3 sales targets?",
  "Summarise the leave policy.",
  "Show me the top performing regions.",
  "What is the refund policy?",
];

export default function OrgIQChat() {
  const { logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm OrgIQ. Ask me anything about your organisation's sales data or company policies.",
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

  const handleSend = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || isLoading) return;

    const userMsg: Message = { id: uuidv4(), text: userText, sender: "user", isNew: true };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const historyForAPI = messages.slice(-5).map((m) => ({
      id: m.id,
      sender: m.sender === "user" ? "user" : "assistant",
      text: m.text,
    }));

    const response = await aiAgentAPI({ question: userText, history: historyForAPI });

    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        text: response?.answer || "I couldn't process that request. Please try again.",
        sender: "ai",
        isNew: true,
        sources: response?.sources ?? [],
      },
    ]);

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: uuidv4(),
        text: "Hello! I'm OrgIQ. Ask me anything about your organisation's sales data or company policies.",
        sender: "ai",
        isNew: false,
      },
    ]);
    setInput("");
  };

  const isFirstMessage = messages.length === 1;

  return (
    <div className={styles.dashboard}>
      <AppHeader
        subtitle="Sales & Policy Assistant"
      >
        <div className={styles.headerRight}>
          <button onClick={startNewChat} className={styles.newChatBtn}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New chat
          </button>
          <button onClick={logout} className={styles.newChatBtn}>
            Logout
          </button>
        </div>
      </AppHeader>

      <div className={styles.messagesArea}>
        <div className={styles.messagesInner}>
          {isFirstMessage && (
            <WelcomeState suggestions={SUGGESTIONS} onSuggestionSelect={handleSend} />
          )}

          {messages.map((msg) => (
            <MessageRow key={msg.id} message={msg} />
          ))}

          {isLoading && <LoadingDots />}

          <div ref={scrollRef} />
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => handleSend()}
            onKeyDown={handleKeyDown}
            isLoading={isLoading}
          />
          <p className={styles.footerNote}>
            OrgIQ may occasionally produce inaccurate results. Always verify critical information.
          </p>
        </div>
      </footer>
    </div>
  );
}
