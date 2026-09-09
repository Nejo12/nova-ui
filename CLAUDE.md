# Nova UI — Claude Code Instructions

Read `AGENTS.md` first. Its rules are authoritative for Claude Code as well.

## Skills / Superpowers

Use relevant Claude skills selectively when they improve the task, especially:

- implementation planning for non-trivial bounded work
- test-driven development
- accessibility review
- frontend design review
- systematic debugging
- code review

Do not invoke every available skill by default. Avoid process overhead for small changes.

## Required behavior

- Do not redesign agreed architecture merely because another pattern is possible.
- Do not introduce product-specific assumptions into shared packages.
- Do not add dependencies without a concrete justification.
- Do not modify generated token artifacts manually.
- Do not push to `main`.
- Do not auto-merge.
- Do not fix unrelated problems found during a bounded task; report them separately.

## Cross-product compatibility

Every shared API must remain viable for both:

- Klinnova: React/Next.js consumer
- Slotnova: React/Vite consumer

That means `@nova/ui` must remain React-runtime neutral and must not depend on framework runtime APIs.

## Review output

When asked for a read-only review, return findings with:

- severity: blocker / high / medium / low
- exact path
- concrete problem
- impact
- minimal correction

Also state what is correct and should not be changed.
