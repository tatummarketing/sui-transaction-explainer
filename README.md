# Sui Transaction Explainer

A lightweight, client-side web page that takes a Sui transaction digest (hash), calls the Sui RPC, and summarizes what happened in human-readable terms.

## Getting started

1. Serve the static files locally (any static server works). For example:
   ```bash
   python -m http.server 8000
   ```
2. Open `http://localhost:8000` in your browser.
3. Paste a transaction digest, optionally adjust the RPC endpoint or API key, and click **Explain transaction**.

> The default endpoint uses the provided Tatum mainnet gateway and API key. You can replace either value in the **Advanced options** panel.

## What the page shows

- Transaction status, sender, digest, and timestamp.
- Gas breakdown (computation, storage, rebate, net cost) with SUI-unit formatting.
- Balance deltas per owner and coin type.
- Object changes (created/mutated/transferred/deleted/wrapped) translated into sentences.
- Emitted events and the full raw JSON response for debugging.

## Notes

- All calls are issued directly from the browser via `fetch`; no backend required.
- The RPC payload uses `sui_getTransactionBlock` with `showInput`, `showEffects`, `showEvents`, `showObjectChanges`, and `showBalanceChanges` enabled for a complete view.
- Amounts for `::sui::SUI` coins are rendered in SUI (1e9 base unit); other coin types are displayed in their raw units.
