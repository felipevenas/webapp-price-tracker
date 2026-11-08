# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/).

No tagged releases are documented yet. The project version in `package.json` remains `0.0.0` until the first release is cut.

---

## [Unreleased]

### Added

- `CODE_OF_CONDUCT.md` with community standards, reporting guidance, and scope.
- `CHANGELOG.md` following Keep a Changelog and Semantic Versioning.
- `.env.example` documenting the single public build-time variable, `VITE_API_BASE_URL`.
- `.gitattributes` to normalize text files to LF while preserving binary assets.
- `.github/ISSUE_TEMPLATE/bug_report.md` and `.github/ISSUE_TEMPLATE/feature_request.md` in English, in the directory GitHub recognizes.

### Changed

- Rewrote `README.md` in English with the full project overview, verified stack, architecture, environment table, routes, API surface, scripts, testing status, deployment notes, limitations, and governance.
- Rewrote `CONTRIBUTING.md` and `SECURITY.md` in English, aligned with the current scripts and security model.
- Translated `.github/pull_request_template.md` and the label descriptions in `.github/labels.yml` to English.
- Moved the issue templates from `.github/issue_template/` to `.github/ISSUE_TEMPLATE/` so GitHub discovers them.

### Fixed

- Corrected the documented environment variable from `VITE_API_URL` to `VITE_API_BASE_URL`, which is the name actually read by `src/config/api.ts`.
- Documented the real default API base URL, `http://localhost:8000/api/v1`.
- Normalized the rewritten documentation to UTF-8 without replacement characters or corrupted accents.

### Documentation

- Standardized repository documentation and governance in English while keeping product UI copy, currency (`BRL`), and date locale (`pt-BR`) unchanged.
- Recorded the current MVP limitations explicitly, including `localStorage` token persistence, the absence of a refresh-token flow, the lack of automated tests and CI, the 100-product fetch limit, immediate deletion without confirmation, and the fixed Brazilian Portuguese locale.
