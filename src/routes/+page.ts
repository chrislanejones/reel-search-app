import { fetchMovies } from '$lib/api/movies';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ fetch, url }) => {
	const query = url.searchParams.get('query');
	const page = Number(url.searchParams.get('page') ?? 1);
	const genre = url.searchParams.get('genre') || undefined;

	try {
		// ✅ Default discovery mode (top-rated)
		if (!query && !genre) {
			const data = await fetchMovies(fetch, {
				query: '',
				page,
				genre: undefined
			});

			// Sort client-side by ratingValue
			const sorted = [...data.results].sort((a, b) => (b.ratingValue ?? 0) - (a.ratingValue ?? 0));

			return {
				...data,
				results: sorted,
				mode: 'top-rated',
				error: null
			};
		}

		// ✅ Search or genre mode
		const data = await fetchMovies(fetch, {
			query: query ?? '',
			page,
			genre
		});

		return {
			...data,
			mode: query ? 'search' : 'genre',
			error: null
		};
	} catch {
		return {
			results: [],
			total: 0,
			page: 1,
			totalPages: 0,
			mode: 'error',
			error: 'Unable to load movies. Please try again.'
		};
	}
};
