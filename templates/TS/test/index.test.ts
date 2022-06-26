import { render } from '@testing-library/svelte';
import Index from './index.svelte';

describe('Test index.svelte', () => {
	it('h1 exists', () => {
		const { getByText } = render(Index);
		expect(getByText('Welcome to SvelteKit')).toBeTruthy()
	});
	it('link to svelte website', () => {
    const {container} = render(Index)
    const link = container.querySelector('p > a') as HTMLAnchorElement
    expect(link.href).toEqual('https://kit.svelte.dev/')
  });
});