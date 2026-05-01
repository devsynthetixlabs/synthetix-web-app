"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import FeatureCard from "@/components/FeatureCard";
import TrustBar from "@/components/TrustBar";
import Button from "@/components/Button";
import styles from "@/styles/welcome.module.css";

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

  if (!mounted) return null;

  return (
    <main className={styles.page}>
      <AppHeader>
        <nav className={styles.navLinks}>
          {["About", "Support", "Contact"].map((item) => (
            <a key={item} href="#" className={styles.navLink}>{item}</a>
          ))}
          <Button size="sm" onClick={() => router.push("/login")}>
            Sign In
          </Button>
        </nav>
      </AppHeader>

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <p className={`${styles.eyebrow} ${styles.fadeIn} ${styles.d1}`}>
              Enterprise Knowledge Platform
            </p>

            <h1 className={`${styles.heading} ${styles.fadeIn} ${styles.d2}`}>
              Answers for every
              <br />
              <em>sales and policy</em>
              <br />
              question.
            </h1>

            <p className={`${styles.subheading} ${styles.fadeIn} ${styles.d3}`}>
              OrgIQ gives your team instant, accurate answers from your
              organisation&apos;s sales data and policy documents — no digging
              through spreadsheets or handbooks.
            </p>

            <div className={`${styles.ctaRow} ${styles.fadeIn} ${styles.d4}`}>
              <Button onClick={() => router.push("/login")}>
                Get Started
              </Button>
              <a href="#" className={styles.learnMore}>
                Learn more
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          <div className={`${styles.featureList} ${styles.fadeIn} ${styles.d5}`}>
            {features.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} label={f.label} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      <TrustBar />
      <AppFooter />
    </main>
  );
}
