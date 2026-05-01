import Logo from './Logo';
import styles from '@/styles/dashboard.module.css';
import welcomeStyles from '@/styles/welcome.module.css';

type AppHeaderProps = {
  variant?: 'dashboard' | 'welcome';
  subtitle?: string;
  children?: React.ReactNode;
};

export default function AppHeader({ variant = 'dashboard', subtitle, children }: AppHeaderProps) {
  const s = variant === 'dashboard' ? styles : welcomeStyles;

  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <div className={s.headerLeft || s.logoLink}>
          <Logo size={variant === 'dashboard' ? 'sm' : 'md'} />
          <span className={s.logoText}>OrgIQ</span>
          {subtitle && (
            <span className={styles.headerSubtitle}>{subtitle}</span>
          )}
        </div>
        <div className={s.headerRight || s.nav}>
          {children}
        </div>
      </div>
    </header>
  );
}
