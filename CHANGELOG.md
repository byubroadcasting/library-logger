# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1]

### Changed
- Updated `winston` to `^3.19.0` and `logform` to `^2.7.0` (same majors).
- Updated dev dependency `standard` from `^14.3.3` to `^17.1.2` (development tooling only; no consumer impact).
- Added a `lint` npm script (`standard`).
- `package-lock.json` is now committed.

### Security
- Resolved all `npm audit` findings (6 high, 2 low) by updating dependencies.
