<script lang="ts">
	import type { Quest as QuestT } from './utils';
	import Quest from './Quest.svelte';

	let { quest, indent = 0 }: { quest: QuestT; indent?: number } = $props();
</script>

<div class="ml-2">
	<a href={quest.wiki} onclick={(e) => e.stopPropagation()} class="hover:underline cursor-pointer"
		>{quest.name}</a
	>

	<span>
		(lv. {quest.lvl})
	</span>
	<!-- <p>Trader: {quest.trader}</p> -->
	{#each quest.prerequisites as prerequisite}
		<Quest quest={prerequisite} indent={indent + 1} />
	{/each}
</div>
