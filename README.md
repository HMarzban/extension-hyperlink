# Hyperlink for Tiptap

Add and edit links in Tiptap. Development has moved to the [docs.plus monorepo](https://github.com/docs-plus/docs.plus/tree/main/extensions/extension-hyperlink).

This repository preserves the standalone 1.x source and its issue history. Use the monorepo for current code, documentation, tests, and contributions.

## Use the current package

The npm package name stays the same:

```sh
bun add @docs.plus/extension-hyperlink
```

Read the [current documentation](https://github.com/docs-plus/docs.plus/tree/main/extensions/extension-hyperlink#readme) and [migration notes](https://github.com/docs-plus/docs.plus/blob/main/extensions/extension-hyperlink/CHANGELOG.md) before upgrading. The 2.0.0 release changes parts of the 1.x API.

## Get support or contribute

- [Search current issues](https://github.com/docs-plus/docs.plus/issues?q=is%3Aissue+extension-hyperlink) before opening a report.
- [Report a current issue](https://github.com/docs-plus/docs.plus/issues/new/choose) in the monorepo. Include the package version, Tiptap version, and a small reproduction.
- Send new pull requests to the monorepo. Follow its [contribution guide](https://github.com/docs-plus/docs.plus/blob/main/CONTRIBUTING.md).

Existing reports and pull requests remain here until their disposition is recorded. The move alone does not mean an old bug is fixed. Current development targets the monorepo; this repository has no scheduled 1.x backport releases.

## Using 1.x

The [historical README](README-1.x.md) describes the standalone API. Its examples and roadmap are historical and may differ from the current package.

`editHyperLinkText`, `editHyperLinkHref`, and `previewHyperlinkModal` from the historical README do not exist in 2.0.0.

## License

MIT. See [LICENSE.md](LICENSE.md).
