"use client";
import { useAuth } from "@/context/AuthContext";
import { aiAgentAPI } from "@/services/ai.services";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  isNew: boolean;
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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [input]);

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
    <div
      className="flex flex-col h-screen"
      style={{ background: "#F8F7F4", fontFamily: "'Libre Baskerville', Georgia, serif" }}
    >
      <style>{`

        :root {
          --ink: #1A1A18;
          --ink-secondary: #5C5C58;
          --ink-muted: #9C9C96;
          --accent: #1B4332;
          --accent-light: #2D6A4F;
          --border: #E0DED8;
          --bg: #F8F7F4;
          --surface: #FFFFFF;
        }

        * { box-sizing: border-box; }
        .sans { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg-in { animation: fadeUp 0.3s cubic-bezier(0.25,1,0.5,1) both; }

        @keyframes blink {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(-3px); }
        }
        .dot { animation: blink 1.2s ease-in-out infinite; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        .chat-input {
          width: 100%;
          resize: none;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 52px 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          line-height: 1.5;
          overflow-y: auto;
          min-height: 48px;
          max-height: 120px;
        }
        .chat-input::placeholder { color: var(--ink-muted); }
        .chat-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(27,67,50,0.07);
        }

        .send-btn {
          position: absolute;
          right: 10px;
          bottom: 10px;
          width: 32px;
          height: 32px;
          border-radius: 7px;
          background: var(--accent);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .send-btn:hover:not(:disabled) { background: var(--accent-light); transform: translateY(-1px); }
        .send-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .new-chat-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--ink-secondary);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 14px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .new-chat-btn:hover {
          border-color: var(--accent);
          color: var(--ink);
          background: var(--surface);
        }

        .suggestion-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--ink-secondary);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 7px 14px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          white-space: nowrap;
          text-align: left;
        }
        .suggestion-chip:hover { border-color: var(--accent); color: var(--ink); }

        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
      `}</style>

      {/* Header */}
      <header
        className="shrink-0"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <div className=" mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 30, height: 30,
                background: "var(--accent)",
                borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
              </svg>
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)", letterSpacing: "-0.01em" }}>
                OrgIQ
              </span>
              <span
                className="sans"
                style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginLeft: 8 }}
              >
                Sales & Policy Assistant
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={startNewChat} className="new-chat-btn">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New chat
            </button>
            <button onClick={logout} className="new-chat-btn">
              Logout
            </button>
          </div>


        </div>
      </header>

      {/* Messages */}
      <div
        className="messages-area flex-1 overflow-y-auto"
        style={{ padding: "32px 24px" }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Welcome state */}
          {isFirstMessage && (
            <div
              className="sans msg-in"
              style={{ textAlign: "center", paddingTop: 40, paddingBottom: 16 }}
            >
              <div
                style={{
                  width: 48, height: 48,
                  background: "rgba(27,67,50,0.08)",
                  borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
                </svg>
              </div>
              <h2
                style={{
                  fontSize: "1.2rem", fontWeight: 700,
                  color: "var(--ink)", letterSpacing: "-0.01em", marginBottom: 6,
                }}
              >
                How can I help you today?
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", fontWeight: 300, marginBottom: 24 }}>
                Ask me about sales figures, targets, team performance, or any company policy.
              </p>

              {/* Suggestion chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="suggestion-chip" onClick={() => handleSend(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="msg-in"
              style={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {/* AI avatar */}
              {msg.sender === "ai" && (
                <div
                  style={{
                    width: 28, height: 28, flexShrink: 0,
                    background: "rgba(27,67,50,0.1)",
                    borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginRight: 10, marginTop: 2,
                  }}
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              )}

              <div
                className="sans"
                style={{
                  maxWidth: "78%",
                  padding: "11px 16px",
                  borderRadius: msg.sender === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  ...(msg.sender === "user"
                    ? {
                      background: "var(--accent)",
                      color: "#fff",
                    }
                    : {
                      background: "var(--surface)",
                      color: "var(--ink)",
                      border: "1px solid var(--border)",
                    }),
                }}
              >
                <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="msg-in" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div
                style={{
                  width: 28, height: 28, flexShrink: 0,
                  background: "rgba(27,67,50,0.1)",
                  borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px 12px 12px 3px",
                  padding: "14px 18px",
                  display: "flex", gap: 5, alignItems: "center",
                }}
              >
                <span className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-muted)", display: "inline-block" }} />
                <span className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-muted)", display: "inline-block" }} />
                <span className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-muted)", display: "inline-block" }} />
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input footer */}
      <footer
        className="shrink-0"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "16px 24px 20px" }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ position: "relative" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about sales, targets, policies…"
              className="chat-input"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="send-btn"
              aria-label="Send"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p
            className="sans"
            style={{ fontSize: "0.7rem", color: "var(--ink-muted)", textAlign: "center", marginTop: 10 }}
          >
            OrgIQ may occasionally produce inaccurate results. Always verify critical information.
          </p>
        </div>
      </footer>
    </div>
  );
}