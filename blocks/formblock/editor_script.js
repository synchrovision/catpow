// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

registerBlockType('catpow/formblock', {
    title: '🐾 FormBlock',
    description: 'テーマに定義された編集可能なフォームを表示します。',
    icon: 'editor-code',
    category: 'catpow-embed',
    example: CP.example,
    edit ({ attributes , setAttributes , className , isSelected , clientId  }) {
        const { content_path , inputs , data_id , values , actions , EditMode =false  } = attributes;
        if (!actions && content_path) {
            const path = content_path.substr(0, content_path.lastIndexOf('/'));
            wp.apiFetch({
                path: 'cp/v1/' + path + '/actions'
            }).then((actions)=>{
                Object.keys(actions).map((key)=>actions[key].json = 'action');
                setAttributes({
                    actions
                });
            });
        }
        return wp.element.createElement(Fragment, null, wp.element.createElement(BlockControls, null, wp.element.createElement(Toolbar, {
            controls: [
                {
                    icon: 'edit',
                    title: 'EditMode',
                    isActive: EditMode,
                    onClick: ()=>setAttributes({
                            EditMode: !EditMode
                        })
                }
            ]
        })), wp.element.createElement("div", {
            class: "formBlock embedded_content" + (EditMode ? ' editMode' : '')
        }, wp.element.createElement("div", {
            class: "label"
        }, content_path || 'not selected'), wp.element.createElement(InnerBlocks, {
            allowedBlocks: [
                'catpow/formblockcontent'
            ]
        })), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
            title: "フォーム"
        }, wp.element.createElement(TreeSelect, {
            label: "path",
            selectedId: content_path,
            tree: Object.values(cpEmbeddablesTree.formblock),
            onChange: (content_path)=>{
                const path = content_path.substr(0, content_path.lastIndexOf('/'));
                wp.apiFetch({
                    path: 'cp/v1/' + path + '/template'
                }).then((template)=>{
                    wp.data.dispatch('core/block-editor').replaceInnerBlocks(clientId, CP.createBlocks(template));
                });
                setAttributes({
                    content_path,
                    actions: null
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
        }))));
    },
    save ({ attributes , className , setAttributes  }) {
        return wp.element.createElement(InnerBlocks.Content, null);
    }
});
registerBlockType('catpow/formblockcontent', {
    title: '🐾 FormBlockContent',
    icon: 'editor-code',
    category: 'catpow',
    parent: [
        'catpow/formblock'
    ],
    attributes: {
        name: {
            type: 'attribute',
            label: '名前',
            selector: 'formBlockContent',
            attribute: 'name',
            default: 'edit'
        },
        action: {
            type: 'attribute',
            label: 'アクション',
            selector: 'formBlockContent',
            attribute: 'action',
            default: '{}'
        }
    },
    edit ({ attributes , className , setAttributes , clientId  }) {
        const { name  } = attributes;
        const parentClientId = wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId, 'catpow/formblock')[0];
        const parentBlock = wp.data.select('core/block-editor').getBlock(parentClientId);
        const actions = parentBlock.attributes.actions;
        return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
            className: 'formBlockContent embedded_content'
        }, wp.element.createElement("div", {
            class: "label"
        }, name), wp.element.createElement(InnerBlocks, {
            template: [
                [
                    'catpow/section'
                ]
            ],
            templateLock: false
        })), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
            title: "設定",
            initialOpen: true
        }, wp.element.createElement(TextControl, {
            label: "名前",
            value: name,
            onChange: (name)=>{
                setAttributes({
                    name
                });
            }
        })), actions && wp.element.createElement(CP.SelectClassPanel, {
            title: "アクション",
            icon: "edit",
            set: setAttributes,
            attr: attributes,
            selectiveClasses: actions,
            initialOpen: true
        })));
    },
    save ({ attributes , className , setAttributes  }) {
        const { name , action  } = attributes;
        return wp.element.createElement(Fragment, null, wp.element.createElement("formBlockContent", {
            name: name,
            action: action
        }, wp.element.createElement(InnerBlocks.Content, null)));
    }
});
