import { Editor, Node } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import { tippy } from "@docsplus/extension-hyperlink";

import { editeHyperlinkHandler } from "./editeHyperlink";

import { Copy, LinkSlash, Pencil } from "../icons";

type HyperlinkModalOptions = {
  editor: Editor;
  validate?: (url: string) => boolean;
  view: EditorView;
  link: HTMLAnchorElement;
  node?: any;
  nodePos: number;
};

export default function createHyperlinkModal(options: HyperlinkModalOptions) {
  const href = options.link.href;

  const hyperlinkLinkModal = document.createElement("div");
  const hrefLinkBubble = document.createElement("div");
  const removeButton = document.createElement("button");
  const copyButton = document.createElement("button");
  const editButton = document.createElement("button");

  hyperlinkLinkModal.classList.add("hyperlinkLinkModal");

  hrefLinkBubble.classList.add("hrefLink");
  hrefLinkBubble.innerText = href;

  removeButton.classList.add("remove");
  removeButton.innerHTML = LinkSlash();

  editButton.classList.add("edit");
  editButton.innerHTML = Pencil();

  copyButton.classList.add("copy");
  copyButton.innerHTML = Copy();

  removeButton.addEventListener("click", () => {
    tippy.destroyTooltip();
    return options.editor.chain().focus().unsetHyperlink().run();
  });

  editButton.addEventListener("click", () =>
    editeHyperlinkHandler({ ...options, hyperlinkLinkModal })
  );

  copyButton.addEventListener("click", () => {
    tippy.hide();
    navigator.clipboard.writeText(href);
  });

  hyperlinkLinkModal.append(hrefLinkBubble, copyButton, removeButton, editButton);

  return hyperlinkLinkModal;
}
