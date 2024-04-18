---
sidebar_position: 3
---

# Register Your Operator

Your operator will not begin receiving traffic from the EigenDA disperser until it has registered for one or more quorums with EigenDA. Note, as discussed in [delegation requirements](../requirements/delegation-requirements/) that registration with an EigenDA quorum requires that an operator already be [registered as an operator with EigenLayer](https://docs.eigenlayer.xyz/operator-guides/operator-installation) and to have a minimum amount of stake delegated within each quorum to be registered. 


## Opt-in to an EigenDA Quorum

If you meet the delegation requirements for opting into one or more quorums, you can execute the following command from the `eigenda-operator-setup/mainnet` folder to opt-in to the desired quorums:

```
./run.sh opt-in <quorum>

# for opting in to quorum 0:
./run.sh opt-in 0

# for opting in to quorum 0 and 1:
./run.sh opt-in 0,1 

```
You only need to provide the quorum which you want to opt into. For example if you are already registered to quorum `0` and want to opt-in one more quorum `1`, then you just need to set `<quorum>` as `1` while opting in again.

If you attempt to opt-in to both quorums ('`0,1`') you must have sufficient TVL to opt-in to the active Operator set for both quorums, otherwise the entire opt-in attempt will fail for both quorums. The opt-in attempt for both quorums is an "all or nothing" process.

> **_WARNING:_**
Operator must wait up to 6 hours if the delegation happened after you opt-in to the EigenDA AVS. EigenLayer's AVS-Sync component runs at 6 hour batch intervals to update the delegation totals on chain for each operator. If you are unable to opt in despite having sufficient delegated stake, please wait at least 6 hours, then retry opt-in.


The opt-in command also downloads the latest SRS points if they don't exist on the node. The file is approximately 8GB in size and the opt-in process can some time to complete depending on the network bandwidth.

The script will use the `NODE_HOSTNAME` from [.env](https://github.com/Layr-Labs/eigenda-operator-setup/blob/31d99e2aa67962878969b81a15c7e8d13ee69750/mainnet/.env.example#L71) as your current IP.

If your operator fails to opt-in to EigenDA or is ejected by the Churn Approver then you may run the opt-in command again after the rate limiting threshold has passed. The current rate limiting threshold is 5 minutes.

If you receive the error “error: failed to request churn approval .. Rate Limit Exceeded” you may retry after the threshold has passed. If you receive the error “insufficient funds”, you may increase your Operator’s delegated TVL to the required minimum and retry after the threshold has passed.


## Opt-Out of an EigenDA Quorum

> **_WARNING:_**
Please be careful to ensure that you opt-out of your current (or intended) quorum.

The following command can be used to opt out from the EigenDA AVS:

```
./run.sh opt-out <quorum>

# for opting out to quorum 0:
./run.sh opt-out 0

# for opting out to quorum 0 and 1:
./run.sh opt-out 0,1 
```