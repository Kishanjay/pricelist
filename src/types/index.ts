/** Raw row from the Google Sheets API (all strings) */
export interface RawRow {
  item: string;
  price: string;
  quantity: string;
  unit: string;
  unitprice: string;
  store: string;
  date: string;
}

/** Validated and parsed row */
export interface ParsedRow {
  item: string;
  price: number;
  quantity: string;
  unit: string;
  unitprice: number;
  store: string;
  date: string;
}

/** Derived best-price item for display */
export interface PriceItem {
  item: string;
  unitprice: number;
  price: number;
  quantity: string;
  unit: string;
  store: string;
  date: string;
  searchText: string;
  rows: ParsedRow[];
}
