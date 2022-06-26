export default definePreset({
	name: 'svelte-add-vitest',
	options: {
		// ...
	},
	handler: async() => {
		await extractTemplates()
		// ...
	},
})
