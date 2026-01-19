<script lang="ts">
	import { goto } from '$app/navigation';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { CircleAlert, ArrowLeft } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	let isNavigating = $state(false);
	let showDialog = $state(false);

	beforeNavigate(() => {
		isNavigating = true;
	});

	afterNavigate(() => {
		isNavigating = false;
	});

	$effect(() => {
		const timer = setTimeout(() => {
			showDialog = true;
		}, 2000);

		return () => clearTimeout(timer);
	});
</script>

<div
	class="relative flex min-h-screen flex-col items-center
justify-center overflow-hidden bg-neutral-900 p-4 text-neutral-100"
>
	<img
		src="/Svelte-Studios.jpg"
		alt="Studio Logo"
		class="absolute inset-0 h-full w-full object-cover opacity-40"
	/>

	<div class="absolute inset-0 bg-black/60"></div>

	<Dialog.Root open={showDialog}>
		<Dialog.Content class="max-w-md border border-neutral-700 bg-neutral-900 text-neutral-100">
			<Dialog.Header>
				<Dialog.Title class="flex items-center gap-2 text-xl font-bold">
					<CircleAlert class="h-6 w-6 text-yellow-500" />
					Access Denied
				</Dialog.Title>
			</Dialog.Header>

			<Dialog.Description class="text-neutral-300">
				This app does not have the rights to play this movie.
			</Dialog.Description>

			<div class="flex gap-2 pt-4">
				<Button
					onclick={() => goto('/')}
					disabled={isNavigating}
					class="flex flex-1 items-center justify-center gap-2 
					bg-yellow-500 font-semibold text-black hover:bg-yellow-600 
					disabled:opacity-50"
				>
					<ArrowLeft class="h-4 w-4" />
					{isNavigating ? 'Going back...' : 'Go Back'}
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>
