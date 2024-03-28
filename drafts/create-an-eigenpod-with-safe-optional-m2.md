# Create an EigenPod with Safe (Optional)

Follow the instructions below to create an EigenPod using a Safe address.

**Step 1:** Create a [Safe&#123;Wallet&#125; Account][ref1] and note the new address created.

**Step 2:** Locate the current “EigenPodManager -> Proxy” contract address via the[ EigenLayer Goerli Deployments table here][ref2].

**Step 3:** In your Safe&#123;Wallet&#125; Dashboard, click “New Transaction”, then “Transaction Builder”

![](/img/googleusercontentbackup/VhvtrzfZkAPIVjAVGaGiQLuHcoX94IeuJIZKymOP8rl5SU6YPkLMRDfyoEKT22MJUwCZp3bj4g7RnkFZPrvNDq1FBRWt6wp6fd_W_qxmdDczCr63Md7v_dFGjMRlA_cPbxAF2vs4pwRk8Y3aIGI5ghY.png)

![](/img/googleusercontentbackup/fWBK0B7_n1MwCLVB7fMI5c75lRaFjLL_UGjSu3ZPxxxefoXl3qfln0UBislng7WoLq2ZXaxIepJJnzDbjWFBa3wv9XZZ-OcR3y10OvDaHzHOIPTH_-BVT3cVZXyOkGybaNCoBuW430fvzkqz5-QhdOE.png)

**Step 4:** Paste the EigenPodManager Proxy contract address into the “Enter Address” field. Observe the ABI is automatically pulled in by the Safe UI.

![](/img/googleusercontentbackup/6Amzdvc2bS1qnBHMezLS6iA7w3XNdyW6rKacGeVoY4TiIkvuoRfYp2tJ_xBHoQOYEKSMwcz_IDpbTgXrKV2kedxX30BOVoq3yFiAItv2O03T94CCrDuNGgidDhsKIxO5cv1_G_apMsHDnwzAD8zh3hE.png)

**Step 5:** Ensure the Contract Method Selector is set to createPod.

![](/img/googleusercontentbackup/L-fGo8SfLFRL9eGuclFYLGu6Hcv-J1Hj_taTc-ba7ttThA6c_yiztPylvKgfABkM0v4henpfG4sIrVTWxPdAO_4dfHIk69xRxa9edZaRDjhugWR4O6uf3wwG0-PwBg_BzsSb157d4r4Z123e0mdxQZk.png)

**Step 6:** Click Add Transaction then Create Batch to proceed.

**Step 7:** Review the transaction and click Send Batch to proceed.

![](/img/googleusercontentbackup/A4J5a_mzQcqJiz7xeM2jRzsQv5slK98MANGAdtRS3B5rvOP5v6yyrmYubxbLzR_3uhgIxOmWfQIpDbQmNX2hhhX7-h4eB1dNmFCjKnGoBh6Toikh0G5hshCsyTmbeyEOs0RAdX_YLmyOqa-eg4DN2Ms.png)

**Step 8:** Scroll to the bottom of the Confirm transaction screen and select Execute to proceed.

![](/img/googleusercontentbackup/UPnY4qM7MtBkzrwI0FZLTo5iAEVkEWUNS-pRCIg0LhL1djbF2NwPjAT4M_PDvgwIMGHOGvk0NwfjCYJUzHzKtY02Y9FZh_FXKpi_lULiNmYYdIUBJFj8MvMI3kT4lMumM470JiKMW_nt-dqPRMaggp8.png)

[ref1]: https://app.safe.global/
[ref2]: https://github.com/Layr-Labs/eigenlayer-contracts/blob/master/README.md#m1-current-goerli-testnet-deployment