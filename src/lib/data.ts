import { traderLevels, type Quest, type Reward, type Unlock } from './utils';
import questsData from './quests-data.json';
import { Item } from './item';

const unlockGroupNames = [
    'Ammo',
    'Common container',
    'Sights',
    'Weapon',
    'Weapon mod',
    'Backpack',
    'Chest rig',
    'Armor Plate',
    'Headwear',
    'Face Cover',
    'Armored equipment',
    'Stimulant',
    'Meds',
    'Food and drink',
    'Item'
];

const rewardGroupNames = [
    'Common container',
    'Locking container',
    'Port. container',
    "Key",
    'Info',
    "Jewelry",
    "Electronics",
    "Medical supplies",
    "Building material",
    "Lubricant",
    'Barter item',
    'Face Cover',
    'Armored equipment',
    'Backpack',
    'Chest rig',
    'Armor Plate',
    'Headwear',
    'Equipment',
    'Stimulant',
    'Meds',
    'Food and drink',
    'Weapon',
    'Throwable weapon',
    'Sights',
    'Weapon mod',
    'Ammo',
    'Ammo container',
    'Item'
];

const tasks = questsData;

const questsMap: Record<string, Quest> = {};

for (const task of questsData) {
    questsMap[task.name] = {
        name: task.name,
        lvl: task.minPlayerLevel || 0,
        wiki: task.wikiLink,
        prerequisites: [],
        trader: task.trader.name || 'unknown'
    };
}

// Construct prerequisites

for (const task of tasks) {
    const quest = questsMap[task.name];

    if (task.taskRequirements?.length > 0) {
        for (const prereqTask of task.taskRequirements) {
            const prereqQuest = questsMap[prereqTask?.task?.name];

            if (prereqQuest) {
                quest.prerequisites.push(prereqQuest);
            }
        }
    }
}

const unlocks: Record<string, Unlock> = {};

for (const task of tasks) {
    const crafts = task.finishRewards?.craftUnlock.map((cu) => cu.rewardItems).flat() ?? [];

    for (const craftUnlock of crafts) {
        const name = `Craft: ${craftUnlock.item.name}`;
        unlocks[name] = {
            item: Item.getOrCreate({
                name: craftUnlock.item.name,
                wiki: craftUnlock.item.wikiLink,
                icon: craftUnlock.item.inspectImageLink,
                categories: craftUnlock.item.categories.map((c) => c.name)
            }),
            trader: 'Craft',
            quest: questsMap[task.name],
        };
    }

    for (const offerUnlock of task.finishRewards?.offerUnlock ?? []) {
        const name = `${offerUnlock.trader.name} ${offerUnlock.level}: ${offerUnlock.item.name}`;
        unlocks[name] = {
            item: Item.getOrCreate({
                name: offerUnlock.item.name,
                wiki: offerUnlock.item.wikiLink,
                icon: offerUnlock.item.inspectImageLink,
                categories: offerUnlock.item.categories.map((c) => c.name)
            }),
            trader: `${offerUnlock.trader.name} ${offerUnlock.level}`,
            quest: questsMap[task.name],
        };
    }
}

export const unlockGroups = unlockGroupNames.map((name) => ({
    name,
    unlocks: [] as Unlock[]
}));

for (const unlock of Object.values(unlocks)) {
    let orphan = true;
    for (const group of unlockGroups) {
        if (unlock.item.categories.includes(group.name)) {
            group.unlocks.push(unlock);
            orphan = false;
            break;
        }
    }
    if (orphan) console.error(`Orphan unlock: ${unlock.item.name}`);
}

const rewards: Array<Reward> = []

for (const task of tasks) {
    task.finishRewards?.items.forEach((reward) => {
        rewards.push({
            item: Item.getOrCreate({
                name: reward.item.name,
                wiki: reward.item.wikiLink,
                icon: reward.item.inspectImageLink,
                categories: reward.item.categories.map((c) => c.name)
            }),
            count: reward.count,
            quest: questsMap[task.name],
        });
    });
}

const _rewardGroups = rewardGroupNames.map((name) => ({
    name,
    rewards: [] as Reward[]
}));

for (const reward of rewards) {
    let orphan = true;
    for (const group of _rewardGroups) {
        if (reward.item.categories.includes(group.name)) {
            group.rewards.push(reward);
            orphan = false;
            break;
        }
    }
    if (orphan) console.error(`Orphan reward: ${reward.item.name}`);
}

export const rewardGroups = _rewardGroups.filter(g => g.rewards.length > 0);
