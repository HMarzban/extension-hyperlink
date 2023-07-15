import { Mark } from "@tiptap/core";
export interface LinkProtocolOptions {
    scheme: string;
    optionalSlashes?: boolean;
}
export interface HyperlinkOptions {
    /**
     * If enabled, it adds links as you type.
     */
    autoHyperlink: boolean;
    /**
     * An array of custom protocols to be registered with linkifyjs.
     */
    protocols: Array<LinkProtocolOptions | string>;
    /**
     * If enabled, links will be opened on click.
     */
    openOnClick: boolean;
    /**
     * Adds a link to the current selection if the pasted content only contains an url.
     */
    hyperlinkOnPaste: boolean;
    /**
     * A list of HTML attributes to be rendered.
     */
    HTMLAttributes: Record<string, any>;
    /**
     * A list of modals to be rendered.
     * @default null
     * @example
     */
    modals: {
        previewHyperlink?: ((options: any) => HTMLElement) | null;
        setHyperlink?: ((options: any) => HTMLElement) | null;
    };
    /**
     * A validation function that modifies link verification for the auto linker.
     * @param url - The url to be validated.
     * @returns - True if the url is valid, false otherwise.
     */
    validate?: (url: string) => boolean;
}
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        link: {
            /**
             * Edit the hyperlink's text
             */
            editHyperLinkText: (text: string) => ReturnType;
            /**
             * Edit the hyperlink's href value
             */
            editHyperLinkHref: (href: string) => ReturnType;
            /**
             * Edit the hyperlink's
             */
            editHyperlink: (attributes?: {
                newText?: string;
                newURL?: string;
            }) => ReturnType;
            /**
             *  Set a hyperlink
             */
            setHyperlink: (attributes?: {
                href: string;
                target?: string | null;
            }) => ReturnType;
            /**
             * Unset a link mark
             */
            unsetHyperlink: () => ReturnType;
        };
    }
}
export declare const Hyperlink: Mark<HyperlinkOptions, any>;
