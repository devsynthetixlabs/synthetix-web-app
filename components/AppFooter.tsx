import styles from '@/styles/welcome.module.css';

type AppFooterProps = {
  className?: string;
};

export default function AppFooter({ className }: AppFooterProps) {
  const links = ['Privacy Policy', 'Terms of Use', 'Security'];

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.footerInner}>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} OrgIQ. All rights reserved.
        </p>
        <div className={styles.footerLinks}>
          {links.map((link) => (
            <a key={link} href="#" className={styles.footerLink}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
