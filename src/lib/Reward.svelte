<script lang="ts">
	import Quest from './Quest.svelte';
	import { traderLevels, type Quest as QuestT } from './utils';

	let {
		name,
		trader,
		quest,
		expanded,
		icon,
		wiki,
		expand
	}: {
		name: string;
		trader: string;
		quest: QuestT;
		icon?: string;
		wiki?: string;
		expanded: boolean;
		expand: () => void;
	} = $props();

	let questsCount = $derived.by(() => {
		let count = 1;

		let quests = [quest];

		while (quests.length > 0) {
			const current = quests.pop();
			if (current) {
				for (const prereq of current.prerequisites) {
					count += 1;
					quests.push(prereq);
				}
			}
		}

		return count;
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class:bg-slate-200={expanded}
	onclick={expand}
	class="group cursor-pointer text-sm sm:text-base not-first:border-t border-gray-300"
>
	<div class="flex items-center gap-2">
		<img src={icon ?? '#'} alt={name} class="h-12 sm:h-16" />
		<div class="flex flex-col w-24 shrink-0 text-nowrap sm:flex-row sm:items-center sm:w-auto">
			<span class="font-semibold group-hover:underline w-30">
				{trader}
			</span>
			<span class="text-nowrap font-semibold group-hover:underline w-16">
				(lv. {Math.max(quest.lvl, traderLevels[trader] ?? 0)})
			</span>
		</div>
		<span class="font-semibold group-hover:underline">
			{name}
		</span>
		<a
			href={wiki}
			target="_blank"
			class="hover:underline cursor-pointer"
			onclick={(e) => e.stopPropagation()}
		>
			(wiki)
		</a>
	</div>
	{#if expanded}
		<div>Quests: ({questsCount})</div>
		<Quest {quest} />
	{/if}
</div>
