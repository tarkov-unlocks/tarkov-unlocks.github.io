import type { Item } from "./item";
import questsData from "./quests-data.json"

export type Quest = {
	name: string;
	trader: string;
	lvl: number;
	wiki?: string;
	prerequisites: Quest[];
}

export type Unlock = {
	item: Item;
	trader: string;
	quest: Quest;
}

export type Reward = {
	item: Item;
	count: number;
	quest: Quest;
}

export const traderLevels: Record<string, number> = {
	'Prapor 2': 26,
	'Prapor 3': 26,
	'Prapor 4': 36,
	'Therapist 2': 14,
	'Therapist 3': 24,
	'Therapist 4': 37,
	'Skier 2': 15,
	'Skier 3': 28,
	'Skier 4': 38,
	'Peacekeeper 2': 14,
	'Peacekeeper 3': 23,
	'Peacekeeper 4': 37,
	'Mechanic 2': 20,
	'Mechanic 3': 30,
	'Mechanic 4': 40,
	'Ragman 2': 17,
	'Ragman 3': 32,
	'Ragman 4': 42,
	'Jaeger 2': 15,
	'Jaeger 3': 22,
	'Jaeger 4': 33,
	'Ref 2': 15,
	'Ref 3': 25,
	'Ref 4': 35
};

// import _quests from "./quests.json"

// // export type Quest = typeof quests[keyof typeof quests];


// // const q: Quest = {
// // 	name: "Test Quest",
// // 	trader: "asd",
// // 	lvl: 1,
// // }

// type Keys = keyof typeof _quests;
// export type Quest = typeof _quests[Keys] & {
// 	prerequisites: Quest[];
// };

// const quests = (_quests as unknown as Record<string, Quest>).map((quest)=> ({}));

// for (const task of questsData) {
// 	const quest = quests[task.name];

// 	if (task.taskRequirements?.length > 0) {
// 		for (const prereqTask of task.taskRequirements) {
// 			const prereqQuest = questsMap[prereqTask?.task?.name];

// 			if (prereqQuest) {
// 				quest.prerequisites.push(prereqQuest);
// 			}
// 		}
// 	}
// }
