# Emergency Shutdown Redemption

In the event that MakerDAO triggers an Emergency Shutdown, this tool
will automate the process of redeeming Dai for collateral, and converting
that collateral to USDC.

The source code for the contract can be found
[here](https://github.com/floatify/contracts/blob/add-es-support/contracts/ESRedemption.sol).

*Note: The contract needs to be updated to account for the new USDC collateral and then deployed*

## Setup For Development

```bash
yarn install
yarn run dev
```
