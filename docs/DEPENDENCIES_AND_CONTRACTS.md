# Dependencies and Contracts — aether-ai-docs

**Status:** Proposed; no documentation publishing stack has been selected.

## Dependencies
All repositories; source-of-truth docs stay next to the owning component.

## Owned capabilities
Versioned docs, link checking, navigation, tutorials tested against current releases, changelog and deprecation policy.

## Contract requirements
- Version public schemas and message envelopes.
- Document limits, timeouts, retry behavior, idempotency, cancellation, and error handling where relevant.
- Preserve correlation IDs across API, agent, tool, queue, and provider operations.
- Document operational signals and failure recovery, not only the happy path.

- Source-of-truth docs stay beside the component that owns the behavior; this repo aggregates and publishes them.
- Version docs and API references with the product release they describe.
- Mark illustrative examples clearly and avoid claiming untested behavior.
- Define deprecation, link checking, release notes and versioned navigation.
