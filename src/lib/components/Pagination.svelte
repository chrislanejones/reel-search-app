<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let currentPage: number;
	export let totalPages: number;

	function goTo(pageNumber: number) {
		const params = new URLSearchParams($page.url.searchParams);
		params.set('page', String(pageNumber));

		goto(`/?${params.toString()}`);
	}
</script>

{#if totalPages > 1}
	<nav class="mt-6 flex items-center gap-2">
		<button
			on:click={() => goTo(currentPage - 1)}
			disabled={currentPage === 1}
			class="rounded border px-3 py-1 disabled:opacity-50"
		>
			Prev
		</button>

		<span class="text-sm text-gray-600">
			Page {currentPage} of {totalPages}
		</span>

		<button
			on:click={() => goTo(currentPage + 1)}
			disabled={currentPage === totalPages}
			class="rounded border px-3 py-1 disabled:opacity-50"
		>
			Next
		</button>
	</nav>
{/if}
