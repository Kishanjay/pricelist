import type { RawRow, ParsedRow } from '../types';

/**
 * Parse a price string that may contain currency symbols, thousand separators,
 * and use either period or comma as decimal separator.
 * Examples: "€ 10,49" → 10.49, "1.299,00" → 1299, "$5.25" → 5.25
 */
function parsePrice(raw: string): number {
  // Strip everything except digits, commas, and periods
  const cleaned = raw.replace(/[^\d,.]/g, '');
  if (!cleaned) return NaN;

  // Detect European format: comma is the last separator → it's the decimal
  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');

  let normalized: string;
  if (lastComma > lastDot) {
    // European: "10.249,50" or "10,49" — comma is decimal
    normalized = cleaned.replace(/\./g, '').replace(',', '.');
  } else {
    // US/UK: "10,249.50" or "10.49" — dot is decimal
    normalized = cleaned.replace(/,/g, '');
  }

  return parseFloat(normalized);
}

export function parseRow(raw: RawRow): ParsedRow | null {
  const item = raw.item.trim();
  if (!item) return null;

  const price = parsePrice(raw.price);
  if (isNaN(price) || price <= 0) return null;

  const unitprice = parsePrice(raw.unitprice);
  if (isNaN(unitprice) || unitprice <= 0) return null;

  const quantity = raw.quantity.trim();
  const unit = (raw.unit ?? '').trim();
  const store = raw.store.trim();
  const type = (raw.type ?? '').trim().toLowerCase();
  const date = (raw.date ?? '').trim();

  return { item, price, quantity, unit, unitprice, store, type, date };
}

export function parseRows(rawRows: RawRow[]): ParsedRow[] {
  const seen = new Set<string>();
  const parsed: ParsedRow[] = [];

  for (const raw of rawRows) {
    const row = parseRow(raw);
    if (!row) continue;

    // Deduplicate by all fields
    const key = `${row.item.toLowerCase()}|${row.store.toLowerCase()}|${row.price}|${row.quantity.toLowerCase()}|${row.type}|${row.date}`;
    if (seen.has(key)) continue;
    seen.add(key);

    parsed.push(row);
  }

  return parsed;
}
