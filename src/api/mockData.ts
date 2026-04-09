import type { RawRow } from '../types';

export const MOCK_ROWS: RawRow[] = [
  { item: 'Melk', price: '€ 1,89', quantity: '1', unit: 'L', unitprice: '€ 1,89', store: 'Albert Heijn', type: 'normal', date: '2026-04-01' },
  { item: 'Melk', price: '€ 1,49', quantity: '1', unit: 'L', unitprice: '€ 1,49', store: 'Albert Heijn', type: 'bonus', date: '2026-04-01' },
  { item: 'Melk', price: '€ 1,79', quantity: '1', unit: 'L', unitprice: '€ 1,79', store: 'Jumbo', type: 'normal', date: '2026-04-01' },
  { item: 'Brood', price: '€ 2,49', quantity: '1', unit: 'stuk', unitprice: '€ 2,49', store: 'Albert Heijn', type: 'normal', date: '2026-04-01' },
  { item: 'Brood', price: '€ 1,99', quantity: '1', unit: 'stuk', unitprice: '€ 1,99', store: 'Lidl', type: 'normal', date: '2026-04-01' },
  { item: 'Brood', price: '€ 1,79', quantity: '1', unit: 'stuk', unitprice: '€ 1,79', store: 'Albert Heijn', type: 'bonus', date: '2026-04-02' },
  { item: 'Kaas', price: '€ 4,99', quantity: '400', unit: 'g', unitprice: '€ 12,48', store: 'Albert Heijn', type: 'normal', date: '2026-04-01' },
  { item: 'Kaas', price: '€ 3,99', quantity: '400', unit: 'g', unitprice: '€ 9,98', store: 'Jumbo', type: 'normal', date: '2026-04-01' },
  { item: 'Kaas', price: '€ 2,99', quantity: '400', unit: 'g', unitprice: '€ 7,48', store: 'Albert Heijn', type: 'bonus', date: '2026-04-02' },
  { item: 'Eieren', price: '€ 3,29', quantity: '10', unit: 'stuk', unitprice: '€ 0,33', store: 'Jumbo', type: 'normal', date: '2026-04-01' },
  { item: 'Eieren', price: '€ 2,99', quantity: '10', unit: 'stuk', unitprice: '€ 0,30', store: 'Lidl', type: 'normal', date: '2026-04-01' },
  { item: 'Boter', price: '€ 2,39', quantity: '250', unit: 'g', unitprice: '€ 9,56', store: 'Albert Heijn', type: 'normal', date: '2026-04-01' },
  { item: 'Boter', price: '€ 1,89', quantity: '250', unit: 'g', unitprice: '€ 7,56', store: 'Albert Heijn', type: 'bonus', date: '2026-04-02' },
  { item: 'Boter', price: '€ 2,19', quantity: '250', unit: 'g', unitprice: '€ 8,76', store: 'Jumbo', type: 'normal', date: '2026-04-01' },
  { item: 'Appels', price: '€ 2,49', quantity: '1', unit: 'kg', unitprice: '€ 2,49', store: 'Albert Heijn', type: 'normal', date: '2026-04-01' },
  { item: 'Appels', price: '€ 1,99', quantity: '1', unit: 'kg', unitprice: '€ 1,99', store: 'Lidl', type: 'normal', date: '2026-04-01' },
];
