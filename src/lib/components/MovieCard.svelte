<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Star, X } from 'lucide-svelte';
	import { PUBLIC_MOVIES_API_BASE_URL } from '$env/static/public';

	export let movie: {
		id: string;
		title: string;
		posterUrl: string;
	};

	let details: any = null;
	let loading = false;

	const maxStars = 10;

	async function loadDetails() {
		if (details || loading) return;

		loading = true;

		const tokenRes = await fetch(`${PUBLIC_MOVIES_API_BASE_URL}/auth/token`);
		const { token } = await tokenRes.json();

		const res = await fetch(`${PUBLIC_MOVIES_API_BASE_URL}/movies/${movie.id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		details = await res.json();
		loading = false;
	}
</script>

<Dialog.Root onOpenChange={(open) => open && loadDetails()}>
	<Dialog.Trigger asChild>
		<button class="group focus:outline-none">
			<img
				src={movie.posterUrl}
				alt={movie.title}
				class="aspect-[2/3] w-full rounded-lg object-cover transition group-hover:opacity-90"
			/>
		</button>
	</Dialog.Trigger>

	<Dialog.Content class="max-w-4xl border border-neutral-700 bg-neutral-900 p-6 text-neutral-100">
		{#if loading}
			<p class="text-neutral-400">Loading details…</p>
		{:else if details}
			<div class="grid max-h-[80vh] grid-cols-1 gap-6 overflow-y-auto md:grid-cols-2">
				<img src={details.posterUrl} alt={details.title} class="w-full rounded-lg object-cover" />

				<div class="space-y-4">
					<h2 class="text-2xl font-semibold">{details.title}</h2>

					{#if details.ratingValue}
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

					<p class="text-sm text-neutral-300">{details.summary}</p>

					{#if details.genres?.length}
						<p class="text-sm">
							<span class="font-medium">Genres:</span>
							{details.genres.join(', ')}
						</p>
					{/if}

					{#if details.directors?.length}
						<p class="text-sm">
							<span class="font-medium">Director:</span>
							{details.directors.join(', ')}
						</p>
					{/if}

					{#if details.mainActors?.length}
						<p class="text-sm">
							<span class="font-medium">Starring:</span>
							{details.mainActors.join(', ')}
						</p>
					{/if}

					{#if details.duration}
						<p class="text-sm">
							<span class="font-medium">Runtime:</span>
							{details.duration.replace('PT', '').replace('H', 'h ').replace('M', 'm')}
						</p>
					{/if}
				</div>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
