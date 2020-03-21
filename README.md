# Emergency Shutdown Redemption

In the event that MakerDAO triggers an Emergency Shutdown, this tool
will automate the process of redeeming Dai for collateral, and converting
that collateral to USDC.

The app is hosted at https://emergency-shutdown-redemption.web.app/

The source code for the contract can be found
[here](https://github.com/floatify/contracts/blob/add-es-support/contracts/ESRedemption.sol).

*Note: The `pack` and `cash` calls of this contract and the full end-to-end flow have not been tested. This contract is also not yet deployed*

## Setup For Development

```bash
yarn install
yarn run dev
```
