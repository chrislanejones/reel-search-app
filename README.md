# Reel Search App

A movie discovery application built with SvelteKit that allows users to search for movies, browse by genre, and view detailed information in a clean, responsive interface.

The app focuses on URL-driven state, clear UX, and real-world API handling, rather than visual over-engineering.

---

## Features

- **Search movies by title**
  - Debounced input to reduce API calls while typing
  - Immediate submission on Enter

- **Browse movies by genre**
  - Genre selection works even without a search query
  - Selecting a genre clears the search to avoid conflicting filters

- **URL-driven state**
  - Search, genre, and pagination are synced to query parameters
  - Shareable URLs and browser back/forward support

- **Pagination**
  - Previous / Next controls
  - Disabled at boundaries

- **Poster grid layout**
  - Responsive grid from mobile to desktop

- **Movie detail dialog**
  - Opens on poster click
  - Loads full movie details on demand
  - Star rating with filled and dimmed stars

- **Dark mode UI**
  - Clean, minimal, high-contrast design

- **Graceful error handling**
  - Friendly error message with retry option

- **Responsive layout**
  - Works cleanly across screen sizes

---

## Technical Highlights

### URL-Driven State

All application state lives in the URL:

- `query` - search term
- `genre` - selected genre
- `page` - pagination

This ensures:

- State survives refreshes
- Links are shareable
- Back/forward navigation works naturally

### API Client & Normalization

All API communication is centralized in a small client module that:

- Fetches authentication tokens as needed
- Constructs API requests
- Normalizes responses into a UI-friendly shape

This isolates backend quirks and keeps components simple.

### Lazy-Loaded Movie Details

The movie list endpoint returns partial data only.

Full details are fetched only when a movie dialog is opened, improving performance and aligning with real-world API usage.

### Component Architecture

- **SearchBar** - debounced search input with URL sync
- **GenreFilter** - URL-driven genre browsing using shadcn-svelte Select
- **Pagination** - page navigation via URL updates
- **MovieCard** - poster card with dialog-based details

Each component has a single responsibility and no direct API logic.

---

## Tech Stack

- SvelteKit
- TypeScript
- Tailwind CSS
- shadcn-svelte / bits-ui
- Lucide icons
- Vite

---

## Running Locally

```bash
npm install
npm run dev
```

Then open: http://localhost:5173

---

## What I'm Most Proud Of

I'm most proud of how the app handles real-world API behavior:

- Incomplete list payloads
- Auth-required requests
- Response shape mismatches
- Conditional fetching for performance

The final solution is resilient, predictable, and easy to reason about.

---

## What I'd Add With More Time

- Accessibility improvements (ARIA labels, keyboard focus polish)
- Dynamic genre loading from the API
- Unit tests for the API client
- Page number pagination
- Dedicated movie detail route (`/movies/{id}`)

---

## Notes

This project was built as a take-home exercise. The focus was on architecture, state management, and UX clarity, not visual excess.
