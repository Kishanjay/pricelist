import { useEffect, useRef } from "react";

import { useSearch } from "../hooks/useSearch";
import { useSheetData } from "../hooks/useSheetData";
import { ErrorState } from "./ErrorState";
import { ItemList } from "./ItemList";
import { LoadingState } from "./LoadingState";
import { SearchBar } from "./SearchBar";

export function App() {
  const { items, loading, error, retry, loadMock } = useSheetData();
  const { query, setQuery, filtered } = useSearch(items);
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
          <span className="header-count">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </header>
      <main className="main" ref={mainRef}>
        {loading && <LoadingState />}
        {error && (
          <ErrorState message={error} onRetry={retry} onLoadMock={loadMock} />
        )}
        {!loading && !error && <ItemList items={filtered} query={query} />}
      </main>
      <SearchBar query={query} onQueryChange={setQuery} />
    </div>
  );
}
