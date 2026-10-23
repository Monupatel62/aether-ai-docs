# aether-ai-docs

Published user guides, API manuals, operator runbooks, tutorials, architecture, and release notes.

**Status:** Documentation foundation only. This repository does not yet claim working implementation, deployment, or production readiness.

## Documentation

- [Project specification](docs/PROJECT_SPEC.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Dependencies and contracts](docs/DEPENDENCIES_AND_CONTRACTS.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Technical design](docs/TECHNICAL_DESIGN.md)
- [Security review](docs/SECURITY_REVIEW.md)
- [Research and licenses](docs/RESEARCH_AND_LICENSES.md)
- [Engineering standard](docs/ENGINEERING_STANDARD.md)
- [Work log](docs/WORKLOG.md)

## Project-wide references

- [Master catalog](https://github.com/Monupatel62/aether-ai-platform/blob/main/docs/REPOSITORY_CATALOG.md)
- [Master architecture](https://github.com/Monupatel62/aether-ai-platform/blob/main/docs/MASTER_ARCHITECTURE.md)
- [Security threat model](https://github.com/Monupatel62/aether-ai-platform/blob/main/docs/SECURITY_THREAT_MODEL.md)
- [Open decisions](https://github.com/Monupatel62/aether-ai-platform/blob/main/docs/OPEN_DECISIONS_RESEARCH.md)
- [Repository specification](https://github.com/Monupatel62/aether-ai-platform/blob/main/docs/repositories/aether-ai-docs.md)


## Implemented code baseline

- Add a Markdown integrity helper that flags unsafe JavaScript links, non-HTTPS external links, malformed targets, headings deeper than six levels, trailing whitespace, unclosed code fences, and oversized documents.
- Includes multi-file validation results and Node 20/22 CI.
- The checker is a starter quality gate; it does not yet resolve local relative links across the full documentation tree.
