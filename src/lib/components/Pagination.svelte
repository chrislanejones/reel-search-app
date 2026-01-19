<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as Pagination from '$lib/components/ui/pagination';

	const { currentPage, totalPages } = $props<{
		currentPage: number;
		totalPages: number;
	}>();

	function goTo(pageNumber: number) {
		if (pageNumber < 1 || pageNumber > totalPages) return;

		const params = new URLSearchParams(page.url.searchParams);
		params.set('page', String(pageNumber));
		goto(`/?${params.toString()}`);
	}
</script>

{#if totalPages > 1}
	<Pagination.Root
		count={totalPages}
		perPage={1}
		page={currentPage}
		onPageChange={(page) => goTo(page)}
		class="mt-6 flex justify-center"
	>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.Previous
					onclick={() => goTo(currentPage - 1)}
					class="bg-neutral-800 text-neutral-100 hover:bg-neutral-700
					dark:bg-neutral-800 dark:text-neutral-100
					dark:hover:bg-neutral-700"
				/>
			</Pagination.Item>

			<Pagination.Item>
				<span class="px-3 text-sm text-neutral-400">
					Page {currentPage} of {totalPages}
				</span>
			</Pagination.Item>

			<Pagination.Item>
				<Pagination.Next
					onclick={() => goTo(currentPage + 1)}
					class="bg-neutral-800 text-neutral-100 hover:bg-neutral-700
					dark:bg-neutral-800 dark:text-neutral-100
					dark:hover:bg-neutral-700"
				/>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
{/if}
