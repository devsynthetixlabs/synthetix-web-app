import styles from '@/styles/dashboard.module.css';

type LogoProps = {
  size?: 'sm' | 'md';
  className?: string;
};

export default function Logo({ size = 'md', className }: LogoProps) {
  const dim = size === 'sm' ? 30 : 32;
  const svgSize = size === 'sm' ? 14 : 16;

  return (
    <div
      className={`${styles.logoBox} ${className || ''}`}
      style={{ width: dim, height: dim }}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"
        />
      </svg>
    </div>
  );
}
