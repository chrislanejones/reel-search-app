/* Error Boundary */

import { describe, it, expect } from 'vitest';
import { mapMovie } from './movies';

describe('mapMovie', () => {
	it('normalizes API movie data', () => {
		const apiMovie = {
			id: '1',
			title: 'Coco',
			summary: 'A great movie',
			posterUrl: 'poster.jpg',
			duration: 'PT1H45M',
			directors: ['Lee Unkrich'],
			mainActors: ['Anthony Gonzalez'],
			genres: ['Animation'],
			datePublished: '2017-11-22',
			ratingValue: 8.4
		};

		const movie = mapMovie(apiMovie);

		expect(movie.title).toBe('Coco');
		expect(movie.duration).toBe('PT1H45M');
		expect(movie.genres).toEqual(['Animation']);
		expect(movie.ratingValue).toBe(8.4);
	});
});
