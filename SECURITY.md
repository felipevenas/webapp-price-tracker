# Security Policy 🔒

**Price Tracker Web** is the browser client for the Price Tracker ecosystem. It handles authentication state and product data, and it must never become a path for leaking credentials or another user's information.

If you believe you have found a vulnerability, we appreciate responsible disclosure.

---

## Supported Versions

There are no tagged releases yet. Only the latest commit on `main` receives security fixes:

| Version | Supported |
|---|---|
| `main` (latest commit) | :white_check_mark: |
| Older commits, forks, and unmaintained copies | :x: |

Always test against an up-to-date clone of `main` before reporting.

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities in public issues, pull requests, or discussions.**

1. Open a confidential report through **[Private Vulnerability Reporting](https://github.com/felipevenas/webapp-price-tracker/security/advisories/new)**.
2. If private reporting is unavailable, contact the maintainer through [@felipevenas](https://github.com/felipevenas) without disclosing technical details publicly.
3. Include the affected route or file, reproduction steps, potential impact, and a proof of concept when possible.
4. Do not include real credentials, another person's data, or production secrets in the report.

We aim to acknowledge a report within **48 business hours** and to provide an initial assessment and mitigation plan after triage.

---

## Frontend Security Scope

The following issues are considered high priority for this repository:

- **Token theft through XSS.** The current client stores the access token in `localStorage`, so any script execution in the origin can read it. Injection through API responses, product names, URLs, error messages, or URL parameters is therefore critical.
- **Secrets in the client bundle.** Any credential committed to the repository or placed in a `VITE_*` variable is public by definition and may end up in `dist/`.
- **Authorization assumed by the interface.** A destructive action must be enforced by the API. Hiding a button, route, or field is not an access control.
- **Sensitive data exposure.** Leaking e-mail addresses, product lists, tokens, or other user data through logs, URLs, error messages, analytics, or shared browser storage.
- **Unsafe URL handling.** `javascript:`, `data:`, or attacker-controlled URLs rendered as links, or an API base URL that allows mixed content or an unintended host.
- **Dependency vulnerabilities** with a realistic impact on the build or runtime.
- **Weak session behavior.** Removing the `401` handling, persisting additional secrets, or introducing a token flow that is less safe than the current one.
- **Missing transport security.** Serving the frontend over HTTP or calling an HTTP API from an HTTPS page.

Backend issues such as scraping behavior, authentication policy, database access, or rate limiting belong to [api-price-tracker](https://github.com/felipevenas/api-price-tracker). Report them through the same private channel and identify the affected component.

### Out of scope

- Findings that require a compromised browser, malicious extension, or physical access to the device.
- Missing security headers on a local development server, unless they also affect the documented production setup.
- Automated scanner output without a reproducible impact.
- Social engineering, spam, or denial-of-service tests against infrastructure you do not own.

---

## Resolution Process

1. We confirm the report, classify its impact, and define a private remediation plan.
2. We prepare and review the fix, adding regression coverage when test infrastructure exists.
3. We merge the fix into `main` and record it in [`CHANGELOG.md`](CHANGELOG.md).
4. We publish a GitHub Security Advisory when appropriate and credit the researcher if they wish.

Please give us a reasonable window to fix the issue before any public disclosure. Thank you for helping keep Price Tracker users safe.
