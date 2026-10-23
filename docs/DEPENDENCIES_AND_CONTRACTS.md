# Dependencies and Contracts — aether-ai-docs

**Status:** Proposed; no documentation publishing stack has been selected.

## Dependency boundary

This repository has documentation-source relationships with all component repositories, not runtime or package dependencies on them. Source-of-truth docs stay next to the owning component; this repository aggregates and publishes those materials through links, generated indexes, or release-specific documentation when the publishing stack is selected. It must not import component implementation code merely to publish documentation.

## Owned capabilities

Versioned docs, link checking, navigation, tutorials tested against current releases, changelog and deprecation policy.

## Contract requirements

- Version public schemas and message envelopes when documenting API/event/package contracts.
- Document limits, timeouts, retry behavior, idempotency, cancellation, and error handling where relevant.
- Preserve correlation IDs across API, agent, tool, queue, and provider operations when describing those runtime paths.
- Document operational signals and failure recovery, not only the happy path.
- Source-of-truth docs stay beside the component that owns the behavior; this repo aggregates and publishes them.
- Version docs and API references with the product release they describe.
- Mark illustrative examples clearly and avoid claiming untested behavior.
- Define deprecation, link checking, release notes and versioned navigation.
- Do not represent a documentation link or aggregation relationship as a runtime edge in the dependency graph.
