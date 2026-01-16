# Frequently Asked Questions


## Architecture & State Management

**Q: How did you manage application state?**

A: All state is URL-driven. Search terms, filters, and pagination are stored in query parameters, making the app shareable, bookmarkable, and compatible with browser navigation.

**Q: Why did you choose URL-based state instead of local component state?**

A: URL-based state avoids duplication, survives refreshes, and ensures back/forward navigation works correctly without additional state management.

**Q: How does changing the URL trigger new data?**

A: In SvelteKit, updating query parameters re-runs the route load() function, which fetches new data based on the updated URL.


---

## Search Functionality

**Q: How does the search feature work?**

A: The search input updates the URL with a query parameter. This triggers a data reload via the route loader without fetching directly inside the component.

**Q: Did you debounce search input?**

A: Yes. Input changes are debounced so navigation and data fetching only occur after the user pauses typing, while pressing Enter bypasses the debounce for immediate search.

**Q: Why debounce the search input?**

A: Debouncing prevents excessive navigation and API requests while typing, improving performance and user experience.


---

## Pagination

**Q: How did you implement pagination?**

A: Pagination updates a page query parameter in the URL. The pagination component does not fetch data directly — it only updates route state.

**Q: Why is pagination URL-driven?**

A: This allows pagination state to persist across refreshes, supports browser navigation, and makes paginated views shareable.

**Q: How do you prevent invalid page navigation?**

A: Pagination buttons are disabled when the user is on the first or last page, preventing out-of-range navigation.


---

## Filtering

**Q: How does the genre filter work?**

A: The genre filter updates a genre query parameter in the URL and resets pagination to page one to avoid empty result sets.

**Q: Why reset pagination when filters change?**

A: Remaining on a later page after filtering can result in empty results, which is confusing UX. Resetting ensures predictable behavior.

**Q: Why did you hardcode genres?**

A: Given the scope, I hardcoded common genres for simplicity. With more time, I'd fetch them dynamically from the genres endpoint.


---

## API Integration

**Q: How did you structure API calls?**

A: All API communication is centralized in a small client module that handles authentication, request construction, and response normalization.

**Q: Why normalize API responses?**

A: The API returned a different response shape than documented. Normalizing responses ensures the UI stays stable and decoupled from backend inconsistencies.

**Q: How did you handle authentication?**

A: The API requires a short-lived token. The client fetches a token on demand and includes it in authenticated requests, encapsulated entirely within the data layer.


---

## Loading, Empty & Error States

**Q: How did you handle loading states?**

A: The UI displays a loading indicator while route data is being fetched, providing clear feedback during navigation.

**Q: How did you handle empty results?**

A: I distinguish between the initial state and a completed search with no results, showing a clear "No results found" message with guidance.

**Q: Why separate initial and empty states?**

A: They represent different user intents. Initial state invites action; empty results indicate the action completed but found nothing.

**Q: How would you handle API errors?**

A: I'd show a non-blocking error message explaining the issue and allow users to retry, rather than crashing the page.


---

## UI & UX Decisions

**Q: How did you design result count UI?**

A: I show how many results are displayed and which page the user is on to clarify why pagination exists and set expectations.

**Q: Why did you extract components like SearchBar and Pagination?**

A: It improves readability, reusability, and keeps each component focused on a single responsibility.

**Q: How did you ensure the layout is responsive?**

A: I used flexible layout primitives and wrapping containers so components adapt naturally to different screen sizes.


---

## Framework & Tooling Choices

**Q: Why did you choose SvelteKit?**

A: SvelteKit provides a clean model for URL-driven state and server-aware data loading without requiring additional state libraries.

**Q: How did you handle SSR?**

A: SSR was disabled for this page because the API requires authenticated requests and is not SSR-friendly, making client-side fetching the safer choice.

**Q: What would you improve with more time?**

A: I'd add accessibility improvements, dynamic genre fetching, better error handling, unit tests for the API client, and a movie detail view.


---

## Product & Decision-Making

**Q: What are you most proud of in this project?**

A: I'm most proud of handling real-world API issues — undocumented behavior, authentication requirements, and response normalization — while keeping the UI clean and predictable.

**Q: How did you prioritize features?**

A: I focused on core functionality first — search, filtering, pagination — then layered UX improvements like debouncing and result feedback.

**Q: What did you intentionally leave out?**

A: I avoided over-engineering with global state libraries or premature abstractions to keep the solution focused and maintainable.
