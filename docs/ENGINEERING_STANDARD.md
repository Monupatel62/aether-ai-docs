# Engineering Standard — aether-ai-docs

- Source-of-truth documentation stays with the owning component; cross-project docs link to it rather than silently duplicating it.
- Version docs with releases and label draft/proposed behavior accurately.
- Validate links, navigation, examples and version selectors.
- Scan documentation for secrets and internal-only endpoints.
- Mark illustrative snippets; test executable examples where practical.
- Document deprecation, migration, rollback and owner contacts.
- Use least-privilege publishing credentials and protected release workflows.

Documentation can accidentally expose credentials, internal endpoints, or unsafe copy-paste examples. Scan examples for secrets, mark illustrative code clearly, document security-sensitive defaults, and ensure operator guidance matches actual tested behavior.
