import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Page from './+page.svelte'

describe('Test +page.svelte', () => {
  it('h1 exists', () => {
    const { getByText } = render(Page)
    expect(getByText('Welcome to SvelteKit')).toBeTruthy()
  })
  it('link to svelte website', () => {
    render(Page)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('href', 'https://kit.svelte.dev')
  })
})
