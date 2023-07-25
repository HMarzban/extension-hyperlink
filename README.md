# Hyperlink Extension for Tiptap Editor

![Generic badge](https://img.shields.io/badge/version-1.0.0-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Hey there! We're excited to present a game-changing extension for your [Tiptap](https://tiptap.dev/) editor that supercharges your hyperlink game. You know the sleek, easy-to-use Google Docs link plugin? Yeah, we've taken some inspiration from there and brought it over to Tiptap, just for you. So, get ready to enjoy a seamless, user-friendly experience!


## Exciting Features 💡
Here's what you can do with our extension:

- Editing your hyperlink text and URL is as easy as pie now! Just run these commands:
  - `editor.commands.editHyperLinkText('New Text')`
  - `editor.commands.editHyperLinkHref('<https://new-url.com>')`
  - `editor.commands.editHyperlink({ newText: 'New Text', newURL: '<https://new-url.com>' })`
  - Customize your own hyperlink previews and set hyperlinks with modals. Get creative and design any UI for the extension, extend it, make it yours! To do this, use: `Hyperlink.configure({ modals: { previewHyperlink: (data) => { return previewHyperlinkModal(data); }, setHyperlink: (data) => { return setHyperlinks(data); }, } })`

  Curious to know more? Check out the full documentation [here](https://github.com/HMarzban/extension-hyperlink/tree/main/packages/extension-hyperlink).

## All About You: Headless UI 💁‍♀️

We designed the hyperlink extension as a headless UI. You're in the driver's seat here! This means you can build your own interface while using our back-end functions. If you want to keep your application's UI consistent, this is perfect for you.

## Setting Up - Easy As 1, 2, 3! 🔧
Getting the hyperlink extension up and running on your project is super simple. Follow these steps:

1. Install the package: `$ npm install @tiptap/extension-hyperlink`
2. Import the extension into your project: `import Hyperlink from '@tiptap/extension-hyperlink'`
3. Add the extension to your Tiptap Editor: `editor = new Editor({ extensions: [Hyperlink], })`;


You can find more detailed setup instructions [here](https://github.com/HMarzban/extension-hyperlink/tree/main/packages/extension-hyperlink)..

## Test Drive With Our Demo 🚗

Want to take a spin with our Hyperlink extension? We have a demo ready for you:

### Step 1: Get the Essentials

Before hitting the road, make sure your tank's full! Install the necessary dependencies with:
```bash
$ yarn install
```

### Step 2: Run the Demo

With everything in place, you're ready to go. Run the demo with:
```bash
$ yarn dev
```

Now, you can explore all that our Hyperlink extension has to offer in a real-life setting. Enjoy the ride!

## Making Your Docs.plus Even Better 💼

This extension was primarily built for the [docs.plus](http://github.com/docs-plus/docs.plus) project, an open-source platform for real-time collaboration. With this tool, communities can share and organize information in a logical, hierarchical manner, just like they want it.

## What's Next? 🚀
In our mission to make your life easier, we have some exciting features lined up:

- Finding and selecting all links in the document.
- Choosing a heading and setting it as an anchor to the text.
- And much more on the way!

## The Legal Bits 📜
This project is under the MIT license, which means you're free to use, modify, distribute, and even sell your modifications under the same terms.

## Join Our Journey 🤝

We love hearing from our users. Your suggestions, your issues, your PRs - they're all welcome. So don't be shy, feel free to get in touch on GitHub.

We're grateful you chose our hyperlink extension. We hope it makes your Tiptap experience even better.

# Hold On, We're Shifting Gears! 🚚

We're buzzing to let our amazing community know that we're reorganizing our resources. Our Hyperlink extension is now moving to the [Docs.plus repository](https://github.com/docs-plus/docs.plus/tree/main/packages/extension-hyperlink).

This change will help us streamline our processes and make it easier for you to access all our projects from one central location.

We're thrilled about this shift and hope you're just as excited. We always welcome any questions or suggestions - your input helps make Docs.plus even better. Thanks for being a part of our journey! 🙌
