# Self-hosted Inter Variable Font

This template uses a self-hosted Inter variable font for optimal performance (no
external network requests, zero CLS on font swap).

## Download

1. Go to https://github.com/rsms/inter/releases and download the latest release.
2. Extract the archive and copy these two files into this folder:
   - `InterVariable.woff2` → rename to `inter-variable.woff2`
   - `InterVariable-Italic.woff2` → rename to `inter-variable-italic.woff2`

## Why self-hosted?

- No external network request at build time or runtime
- Works in air-gapped / offline environments
- `size-adjust: 100%` in `src/index.css` prevents CLS when the font swaps in
  from the system fallback

## The @font-face declaration

Already written in `src/index.css`. Once the woff2 files are in this folder,
fonts will load automatically.
