<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import MovieDetails from '$lib/components/MovieDetails.svelte';
	import { PUBLIC_MOVIES_API_BASE_URL } from '$env/static/public';

	export let movie: {
		id: string;
		title: string;
		posterUrl: string;
	};

	let details: any = null;
	let loading = false;

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
	<Dialog.Trigger>
		{#snippet child({ props })}
			<button
				type="button"
				{...props}
				class="group focus:outline-none"
				aria-label={`Open details for ${movie.title}`}
			>
				<img
					src={movie.posterUrl}
					alt={movie.title}
					class="aspect-2/3 w-full rounded-lg object-cover transition group-hover:opacity-90"
				/>
			</button>
		{/snippet}
	</Dialog.Trigger>

	<Dialog.Content class="max-w-4xl border border-neutral-700 bg-neutral-900 p-6 text-neutral-100">
		{#if loading}
			<div class="flex h-48 items-center justify-center">
				<div
					class="h-10 w-10 animate-spin rounded-full border-4 border-neutral-700 border-t-yellow-400"
					aria-label="Loading"
					role="status"
				/>
			</div>
		{:else if details}
			<div class="grid max-h-[80vh] grid-cols-1 gap-6 overflow-y-auto md:grid-cols-2">
				<img src={details.posterUrl} alt={details.title} class="w-full rounded-lg object-cover" />

				<MovieDetails {details} />
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
