<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import MovieDetails from '$lib/components/MovieDetails.svelte';
	import { PUBLIC_MOVIES_API_BASE_URL } from '$env/static/public';

	const FALLBACK_POSTER = '/Missing-Movie-Poster.jpg';

	const { movie } = $props<{
		movie: {
			id: string;
			title: string;
			posterUrl: string;
		};
	}>();

	const posterSrc = $derived(movie.posterUrl || FALLBACK_POSTER);

	let details = $state<any>(null);
	let loading = $state(false);
	let hovered = $state(false);
	let tiltX = $state(0);
	let tiltY = $state(0);
	let posterMissing = $state(posterSrc === FALLBACK_POSTER);

	const transformStyle = $derived(
		`perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) 
		scale(${hovered ? 1.03 : 1})`
	);

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

	function onMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		tiltX = ((y - centerY) / centerY) * -6;
		tiltY = ((x - centerX) / centerX) * 6;
	}

	function onMouseLeave() {
		hovered = false;
		tiltX = 0;
		tiltY = 0;
	}

	function handleImageError(e: Event) {
		const img = e.currentTarget as HTMLImageElement;

		if (img.src !== FALLBACK_POSTER) {
			img.src = FALLBACK_POSTER;
			posterMissing = true;
		}
	}
</script>

<Dialog.Root onOpenChange={(open) => open && loadDetails()}>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<button
				type="button"
				{...props}
				class="group relative focus:outline-none"
				aria-label={`Open details for ${movie.title}`}
				onmouseenter={() => (hovered = true)}
				onmousemove={onMouseMove}
				onmouseleave={onMouseLeave}
			>
				<div
					class="relative transition-transform duration-200 ease-out
					will-change-transform"
					style={`transform: ${transformStyle}`}
				>
					<img
						src={posterSrc}
						alt={movie.title}
						class="aspect-2/3 w-full rounded-lg object-cover"
						onerror={handleImageError}
					/>

					{#if hovered}
						<div
							class="pointer-events-none absolute inset-0 rounded-lg"
							style="box-shadow: 0 0 32px rgba(234, 179, 8, 0.35)"
						></div>
					{/if}

					{#if posterMissing}
						<div
							class="absolute right-0 bottom-0 left-0 rounded-b-lg
							bg-gradient-to-t from-black to-transparent p-3"
						>
							<p class="line-clamp-2 text-sm font-semibold text-white">
								{movie.title}
							</p>
						</div>
					{/if}
				</div>
			</button>
		{/snippet}
	</Dialog.Trigger>

	<Dialog.Content
		class="max-w-4xl border border-neutral-700 bg-neutral-900 p-6 
		text-neutral-100"
	>
		{#if loading}
			<div class="flex h-48 items-center justify-center">
				<div
					class="h-10 w-10 animate-spin rounded-full border-4
					border-neutral-700 border-t-yellow-400"
					role="status"
					aria-label="Loading"
				></div>
			</div>
		{:else if details}
			<div
				class="grid max-h-[80vh] grid-cols-1 gap-6 overflow-y-auto
				md:grid-cols-2"
			>
				<img
					src={posterSrc}
					alt={movie.title}
					class="aspect-2/3 w-full rounded-lg object-cover"
					onerror={handleImageError}
				/>

				<MovieDetails {details} />
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
