# Project Structure

The core idea of VitePress is simple: Markdown files under `docs/` are compiled into a static site.

## Recommended Layout

```text
docs/
  index.md
  guide/
  api/
  tutorial/
```

## Config Entry

The main site config lives in `docs/.vitepress/config.mts`.

You will usually manage these there:

- Site title and description
- Top navigation
- Sidebar
- Social links
- Footer

## Theme Customization

If you want to change colors, fonts, or local components, start from `docs/.vitepress/theme/custom.css`.
