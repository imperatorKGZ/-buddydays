# ADR 0001: Phase 1 blog registry

## Decision

`src/data/blog/articles.ts` is the single source of truth for Phase 1 article
metadata and approved rendered sections. The empty MDX directories are reserved
for a later migration.

## Consequences

No draft record is published, indexed, statically generated, or included in the
sitemap. A later MDX migration must preserve every existing slug, species,
category, tag, and article text exactly, and must keep the validator contract.
