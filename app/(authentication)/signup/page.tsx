'use client';
import { useState } from 'react';
import styles from '@/styles/auth.module.css';
import { authSignUpAPI } from '@/services/auth.services';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirm_password) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const res = await authSignUpAPI({
                email: form.email,
                password: form.password,
                firstName: form.first_name,
                lastName: form.last_name,
            })
            if (res) {
                router.push('/login')
            }
        } catch (err) {
            setError('Unable to connect. Please check your network and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.page} suppressHydrationWarning={true}>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <a href="/" className={styles.logoLink}>
                        <div className={styles.logoBox}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
                            </svg>
                        </div>
                        <span className={styles.logoText}>OrgIQ</span>
                    </a>
                    <p className={styles.headerMeta}>
                        Already have an account?{' '}
                        <a href="/login" className={styles.headerLink}>Sign in</a>
                    </p>
                </div>
            </header>

            {/* Main */}
            <div className={styles.centered}>
                <div className={styles.wrapper}>

                    {/* Card */}
                    <div className={styles.card}>

                        {/* Card header */}
                        <div className={styles.cardHeader}>
                            <p className={styles.eyebrow}>Create Account</p>
                            <h1 className={styles.heading}>Join OrgIQ</h1>
                            <p className={styles.subheading}>
                                Set up your account to access sales intelligence and policy tools.
                            </p>
                        </div>

                        {/* Form */}
                        <div className={styles.cardBody}>
                            <form onSubmit={handleSubmit} className={styles.form}>

                                {/* Error */}
                                {error && (
                                    <div className={styles.errorBox}>
                                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={styles.errorIcon}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                        </svg>
                                        <p className={styles.errorText}>{error}</p>
                                    </div>
                                )}

                                {/* Name row */}
                                <div className={styles.row}>
                                    <div className={styles.fieldGroup}>
                                        <label htmlFor="first_name" className={styles.label}>First Name</label>
                                        <input
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            required
                                            placeholder="Jane"
                                            className={styles.input}
                                            value={form.first_name}
                                            onChange={handleChange}
                                            autoComplete="given-name"
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label htmlFor="last_name" className={styles.label}>Last Name</label>
                                        <input
                                            id="last_name"
                                            name="last_name"
                                            type="text"
                                            required
                                            placeholder="Doe"
                                            className={styles.input}
                                            value={form.last_name}
                                            onChange={handleChange}
                                            autoComplete="family-name"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className={styles.fieldGroup}>
                                    <label htmlFor="email" className={styles.label}>Work Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@company.com"
                                        className={styles.input}
                                        value={form.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Password */}
                                <div className={styles.fieldGroup}>
                                    <label htmlFor="password" className={styles.label}>Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className={styles.input}
                                        value={form.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                </div>

                                {/* Confirm password */}
                                <div className={styles.fieldGroup}>
                                    <label htmlFor="confirm_password" className={styles.label}>Confirm Password</label>
                                    <input
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className={styles.input}
                                        value={form.confirm_password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                </div>

                                <button type="submit" className={styles.btnSubmit} disabled={loading}>
                                    {loading ? 'Creating account…' : 'Create Account'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Legal */}
                    <p className={styles.legal}>
                        By creating an account you agree to the{' '}
                        <a href="#" className={styles.legalLink}>Terms of Use</a> and{' '}
                        <a href="#" className={styles.legalLink}>Privacy Policy</a>.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.footerDivider} />
            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <p className={styles.footerCopy}>© {new Date().getFullYear()} OrgIQ. All rights reserved.</p>
                    <div className={styles.footerLinks}>
                        {['Privacy Policy', 'Terms of Use', 'Security'].map((link) => (
                            <a key={link} href="#" className={styles.footerLink}>{link}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </main>
    );
}