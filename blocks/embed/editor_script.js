// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

registerBlockType('catpow/embed', {
    title: '🐾 Embed',
    description: 'テーマに定義された埋め込みコンテンツを表示します。',
    icon: 'editor-code',
    category: 'catpow-embed',
    edit ({ attributes , setAttributes , className  }) {
        const { content_path , query  } = attributes;
        return [
            wp.element.createElement("div", {
                class: "embedded_content"
            }, wp.element.createElement("div", {
                class: "label"
            }, content_path), wp.element.createElement(ServerSideRender, {
                block: "catpow/embed",
                attributes: attributes
            })),
            wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
                title: "Path"
            }, wp.element.createElement(TreeSelect, {
                label: "path",
                selectedId: content_path,
                tree: Object.values(cpEmbeddablesTree.embed),
                onChange: (content_path)=>{
                    setAttributes({
                        content_path: content_path
                    });
                }
            })))
        ];
    },
    example: CP.example,
    save ({ attributes , className , setAttributes  }) {
        return 'null';
    }
});
