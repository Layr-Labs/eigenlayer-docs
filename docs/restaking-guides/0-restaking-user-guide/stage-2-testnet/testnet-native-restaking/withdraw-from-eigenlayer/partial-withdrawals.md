# Partial Withdrawals

:::info
Due to how withdrawals from Ethereum are designed, users can only initiate one partial withdrawal per[ sequential sweep](https://ethereum.org/en/staking/withdrawals/#validator-sweeping) of all validators (which takes approximately 4-5 days).

\
All funds unstaked from EigenLayer go through a escrow period before being able to be withdrawn. After you unstake and queue the withdrawal, you must wait for the escrow period to end before being able to withdraw your assets.
:::

Partial withdrawals require on-chain proofs in order to process the withdrawal. Please consider deferring your withdrawals until full withdrawals are needed due to the gas costs associated with the proof.

The proving cost is 200k gas + a fixed fee per proof that will be around 0.01 ETH. Each of these proofs will be able to prove up to 16 beacon chain withdrawals (batched into one transaction). The user will be prompted to sign additional transactions - one per each additional batch.

Step 1: Note the Validator ETH Yield and Redeemable value. The Redeemable value may be lower than the Validator ETH Yield (beacon chain) due to the time lag associated with the beacon chain oracle, which occurs approximately every 4 hours.

![](https://lh7-us.googleusercontent.com/315HLw5gMxldCg7bdYEiAVkXkroCylpev1HAjVRwnixIoU9PTy1l-czPnDH3JBqN3oZwand47yxjTqTpdglHzGXRjXEztnnPW8_lQ0p8SvlE-R9sCP4qk7oJMc8hxMM8-koAMLy1DCaU4T0peaUyJZs)

Step 2: Click Redeem to initiate the escrow period.

![](https://lh7-us.googleusercontent.com/X2Ipqen9fpnIPp1dnn6g8hFBtpFZr_t7zoBHPHKZ5AvNrxH4Ai1HFqwjuM2YMvEWJgRfmanLYaeg7XwVT-WDtIEv6B9Q6XvgFuXSaTW2OEg20umVOpgSEQQKV2UgDfJH1S0NjuC7fEMGv298ABcvw_s)

Step 3: Observe the gas fee warning. Click Continue.

![](https://lh7-us.googleusercontent.com/eWXzCzR9Q-pbscHZm0na5rcFgpu9l5qPHYbbmPIR7z9hcoFVgpDWS0Aaqi4wUiG6FVRhdvROAalDFdZI6mTHhNalInIQr7JeJQNWG_FlYyxads4HkkuAmvMbFjDRCMm6xxWXig-S9xLkhYeJp_6s86s)

Step 4: Enter the amount you wish to withdraw. Click Confirm.&#x20;

![](https://lh7-us.googleusercontent.com/c9QOI7vNtpvAq4uOIZ_KCrrWyQLO_BDHZIpbXrIyz0fiMj3fKtlYPJlGx6L3S_sbYbSRyUetRv88qFjzlwkj0d96HtDWK0Yn-vUsv4_zTCxv4bZb7DuOcc7JKPGXY8hwyESrikWbyof9XkpREiIAwDw)

If the Awaiting Restake value is greater than zero, the confirmation step above will generate proofs to restake that amount first.

Step 5: Observe the Fetching Proofs status message. Proofs will be submitted on chain and you will be prompted to sign the transaction to proceed.

Note: if the user has more than 16 partial withdrawal transactions queued on the beacon chain, additional transactions will be generated for each batch of partial withdrawals in increments of 16 partial withdrawals.

![](https://lh7-us.googleusercontent.com/B1j-V4dY-iqYsXdfkPZxDhqa5ibMVgOncHU3Ft6FJqvc9QAH7CEuvsmQtqu65rGDwX3P_MD_252UgK2Z0UEXsSmB1vhBraoFPB0k3I9jTyDhuUbZaXJiZNSdH646I-ocSFtzmIP5XAVUGReeYEEbF3I)

Observe the Unstaking balance has increased after the transaction is confirmed on chain.\

Step 6: Click Withdraw after the escrow period to withdraw funds. Two wallet transactions will be generated for you to approve and proceed.

![](https://lh7-us.googleusercontent.com/yK-i-_zMD8KhpiiHVE_59bOwxBQuZEp0IlhfFCNqY7jYiNHwW9o4h3DF4R8Msu1kV4VboDo_WfhFHQC70ezd0QECKsqg4idohNll2vSiyk2s4Mjq0LL0ip_lRma0x708qzXuC97M5f12wlOT13kRiSk)

Observe your funds have been sent to your wallet.\
