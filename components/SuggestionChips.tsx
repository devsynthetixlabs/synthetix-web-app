import styles from '@/styles/dashboard.module.css';

type SuggestionChipsProps = {
  suggestions: string[];
  onSelect: (text: string) => void;
};

export default function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className={styles.suggestionsRow}>
      {suggestions.map((s) => (
        <button
          key={s}
          className={styles.suggestionChip}
          onClick={() => onSelect(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
