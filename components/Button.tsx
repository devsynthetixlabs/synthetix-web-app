import styles from '@/styles/welcome.module.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClass = variant === 'primary' ? styles.btnPrimary : '';
  const sizeClass = size === 'sm' ? styles.btnPrimarySm : '';

  if (variant === 'outline') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${className} ${sizeClass}`.trim()}
        style={{
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: size === 'sm' ? 6 : 7,
          padding: size === 'sm' ? '6px 14px' : '13px 32px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: size === 'sm' ? '0.8rem' : '0.95rem',
          fontWeight: 500,
          color: 'var(--ink-secondary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.2s, color 0.2s, background 0.2s',
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${sizeClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
