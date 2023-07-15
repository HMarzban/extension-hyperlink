import { MarkType } from "@tiptap/pm/model";
import { Plugin } from "@tiptap/pm/state";
type AutoHyperlinkOptions = {
    type: MarkType;
    validate?: (url: string) => boolean;
};
export default function autoHyperlink(options: AutoHyperlinkOptions): Plugin;
export {};
