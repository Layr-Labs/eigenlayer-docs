# AVS Guide to Eigenlayer's Payments MVP

We need to explain the payForRange function in detail here, with some notes:
- max 90 days range (?)
- one payForRange per token payments (eg. separate payment for WETH and one for AVS token)
- This means AVS tokens MUST be bridged to ethereum to pay

Things to note regarding quorums:
- AVS teams SHOULD submit one payForRange per quorum
- quorums SHOULD have non-overlapping strategies (otherwise will overpay for operators/stakers who are in a single of the overlapping quorums)
