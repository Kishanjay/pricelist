import { useRef } from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  keyboardOffset: number;
}

export function SearchBar({ query, onQueryChange, keyboardOffset }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <div
      className="search-bar"
      style={keyboardOffset > 0 ? { transform: `translateY(-${keyboardOffset}px)` } : undefined}
    >
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">&#128269;</span>
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          inputMode="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search items..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query && (
          <button
            className="search-clear"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            aria-label="Clear search"
          >
            &#x2715;
          </button>
        )}
      </div>
    </div>
  );
}
