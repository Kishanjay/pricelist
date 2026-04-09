import { useState, useEffect, useCallback } from 'react';
import { fetchSheetData } from '../api/sheets';
import { MOCK_ROWS } from '../api/mockData';
import { parseRows } from '../utils/normalize';
import { deriveBestPrices } from '../utils/derive';
import type { PriceItem } from '../types';

interface SheetDataState {
  items: PriceItem[];
  loading: boolean;
  error: string | null;
}

export function useSheetData() {
  const [state, setState] = useState<SheetDataState>({
    items: [],
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const rawRows = await fetchSheetData();
      const parsed = parseRows(rawRows);
      const items = deriveBestPrices(parsed);
      setState({ items, loading: false, error: null });
    } catch (e) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to load data',
      }));
    }
  }, []);

  const loadMock = useCallback(() => {
    const parsed = parseRows(MOCK_ROWS);
    const items = deriveBestPrices(parsed);
    setState({ items, loading: false, error: null });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, retry: load, loadMock };
}
