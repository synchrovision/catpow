// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

registerBlockType('catpow/loop', {
    title: '🐾 Loop',
    description: 'テーマに定義されたテンプレートで投稿を表示します。',
    icon: 'editor-code',
    category: 'catpow-embed',
    example: CP.example,
    edit ({ attributes , setAttributes , className , clientId  }) {
        const { content_path , deps ={} , query , config , EditMode =false  } = attributes;
        const { useMemo  } = wp.element;
        let configData;
        const itemMap = useMemo(()=>{
            const map = {};
            Object.keys(cpEmbeddablesTree.loop).map((label)=>{
                cpEmbeddablesTree.loop[label].children.map((item)=>{
                    map[item.id] = item;
                });
            });
            return map;
        }, []);
        const items = useMemo(()=>Object.keys(cpEmbeddablesTree.loop).map((label)=>cpEmbeddablesTree.loop[label]), []);
        const item = useMemo(()=>content_path && itemMap[content_path], [
            itemMap,
            content_path
        ]);
        if (!config) {
            if (content_path && itemMap[content_path].has_config) {
                const path = content_path.substr(0, content_path.lastIndexOf('/'));
                wp.apiFetch({
                    path: '/cp/v1/' + path + '/config'
                }).then((config)=>{
                    Object.keys(config).map((key)=>config[key].json = 'config');
                    setAttributes({
                        config: JSON.stringify(config)
                    });
                }).catch((res)=>{
                    setAttributes({
                        config: '{}'
                    });
                });
            }
            configData = {};
        } else {
            configData = JSON.parse(config);
        }
        return wp.element.createElement(Fragment, null, configData.template && wp.element.createElement(BlockControls, null, wp.element.createElement(Toolbar, {
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
        })), configData.template && EditMode ? wp.element.createElement("div", {
            className: "alt_content loopContents"
        }, wp.element.createElement("div", {
            class: "label"
        }, wp.element.createElement(Icon, {
            icon: "edit"
        })), wp.element.createElement(InnerBlocks, {
            allowedBlocks: [
                'catpow/loopcontent'
            ],
            template: configData.template,
            templateLock: configData.templateLock || "ALL"
        })) : wp.element.createElement("div", {
            class: "embedded_content"
        }, wp.element.createElement("div", {
            class: "label"
        }, content_path), wp.element.createElement(ServerSideRender, {
            block: "catpow/loop",
            attributes: attributes
        })), item?.deps?.css && wp.element.createElement("link", {
            rel: "stylesheet",
            href: item.deps.css
        }), item?.deps?.js && wp.element.createElement("script", {
            type: "text/javascript",
            src: item.deps.js
        }), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
            title: "Query"
        }, wp.element.createElement(TreeSelect, {
            label: "content path",
            selectedId: content_path,
            tree: items,
            onChange: (content_path)=>{
                const path = content_path.substr(0, content_path.lastIndexOf('/'));
                const { has_template  } = itemMap[content_path];
                if (has_template) {
                    wp.apiFetch({
                        path: '/cp/v1/' + path + '/template'
                    }).then((template)=>{
                        wp.data.dispatch('core/block-editor').replaceInnerBlocks(clientId, CP.createBlocks(template));
                    });
                }
                setAttributes({
                    content_path,
                    config: null
                });
            }
        }), content_path && content_path.substr(-8) === 'loop.php' && wp.element.createElement(TextareaControl, {
            label: "query",
            value: query,
            onChange: (query)=>{
                setAttributes({
                    query: query
                });
            }
        }))));
    },
    save ({ attributes , className , setAttributes  }) {
        return wp.element.createElement(InnerBlocks.Content, null);
    },
    deprecated: [
        {
            save () {
                return 'null';
            }
        }
    ]
});
registerBlockType('catpow/loopcontent', {
    title: '🐾 LoopContent',
    icon: 'editor-code',
    category: 'catpow',
    parent: [
        'catpow/loop'
    ],
    attributes: {
        name: {
            type: 'attribute',
            label: '名前',
            selector: 'loopContent',
            attribute: 'name',
            default: 'content'
        }
    },
    edit ({ attributes , className , setAttributes , clientId  }) {
        const { name  } = attributes;
        const template = name == 'on_empty' ? [
            [
                'core/paragraph',
                {
                    align: 'center',
                    content: 'Not Found'
                }
            ]
        ] : [
            [
                'catpow/section'
            ]
        ];
        return wp.element.createElement("div", {
            className: 'loopContent'
        }, wp.element.createElement(InnerBlocks, {
            template: template,
            templateLock: false
        }));
    },
    save ({ attributes , className , setAttributes  }) {
        const { name  } = attributes;
        return wp.element.createElement(Fragment, null, wp.element.createElement("loopContent", {
            name: name
        }, wp.element.createElement(InnerBlocks.Content, null)));
    }
});
