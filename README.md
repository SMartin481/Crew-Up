# Crew-Up Platform Prototype

A lightweight React prototype for a **MENA production matching platform** where:
- production companies post roles,
- crew members subscribe with verified profile data,
- project managers mediate match approvals and negotiations,
- contracts/payroll data can flow into compliance reporting,
- KPI snapshots help studios and governments evaluate labor-market impact.

## What this prototype demonstrates

- Clean, minimalist UI/UX structure for operators.
- Profile intake form capturing reusable subscriber signals.
- Basic matching table with score logic based on role fit, availability, and reliability.
- KPI cards representing the reporting layer required by institutions.
- Suggested relational data model for implementation.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Suggested backend tables

- `users`
- `crew_profiles`
- `job_posts`
- `matches`
- `contracts_payroll`
- `kpi_facts`

These are surfaced in the UI as the foundation for a database-tied product architecture.
