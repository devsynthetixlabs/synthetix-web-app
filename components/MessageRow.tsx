import styles from '@/styles/dashboard.module.css';
import Avatar from './Avatar';
import MessageBubble from './MessageBubble';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
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
      </div>
    </div>
  );
}
