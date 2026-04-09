import type { ParsedRow, PriceItem } from '../types';

function pickBest(rows: ParsedRow[]): ParsedRow | null {
  if (rows.length === 0) return null;
  return rows.reduce((a, b) => {
    if (a.unitprice !== b.unitprice) return a.unitprice < b.unitprice ? a : b;
    if (a.date !== b.date) return a.date > b.date ? a : b;
    return a.store.toLowerCase() < b.store.toLowerCase() ? a : b;
  });
}

/**
 * Groups parsed rows by normalized item name.
 * For each group, derives the best bonus and best normal price.
 */
export function deriveBestPrices(rows: ParsedRow[]): PriceItem[] {
  const groups = new Map<string, ParsedRow[]>();

  for (const row of rows) {
    const key = row.item.toLowerCase();
    const group = groups.get(key);
    if (group) {
      group.push(row);
    } else {
      groups.set(key, [row]);
    }
  }

  const items: PriceItem[] = [];

  for (const [, group] of groups) {
    const bonusRows = group.filter((r) => r.type === 'bonus');
    const normalRows = group.filter((r) => r.type !== 'bonus');

    const bestBonus = pickBest(bonusRows);
    const bestNormal = pickBest(normalRows);

    const sorted = [...group].sort((a, b) => a.unitprice - b.unitprice);
    const displayName = sorted[0].item;

    items.push({
      item: displayName,
      searchText: displayName.toLowerCase(),
      bestNormal,
      bestBonus,
      rows: sorted,
    });
  }

  items.sort((a, b) => a.searchText.localeCompare(b.searchText));

  return items;
}
