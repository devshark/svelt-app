<script context="module">
	export async function load(event) {
		if (event.page.params.category === 'all') {
			return {
				status: 301,
				redirect: '/blog/categories'
			};
		}

		const url = `${event.page.path}.json`;
		const res = await event.fetch(url);

		if (res.ok) {
			const category = await res.json();
			return {
				props: {
					title: category.title,
					content: category.content
				}
			};
		}

		return {
			status: 404
		};
	}

</script>

<script>
	export let title, content;

</script>

<h1>{title}</h1>

<div>{content}</div>
