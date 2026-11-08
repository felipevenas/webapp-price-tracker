# Pull Request Description

Please include a summary of the frontend changes and the problem or feature they address.

---

## Type of Change

- [ ] 🚀 New feature
- [ ] 🐞 Bug fix
- [ ] 🔧 Refactor (no functional change)
- [ ] 📝 Documentation
- [ ] 🎨 Style / design / UI
- [ ] ⚙️ Infrastructure (Vite, dependencies, build, CI/CD, etc.)

## How Was It Tested?

Describe the validation performed and how a reviewer can reproduce it locally.

- [ ] **Development:** Ran `npm run dev` and exercised the affected screen in the browser.
- [ ] **Lint:** Ran `npm run lint` (Oxlint) with no new errors or warnings.
- [ ] **Build and types:** Ran `npm run build` and the production bundle was generated in `dist/` with no TypeScript or Vite errors.
- [ ] **Console:** Checked DevTools and found no React exceptions, rendering errors, or failing API requests.
- [ ] **Responsive behavior:** Checked the affected screens at mobile, tablet, and desktop widths.
- [ ] **Themes:** Checked the affected screens in both light and dark mode.
- [ ] Other tests performed:

> There is no automated test suite in this repository yet. Include a clear manual test plan for behavior changes.

## Visual Evidence / Layout

Paste screenshots, a short recording, or relevant terminal/console logs. For visual changes, include before and after images when possible, and show both themes if the change affects colors or contrast.

## Checklist

- [ ] My change follows the project's architecture and style guidelines.
- [ ] I reviewed my own diff before opening this pull request.
- [ ] I added comments only where the logic is genuinely non-obvious.
- [ ] I updated `CHANGELOG.md` under `Unreleased` for user-visible changes.
- [ ] I updated the documentation when behavior, configuration, or scripts changed.
- [ ] My changes introduce no new console warnings or accessibility regressions.
- [ ] I did not add secrets, tokens, real `.env` files, or personal data.
