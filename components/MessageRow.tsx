import styles from '@/styles/dashboard.module.css';
import Avatar from './Avatar';
import MessageBubble from './MessageBubble';

type Source = {
  file_name: string;
  page?: number;
};

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  sources?: Source[];
};

type MessageRowProps = {
  message: Message;
};

export default function MessageRow({ message }: MessageRowProps) {
  return (
    <div className={`${styles.messageRow} ${styles[message.sender]} ${styles.msgIn}`}>
      <Avatar type={message.sender} />
      <div className={styles.messageContent}>
        <MessageBubble text={message.text} sender={message.sender} />
        {message.sources && message.sources.length > 0 && (
          <div>
            <div className={styles.sourcesLabel}>Sources</div>
            <div className={styles.sourcesRow}>
              {message.sources.map((src, i) => {
                const name = typeof src === 'string' ? src : src.file_name;
                const page = typeof src === 'string' ? undefined : src.page;
                return (
                  <span key={i} className={styles.sourceChip}>
                    {name}{page ? ` (p.${page})` : ''}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
