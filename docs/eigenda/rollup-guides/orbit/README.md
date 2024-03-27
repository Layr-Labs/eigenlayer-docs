# Arbitrum Orbit User Guide

[Arbitrum
Orbit][ref1] is
a Rollup Development Kit (RDK) developed by [Offchain
Labs][ref2] to enable rollup developers to build
rollups using the same software that powers *Arbitrum One* and *Arbitrum Nova*.
In partnership with AltLayer, we have forked the core component of Orbit,
[Nitro][ref3], to add
[M0][ref4] support for EigenDA. The M0 status of
this integration means that it is only designed for testnet.

## How to deploy an Orbit chain

A short guide on launching an Orbit L3 against the EigenDA testnet:

Follow the [Orbit
Quickstart][ref5]
documentation until step 9, skipping step 7. When prompted to use the official
[orbit-setup-script repo][ref6],
use the [forked repo][ref7] instead.
At the end of step 8 you should have your `chainConfig.json` and
`orbitSetupScriptConfig.json` saved locally.

This fork of Nitro is on version v2.2.0, but the *Orbit chain deployment portal*
is on version v2.1.3, which means the `nodeConfig.json` must be updated to
reflect the new format, according to the configuration migration guide in the
[v2.2.0 release
notes][ref8].

Finally, continue with steps 9-11 with your updated configuration file. If
you've completed these steps successfully, congrats! You are now running an
Orbit rollup that uses EigenDA.

This documentation is under construction and will continue to change. For
technical questions and hand-on support please reach out to
[contact.eigenda.xyz][ref9].

[ref1]: https://docs.arbitrum.io/launch-orbit-chain/orbit-gentle-introduction
[ref2]: https://www.offchainlabs.com/
[ref3]: https://github.com/layr-Labs/nitro
[ref4]: ../integrations-overview.md#M0
[ref5]: https://docs.arbitrum.io/launch-orbit-chain/orbit-quickstart
[ref6]: https://github.com/OffchainLabs/orbit-setup-script
[ref7]: https://github.com/Layr-Labs/orbit-setup-script
[ref8]: https://github.com/OffchainLabs/nitro/releases/tag/v2.2.0
[ref9]: https://contact.eigenda.xyz