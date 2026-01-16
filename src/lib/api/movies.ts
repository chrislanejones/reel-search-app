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

	duration?: string;
	directors?: string[];
	mainActors?: string[];
	genres?: string[];
	datePublished?: string;
	ratingValue?: number;
};

export type MoviesResponse = {
	results: Movie[];
	total: number;
	page: number;
	totalPages: number;
};

type ApiMovie = {
	id: string;
	title: string;
	summary: string;
	posterUrl?: string | null;

	// API fields
	duration?: string;
	directors?: string[];
	mainActors?: string[];
	genres?: string[];
	datePublished?: string;

	// Ratings
	rating?: string; // e.g. "PG"
	ratingValue?: number; // e.g. 8.4
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

async function getAuthToken(fetchFn: Fetch): Promise<string> {
	const response = await fetchFn(`${BASE_URL}/auth/token`);

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Failed to fetch auth token: ${text}`);
	}

	const data: { token: string } = await response.json();
	return data.token;
}

export async function fetchMovies(
	fetchFn: Fetch,
	{ query, page, genre }: FetchMoviesParams
): Promise<MoviesResponse> {
	const params = new URLSearchParams();

	params.set('search', query);
	params.set('page', String(page));
	params.set('limit', '25');
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

	const data: {
		data: ApiMovie[];
		totalPages: number;
	} = await response.json();

	return {
		results: data.data.map(mapMovie),
		total: data.data.length,
		page,
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
		summary: apiMovie.summary ?? '',
		posterUrl: apiMovie.posterUrl ?? null,

		duration: apiMovie.duration,
		directors: apiMovie.directors ?? [],
		mainActors: apiMovie.mainActors ?? [],
		genres: apiMovie.genres ?? [],
		datePublished: apiMovie.datePublished,
		ratingValue: apiMovie.ratingValue
	};
}
