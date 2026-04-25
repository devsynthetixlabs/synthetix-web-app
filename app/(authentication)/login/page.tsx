'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authLoginAPI } from '@/services/auth.services';
import styles from '@/styles/auth.module.css'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { push } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authLoginAPI({ email, password });
      if (response.access_token) {
        login(response.access_token, response.user);
      } else {
        setError(response.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: '#F8F7F4', fontFamily: "'Libre Baskerville', Georgia, serif" }}
      suppressHydrationWarning={true}
    >
      <style>{``}</style>

      {/* Header — matches welcome page */}
      <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div
          className="mx-auto px-8 py-8 flex items-center justify-around"
        >
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 32, height: 32,
                background: 'var(--accent)',
                borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
              </svg>
            </div>
            <span style={{ color: 'var(--ink)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
              OrgIQ
            </span>
          </a>

          <p className={styles.sans} style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
            Need help?{' '}
            <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              Contact support
            </a>
          </p>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center" style={{ padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Card */}
          <div
            className={`${styles.d1} ${styles["fade-in"]}`}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {/* Card header */}
            <div style={{ padding: '32px 36px 28px', borderBottom: '1px solid var(--border)' }}>
              <p
                className={`${styles.sans} ${styles.d1} ${styles["fade-in"]}`}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: 10,
                }}
              >
                Secure Access
              </p>
              <h1
                className={`${styles.d2} ${styles["fade-in"]}`}
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}
              >
                Sign in to OrgIQ
              </h1>
              <p
                className={styles.sans}
                style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', fontWeight: 300 }}
              >
                Enter your credentials to access the platform.
              </p>
            </div>

            {/* Form */}
            <div style={{ padding: '28px 36px 32px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Error */}
                {error && (
                  <div
                    className={`${styles.sans} ${styles["fade-in"]}`}
                    style={{
                      padding: '11px 14px',
                      background: 'var(--error-bg)',
                      border: '1px solid var(--error-border)',
                      borderRadius: 7,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 9,
                    }}
                  >
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="var(--error-text)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    <p style={{ fontSize: '0.82rem', color: 'var(--error-text)', lineHeight: 1.5 }}>{error}</p>
                  </div>
                )}

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label
                    htmlFor="email"
                    className={styles.sans}
                    style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--ink-secondary)', letterSpacing: '0.02em' }}
                  >
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={styles["field-input"]}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label
                      htmlFor="password"
                      className={styles.sans}
                      style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--ink-secondary)', letterSpacing: '0.02em' }}
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className={styles.sans}
                      style={{ fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className={styles["field-input"]}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>

                {/* Submit */}
                <button type="submit" className={styles['btn-submit']} disabled={loading} style={{ marginTop: 4 }}>
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>

              {/* Divider */}
              <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className={styles['divider-line']} style={{ flex: 1 }} />
                <span className={styles.sans} style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => push('/signup')}>
                  or Sign Up here
                </span>
                <div className={styles['divider-line']} style={{ flex: 1 }} />
              </div>
            </div>
          </div>

          {/* Below card note */}
          <p
            className={`${styles.sans} fade-in d3`}
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: '0.78rem',
              color: 'var(--ink-muted)',
              lineHeight: 1.6,
            }}
          >
            Access is restricted to authorised personnel only.
            <br />
            By signing in, you agree to the{' '}
            <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Use</a>
            {' '}and{' '}
            <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className={styles['divider-line']} />
      <footer className={styles.sans} style={{ padding: '16px 32px' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
            © {new Date().getFullYear()} OrgIQ. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use', 'Security'].map((link) => (
              <a
                key={link}
                href="#"
                style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}