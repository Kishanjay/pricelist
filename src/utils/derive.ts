import type { ParsedRow, PriceItem } from '../types';

/**
 * Groups parsed rows by normalized item name and picks the best price for each.
 *
 * Best price = lowest unitprice.
 * Tie-break: most recent date, then alphabetically first store name.
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
    const best = group.reduce((a, b) => {
      if (a.unitprice !== b.unitprice) return a.unitprice < b.unitprice ? a : b;
      if (a.date !== b.date) return a.date > b.date ? a : b;
      return a.store.toLowerCase() < b.store.toLowerCase() ? a : b;
    });

    // Sort all rows for this item by unitprice ascending
    const sorted = [...group].sort((a, b) => a.unitprice - b.unitprice);

    items.push({
      item: best.item,
      unitprice: best.unitprice,
      price: best.price,
      quantity: best.quantity,
      unit: best.unit,
      store: best.store,
      date: best.date,
      searchText: best.item.toLowerCase(),
      rows: sorted,
    });
  }

  items.sort((a, b) => a.searchText.localeCompare(b.searchText));
  return items;
}
