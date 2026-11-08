# Contributing Guide 🤝

Thank you for contributing to **Price Tracker Web**. This document explains the local workflow, architectural boundaries, and quality gates so changes stay consistent and reviewable.

> **Golden rule:** the Price Tracker API is the source of truth. Client-side validation improves the experience but never replaces server-side authorization or validation. Never commit secrets, real `.env` files, tokens, or customer data.

---

## Development Environment

### Prerequisites

- **Node.js LTS** and **npm** (validated with Node `24.11.0` and npm `11.6.1`).
- **Git**.
- The **Price Tracker API** running for authenticated flows: [felipevenas/api-price-tracker](https://github.com/felipevenas/api-price-tracker).

### Installation

```powershell
git clone https://github.com/felipevenas/webapp-price-tracker.git
cd webapp-price-tracker
npm install
Copy-Item .env.example .env.local
npm run dev
```

The development server normally starts at **http://localhost:5173**. Use the URL printed by Vite if the port is already occupied.

The default API URL is `http://localhost:8000/api/v1`. To point the client at another instance, edit `VITE_API_BASE_URL` in `.env.local` and restart the dev server. See [`README.md`](README.md#configuration) for the complete configuration reference.

### API and CORS

Authenticated screens require a running API. The API must allow the frontend origin through CORS, for example `http://localhost:5173`. Backend setup is documented in the [backend repository](https://github.com/felipevenas/api-price-tracker).

---

## Branches and Commits

We use **trunk-based development**: short-lived branches are created from `main` and merged through a pull request.

### Branch names

- `feat/feature-name`
- `bug/bug-name`
- `chore/task-name`
- `docs/document-name`
- `style/visual-adjustment`
- `refactor/refactoring-name`
- `test/test-name`

Examples: `feat/price-range-filter`, `bug/login-redirect-loop`, `docs/environment-table`.

### Commits

Commit messages are written in **English** with Conventional Commits:

| Prefix | Use | SemVer impact |
|---|---|---|
| `feat:` | New user-visible functionality or component | MINOR |
| `fix:` | Bug fix in behavior, layout, or API integration | PATCH |
| `refactor:` | Internal change with no behavior change | None |
| `docs:` | Documentation, README, templates, or comments | None |
| `test:` | Adding or fixing automated tests | None |
| `style:` | Purely visual, CSS, spacing, or formatting change | None |
| `chore:` | Build, dependencies, CI/CD, or configuration | None |

Example: `feat: add active products filter to the dashboard`.

Keep each commit focused. Do not mix dependency upgrades with behavior changes or documentation rewrites.

---

## Architectural Guidelines

The application is organized **by feature**:

```text
src/features/<feature>/
├── components/   presentational components for the feature
├── hooks/        state and data-fetching hooks
├── pages/        route-level screens
├── services/     API calls for the feature
└── types/        API contracts and domain types
```

Rules:

1. **Keep API calls in services.** Components and pages should consume `src/features/*/services/*.ts` rather than scattering Axios calls or endpoint strings.
2. **One HTTP client.** All requests go through the Axios instance in `src/config/api.ts`, which owns the base URL, bearer token, and global `401` behavior.
3. **Shared UI has no domain rules.** `src/components/` contains reusable primitives; product or auth logic belongs in `src/features/`.
4. **Mirror API contracts.** Types in `src/features/*/types/` must match the backend envelope and field names. Contract changes require a coordinated backend/frontend review.
5. **Validate with Zod and React Hook Form.** Keep client rules aligned with the API, but treat the API response as authoritative.
6. **Environment access is centralized.** Only `src/config/api.ts` reads `import.meta.env`. Remember that every `VITE_*` value is public and inlined at build time.
7. **Preserve the product language.** Documentation and code comments are in English; the current UI copy, currency (`BRL`), and date locale (`pt-BR`) are intentionally Brazilian Portuguese. Do not mass-translate the interface without an approved i18n change.
8. **Accessibility and responsiveness are part of the change.** Interactive controls need labels, visible focus, keyboard access, and a usable layout at mobile and desktop widths.
9. **No new global state without a reason.** The app currently uses React context for auth and theme and local state for data. Introduce a server-state library only with an explicit design rationale.

---

## Quality Gates

Run these before opening a pull request:

```powershell
npm run lint     # Oxlint
npm run build    # tsc -b + Vite production build
```

`npm run build` includes TypeScript project compilation, so it is also the type gate.

There is currently **no automated test suite and no `npm test` script**. For changes with non-trivial logic, include a clear manual test plan in the pull request. If you introduce a test runner, add it in a dedicated change with its configuration, scripts, and documentation.

For UI changes, verify at minimum:

- Mobile, tablet, and desktop widths without horizontal scrolling.
- Light and dark themes.
- Keyboard navigation for dialogs, menus, and form controls.
- Loading, empty, error, and success states.
- No React exceptions or failed requests in the browser console.

---

## Security and Privacy

- **Never commit secrets.** `.env.local` is ignored; `.env.example` must contain placeholders only.
- **Never put private data in `VITE_*`.** These values are shipped to every browser.
- **Do not log tokens or personal data.** Avoid `console.log` of credentials, full API payloads, or user records.
- **Respect the token model.** The access token is currently persisted in `localStorage`; do not add additional persistent secrets, and do not weaken the existing `401` handling.
- **Do not bypass the API.** Hiding a button is not authorization. Destructive operations must be validated by the backend.
- **Report vulnerabilities privately.** Follow [`SECURITY.md`](SECURITY.md); do not open a public issue with exploit details.

---

## Pull Request Process

1. Create your branch from an up-to-date `main`.
2. Make a focused change and keep the diff scoped to the problem.
3. Run `npm run lint` and `npm run build`.
4. Update documentation when behavior, configuration, scripts, or architecture changes.
5. Add a `CHANGELOG.md` entry under `Unreleased` for user-visible changes.
6. Open the pull request using the repository template and describe how the change was tested.
7. Include screenshots or a short recording for visual changes, in both themes when relevant.
8. Address review comments and keep the branch up to date before merge.

### Definition of Done

- [ ] The change solves the stated problem without unrelated edits.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Manual test evidence is included for behavior or UI changes.
- [ ] Loading, empty, error, and unauthorized states were considered.
- [ ] Documentation and `CHANGELOG.md` are updated when needed.
- [ ] No secrets, tokens, or personal data were added.
- [ ] Responsive and keyboard behavior were verified.
- [ ] The pull request has no unresolved review threads.
