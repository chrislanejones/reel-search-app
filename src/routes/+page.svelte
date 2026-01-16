<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	export let data;
</script>

<h1 class="mb-4 text-2xl font-bold">Movie Search</h1>

<SearchBar />

{#if data.results.length === 0}
	<p class="mt-6">Search for a movie to begin.</p>
{:else}
	<ul class="mt-6 space-y-4">
		{#each data.results as movie}
			<li class="rounded border p-4">
				<h2 class="font-semibold">{movie.title}</h2>
				<p class="mt-2 text-sm text-gray-600">
					{movie.summary}
				</p>
			</li>
		{/each}
	</ul>
{/if}
