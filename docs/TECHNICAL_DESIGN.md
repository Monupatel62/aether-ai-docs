# Technical Design — aether-ai-docs

**Status:** Proposed; no docs site or publishing pipeline is implemented by this document.

## Purpose
Published user guides, API manuals, operator runbooks, tutorials, architecture, and release notes.

## Responsibilities
Versioned docs, link checking, navigation, tutorials tested against current releases, changelog and deprecation policy.

## Connections
All repositories; source-of-truth docs stay next to the owning component.

## Publication flow
1. Collect source docs and version metadata from owning repositories.
2. Validate Markdown, links, navigation and release/version references.
3. Scan examples for secrets and unsafe copy-paste instructions.
4. Build a versioned preview and require owner review for security-sensitive docs.
5. Publish only from an approved release ref and retain rollback instructions.
6. Track broken links, stale examples and deprecation notices.

## Security and privacy
Documentation can accidentally expose credentials, internal endpoints, or unsafe copy-paste examples. Scan examples for secrets, mark illustrative code clearly, document security-sensitive defaults, and ensure operator guidance matches actual tested behavior.

## Open decisions
Site generator, hosting, search, version strategy, and publication permissions remain open.
