'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authLoginAPI } from '@/services/auth.services';
import styles from '@/styles/auth.module.css';
import dashboardStyles from '@/styles/dashboard.module.css';
import welcomeStyles from '@/styles/welcome.module.css';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import Button from '@/components/Button';

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
    } catch {
      setError('Unable to connect. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={welcomeStyles.page}>
      <AppHeader>
        <p className={styles.headerMeta}>
          Need help?{' '}
          <a href="#" className={styles.headerLink}>
            Contact support
          </a>
        </p>
      </AppHeader>

      <div className={styles.centered}>
        <div className={styles.wrapper}>
          <div className={`${styles.card} ${styles["fade-in"]} ${styles.d1}`}>
            <div className={styles.cardHeader}>
              <p className={`${styles.eyebrow} ${styles["fade-in"]} ${styles.d1}`}>
                Secure Access
              </p>
              <h1 className={`${styles.heading} ${styles["fade-in"]} ${styles.d2}`}>
                Sign in to OrgIQ
              </h1>
              <p className={styles.subheading}>
                Enter your credentials to access the platform.
              </p>
            </div>

            <div className={styles.cardBody}>
              <form onSubmit={handleSubmit} className={styles.form}>
                {error && (
                  <div className={`${styles.errorBox} ${styles["fade-in"]}`}>
                    <svg
                      width="15"
                      height="15"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="var(--error-text)"
                      strokeWidth={2}
                      className={styles.errorIcon}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      />
                    </svg>
                    <p className={styles.errorText}>{error}</p>
                  </div>
                )}

                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <div className={styles.labelRow}>
                    <label htmlFor="password" className={styles.label}>
                      Password
                    </label>
                    <a href="#" className={styles.forgotLink}>
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>

                <button type="submit" className={styles.btnSubmit} disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>

              <div className={styles.dividerRow}>
                <div className={styles.dividerLine} />
                <span
                  className={styles.dividerLabel}
                  style={{ cursor: 'pointer' }}
                  onClick={() => push('/signup')}
                >
                  or Sign Up here
                </span>
                <div className={styles.dividerLine} />
              </div>
            </div>
          </div>

          <p className={`${styles.legal} ${styles["fade-in"]} ${styles.d3}`}>
            Access is restricted to authorised personnel only.
            <br />
            By signing in, you agree to the{' '}
            <a href="#" className={styles.legalLink}>Terms of Use</a>
            {' '}and{' '}
            <a href="#" className={styles.legalLink}>Privacy Policy</a>.
          </p>
        </div>
      </div>

      <AppFooter />
    </main>
  );
}
