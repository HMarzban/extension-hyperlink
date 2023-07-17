'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@tiptap/core');
var linkifyjs = require('linkifyjs');
var state = require('@tiptap/pm/state');
var tippy = require('tippy.js');

function autoHyperlink(options) {
    return new state.Plugin({
        key: new state.PluginKey("autoHyperlink"),
        appendTransaction: (transactions, oldState, newState) => {
            const docChanges = transactions.some((transaction) => transaction.docChanged) &&
                !oldState.doc.eq(newState.doc);
            const preventAutoHyperlink = transactions.some((transaction) => transaction.getMeta("preventAutoHyperlink"));
            if (!docChanges || preventAutoHyperlink) {
                return;
            }
            const { tr } = newState;
            const transform = core.combineTransactionSteps(oldState.doc, [
                ...transactions,
            ]);
            const { mapping } = transform;
            const changes = core.getChangedRanges(transform);
            changes.forEach(({ oldRange, newRange }) => {
                // at first we check if we have to remove links
                core.getMarksBetween(oldRange.from, oldRange.to, oldState.doc)
                    .filter((item) => item.mark.type === options.type)
                    .forEach((oldMark) => {
                    const newFrom = mapping.map(oldMark.from);
                    const newTo = mapping.map(oldMark.to);
                    const newMarks = core.getMarksBetween(newFrom, newTo, newState.doc).filter((item) => item.mark.type === options.type);
                    if (!newMarks.length) {
                        return;
                    }
                    const newMark = newMarks[0];
                    const oldLinkText = oldState.doc.textBetween(oldMark.from, oldMark.to, undefined, " ");
                    const newLinkText = newState.doc.textBetween(newMark.from, newMark.to, undefined, " ");
                    const wasLink = linkifyjs.test(oldLinkText);
                    const isLink = linkifyjs.test(newLinkText);
                    // remove only the link, if it was a link before too
                    // because we don’t want to remove links that were set manually
                    if (wasLink && !isLink) {
                        tr.removeMark(newMark.from, newMark.to, options.type);
                    }
                });
                // now let’s see if we can add new links
                const nodesInChangedRanges = core.findChildrenInRange(newState.doc, newRange, (node) => node.isTextblock);
                let textBlock;
                let textBeforeWhitespace;
                if (nodesInChangedRanges.length > 1) {
                    // Grab the first node within the changed ranges (ex. the first of two paragraphs when hitting enter)
                    textBlock = nodesInChangedRanges[0];
                    textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, textBlock.pos + textBlock.node.nodeSize, undefined, " ");
                }
                else if (nodesInChangedRanges.length &&
                    // We want to make sure to include the block seperator argument to treat hard breaks like spaces
                    newState.doc
                        .textBetween(newRange.from, newRange.to, " ", " ")
                        .endsWith(" ")) {
                    textBlock = nodesInChangedRanges[0];
                    textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, newRange.to, undefined, " ");
                }
                if (textBlock && textBeforeWhitespace) {
                    const wordsBeforeWhitespace = textBeforeWhitespace
                        .split(" ")
                        .filter((s) => s !== "");
                    if (wordsBeforeWhitespace.length <= 0) {
                        return false;
                    }
                    const lastWordBeforeSpace = wordsBeforeWhitespace[wordsBeforeWhitespace.length - 1];
                    const lastWordAndBlockOffset = textBlock.pos +
                        textBeforeWhitespace.lastIndexOf(lastWordBeforeSpace);
                    if (!lastWordBeforeSpace) {
                        return false;
                    }
                    linkifyjs.find(lastWordBeforeSpace)
                        .filter((link) => link.isLink)
                        .filter((link) => {
                        if (options.validate) {
                            return options.validate(link.value);
                        }
                        return true;
                    })
                        // calculate link position
                        .map((link) => ({
                        ...link,
                        from: lastWordAndBlockOffset + link.start + 1,
                        to: lastWordAndBlockOffset + link.end + 1,
                    }))
                        // add link mark
                        .forEach((link) => {
                        tr.addMark(link.from, link.to, options.type.create({
                            href: link.href,
                        }));
                    });
                }
            });
            if (!tr.steps.length) {
                return;
            }
            return tr;
        },
    });
}

