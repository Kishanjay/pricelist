import { useState, useMemo } from 'react';
import type { PriceItem } from '../types';

export function useSearch(items: PriceItem[]) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter((item) => item.searchText.includes(q));
  }, [items, query]);

  return { query, setQuery, filtered };
}
