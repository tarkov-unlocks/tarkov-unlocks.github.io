<script lang="ts">
	import { traderLevels, type Quest, type Unlock as UnlockT } from './lib/utils';
	import Item from './lib/Item.svelte';
	import questsData from './lib/quests-data.json';
	import { unlockGroups } from './lib/data';

	const sortOptions = ['Level', 'Name', 'Trader'];
	let sort = $state('Level');

	let sortedUnlockGroups = $derived(
		unlockGroups.map((g) => {
			if (sort === 'Name') {
				g.unlocks.sort((a, b) => a.item.name.localeCompare(b.item.name));
			} else if (sort === 'Trader') {
				g.unlocks.sort((a, b) => a.trader.localeCompare(b.trader));
			} else if (sort === 'Level') {
				g.unlocks.sort(
					(a, b) =>
						Math.max(a.quest.lvl, traderLevels[a.trader] ?? 0) -
						Math.max(b.quest.lvl, traderLevels[b.trader] ?? 0)
				);
			}

			return {
				...g
			};
		})
	);

	let expanded = $state('');

	// const quests: Quest[] = tasks.map((t) => questsMap[t.name]);
</script>

<p>View unlockable crafts and trader offers, and their requirements</p>

<div>
	<span class="font-semibold">Sort: </span>
	<select bind:value={sort}>
		{#each sortOptions as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>

<div class="select-none">
	{#each sortedUnlockGroups as { name, unlocks }}
		<div class="mt-8 text-lg font-semibold">{name}</div>
		{#each Object.values(unlocks) as unlock}
			{@const key = `${unlock.item.name}-${unlock.trader}-${unlock.quest.name}`}
			<Item
				name={unlock.item.name}
				trader={unlock.trader}
				quest={unlock.quest}
				wiki={unlock.item.wiki}
				icon={unlock.item.icon}
				expanded={key === expanded}
				expand={() => (expanded = key === expanded ? '' : key)}
			/>
		{/each}
	{/each}
</div>
