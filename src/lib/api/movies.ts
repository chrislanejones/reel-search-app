// src/lib/api/movies.ts
import { PUBLIC_MOVIES_API_BASE_URL } from '$env/static/public';

/* ----------------------------------
 * Step 2: Base Config
 * ---------------------------------- */
const BASE_URL = PUBLIC_MOVIES_API_BASE_URL;

/* ----------------------------------
 * Step 1: Types (UI-focused)
 * ---------------------------------- */
export type Movie = {
	id: string;
	title: string;
	summary: string;
	posterUrl: string | null;
	runtime: number | null;
	rating: number | null;
	genres: string[];
};

export type MoviesResponse = {
	results: Movie[];
	total: number;
	page: number;
	totalPages: number;
};

type ApiGenre = {
	name: string;
};

type ApiMovie = {
	id: string;
	title: string;
	summary: string;
	posterUrl?: string | null;
	runtime?: number | null;
	rating?: number;
	ratingValue?: number;
	genres?: (ApiGenre | string | null)[];
};

/* ----------------------------------
 * Step 3: Fetch Function
 * ---------------------------------- */
type Fetch = typeof fetch;

type FetchMoviesParams = {
	query: string;
	page: number;
	genre?: string;
};

let authToken: string | null = null;

async function getAuthToken(fetchFn: Fetch): Promise<string> {
	if (authToken) return authToken;

	const response = await fetchFn(`${BASE_URL}/auth/token`);

	if (!response.ok) {
		throw new Error('Failed to fetch auth token');
	}

	const data: { token: string } = await response.json();

	authToken = data.token;
	return authToken;
}

export async function fetchMovies(
	fetchFn: Fetch,
	{ query, page, genre }: FetchMoviesParams
): Promise<MoviesResponse> {
	const params = new URLSearchParams();

	if (query) params.set('search', query);
	params.set('page', String(page));
	if (genre) params.set('genre', genre);

	const token = await getAuthToken(fetchFn);

	const response = await fetchFn(`${BASE_URL}/movies?${params.toString()}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Failed to fetch movies (${response.status}): ${text}`);
	}

	const data = await response.json();

	return {
		results: data.results.map(mapMovie),
		total: data.total,
		page: data.page,
		totalPages: data.totalPages
	};
}

/* ----------------------------------
 * Step 4: Normalization
 * ---------------------------------- */
function mapMovie(apiMovie: ApiMovie): Movie {
	return {
		id: apiMovie.id,
		title: apiMovie.title,
		summary: apiMovie.summary,
		posterUrl: apiMovie.posterUrl ?? null,
		runtime: apiMovie.runtime ?? null,
		rating: apiMovie.ratingValue ?? apiMovie.rating ?? null,
		genres: (apiMovie.genres ?? [])
			.map((g) => (typeof g === 'string' ? g : g?.name))
			.filter(Boolean) as string[]
	};
}

/* ----------------------------------
 * Step 5: (Optional) Genres
 * ---------------------------------- */
export async function fetchGenres(fetchFn: Fetch): Promise<string[]> {
	const response = await fetchFn(`${BASE_URL}/genres`);

	if (!response.ok) {
		throw new Error('Failed to fetch genres');
	}

	return response.json();
}
