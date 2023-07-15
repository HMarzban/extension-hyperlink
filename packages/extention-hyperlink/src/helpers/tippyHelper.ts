import tippy, { Instance, Props, roundArrow } from "tippy.js";
import { Editor } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import { getAttributes, posToDOMRect } from "@tiptap/core";

let tippyInstance: Instance | undefined;
let preventHide: boolean = false;
let tippyWrapper: HTMLDivElement;
let editor: Editor;
let view: EditorView;

type TippyInitOptions = {
  editor: Editor;
  validate?: (url: string) => boolean;
  view: EditorView;
};

export const init = (options: TippyInitOptions) => {
  editor = options.editor;
  view = options.view;
  if (!tippyInstance) {
    tippyWrapper = document.createElement("div");
    tippyWrapper.addEventListener("mousedown", mousedownHandler, {
      capture: true,
    });
    view.dom.addEventListener("dragstart", dragstartHandler);
    editor.on("focus", focusHandler);
    editor.on("blur", blurHandler);
  }

  return { tippyModal: tippyWrapper, tippyInstance: tippyInstance };
};

export const show = () => {
  tippyInstance?.show();
  return true;
};

export const hide = () => {
  setTimeout(() => tippyInstance?.hide());
  return false;
};

export const mousedownHandler = () => {
  preventHide = true;
};

export const dragstartHandler = () => {
  hide();
};

export const focusHandler = () => {
  setTimeout(() => update(editor.view));
};

const blurHandler = ({ event }: { event: FocusEvent }) => {
  if (preventHide) {
    preventHide = false;
    return;
  }
  if (
    event?.relatedTarget &&
    tippyWrapper.parentNode?.contains(event.relatedTarget as Node)
  ) {
    return;
  }
  hide();
};

const tippyBlurHandler = (event: FocusEvent) => {
  blurHandler({ event });
};

const createTooltip = () => {
  if (!editor || !editor.options) return;
  const { element: editorElement } = editor.options;
  const editorIsAttached = !!editorElement.parentElement;

  if (tippyInstance || !editorIsAttached) {
    return;
  }

  tippyInstance = tippy(editorElement, {
    duration: 0,
    getReferenceClientRect: null,
    content: tippyWrapper,
    interactive: true,
    trigger: "manual",
    placement: "bottom",
    hideOnClick: "toggle",
  });

  if (tippyInstance.popper.firstChild) {
    (tippyInstance.popper.firstChild as HTMLElement).addEventListener(
      "blur",
      tippyBlurHandler
    );
  }
};

export const update = (view: EditorView, option: any = {}) => {
  createTooltip();

  // Ensure 'arrow' is false when not provided
  option.arrow = option?.arrow ?? false;

  if (tippyInstance) {
    tippyInstance.setProps({
      ...option,
      getReferenceClientRect: () => {
        const pos = view.state.selection.from;
        return posToDOMRect(view, pos, pos);
      },
    });
    show();
  }

  return {};
};

export const destroyTooltip = () => {
  if (tippyInstance) {
    tippyInstance.destroy();
    tippyInstance = undefined;
    tippyWrapper.removeEventListener("mousedown", mousedownHandler, {
      capture: true,
    });
    view.dom.removeEventListener("dragstart", dragstartHandler);
    editor.off("focus", focusHandler);
    editor.off("blur", blurHandler);
  }
};
