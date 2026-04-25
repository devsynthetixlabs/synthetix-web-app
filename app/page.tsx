"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from '@/styles/auth.module.css'

export default function WelcomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      label: "Sales Intelligence",
      description:
        "Query revenue, pipeline, targets, and performance metrics using plain language.",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l5-5 4 4 5-6 4 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21H3" />
        </svg>
      ),
    },
    {
      label: "Policy Navigation",
      description:
        "Instantly locate HR, compliance, and operational policies across all departments.",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v13a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Natural Language Search",
      description:
        "Ask questions the way you'd ask a colleague — no filters or forms required.",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
      ),
    },
  ];

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background: "#F8F7F4",
        fontFamily: "'Libre Baskerville', Georgia, serif",
      }}
    >
      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

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

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fade-in { animation: fadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) both; }
        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.15s; }
        .d3 { animation-delay: 0.25s; }
        .d4 { animation-delay: 0.35s; }
        .d5 { animation-delay: 0.45s; }
        .d6 { animation-delay: 0.55s; }

        .sans { font-family: 'DM Sans', sans-serif; }

        .btn-primary {
          background: var(--accent);
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover { background: var(--accent-light); transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); }

        .feature-item {
          transition: border-color 0.2s ease;
        }
        .feature-item:hover {
          border-color: var(--accent) !important;
        }

        .nav-link {
          color: var(--ink-secondary);
          font-size: 0.875rem;
          text-decoration: none;
          font-weight: 400;
          transition: color 0.15s;
        }
        .nav-link:hover { color: var(--ink); }

        .footer-link {
          font-size: 0.78rem;
          color: var(--ink-muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-link:hover { color: var(--ink-secondary); }
      `}</style>

      {/* Header */}
      <header
        className={styles.header}
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div className={styles.headerInner}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 32,
                height: 32,
                background: "var(--accent)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
              </svg>
            </div>
            <span
              style={{
                color: "var(--ink)",
                fontSize: "1.05rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              OrgIQ
            </span>
          </div>

          {/* Nav */}
          <nav className="sans flex items-center gap-8">
            {["About", "Support", "Contact"].map((item) => (
              <a key={item} href="#" className="nav-link">{item}</a>
            ))}
            <button
              onClick={() => router.push("/login")}
              className="btn-primary"
              style={{ padding: "8px 20px", borderRadius: 6, fontSize: "0.875rem" }}
            >
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center" style={{ padding: "80px 32px 72px" }}>
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div>
              <p
                className="sans fade-in d1"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "20px",
                }}
              >
                Enterprise Knowledge Platform
              </p>

              <h1
                className="fade-in d2"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                Answers for every
                <br />
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                  sales and policy
                </em>
                <br />
                question.
              </h1>

              <p
                className="sans fade-in d3"
                style={{
                  fontSize: "1rem",
                  color: "var(--ink-secondary)",
                  lineHeight: 1.75,
                  marginBottom: "36px",
                  maxWidth: "420px",
                  fontWeight: 300,
                }}
              >
                OrgIQ gives your team instant, accurate answers from your
                organisation's sales data and policy documents — no digging
                through spreadsheets or handbooks.
              </p>

              <div className="fade-in d4 flex items-center gap-4">
                <button
                  onClick={() => router.push("/login")}
                  className="btn-primary"
                  style={{ padding: "13px 32px", borderRadius: 7, fontSize: "0.95rem" }}
                >
                  Get Started
                </button>
                <a
                  href="#"
                  className="sans"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--ink-secondary)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
                >
                  Learn more
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Feature cards */}
            <div className="fade-in d5 flex flex-col gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="feature-item"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "20px 24px",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    cursor: "default",
                  }}
                >
                  <div style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--ink)",
                        marginBottom: 4,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {f.label}
                    </p>
                    <p
                      className="sans"
                      style={{
                        fontSize: "0.84rem",
                        color: "var(--ink-secondary)",
                        lineHeight: 1.6,
                        fontWeight: 300,
                      }}
                    >
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ height: 1, background: "var(--border)" }} />
      <section
        className="sans fade-in d6"
        style={{ background: "var(--surface)", padding: "18px 32px" }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontWeight: 400 }}>
            Trusted by teams across sales, operations, and compliance.
          </p>
          <div className="flex items-center gap-6">
            {["SOC 2 Compliant", "SSO & SAML", "Role-based Access"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--ink-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ height: 1, background: "var(--border)" }} />
      <footer className="sans" style={{ padding: "18px 32px" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <p style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
            © {new Date().getFullYear()} OrgIQ. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Security"].map((link) => (
              <a key={link} href="#" className="footer-link">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}