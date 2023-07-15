import { Editor } from "@tiptap/core";
type EditHyperlinkOptions = {
    editor: Editor;
    validate?: (url: string) => boolean;
    newURL?: string;
    newText?: string;
};
export default function editHyperlink(options: EditHyperlinkOptions): boolean;
export {};
