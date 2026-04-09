import { useRef } from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
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
          onFocus={handleFocus}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button
          className="search-clear"
          disabled={!query}
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          aria-label="Clear search"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}
