# Claude

All phases complete. Here's what was built:

  Project structure

  src/
    api/sheets.ts          — Fetches + maps Google Sheets API response
    types/index.ts         — RawRow, ParsedRow, PriceItem types
    utils/normalize.ts     — Parses, validates, deduplicates rows
    utils/derive.ts        — Groups by item, picks lowest unitprice
    hooks/useSheetData.ts  — Manages fetch lifecycle (loading/error/data)
    hooks/useSearch.ts     — In-memory substring search with precomputed text
    components/App.tsx     — Root: wires data + search + UI
    components/ItemList.tsx — Scrollable item list with expand/collapse
    components/ItemCard.tsx — Single item row (name, store, unitprice)
    components/ItemDetail.tsx — Expanded detail (store, price, qty, date)
    components/SearchBar.tsx — Fixed bottom search input
    components/LoadingState.tsx — Skeleton loading cards
    components/ErrorState.tsx — Error with retry button
    index.css              — All styles, dark mode, mobile-first
    main.tsx               — Entry point

  To get it running

  1. Set your Google Sheet ID and API key in .env:
  VITE_SHEET_ID=your-sheet-id
  VITE_API_KEY=your-api-key
  VITE_SHEET_RANGE=Sheet1
  2. nvm use && npm run dev — starts dev server
  3. nvm use && npm run build — production build to dist/
  4. nginx.conf is ready for VPS deployment (update server_name and SSL paths)

  Key decisions

  - Vite 8 + Node 24 (via .nvmrc)
  - Google Sheets API v4 with API key (CORS-friendly, reliable, structured JSON)
  - In-memory search: synchronous Array.filter() on precomputed lowercase text — instant for <2000 items
  - PWA: vite-plugin-pwa with StaleWhileRevalidate caching for the Sheets API endpoint
  - No backend, no router, no state management library — ~10 focused source files
