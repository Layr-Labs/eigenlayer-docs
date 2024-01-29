---
sidebar_position: 1
title: General Operator
---


#### Where are the smart contract addresses used to register operator to EigenLayer?

The contract addresses are located [here](../operator-guides/operator-installation#goerli-smart-contract-addresses)

#### Am I required to publicly host metadata url?
Yes. You are required to host the metadata url publicly. The `metadata` url should always be available and should return a proper json response like [this](https://goerli-operator-metadata.s3.amazonaws.com/metadata.json)

#### Am I required to publicly host logo in metadata json?
Yes. You are required to host the logo publicly like [this](https://goerli-operator-metadata.s3.amazonaws.com/eigenlayer.png)

#### Are there any restrictions to the logo image?
Yes. We only support `.png` format and we strictly check the content of image. If your image doesn't satisfy the requirement then the EigenLayer App will not display the logo of your operator.

#### What if I lose access to my keys?
When you [create/import](../operator-guides/operator-installation#create-and-list-keys) keys for the first time, it will ask a password to encrypt keys and once created, it will also show plaintext private key. Please make sure to backup the private key and the password. If you lose both you won't be able to get your keys back. If you lose the plaintext private key and still have your password you can run the [export](../operator-guides/operator-installation.md#export-keys) command to get your plaintext private key. 

#### What is my operator addresss? 
After you [create/import](../operator-guides/operator-installation#create-and-list-keys) ecdsa key you will be shown below log message
```
? Enter password to encrypt the ecdsa private key:
ECDSA Private Key (Hex):  b3eba201405d5b5f7aaa9adf6bb734dc6c0f448ef64dd39df80ca2d92fca6d7b
Please backup the above private key hex in safe place.

Key location: /home/ubuntu/.eigenlayer/operator_keys/test.ecdsa.key.json
Public Key hex:  f87ee475109c2943038b3c006b8a004ee17bebf3357d10d8f63ef202c5c28723906533dccfda5d76c1da0a9f05cc6d32085ca1af8aaab5a28171474b1ad0aa68
Ethereum Address 0x6a8c0D554a694899041E52a91B4EC3Ff23d8aBD5
```
You operator address is the `Ethereum Address` in the logs.

#### What if I want to change password of my encryped keys?
If you want to change password of your encrypted keys, you have two options based on what information you have readily available:

1. If you know your private keys then you can just [re-import](../operator-guides/operator-installation.md#import-keys) and when importing, choose a different name and the new password.
2. If you don't know your private keys, you can get them using [export](../operator-guides/operator-installation.md#export-keys). Once you have the private keys you can use option 1 to re-import.

#### What if I want to deactivate/deregister my operator from EigenLayer?
Currently there's no way to deregister your operator but you can
update the name of your operator in metadata url to be `Deactivated` or something similar. This will help display your operator as not active on the webapp.