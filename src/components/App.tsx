import { useRef, useEffect } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { useSearch } from '../hooks/useSearch';
import { ItemList } from './ItemList';
import { SearchBar } from './SearchBar';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export function App() {
  const { items, loading, error, retry } = useSheetData();
  const { query, setQuery, filtered } = useSearch(items);
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top when search query changes
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [query]);

  return (
    <>
      <main className="main" ref={mainRef}>
        <div className="header-row">
          <span className="header-title">Pricelist</span>
          {!loading && !error && (
            <span className="header-count">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>
        {loading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && <ItemList items={filtered} query={query} />}
      </main>
      <SearchBar query={query} onQueryChange={setQuery} />
    </>
  );
}
