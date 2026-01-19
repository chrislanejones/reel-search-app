# 🎬 Reel Search App

![Reel Search App Screenshot](static/Movie-App.jpg)

## Live Demo

👉 https://reel-search-app.vercel.app/

**Reel Search App** is a movie discovery application built with **SvelteKit (Svelte 5)** that allows users to explore films through search, genre browsing, and curated discovery.

The project focuses on **clean architecture**, **URL-driven state**, and **real-world API behavior**, rather than visual over-engineering or unnecessary infrastructure.

---

## ✨ What the App Does

When you open the app, you are immediately shown a **Top-Rated Movies** discovery view — no empty screen, no dead end. From there, users can:

### 🔍 Search movies by title

- Debounced input (400ms) to avoid API spam
- Immediate search on **Enter**

### 🎭 Browse movies by genre

- Genre selection works even without a search
- Selecting a genre clears the active search to avoid conflicting intent

### 🔗 Shareable, URL-driven state

- Search, genre, and pagination live entirely in the URL
- Browser back/forward works naturally

### 📄 Paginate results

- Previous / Next navigation
- Disabled at boundaries

### 🖼 Explore via poster grid

- Responsive grid layout from mobile to desktop

### 🪟 View detailed movie information

- Clicking a poster opens a dialog
- Full movie details are fetched lazily on demand

### 🌙 Dark mode UI

- Minimal, high-contrast design

### ⚠️ Graceful error handling

- Friendly error messages with retry option

## 💪 I Want To Highlight the use of Svelte 5

I have not used it much in the past but I was able to make an entire app with it.

## ✅ What I’m Most Proud Of

I’m most proud of how the app handles **real-world API constraints** in a clean,
intentional way:

### Svelte 5 with Runes

Uses Svelte 5’s explicit reactivity model (`$state`, `$derived`, `$effect`, `$props`)
to keep component behavior predictable and easy to reason about.

### Partial List Payloads

The movie list endpoint returns lightweight data for fast browsing, while full
details are fetched only when needed.

### Auth-Required Requests

API authentication is handled centrally so UI components never need to manage
tokens or request headers directly.

### Response Shape Mismatches

Different API endpoints return different data shapes, which are normalized
before being consumed by the UI.

### Lazy Data Fetching for Performance

Full movie details are loaded only when a user opens a movie dialog, avoiding
unnecessary network requests.

### Clear Separation Between Data, Logic, and UI

API logic, routing state, and presentation components are kept separate to
improve readability and maintainability.

The final result is **resilient**, **predictable**, and **easy to reason about**.

## 🔮 What I’d Add With More Time

- Accessibility improvements (ARIA labels, keyboard navigation polish)
- Better App Design
- Use the themoviedb.org API to replace the missing movie covers
- Expanded unit test coverage

## 🧠 Technical Highlights

### URL-Driven State

All application state lives in the URL:

- `query` — search term
- `genre` — selected genre
- `page` — pagination

This ensures:

- State survives refreshes
- Links are shareable
- No duplicated client state
- Predictable navigation behavior

---

### Svelte 5 Runes (Modern Reactivity)

The app uses **Svelte 5 runes** instead of legacy reactivity:

- `$props()` for component inputs
- `$state()` for local mutable state
- `$derived()` for computed values
- `$effect()` for controlled side effects

This keeps reactivity **explicit**, **type-safe**, and **future-proof**.

---

### API Client & Normalization

All API communication is centralized in a small client module that:

- Fetches authentication tokens when required
- Constructs API requests
- Normalizes responses into a UI-friendly shape

This isolates backend quirks and prevents API details from leaking into components.

---

### Lazy-Loaded Movie Details

The movie list endpoint intentionally returns **partial data only**.

Full details (summary, cast, runtime, etc.) are fetched **only when a movie dialog is opened**, which:

- Improves performance
- Reduces unnecessary network requests
- Matches real-world API usage patterns

---

## 🧩 Component Architecture

### `SearchBar`

- Debounced input
- Syncs bidirectionally with URL state

### `GenreFilter`

- Single-select dropdown using **shadcn-svelte / bits-ui**
- Explicit single-select mode
- URL-driven state

### `Pagination`

- URL-driven navigation
- Wrapped with shadcn UI components

### `MovieCard`

- Poster-only card
- Dialog-based detail view
- Handles missing/broken poster images gracefully

### `MovieDetails`

- Pure presentational component for dialog content

Each component has a **single responsibility** and **no direct API logic**.

---

## 🥚 Easter Egg: “Play Movie”

Clicking the **Play** button inside a movie dialog takes the user to a dedicated page that explains:

> _You don’t have the rights to play this movie._

This playful touch:

- Reinforces realism
- Avoids pretending the app can stream content
- Shows product awareness and attention to detail

---

## 🛠 Tech Stack

- SvelteKit (Svelte 5)
- TypeScript
- Tailwind CSS
- shadcn-svelte / bits-ui
- Lucide icons
- Vite

---

## 🚀 Running Locally

```bash
npm install
npm run dev

http://localhost:5173
```

---

## 📌 Notes

This project was built as a **take-home exercise**.

The focus was on **architecture**, **state management**, **modern framework usage**, and **UX clarity**, not visual excess.
