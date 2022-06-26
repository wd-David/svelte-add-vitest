import fetch from 'cross-fetch';

export const fetchPosts = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts');
	return res.json();
};

// in-source testing
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	const { posts } = await import('../mocks/handlers');

	it('Test fetchPosts', async () => {
		const result = await fetchPosts();
		expect(result).toEqual(posts);
	});
}
