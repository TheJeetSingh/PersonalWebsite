import { Node } from '@tiptap/core';

export interface IframeOptions {
    allowFullscreen: boolean;
    HTMLAttributes: Record<string, string>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        iframe: {
            setIframe: (options: { src: string }) => ReturnType;
        };
    }
}

export const Iframe = Node.create<IframeOptions>({
    name: 'iframe',

    group: 'block',

    atom: true,

    addOptions() {
        return {
            allowFullscreen: true,
            HTMLAttributes: {
                class: 'iframe-wrapper',
            },
        };
    },

    addAttributes() {
        return {
            src: {
                default: null,
            },
            width: {
                default: '100%',
            },
            height: {
                default: '352',
            },
            frameborder: {
                default: '0',
            },
            allow: {
                default: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
            },
            allowfullscreen: {
                default: this.options.allowFullscreen,
                parseHTML: () => this.options.allowFullscreen,
            },
            style: {
                default: 'border-radius: 12px;',
            },
            loading: {
                default: 'lazy',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'iframe',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', { class: 'embed-container my-4' }, ['iframe', HTMLAttributes]];
    },

    addCommands() {
        return {
            setIframe:
                (options: { src: string }) =>
                    ({ tr, dispatch }) => {
                        const { selection } = tr;
                        const node = this.type.create(options);

                        if (dispatch) {
                            tr.replaceRangeWith(selection.from, selection.to, node);
                        }

                        return true;
                    },
        };
    },
});

export default Iframe;
