<script lang="ts">
	export let data: {
		results: any[];
		total: number;
		page: number;
		totalPages: number;
	};
</script>

<h1>Movie Search</h1>

{#if data.results.length === 0}
	<p>Search for a movie to begin.</p>
{:else}
	<p>Total results: {data.total}</p>

	<ul>
		{#each data.results as movie}
			<li>
				<strong>{movie.title}</strong>
			</li>
		{/each}
	</ul>
{/if}
