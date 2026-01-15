import { fetchMovies } from '$lib/api/movies';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const query = url.searchParams.get('query');
	const page = Number(url.searchParams.get('page') ?? 1);
	const genre = url.searchParams.get('genre') || undefined;

	if (!query) {
		return {
			results: [],
			total: 0,
			page: 1,
			totalPages: 0
		};
	}

	return fetchMovies(fetch, { query, page, genre });
};
