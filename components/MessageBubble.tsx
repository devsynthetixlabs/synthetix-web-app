import styles from '@/styles/dashboard.module.css';

type MessageBubbleProps = {
  text: string;
  sender: 'user' | 'ai';
};

export default function MessageBubble({ text, sender }: MessageBubbleProps) {
  return (
    <div className={`${styles.bubble} ${styles[sender]}`}>
      <div>{text}</div>
    </div>
  );
}
