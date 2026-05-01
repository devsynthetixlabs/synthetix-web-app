import styles from '@/styles/dashboard.module.css';
import Avatar from './Avatar';

export default function LoadingDots() {
  return (
    <div className={`${styles.loadingRow} ${styles.msgIn}`}>
      <Avatar type="ai" />
      <div className={styles.loadingBubble}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
