---
description: Summary of the most recent upgrades to the EigenLayer Frontend app.
---

# App Version History

## Version 2.0.1

October 2, 2023

**Performance & Design:** Introduced a revamped design system focused on both functionality and user experience. This translates to improved rendering and UI responsiveness.

**Next.js & Component Library:**

Integrated the latest version of Next.js with Server Side Rendering (SSR) to enhance both performance and SEO.
Added a customizable component library, providing a set of consistent and reusable UI elements.

**trpc Integration:** Optimized API route management with trpc for efficient data interactions.

**TailwindCSS:** Incorporated TailwindCSS to streamline the design development process, maintaining UI consistency.

**Restaking Points fix:**\
The calculation for native restaking points for validators in the pending state:

We are now using activation_eligibility_epoch to calculate the restaking points of validators in the pending queue. Prior to this change, we used activation_epoch which resulted in errors in our calculation for the following reasons:

- activation_epoch can not be predicted while validators are pending so the value is set to a default of int_max.
- This impacted validators in a pending state as we were calculating their time integrated contribution (restaking points) using the int_max value instead of their true activation_epoch. Note: This only affected validators in a pending state. Once activated, the activation_epoch updated to the correct value and points returned to normal.

If you are unfamiliar with validator status variables and want to learn more see this [explanation](https://hackmd.io/@protolambda/validator_status).

**TVL calculation changes:**

The way validator balances are counted has changed:

- Prior to this update, we counted validator balances as a constant value of 32 ether. We’ve since updated this and counted the precise validator beacon chain balance to more accurately reflect user’s restaked values. (Note: This excludes partial withdrawals, because those are not restaked)

What effect does this have on the new UI for users?

_All users:_ Users might see a slight variation in the TVL due to native validator balances being more accurately reflected.

_Users with restaked validators:_ Users will now see their true validator balance reflected rather than a constant value of 32 ether.

**Improved Error Handling:** Enhanced mechanisms for handling deposit pauses and TVL limit errors.

**Hosting & Observability:**

Transitioned from Netlify to Vercel for better performance metrics.
On Vercel, integrated plugins for improved API rate limiting and incorporated observability tools like Axiom and Grafana for system monitoring.

**Transaction Notifications:** Replaced the transaction modal with a more direct transaction notification system.

**Protocol Information Banner:** Added a banner to provide users with immediate updates on the protocol state.

**Automated Testing Suite:** Rolled out comprehensive automated tests covering various customer flows, from resetting approvals to managing withdrawals.

**Wallet Integration:** Expanded wallet support with a notable addition of Gnosis Safe.
