# 🖇️Hyperlink Extension for Tiptap Editor

![Generic badge](https://img.shields.io/badge/version-1.0.0-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a powerful extension for the [Tiptap](https://tiptap.dev/) editor that greatly enhances the hyperlink functionality. Designed with user experience in mind, it seeks to bring Google Docs link plugin experience to Tiptap.

## 🚀 Features

- Edit hyperlink text and URL using straightforward commands:
- editor.commands.editHyperLinkText('New Text')
- editor.commands.editHyperLinkHref('<https://new-url.com>')
- editor.commands.editHyperlink({ newText: 'New Text', newURL: '<https://new-url.com>' })
- Configurable modals for hyperlink previews and setting hyperlinks. Users can develop any UI for the extension and extend the extension with the modal.
- Hyperlink.configure({ modals: { previewHyperlink: (data) => { return previewHyperlinkModal(data); }, setHyperlink: (data) => { return setHyperlinks(data); }, } }), For more details take a look at the extension [document](https://github.com/HMarzban/extension-hyperlink/tree/main/packages/extension-hyperlink).

## 🎨 Headless UI

We've developed the hyperlink extension as a headless UI. This means you can build your own interface while leveraging our underlying functionality. This is perfect for teams looking to maintain a consistent UI throughout their application.

## 📝 Future Features

- Search and select all links in the document.
- Select a heading and set it as an anchor to the text.
And more!

## 🔧 Setup

To integrate the hyperlink extension into your project:

1. Install the package: `$ npm install @tiptap/extension-hyperlink`
2. Import the extension into your project: `import Hyperlink from '@tiptap/extension-hyperlink'`
3. Add the extension to your Tiptap Editor: `editor = new Editor({ extensions: [Hyperlink], })`;

For more details, follow the hyperlink [document](https://github.com/HMarzban/extension-hyperlink/tree/main/packages/extension-hyperlink).

## 💼 Use in Docs.plus

This extension is primarily developed for the [docs.plus](http://github.com/docs-plus/docs.plus) project, an open-source, real-time collaboration tool. This tool, among other features, allows communities to share and organize information logically and hierarchically.

## 📜 License

This project is licensed under the terms of the MIT license. You're free to use, modify, distribute, and even sell your modifications under the same terms.

## 🤝 Contribute

Contributions are always welcome! Feel free to open a PR or submit an issue on GitHub.

Thank you for considering or using our hyperlink extension! We hope it enhances your Tiptap editor experience.
