# Tarkov Rewards

A web app to view Escape from Tarkov quest rewards and unlocks.

## Useful commands

```bash
npm run dev
npm run build
npm run preview
npm run generate-quests-data
```

## Generate quests

[https://api.tarkov.dev/](https://api.tarkov.dev/)

```graphql
query MyQuery {
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
        }
      }
      craftUnlock {
        rewardItems {
          item {
            name
          }
        }
      }
    }
  }
}
```
