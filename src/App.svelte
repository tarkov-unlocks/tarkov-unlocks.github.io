<script lang="ts">
	import Rewards from './Rewards.svelte';
	import Unlocks from './Unlocks.svelte';

	const pages = {
		unlocks: 'Unlocks',
		rewards: 'Rewards'
	} as const;

	let page = $state<(typeof pages)[keyof typeof pages]>(pages.unlocks);
</script>

<main class="max-w-6xl mx-auto sm:*:mx-4 my-8">
	<div class="flex gap-4">
		<button
			class="text-2xl font-bold hover:underline cursor-pointer"
			class:underline={page === pages.unlocks}
			class:text-stone-800={page !== pages.unlocks}
			onclick={() => (page = pages.unlocks)}
		>
			Tarkov Unlocks
		</button>
		<button
			class="text-2xl font-bold hover:underline cursor-pointer"
			class:underline={page === pages.rewards}
			class:text-stone-800={page !== pages.rewards}
			onclick={() => (page = pages.rewards)}
		>
			Tarkov Rewards
		</button>
	</div>

	{#if page === pages.unlocks}
		<Unlocks />
	{:else if page === pages.rewards}
		<Rewards />
	{/if}

	<div class="mt-8 hover:underline cursor-pointer">
		<a href="https://github.com/tarkov-unlocks/tarkov-unlocks" target="_blank">(Source)</a>
	</div>
</main>
