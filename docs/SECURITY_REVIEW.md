# Security Review — aether-ai-docs

**Status:** Design checklist only; no security audit/certification claimed.

## Main risks
Secrets or internal endpoints leaking through examples, stale instructions causing unsafe operations, untrusted copy/paste code, broken version links and overly broad publication permissions.

## Required controls
Documentation can accidentally expose credentials, internal endpoints, or unsafe copy-paste examples. Scan examples for secrets, mark illustrative code clearly, document security-sensitive defaults, and ensure operator guidance matches actual tested behavior.
- Scan docs and examples for credentials, tokens and sensitive endpoints.
- Mark illustrative snippets and unverified behavior clearly.
- Keep operator/security instructions aligned with actual reviewed design.
- Restrict publication credentials and use protected release workflows.

## Verification
Run link checking, example lint/compile checks where practical, secret-pattern scans, versioned documentation checks, and review that warnings and security instructions match the current design.

Before release, add unit tests, contract tests for direct dependencies, negative authorization/input tests, and failure/recovery tests for the behavior this component owns. Use synthetic or sanitized data only.
- [ ] Link and version checks pass.
- [ ] Secret-pattern scans are clean or reviewed.
- [ ] Examples are validated where practical.
- [ ] Security-sensitive docs have owner review.
