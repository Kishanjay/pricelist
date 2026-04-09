import { useState, useEffect } from 'react';
import type { PriceItem } from '../types';
import { ItemCard } from './ItemCard';

interface ItemListProps {
  items: PriceItem[];
  query: string;
}

export function ItemList({ items, query }: ItemListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Auto-expand if single search result, collapse otherwise
  useEffect(() => {
    setExpandedIndex(items.length === 1 && query ? 0 : null);
  }, [query, items.length]);

  if (items.length === 0) {
    return <div className="empty-state">No items match your search</div>;
  }

  return (
    <>
      <div className="item-list">
        {items.map((item, i) => (
          <ItemCard
            key={item.searchText}
            item={item}
            expanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
          />
        ))}
      </div>
    </>
  );
}
