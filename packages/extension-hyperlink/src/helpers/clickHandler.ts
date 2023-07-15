import { getAttributes } from "@tiptap/core";
import { MarkType } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Editor } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import * as tippy from "./tippyHelper";
// import "tippy.js/dist/svg-arrow.css";

// Define type for the ClickHandlerOptions
type ClickHandlerOptions = {
  type: MarkType;
  editor: Editor;
  validate?: (url: string) => boolean;
  view: EditorView;
  modals: {
    previewHyperlink?: ((options: any) => HTMLElement) | null;
    setHyperlink?: ((options: any) => HTMLElement) | null;
  };
};

export default function clickHandler(options: ClickHandlerOptions): Plugin {
  const { tippyModal } = tippy.init(options);

  return new Plugin({
    key: new PluginKey("handleClickHyperlink"),
    props: {
      handleClick: (view, pos, event) => {
        if (event.button !== 0) return false;

        // Get the target HTML element and its position
        const nodeTarget: HTMLElement = event.target as HTMLElement;
        const nodePos = view.posAtDOM(nodeTarget, 0);

        // Find the closest link element to the target element
        const link = nodeTarget?.closest("a");

        // Extract attributes from the state
        const attrs = getAttributes(view.state, options.type.name);

        // Extract href and target attributes from the link element or the state
        const href = link?.href ?? attrs.href;
        const target = link?.target ?? attrs.target;

        // If there is no previewHyperlink modal provided, then open the link in new window
        if (!options.modals.previewHyperlink) {
          if (link && href) {
            window.open(href, target);
          }
          return true;
        }

        // if the link does not contain href attribute, hide the tooltip
        if (!link?.href) return tippy.hide();

        // Create a preview of the hyperlink
        const hyperlinkPreview = options.modals.previewHyperlink({
          link,
          nodePos,
          ...options,
        });

        // If there is no hyperlink preview, hide the modal
        if (!hyperlinkPreview) return tippy.hide();

        // Empty the modal and append the hyperlink preview box
        tippyModal.innerHTML = "";
        tippyModal.append(hyperlinkPreview);

        // Update the modal position
        tippy.update(options.view);

        return false;
      },
    },
  });
}
