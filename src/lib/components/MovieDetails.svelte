<script lang="ts">
	import { Star } from 'lucide-svelte';

	export let details: {
		title: string;
		summary: string;
		duration?: string;
		directors?: string[];
		mainActors?: string[];
		genres?: string[];
		datePublished?: string;
		ratingValue?: number;
	};

	const maxStars = 10;
</script>

<div class="space-y-4 text-neutral-200">
	<h2 class="text-2xl font-semibold text-neutral-100">
		{details.title}
	</h2>

	{#if details.ratingValue !== undefined}
		<div class="flex items-center gap-1">
			{#each Array(maxStars) as _, i}
				<Star
					size={18}
					class={i < Math.round(details.ratingValue)
						? 'fill-yellow-400 text-yellow-400'
						: 'text-neutral-600'}
				/>
			{/each}
			<span class="ml-2 text-sm text-neutral-400">
				{details.ratingValue} / 10
			</span>
		</div>
	{/if}

	{#if details.datePublished}
		<p class="text-sm text-neutral-400">
			Released: {details.datePublished}
		</p>
	{/if}

	<p class="text-sm leading-relaxed text-neutral-300">
		{details.summary}
	</p>

	{#if details.genres?.length}
		<p class="text-sm text-neutral-300">
			<span class="font-medium text-neutral-100">Genres:</span>
			{details.genres.join(', ')}
		</p>
	{/if}

	{#if details.directors?.length}
		<p class="text-sm text-neutral-300">
			<span class="font-medium text-neutral-100">Director:</span>
			{details.directors.join(', ')}
		</p>
	{/if}

	{#if details.mainActors?.length}
		<p class="text-sm text-neutral-300">
			<span class="font-medium text-neutral-100">Starring:</span>
			{details.mainActors.join(', ')}
		</p>
	{/if}

	{#if details.duration}
		<p class="text-sm text-neutral-300">
			<span class="font-medium text-neutral-100">Runtime:</span>
			{details.duration.replace('PT', '').replace('H', 'h ').replace('M', 'm')}
		</p>
	{/if}
</div>
