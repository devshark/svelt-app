<svelte:head>
	<!-- Fonts -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>

	<!-- Material Typography -->
	<link
		rel="stylesheet"
		href="https://unpkg.com/@material/typography@11.0.0/dist/mdc.typography.css"
	/>

	<!-- SMUI -->
	<link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
	<link rel="stylesheet" href="/static/smui-dark.css" />
</svelte:head>

<!-- src/routes/__layout.svelte -->
<nav>
	<a href="/">Home</a>
	<a href="/testimonials">Testimonials</a>
	<a href="/about">About</a>
	<a href="/blog">Blog</a>
</nav>

<slot />
