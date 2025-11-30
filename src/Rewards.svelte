<script lang="ts">
	import { rewardGroups } from './lib/data';
	import Quest from './lib/Quest.svelte';

	const sortOptions = ['Level', 'Name'];
	let sort = $state('Level');

	let sortedRewardGroups = $derived(
		rewardGroups.map((g) => {
			if (sort === 'Name') {
				g.rewards.sort((a, b) => a.item.name.localeCompare(b.item.name));
			} else if (sort === 'Level') {
				g.rewards.sort((a, b) => (a.quest.lvl ?? 1) - (b.quest.lvl ?? 1));
			}

			return {
				...g
			};
		})
	);

	let expanded = $state('');

	// const quests: Quest[] = tasks.map((t) => questsMap[t.name]);
</script>

<p>View quest rewards and their requirements</p>

<div>
	<span class="font-semibold">Sort: </span>
	<select bind:value={sort}>
		{#each sortOptions as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>

<div class="select-none">
	{#each sortedRewardGroups as { name, rewards }}
		<div class="mt-8 text-lg font-semibold">{name}</div>
		{#each Object.values(rewards) as reward}
			{@const key = `${reward.item.name}-${reward.quest.name}`}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class:bg-gray-100={expanded === key}
				onclick={() => (expanded = expanded === key ? '' : key)}
				class="group cursor-pointer text-sm sm:text-base not-first:border-t border-gray-300"
			>
				<div class="flex items-center gap-2">
					<img src={reward.item.icon ?? '#'} alt={name} class="h-12 sm:h-16" />
					<div
						class="flex flex-col w-24 shrink-0 text-nowrap sm:flex-row sm:items-center sm:w-auto"
					>
						<span class="font-semibold group-hover:underline w-24">
							{reward.count}x
						</span>
						<span class="text-nowrap font-semibold group-hover:underline w-16">
							(lv. {reward.quest.lvl ?? 1})
						</span>
					</div>
					<span class="font-semibold group-hover:underline">
						{reward.item.name}
					</span>
					<a
						href={reward.item.wiki}
						class="hover:underline cursor-pointer"
						onclick={(e) => e.stopPropagation()}
					>
						(wiki)
					</a>
				</div>
				{#if expanded === key}
					<!-- <div>Quests: ({questsCount})</div> -->
					<Quest quest={reward.quest} />
				{/if}
			</div>
		{/each}
	{/each}
</div>
