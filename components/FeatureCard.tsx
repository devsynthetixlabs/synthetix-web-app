import styles from '@/styles/welcome.module.css';

type FeatureCardProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  delayClass?: string;
};

export default function FeatureCard({ icon, label, description, delayClass }: FeatureCardProps) {
  return (
    <div className={`${styles.featureCard} ${delayClass || ''}`}>
      <div className={styles.featureIcon}>{icon}</div>
      <div>
        <p className={styles.featureTitle}>{label}</p>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}
