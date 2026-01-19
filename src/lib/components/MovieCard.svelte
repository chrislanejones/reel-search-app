<script lang="ts">
	import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Play } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import MovieDetails from '$lib/components/MovieDetails.svelte';
	import { PUBLIC_MOVIES_API_BASE_URL } from '$env/static/public';

	const FALLBACK_POSTER = '/Missing-Movie-Poster.jpg';
	const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

	const { movie } = $props<{
		movie: {
			id: string;
			title: string;
			posterUrl: string | null;
		};
	}>();

	const posterSrc = $derived(movie.posterUrl || FALLBACK_POSTER);

	let details = $state<any>(null);
	let loading = $state(false);
	let hovered = $state(false);
	let tiltX = $state(0);
	let tiltY = $state(0);
	let posterMissing = $state(false);
	let isNavigating = $state(false);

	const transformStyle = $derived(
		`perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) 
		scale(${hovered ? 1.03 : 1})`
	);

	beforeNavigate(() => {
		isNavigating = true;
	});

	afterNavigate(() => {
		isNavigating = false;
	});

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

	async function handleImageError(e: Event) {
		const img = e.currentTarget as HTMLImageElement;

		if (img.src === posterSrc && posterSrc !== FALLBACK_POSTER) {
			try {
				const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images`, {
					headers: { accept: 'application/json' }
				});
				const data = await res.json();

				if (data.posters?.length > 0) {
					const bestPoster = data.posters.reduce((best: any, current: any) =>
						current.vote_average > best.vote_average ? current : best
					);
					img.src = `${TMDB_IMAGE_BASE}${bestPoster.file_path}`;
					posterMissing = false;
					return;
				}

				if (data.backdrops?.length > 0) {
					const bestBackdrop = data.backdrops.reduce((best: any, current: any) =>
						current.vote_average > best.vote_average ? current : best
					);
					img.src = `${TMDB_IMAGE_BASE}${bestBackdrop.file_path}`;
					posterMissing = false;
					return;
				}

				if (data.logos?.length > 0) {
					img.src = `${TMDB_IMAGE_BASE}${data.logos[0].file_path}`;
					posterMissing = false;
					return;
				}
			} catch {
				// Fall through to FALLBACK_POSTER
			}
		}

		if (img.src !== FALLBACK_POSTER) {
			img.src = FALLBACK_POSTER;
			posterMissing = true;
		}
	}

	function handlePlayMovie() {
		goto('/play');
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
							bg-linear-to-t from-black to-transparent p-3"
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

				<div class="flex flex-col gap-4">
					<MovieDetails {details} />

					<Button
						onclick={handlePlayMovie}
						disabled={isNavigating}
						class="mt-4 flex items-center gap-2 bg-yellow-500 font-semibold
						text-black hover:bg-yellow-600 disabled:opacity-50"
					>
						<Play class="h-5 w-5" />
						{isNavigating ? 'Playing...' : 'Play Movie'}
					</Button>
				</div>
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>
