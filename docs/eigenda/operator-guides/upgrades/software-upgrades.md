---
sidebar_position: 1
---

# Software Upgrades

Please monitor the following channels for updates to EigenDA Operator software:
- [EigenLayer Discord](https://discord.gg/eigenlayer): #support-operators channel.
- [EigenDA Operator Setup](https://github.com/Layr-Labs/eigenda-operator-setup) repository: [configure your watch settings](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository) for notifications of new releases.

Upgrade the AVS software for your EigenDA service setup by following the steps below:

#### Step 1: Pull the latest repo

```
cd eigenda-operator-setup/mainnet
git pull
```

Update the `MAIN_SERVICE_IMAGE` in your `.env` file with the latest EigenDA version as per the release notes.

> **_NOTE:_** If there are any specific instructions that needs to be followed for any upgrade, those instructions will be given with the release notes of the specific release. Please check the latest [release notes](https://github.com/Layr-Labs/eigenda-operator-setup/releases) on GitHub and follow the instructions before starting the services again.

#### Step 2: Pull the latest docker images

```
docker compose pull
```

#### Step 3: Stop the existing services

```
docker compose down
```

#### Step 4: Start your services again

Make sure your `.env` file still has correct values in the [TODO](https://github.com/Layr-Labs/eigenda-operator-setup/blob/31d99e2aa67962878969b81a15c7e8d13ee69750/mainnet/.env.example#L67) sections before you restart your node.

```
docker compose up -d
```

