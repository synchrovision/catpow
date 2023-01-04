// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

registerBlockType('catpow/form', {
    title: '🐾 Form',
    description: 'テーマに定義されたフォームを表示します。',
    icon: 'editor-code',
    category: 'catpow-embed',
    example: CP.example,
    edit ({ attributes , setAttributes , className  }) {
        const { content_path , post_data_path , inputs , data_id , values  } = attributes;
        let postDataSelection = false;
        Object.keys(cpEmbeddablesTree.form).forEach((parentKey)=>{
            cpEmbeddablesTree.form[parentKey].children.map((item)=>{
                if (item.id === content_path && item.post_data_paths) {
                    postDataSelection = [];
                    Object.keys(item.post_data_paths).forEach(function(key) {
                        postDataSelection.push({
                            id: key,
                            name: item.post_data_paths[key]
                        });
                    });
                }
            });
        });
        if (postDataSelection === false) {
            if (post_data_path) {
                setAttributes({
                    post_data_path: false
                });
            }
        } else {
            if (!post_data_path || !postDataSelection.some((item)=>item['id'] === post_data_path)) {
                setAttributes({
                    post_data_path: postDataSelection[0]['id']
                });
            }
        }
        return [
            wp.element.createElement("div", {
                class: "embedded_content"
            }, wp.element.createElement("div", {
                class: "label"
            }, content_path), wp.element.createElement(ServerSideRender, {
                block: "catpow/form",
                attributes: attributes
            })),
            wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
                title: "フォーム"
            }, wp.element.createElement(TreeSelect, {
                label: "path",
                selectedId: content_path,
                tree: Object.values(cpEmbeddablesTree.form),
                onChange: (content_path)=>{
                    setAttributes({
                        content_path: content_path
                    });
                }
            }), postDataSelection && wp.element.createElement(TreeSelect, {
                label: "form",
                selectedId: post_data_path,
                tree: postDataSelection,
                onChange: (post_data_path)=>{
                    setAttributes({
                        post_data_path: post_data_path
                    });
                }
            })), wp.element.createElement(PanelBody, {
                title: "入力値",
                initialOpen: false
            }, wp.element.createElement(TextControl, {
                label: "入力名",
                value: inputs,
                onChange: (inputs)=>{
                    setAttributes({
                        inputs
                    });
                }
            }), wp.element.createElement(TextControl, {
                label: "データID",
                value: data_id,
                onChange: (data_id)=>{
                    setAttributes({
                        data_id
                    });
                }
            }), wp.element.createElement(TextareaControl, {
                label: "初期値",
                value: values,
                onChange: (values)=>{
                    setAttributes({
                        values
                    });
                }
            })))
        ];
    },
    save ({ attributes , className , setAttributes  }) {
        return 'null';
    }
});
