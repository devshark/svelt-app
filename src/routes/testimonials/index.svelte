<script>
	import { onDestroy } from 'svelte';
	import Button from '@smui/button';
	import Card from '@smui/card';

	export const ssr = false;
	export let messages = [];
	export let startListening = false;

	let ws;

	function onStartListening() {
		startListening = true;
		ws = new WebSocket('ws://localhost:9898/');
		ws.onopen = function () {
			console.log('WebSocket Client Connected');
			ws.send('Hi this is web client');
		};

		ws.onmessage = function (e) {
			// console.log('message received:', e, e.data);
			messages = [JSON.parse(e.data), ...messages];
		};
	}

	function onStopListening() {
		startListening = false;
		ws && ws.close();
	}

	onDestroy(() => {
		ws && ws.close();
	});

</script>

<!-- src/routes/about.svelte -->
<svelte:head>
	<title>Testimonials</title>
	<style>
		.card-container {
			margin-bottom: 15px;
		}
	</style>
</svelte:head>

<h1>Testimonials in this site</h1>

{#if startListening}
<Button on:click={onStopListening}>Stop Listening</Button>
{:else}
<Button on:click={onStartListening}>Start Listening</Button>
{/if}

<div class="card-display">
	{#each messages as message}
		<div class="card-container">
			<Card padded>
				<div style="padding: 1rem;">
					<h2 class="mdc-typography--headline6" style="margin: 0;">
						{message.message}
					</h2>
					<h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;">
						{message.subtitle}
					</h3>
				</div>
			</Card>
		</div>
	{/each}
</div>
<!-- <section>
	{#each messages as message}
		<article>
			<p>{message.message}</p>
			<sub>{message.subtitle}</sub>
			<hr />
		</article>
	{/each}
</section> -->
