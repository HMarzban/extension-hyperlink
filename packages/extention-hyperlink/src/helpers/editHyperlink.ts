import { Editor } from "@tiptap/core";
import { find } from "linkifyjs";

type EditHyperlinkOptions = {
  editor: Editor;
  validate?: (url: string) => boolean;
  newURL?: string;
  newText?: string;
};

export default function editHyperlink(options: EditHyperlinkOptions) {
  const { state, dispatch } = options.editor.view;
  const { from, to } = state.selection;
  let link: HTMLAnchorElement | null = null;

  const selectedNode = options.editor.view.domAtPos(from - 1)
    .node as HTMLElement;

  if (selectedNode?.nodeName === "#text") {
    link = (selectedNode.parentNode as HTMLElement)?.closest("a");
  } else {
    link = selectedNode?.closest("a");
  }

  if (!link) return true;

  const text = options.newText || link?.innerText;
  // Get the position of the link in the editor view
  const nodePos = options.editor.view.posAtDOM(link, 0);

  const sanitizeURL = find(options.newURL || link.href)
    .filter((link) => link.isLink)
    .filter((link) => (options.validate ? options.validate(link.value) : true))
    .at(0);

  return options.editor
    .chain()
    .focus()
    .command(({ tr }) => {
      // The command replaces the range from nodePos to nodePos + length of the text
      // with a new text node with the provided text and a link mark with the sanitized URL
      tr.replaceWith(
        nodePos,
        nodePos + text?.length,
        options.editor.schema.text(text, [
          options.editor.schema.marks.hyperlink.create({
            href: sanitizeURL?.href,
          }),
        ])
      );

      return true;
    })
    .run();
}
