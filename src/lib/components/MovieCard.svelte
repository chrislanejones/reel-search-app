<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	export let movie: {
		title: string;
		posterUrl: string;
		summary: string;
		duration?: string;
		directors?: string[];
		mainActors?: string[];
		genres?: string[];
		datePublished?: string;
		rating?: string;
		ratingValue?: number;
	};
</script>

<Dialog.Root>
	<!-- Trigger: Poster only -->
	<Dialog.Trigger asChild>
		<button class="group focus:outline-none">
			<img
				src={movie.posterUrl}
				alt={movie.title}
				class="aspect-[2/3] w-full rounded-lg object-cover transition group-hover:opacity-90"
			/>
		</button>
	</Dialog.Trigger>

	<!-- Dialog -->
	<Dialog.Content class="max-w-3xl">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<!-- Left: Poster -->
			<img src={movie.posterUrl} alt={movie.title} class="w-full rounded-lg object-cover" />

			<!-- Right: Info -->
			<div class="space-y-3">
				<h2 class="text-xl font-semibold">{movie.title}</h2>

				{#if movie.ratingValue}
					<p class="text-muted-foreground text-sm">
						⭐ {movie.ratingValue} / 10
					</p>
				{/if}

				<p class="text-sm leading-relaxed">{movie.summary}</p>

				{#if movie.genres}
					<p class="text-sm">
						<strong>Genres:</strong>
						{movie.genres.join(', ')}
					</p>
				{/if}

				{#if movie.directors}
					<p class="text-sm">
						<strong>Director:</strong>
						{movie.directors.join(', ')}
					</p>
				{/if}

				{#if movie.mainActors}
					<p class="text-sm">
						<strong>Starring:</strong>
						{movie.mainActors.join(', ')}
					</p>
				{/if}

				{#if movie.datePublished}
					<p class="text-sm">
						<strong>Released:</strong>
						{movie.datePublished}
					</p>
				{/if}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
