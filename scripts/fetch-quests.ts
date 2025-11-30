import fs from "fs/promises";

const QUERY = `query MyQuery {
  tasks {
    id
    name
    trader {
      name
    }
    experience
    finishRewards {
      offerUnlock {
        item {
          name
          wikiLink
          inspectImageLink
          categories {
            name
          }
        }
        trader {
          name
        }
        level
      }
      craftUnlock {
        rewardItems {
          item {
            name
            wikiLink
            inspectImageLink
            categories {
              name
            }
          }
        }
      }
      items {
        quantity
        count
        item {
          name
          categories {
            name
          }
          wikiLink
          inspectImageLink
        }
      }
    }
    taskRequirements {
      task {
        name
      }
    }
    minPlayerLevel
    wikiLink
  }
}`;

export async function fetchQuestsData(): Promise<any> {
  const res = await fetch("https://api.tarkov.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `GraphQL request failed: ${res.status} ${res.statusText} - ${text}`
    );
  }

  const json = await res.json();
  return json;
}

async function main() {
  const data = await fetchQuestsData();

  // Write the data into src/lib/quests-data.json

  await fs.writeFile(
    "src/lib/quests-data.json",
    JSON.stringify(data.data.tasks, null, 2),
    "utf-8"
  );
}

(async () => {
  await main();
})();
