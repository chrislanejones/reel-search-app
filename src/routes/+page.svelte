<script lang="ts">
	import { page } from '$app/stores';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;
</script>

<h1 class="mb-4 text-2xl font-bold">Movie Search</h1>

<SearchBar />

{#if $page.status === 'loading'}
	<p class="mt-6 text-gray-600">Loading results…</p>
{:else if data.results.length === 0}
	<p class="mt-6 text-gray-600">No results found. Try a different search.</p>
{:else}
	<p class="mt-4 text-sm text-gray-600">
		Page {data.page} of {data.totalPages} — showing {data.results.length} results
	</p>

	<ul class="mt-4 space-y-4">
		{#each data.results as movie}
			<li class="rounded border p-4">
				<h2 class="font-semibold">{movie.title}</h2>
				<p class="mt-2 text-sm text-gray-600">{movie.summary}</p>
			</li>
		{/each}
	</ul>

	<Pagination currentPage={data.page} totalPages={data.totalPages} />
{/if}
