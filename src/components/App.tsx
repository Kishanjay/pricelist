import { useRef, useEffect } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { useSearch } from '../hooks/useSearch';
import { useKeyboardOffset } from '../hooks/useKeyboardOffset';
import { ItemList } from './ItemList';
import { SearchBar } from './SearchBar';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export function App() {
  const { items, loading, error, retry, loadMock } = useSheetData();
  const { query, setQuery, filtered } = useSearch(items);
  const keyboardOffset = useKeyboardOffset();
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top when search query changes
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [query]);

  return (
    <div className="app-shell">
      <header className="header-row">
        <span className="header-title">Pricelist</span>
        {!loading && !error && (
          <span className="header-count">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
        )}
      </header>
      <main className="main" ref={mainRef}>
        {loading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={retry} onLoadMock={loadMock} />}
        {!loading && !error && <ItemList items={filtered} query={query} />}
      </main>
      <SearchBar query={query} onQueryChange={setQuery} keyboardOffset={keyboardOffset} />
    </div>
  );
}
