import styles from '@/styles/dashboard.module.css';
import SuggestionChips from './SuggestionChips';

type WelcomeStateProps = {
  suggestions: string[];
  onSuggestionSelect: (text: string) => void;
};

export default function WelcomeState({ suggestions, onSuggestionSelect }: WelcomeStateProps) {
  return (
    <div className={`${styles.welcome} ${styles.msgIn}`}>
      <div className={styles.welcomeIcon}>
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="var(--accent)"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z"
          />
        </svg>
      </div>
      <h2 className={styles.welcomeTitle}>How can I help you today?</h2>
      <p className={styles.welcomeDesc}>
        Ask me about sales figures, targets, team performance, or any company policy.
      </p>
      <SuggestionChips suggestions={suggestions} onSelect={onSuggestionSelect} />
    </div>
  );
}
