import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			ssr: {
				noExternal: [
					'@smui/button',
					'@smui/fab',
					'@smui/icon-button',
					'@smui/list',
					'@smui/paper',
					'@smui/select',
					'@smui/textfield'
				]
			}
		},
		// hydrate the <div id="svelte"> element in src/app.html
		// adapter: node(),
		hydrate: true,
		ssr: true
	}
};

export default config;
