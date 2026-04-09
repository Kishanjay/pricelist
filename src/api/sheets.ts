import type { RawRow } from '../types';

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
const SHEET_RANGE = import.meta.env.VITE_SHEET_RANGE || 'Sheet1';

const EXPECTED_HEADERS = ['item', 'price', 'quantity', 'unit', 'unitprice', 'store', 'date'];

export async function fetchSheetData(): Promise<RawRow[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}?key=${API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch sheet data: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const rows: string[][] = data.values;

  if (!rows || rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((h: string) => h.trim().toLowerCase());

  // Validate that all expected headers exist
  const headerIndices: Record<string, number> = {};
  for (const expected of EXPECTED_HEADERS) {
    const idx = headers.indexOf(expected);
    if (idx === -1) {
      throw new Error(`Missing expected column: "${expected}"`);
    }
    headerIndices[expected] = idx;
  }

  // Map each data row to a RawRow using header positions
  return rows.slice(1).map((row) => ({
    item: row[headerIndices.item] ?? '',
    price: row[headerIndices.price] ?? '',
    quantity: row[headerIndices.quantity] ?? '',
    unit: row[headerIndices.unit] ?? '',
    unitprice: row[headerIndices.unitprice] ?? '',
    store: row[headerIndices.store] ?? '',
    date: row[headerIndices.date] ?? '',
  }));
}
