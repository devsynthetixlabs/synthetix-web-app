import styles from '@/styles/welcome.module.css';

const TAGS = ['SOC 2 Compliant', 'SSO & SAML', 'Role-based Access'];

export default function TrustBar() {
  return (
    <>
      <div className={styles.trustDivider} />
      <section className={styles.trustBar}>
        <div className={styles.trustInner}>
          <p className={styles.trustText}>
            Trusted by teams across sales, operations, and compliance.
          </p>
          <div className={styles.trustTags}>
            {TAGS.map((tag) => (
              <span key={tag} className={styles.trustTag}>
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
