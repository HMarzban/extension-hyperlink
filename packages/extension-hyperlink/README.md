# Hyperlink

[![Version](https://img.shields.io/npm/v/@docs.plus/extension-hyperlink.svg?label=version)](https://www.npmjs.com/package/@docs.plus/extension-hyperlink)
[![Downloads](https://img.shields.io/npm/dm/@docs.plus/extension-hyperlink.svg)](https://npmcharts.com/compare/@docs.plus/extension-hyperlink)
[![License](https://img.shields.io/npm/l/@docs.plus/extension-hyperlink.svg)](https://www.npmjs.com/package/@docs.plus/extension-hyperlink)


The Link extension adds support for `<a>` tags to the editor. The extension is headless, there is no actual <u>**UI**</u> to add, <u>modify</u> or <u>delete</u> links. The usage example below uses the native JavaScript prompt to show you how that could work.

In a real world application, you would probably add a more sophisticated user interface.

## Installation

````sh
npm install @docsplus/extension-hyperlink
````

## Settings

### protocols

Additional custom protocols you would like to be recognized as links.

Default: `[]`

````js
Hyperlink.configure({
  protocols: ['ftp', 'mailto'],
})
````

By default, [linkify](https://linkify.js.org/docs/) adds `//` to the end of a protocol however this behavior can be changed by passing `optionalSlashes` option

````js
Hyperlink.configure({
  protocols: [
    {
      scheme: 'tel',
      optionalSlashes: true
    }
  ]
})
````

### autolink

If enabled, it adds links as you type.

Default: `true`

````js
Hyperlink.configure({
  autolink: false,
})
````

### openOnClick

If enabled, links will be opened on click.

Default: `true`

````js
Hyperlink.configure({
  openOnClick: false,
})
````

### linkOnPaste

Adds a link to the current selection if the pasted content only contains an url.

Default: `true`

````js
Hyperlink.configure({
  linkOnPaste: false,
})
````

### HTMLAttributes

Custom HTML attributes that should be added to the rendered HTML tag.

````js
Hyperlink.configure({
  HTMLAttributes: {
    class: 'my-custom-class',
  },
})
````

### Modals

The Modals configuration option lets you incorporate an interactive user interface similar to Google Docs for **setting** and **previewing** hyperlinks. This provides users with a more intuitive and interactive experience;
- [Dive into the code](https://github.com/HMarzban/extension-hyperlink/blob/4f37ffa18237f10d76c316844b1c2ab20b751fe9/packages/nextjs/src/components/Tiptap.tsx#L21-L28)
- [Demo](https://github.com/HMarzban/extension-hyperlink#test-drive-with-our-demo-)

<details>
<summary>The `previewHyperlinkModal` function</summary>

```ts

```

</details>

<details>
<summary>The `setHyperlinkModal` function</summary>

```ts

```

</details>

````ts
import {
  Hyperlink,
  previewHyperlinkModal,
  setHyperlinkModal
} from "@docs.plus/extension-hyperlink";

Hyperlink.configure({
  modals: {
    previewHyperlink: (data) => {
      return previewHyperlinkModal(data);
    },
    setHyperlink: (data) => {
      return setHyperlinkModal(data);
    },
  },
})
````
> Note: The `previewHyperlinkModal` and `setHyperlinkModal` modals are prebuilt modal boxes. You can use them or create your own modal boxes. To learn how to create your own modal boxes, please check the [source code](https://github.com/HMarzban/extension-hyperlink/tree/main/packages/extension-hyperlink/src/modals)


### Removing and overriding existing html attributes

You can add `rel: null` to HTMLAttributes to remove the default `rel="noopener noreferrer nofollow"`. You can also override the default by using `rel: "your-value"`.

This can also be used to change the `target` from the default value of `_blank`.

````js
Hyperlink.configure({
  HTMLAttributes: {
    // Change rel to different value
    // Allow search engines to follow links(remove nofollow)
    rel: 'noopener noreferrer',
    // Remove target entirely so links open in current tab
    target: null,
  },
})
````

### validate

A function that validates every autolinked link. If it exists, it will be called with the link href as argument. If it returns `false`, the link will be removed.

Can be used to set rules for example excluding or including certain domains, tlds, etc.

````js
// only autolink urls with a protocol
Hyperlink.configure({
  validate: href => /^https?:\/\//.test(href),
})
````

## Commands

### editHyperLinkText(), editHyperLinkHref(), editHyperlink()

These commands allow you to edit the text and href value of a hyperlink.

```js
this.editor.commands.editHyperLinkText('New Text');
this.editor.commands.editHyperLinkHref('https://new-url.com');
this.editor.commands.editHyperlink({
  newText: 'New Text',
  newURL: 'https://new-url.com'
});
```

### setHyperlink()

Links the selected text.

````js
this.editor.commands.setHyperlink({
  href: '<https://example.com>'
});

this.editor.commands.setHyperlink({
  href: '<https://example.com>',
  target: '_blank'
});

this.editor.commands.unsetHyperlink();
````

### unsetHyperlink()

Removes a Hyperlink.

````js
this.editor.commands.unsetHyperlink();
````

## Keyboard shortcuts

Doesn’t have a keyboard shortcut
This extension doesn’t bind a specific keyboard shortcut. You would probably open your custom UI on `Mod-k` though.

## Get the current value

Did you know that you can use `getAttributes` to find out which attributes, for example which href, is currently set? Don’t confuse it with a <u>command</u> (which changes the state), it’s just a method. Here is how that could look like:

```js
this.editor.getAttributes('link').href
```

## Sorce code and Example

- Demo:
[packages/extension-hyperlink](https://github.com/HMarzban/extension-hyperlink)
- Extension:
[packages/extension-hyperlink](https://github.com/HMarzban/extension-hyperlink/tree/main/packages/extension-hyperlink)
- Usage:  [packages/nextjs/src/components/Tiptap.tsx](https://github.com/HMarzban/extension-hyperlink/blob/59f45eba1886202f4840eb2112c34574c16fe68a/packages/nextjs/src/components/Tiptap.tsx#L19-L29)

## Inspiration and Acknowledgment, Let's Connect

Thank you for exploring our Hyperlink extension from docs.plus! We aim to make collaboration and knowledge sharing not just easy, but also enjoyable.

Our extension is inspired by Tiptap's [extension-link](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-link). While we've incorporated our own enhancements, we'd like to tip our hats to Tiptap for pioneering the "headless" approach that we admire greatly. Please note: We're not affiliated with Tiptap, but we believe in recognizing foundational work.

Your feedback and interest in docs.plus are invaluable to us. Share your thoughts, suggestions, or dive deeper into our mission at the [docs.plus](https://github.com/docs-plus/docs.plus) repository. Wish to converse? Connect with us [here](https://github.com/docs-plus/docs.plus#-connect-with-us).
