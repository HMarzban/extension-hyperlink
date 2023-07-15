import { Instance, Props } from "tippy.js";
import { Editor } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
type TippyInitOptions = {
    editor: Editor;
    validate?: (url: string) => boolean;
    view: EditorView;
};
export declare const init: (options: TippyInitOptions) => {
    tippyModal: HTMLDivElement;
    tippyInstance: Instance<Props> | undefined;
};
export declare const show: () => boolean;
export declare const hide: () => boolean;
export declare const mousedownHandler: () => void;
export declare const dragstartHandler: () => void;
export declare const focusHandler: () => void;
export declare const update: (view: EditorView, option?: any) => {};
export declare const destroyTooltip: () => void;
export {};
