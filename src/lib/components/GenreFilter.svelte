<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Select from '$lib/components/ui/select';

	const genres = [
		'Action',
		'Adventure',
		'Animation',
		'Comedy',
		'Crime',
		'Documentary',
		'Drama',
		'Family',
		'Fantasy',
		'History',
		'Horror',
		'Music',
		'Mystery',
		'Romance',
		'Science Fiction',
		'Thriller',
		'War',
		'Western'
	];

	let value = $state<string>('');

	$effect(() => {
		const genre = page.url.searchParams.get('genre');
		value = genre || '';
	});

	function onChange(newValue: string | null) {
		const genre = newValue || '';

		const params = new URLSearchParams(page.url.searchParams);

		if (genre) {
			params.set('genre', genre);
			params.delete('query');
			params.set('page', '1');
		} else {
			params.delete('genre');
			params.set('page', '1');
		}

		goto(`/?${params.toString()}`);
	}
</script>

<Select.Root {value} onValueChange={onChange} type="single">
	<Select.Trigger
		class="h-9 w-48 rounded-md border border-neutral-700 bg-neutral-800 px-3 
		text-sm text-neutral-100"
	>
		{#if value}
			{value}
		{:else}
			<span class="text-neutral-400">All genres</span>
		{/if}
	</Select.Trigger>

	<Select.Content class="border border-neutral-700 bg-neutral-900 text-neutral-100">
		<Select.Item value="">All genres</Select.Item>

		{#each genres as genre}
			<Select.Item value={genre}>{genre}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
