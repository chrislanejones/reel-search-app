<script lang="ts">
	import { page } from '$app/stores';
	import { Clapperboard } from 'lucide-svelte';

	import SearchBar from '$lib/components/SearchBar.svelte';
	import GenreFilter from '$lib/components/GenreFilter.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import MovieCard from '$lib/components/MovieCard.svelte';

	export let data;
</script>

<div class="min-h-screen bg-neutral-900 text-neutral-100">
	<!-- Top Bar -->
	<header class="border-b border-neutral-800 bg-neutral-900">
		<div class="mx-auto flex max-w-7xl flex-wrap items-center gap-4 p-4">
			<h1 class="mr-auto flex items-center gap-2 text-lg font-semibold tracking-tight">
				<Clapperboard class="h-5 w-5 text-neutral-200" />
				<span>Reel Search App</span>
			</h1>

			<div class="flex flex-wrap items-center gap-3">
				<SearchBar />
				<GenreFilter />
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl p-4">
		{#if data.error}
			<div class="mt-6 rounded-md border border-red-800 bg-red-900/30 p-4 text-red-200">
				<p class="font-medium">Something went wrong</p>
				<p class="mt-1 text-sm">{data.error}</p>

				<button
					class="mt-3 rounded-md border border-red-700 bg-red-800 px-3 py-1.5 text-sm hover:bg-red-700"
					on:click={() => location.reload()}
				>
					Retry
				</button>
			</div>
		{:else if $page.status === 'loading'}
			<p class="mt-6 text-neutral-400">Loading results…</p>
		{:else if data.results.length === 0}
			<p class="mt-6 text-neutral-400">No results found. Try a different search or filter.</p>
		{:else}
			<p class="mb-4 text-sm text-neutral-400">
				Page {data.page} of {data.totalPages} — showing {data.results.length} results
			</p>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each data.results as movie}
					<MovieCard {movie} />
				{/each}
			</div>

			<div class="mt-8">
				<Pagination currentPage={data.page} totalPages={data.totalPages} />
			</div>
		{/if}
	</main>
</div>
