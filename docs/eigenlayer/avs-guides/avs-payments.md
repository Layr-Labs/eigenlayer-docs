# AVS Guide to Eigenlayer's Payments MVP

We need to explain the payForRange function in detail here, with some notes:
- max 90 days range (?)

Things to note regarding quorums:
- AVS teams SHOULD submit one payForRange per quorum
- quorums SHOULD have non-overlapping strategies (otherwise will overpay for operators/stakers who are in a single of the overlapping quorums)
