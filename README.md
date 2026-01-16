# Movies Explorer

A movie search application built with **SvelteKit** that allows users to search, filter, and browse movies using a public REST API.

The app supports paginated results, genre filtering, and displays key movie details such as title, summary, rating, runtime, and poster.

## ✨ Features

- Search movies by title
- Filter results by genre
- Paginated results with next/previous navigation
- Total result count display
- Clear empty and loading states
- URL-driven state (search, page, genre)

## 🥱 Technical Highlights

### API Client Normalization

One of the most significant aspects of this project is the API client layer.

Although the REST API documentation suggested a certain response structure, the actual API returned a different shape. To keep the UI stable and predictable, I implemented a normalization layer in the API client that adapts the backend response into a consistent, UI‑focused model.

One benefit of this approach is that it keeps components simple and isolates backend inconsistencies to a single place.

### Auth-Aware Data Fetching

The Movies API requires authenticated requests using a short‑lived token. The application fetches a token on demand and includes it in all movie requests, ensuring compatibility with the API while keeping the authentication logic encapsulated in the data layer.

### URL-Based State Management

Search terms, pagination, and filters are all driven by URL query parameters. This allows:

- Shareable URLs
- Back/forward browser navigation
- Easier debugging and testing

### Component Architecture

**SearchBar Component**
A reusable search input that syncs bidirectionally with URL query parameters. Includes debounced input (400ms) to reduce API calls while typing, with immediate submission on Enter.

**Pagination Component**
Handles page navigation with previous/next controls, automatically disabled at boundaries. Updates URL parameters to maintain state across navigation.

**Result Count UI**
Displays current page, total pages, and result count to give users context about their search results.

**Load / Empty States**
Clear visual feedback for loading states during data fetches and empty states when no results match the search query.

## 🛠 Tech Stack

- **SvelteKit**
- **TypeScript**
- **Tailwind CSS**
- Native Fetch API
- Vite

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Then open:

```

http://localhost:5173

```


## ✅ What I'm Most Proud Of

I'm most proud of how the API integration was handled. The final implementation reflects real‑world conditions: undocumented API behavior, authentication requirements, and SSR considerations. The resulting data layer is resilient, testable, and easy to reason about.


### 🔧 What I'd Add With More Time

- Accessibility improvements (keyboard navigation, ARIA labels)
- Unit tests for the API client
- Improved pagination controls (jump to page)
- Movie detail view using /movies/{id}


## 📄 Notes

This project was built as a take‑home exercise and focuses on clean architecture and functionality rather than visual design polish.
