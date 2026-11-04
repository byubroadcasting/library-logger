# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-11-04

### Changed
- Updated `winston` to `^3.19.0` and `logform` to `^2.7.0` (same majors).
- Updated dev dependency `standard` from `^14.3.3` to `^17.1.2` (development tooling only; no consumer impact).
- Added a `lint` npm script (`standard`).
- `package-lock.json` is now committed.

### Security
- Resolved all `npm audit` findings (6 high, 2 low) by updating dependencies.
- LIB-564: 18 moderate `npm audit` findings from [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) (`minimatch` < 11.0.1, "potential denial of service via globparts amplification") remain as a documented residual. All 18 rows are the single installed `minimatch@3.1.5` reached only through the dev-only `standard@17.1.2` / ESLint 8 toolchain (`eslint`, `@eslint/eslintrc`, `@humanwhocodes/config-array`, `eslint-plugin-import`, `eslint-plugin-n`, `eslint-plugin-react`, `glob` 7 via `rimraf`/`flat-cache`/`file-entry-cache`). The production dependency tree (`winston`, `logform`) audits clean (`npm audit --omit=dev`: 0 findings).
  - Why there is no fix: every parent declares `minimatch ^3.x`, 3.1.5 is the newest 3.x release, and the only patched versions are 11.0.1 and later. The only `npm audit fix` offer is a forced downgrade of `standard` to an older major, which is not acceptable. `standard` 17.1.2 is the latest release, and ESLint 9 still depends on `minimatch ^3.1.5`, so no toolchain upgrade clears the advisory either.
  - Why no `overrides` entry: forcing `minimatch` 11 onto these parents breaks them (`glob` 7 reads the removed `minimatch.globSet`; `eslint-plugin-react`, `eslint-plugin-import`, ESLint's `eslint-helpers` and `@eslint/eslintrc` call the callable default export that v11 no longer provides), and `minimatch` 11 requires Node 20 || >=22, which this package does not declare.
  - No runtime dependency, public API, or consumer change in this ticket.
