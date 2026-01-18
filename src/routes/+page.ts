import { fetchMovies } from '$lib/api/movies';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ fetch, url }) => {
	const query = url.searchParams.get('query');
	const page = Number(url.searchParams.get('page') ?? 1);
	const genre = url.searchParams.get('genre') || undefined;

	// Empty state when nothing selected
	if (!query && !genre) {
		return {
			results: [],
			total: 0,
			page: 1,
			totalPages: 0,
			error: null
		};
	}

	try {
		const data = await fetchMovies(fetch, {
			query: query ?? '',
			page,
			genre
		});

		return {
			...data,
			error: null
		};
	} catch {
		return {
			results: [],
			total: 0,
			page: 1,
			totalPages: 0,
			error: 'Unable to load movies. Please try again.'
		};
	}
};