let tippyInstance;
let preventHide = false;
let tippyWrapper;
let editor;
let view;
const init = (options) => {
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
const show = () => {
    tippyInstance === null || tippyInstance === void 0 ? void 0 : tippyInstance.show();
    return true;
};
const hide = () => {
    setTimeout(() => tippyInstance === null || tippyInstance === void 0 ? void 0 : tippyInstance.hide());
    return false;
};
const mousedownHandler = () => {
    preventHide = true;
};
const dragstartHandler = () => {
    hide();
};
const focusHandler = () => {
    setTimeout(() => update(editor.view));
};
const blurHandler = ({ event }) => {
    var _a;
    if (preventHide) {
        preventHide = false;
        return;
    }
    if ((event === null || event === void 0 ? void 0 : event.relatedTarget) && ((_a = tippyWrapper.parentNode) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget))) {
        return;
    }
    hide();
};
const tippyBlurHandler = (event) => {
    blurHandler({ event });
};
const createTooltip = () => {
    if (!editor || !editor.options)
        return;
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
        tippyInstance.popper.firstChild.addEventListener("blur", tippyBlurHandler);
    }
};
const update = (view, option = {}) => {
    var _a;
    createTooltip();
    // Ensure 'arrow' is false when not provided
    option.arrow = (_a = option === null || option === void 0 ? void 0 : option.arrow) !== null && _a !== void 0 ? _a : false;
    if (tippyInstance) {
        tippyInstance.setProps({
            ...option,
            getReferenceClientRect: () => {
                const pos = view.state.selection.from;
                return core.posToDOMRect(view, pos, pos);
            },
        });
        show();
    }
    return {};
};
const destroyTooltip = () => {
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

var tippyHelper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  destroyTooltip: destroyTooltip,
  dragstartHandler: dragstartHandler,
  focusHandler: focusHandler,
  hide: hide,
  init: init,
  mousedownHandler: mousedownHandler,
  show: show,
  update: update
});

function clickHandler(options) {
    const { tippyModal } = init(options);
    return new state.Plugin({
        key: new state.PluginKey("handleClickHyperlink"),
        props: {
            handleClick: (view, pos, event) => {
                var _a, _b;
                if (event.button !== 0)
                    return false;
                // Get the target HTML element and its position
                const nodeTarget = event.target;
                const nodePos = view.posAtDOM(nodeTarget, 0);
                // Find the closest link element to the target element
                const link = nodeTarget === null || nodeTarget === void 0 ? void 0 : nodeTarget.closest("a");
                // Extract attributes from the state
                const attrs = core.getAttributes(view.state, options.type.name);
                // Extract href and target attributes from the link element or the state
                const href = (_a = link === null || link === void 0 ? void 0 : link.href) !== null && _a !== void 0 ? _a : attrs.href;
                const target = (_b = link === null || link === void 0 ? void 0 : link.target) !== null && _b !== void 0 ? _b : attrs.target;
                // If there is no previewHyperlink modal provided, then open the link in new window
                if (!options.modals.previewHyperlink) {
                    if (link && href) {
                        window.open(href, target);
                    }
                    return true;
                }
                // if the link does not contain href attribute, hide the tooltip
                if (!(link === null || link === void 0 ? void 0 : link.href))
                    return hide();
                // Create a preview of the hyperlink
                const hyperlinkPreview = options.modals.previewHyperlink({
                    link,
                    nodePos,
                    ...options,
                });
                // If there is no hyperlink preview, hide the modal
                if (!hyperlinkPreview)
                    return hide();
                // Empty the modal and append the hyperlink preview box
                tippyModal.innerHTML = "";
                tippyModal.append(hyperlinkPreview);
                // Update the modal position
                update(options.view);
                return false;
            },
        },
    });
}

function pasteHandler(options) {
    return new state.Plugin({
        key: new state.PluginKey("handlePasteHyperlink"),
        props: {
            handlePaste: (view, event, slice) => {
                const { state } = view;
                const { selection } = state;
                const { empty } = selection;
                if (empty) {
                    return false;
                }
                let textContent = "";
                slice.content.forEach((node) => {
                    textContent += node.textContent;
                });
                const link = linkifyjs.find(textContent).find((item) => item.isLink && item.value === textContent);
                if (!textContent || !link) {
                    return false;
                }
                options.editor.commands.setMark(options.type, {
                    href: link.href,
                });
                return true;
            },
        },
    });
}

