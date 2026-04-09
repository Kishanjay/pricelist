import { useCallback, useEffect, useRef, useState } from "react";

import { useSearch } from "../hooks/useSearch";
import { useSheetData } from "../hooks/useSheetData";
import { ErrorState } from "./ErrorState";
import { ItemList } from "./ItemList";
import { LoadingState } from "./LoadingState";
import { SearchBar } from "./SearchBar";

const PULL_THRESHOLD = 80;

export function App() {
  const { items, loading, error, retry, loadMock } = useSheetData();
  const { query, setQuery, filtered } = useSearch(items);
  const mainRef = useRef<HTMLElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const pulling = useRef(false);

  // Scroll to top when search query changes
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [query]);

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.all(names.map((n) => caches.delete(n)));
    }
    await retry();
    setRefreshing(false);
  }, [refreshing, retry]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (refreshing) return;
      const el = mainRef.current;
      if (el && el.scrollTop <= 0) {
        touchStartY.current = e.touches[0].clientY;
        pulling.current = true;
      }
    },
    [refreshing]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!pulling.current) return;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (dy > 0) {
        setPullDistance(Math.min(dy * 0.5, 120));
      }
    },
    []
  );

  const onTouchEnd = useCallback(() => {
    if (!pulling.current) return;
    pulling.current = false;
    if (pullDistance >= PULL_THRESHOLD) {
      handleRefresh();
    }
    setPullDistance(0);
  }, [pullDistance, handleRefresh]);

  const pullProgress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const activeDistance = refreshing ? 40 : pullDistance;
  const isSettling = !pulling.current && !refreshing;

  return (
    <div className="app-shell">
      <header className="header-row">
        <span className="header-title">
          <span className="header-logo">🏷</span>
          Pricelist
        </span>
        {!loading && !error && (
          <span className="header-count">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </header>
      <div
        className="main-wrapper"
        style={{
          transform: `translateY(${activeDistance}px)`,
          transition: isSettling ? "transform 0.3s ease" : "none",
        }}
      >
        <div
          className="pull-indicator"
          style={{ top: -40 }}
        >
          <span
            className={`pull-arrow ${refreshing ? "pull-spinning" : ""}`}
            style={{ opacity: refreshing ? 1 : pullProgress }}
          >
            ↻
          </span>
        </div>
        <main
          className="main"
          ref={mainRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {loading && <LoadingState />}
          {error && (
            <ErrorState message={error} onRetry={retry} onLoadMock={loadMock} />
          )}
          {!loading && !error && <ItemList items={filtered} query={query} />}
        </main>
      </div>
      <SearchBar query={query} onQueryChange={setQuery} />
    </div>
  );
}
