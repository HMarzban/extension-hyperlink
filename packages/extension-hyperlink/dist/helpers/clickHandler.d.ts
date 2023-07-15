import { MarkType } from "@tiptap/pm/model";
import { Plugin } from "@tiptap/pm/state";
import { Editor } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
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
export default function clickHandler(options: ClickHandlerOptions): Plugin;
export {};
