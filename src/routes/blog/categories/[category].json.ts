import { categories } from './categories.json';
import type { Request, EndpointOutput } from '@sveltejs/kit'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export function get(request: Request): EndpointOutput {
	// console.log(request);

	const { params } = request;

	if (params.category === 'index') {
		return {
			status: 200,
			body: categories
		};
	}

	const category = categories.find((x) => x.slug === params.category);

	if (category) {
		return {
			status: 200,
			body: category
		};
	}
	return {
		status: 404,
		body: {}
	};
}
