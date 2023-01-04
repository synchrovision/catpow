// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

registerBlockType('catpow/widget', {
    title: '🐾 Widget',
    description: '拡張機能に定義された埋め込みコンテンツを表示します。',
    icon: 'editor-code',
    category: 'catpow-embed',
    example: CP.example,
    edit ({ attributes , setAttributes , className  }) {
        const { func , param  } = attributes;
        let statesClasses;
        if (func) {
            statesClasses = cpEmbeddablesTree.widget[func].conf.map((conf)=>{
                conf.json = 'param';
                return conf;
            });
        }
        return [
            wp.element.createElement("div", {
                class: "widgetded_content"
            }, wp.element.createElement("div", {
                class: "label"
            }, func), wp.element.createElement(ServerSideRender, {
                block: "catpow/widget",
                attributes: attributes
            })),
            wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
                title: "Path"
            }, wp.element.createElement(TreeSelect, {
                label: "path",
                selectedId: func,
                tree: Object.values(cpEmbeddablesTree.widget),
                onChange: (func)=>{
                    setAttributes({
                        func: func
                    });
                }
            })), statesClasses && wp.element.createElement(CP.SelectClassPanel, {
                title: "設定",
                icon: "admin-appearance",
                set: setAttributes,
                attr: attributes,
                selectiveClasses: statesClasses
            }))
        ];
    },
    save ({ attributes , className , setAttributes  }) {
        return 'null';
    }
});
