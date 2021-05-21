<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load(request) {
		const url = '/blog/categories/index.json';
		const res = await request.fetch(url);

		if (res.ok) {
			const categories = await res.json();
			console.log(categories);
			return {
				props: {
					categories: categories || []
				}
			};
		}

		return {
			props: {
				categories: []
			}
		};
	}

</script>

<script>
	export let categories;

</script>

<h1>Blog</h1>

<div class="submenu">
	{#each categories as category}
		<a href="/blog/categories/{category.slug}">{category.title}</a>&nbsp;|&nbsp;
	{/each}
</div>

<slot />