function editHyperlink(options) {
    var _a;
    const { state, dispatch } = options.editor.view;
    const { from, to } = state.selection;
    let link = null;
    const selectedNode = options.editor.view.domAtPos(from - 1)
        .node;
    if ((selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.nodeName) === "#text") {
        link = (_a = selectedNode.parentNode) === null || _a === void 0 ? void 0 : _a.closest("a");
    }
    else {
        link = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.closest("a");
    }
    if (!link)
        return true;
    const text = options.newText || (link === null || link === void 0 ? void 0 : link.innerText);
    // Get the position of the link in the editor view
    const nodePos = options.editor.view.posAtDOM(link, 0);
    const sanitizeURL = linkifyjs.find(options.newURL || link.href)
        .filter((link) => link.isLink)
        .filter((link) => (options.validate ? options.validate(link.value) : true))
        .at(0);
    return options.editor
        .chain()
        .focus()
        .command(({ tr }) => {
        // The command replaces the range from nodePos to nodePos + length of the text
        // with a new text node with the provided text and a link mark with the sanitized URL
        tr.replaceWith(nodePos, nodePos + (text === null || text === void 0 ? void 0 : text.length), options.editor.schema.text(text, [
            options.editor.schema.marks.hyperlink.create({
                href: sanitizeURL === null || sanitizeURL === void 0 ? void 0 : sanitizeURL.href,
            }),
        ]));
        return true;
    })
        .run();
}

const Hyperlink = core.Mark.create({
    name: "hyperlink",
    priority: 1000,
    keepOnSplit: false,
    onCreate() {
        this.options.protocols.forEach((protocol) => {
            if (typeof protocol === "string") {
                linkifyjs.registerCustomProtocol(protocol);
                return;
            }
            linkifyjs.registerCustomProtocol(protocol.scheme, protocol.optionalSlashes);
        });
    },
    onDestroy() {
        linkifyjs.reset();
    },
    inclusive() {
        return this.options.autoHyperlink;
    },
    addOptions() {
        return {
            openOnClick: true,
            hyperlinkOnPaste: true,
            autoHyperlink: true,
            protocols: [],
            HTMLAttributes: {
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null,
            },
            modals: {
                previewHyperlink: null,
                setHyperlink: null,
            },
            validate: undefined,
        };
    },
    addAttributes() {
        return {
            href: {
                default: null,
            },
            target: {
                default: this.options.HTMLAttributes.target,
            },
            class: {
                default: this.options.HTMLAttributes.class,
            },
        };
    },
    parseHTML() {
        return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ["a", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
        return {
            setHyperlink: (attributes) => ({ editor, chain }) => {
                if (!this.options.modals.setHyperlink) {
                    return chain()
                        .setMark(this.name, attributes)
                        .setMeta("preventAutohyperlink", true)
                        .run();
                }
                else {
                    this.options.modals.setHyperlink({
                        editor,
                        validate: this.options.validate,
                        extentionName: this.name,
                        attributes,
                    });
                    return true;
                }
            },
            editHyperlink: (attributes) => ({ editor }) => {
                return editHyperlink({
                    ...attributes,
                    editor,
                    validate: this.options.validate,
                });
            },
            editHyperLinkText: (newText) => ({ editor }) => {
                return editHyperlink({
                    editor,
                    newText,
                    validate: this.options.validate,
                });
            },
            editHyperLinkHref: (newURL) => ({ editor }) => {
                return editHyperlink({
                    editor,
                    validate: this.options.validate,
                    newURL,
                });
            },
            unsetHyperlink: () => ({ chain }) => {
                return chain()
                    .unsetMark(this.name, { extendEmptyMarkRange: true })
                    .setMeta("preventAutohyperlink", true)
                    .run();
            },
        };
    },
    addPasteRules() {
        return [
            core.markPasteRule({
                find: (text) => linkifyjs.find(text)
                    .filter((link) => {
                    if (this.options.validate) {
                        return this.options.validate(link.value);
                    }
                    return true;
                })
                    .filter((link) => link.isLink)
                    .map((link) => ({
                    text: link.value,
                    index: link.start,
                    data: link,
                })),
                type: this.type,
                getAttributes: (match) => {
                    var _a;
                    return ({
                        href: (_a = match.data) === null || _a === void 0 ? void 0 : _a.href,
                    });
                },
            }),
        ];
    },
    addProseMirrorPlugins() {
        const plugins = [];
        if (this.options.autoHyperlink) {
            plugins.push(autoHyperlink({
                type: this.type,
                validate: this.options.validate,
            }));
        }
        if (this.options.openOnClick) {
            plugins.push(clickHandler({
                type: this.type,
                editor: this.editor,
                validate: this.options.validate,
                view: this.editor.view,
                modals: this.options.modals,
            }));
        }
        if (this.options.hyperlinkOnPaste) {
            plugins.push(pasteHandler({
                editor: this.editor,
                type: this.type,
            }));
        }
        return plugins;
    },
});

exports.Hyperlink = Hyperlink;
exports.default = Hyperlink;
exports.tippy = tippyHelper;
//# sourceMappingURL=index.cjs.map
