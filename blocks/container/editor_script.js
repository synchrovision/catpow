// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

registerBlockType('catpow/container', {
    title: '🐾 Container',
    description: 'スクロール可能領域を作成できるコンテナです。',
    icon: 'editor-code',
    category: 'catpow',
    transforms: {
        from: [
            {
                type: 'block',
                blocks: [
                    'core/group'
                ],
                transform: (attributes, innerBlocks)=>{
                    return createBlock('catpow/container', {
                        classes: 'wp-block-catpow-container '
                    }, innerBlocks);
                }
            }, 
        ]
    },
    attributes: {
        color: {
            default: "0"
        },
        id: {
            source: 'attribute',
            selector: '.wp-block-catpow-container',
            attribute: 'id'
        },
        classes: {
            source: 'attribute',
            selector: 'container',
            attribute: 'class',
            default: 'wp-block-catpow-container'
        }
    },
    example: CP.example,
    edit (props) {
        const { useState , useMemo  } = wp.element;
        const { attributes , className , setAttributes , context  } = props;
        const { id , classes , color  } = attributes;
        CP.wordsToFlags(classes);
        const selectiveClasses = useMemo(()=>{
            const selectiveClasses = [
                {
                    name: 'scrollX',
                    label: __('スクロールX', 'catpow'),
                    values: 'hasScrollX',
                    sub: [
                        {
                            name: 'contentWidth',
                            type: 'gridbuttons',
                            label: __('コンテンツの幅', 'catpow'),
                            values: {
                                hasSmallContents: '小',
                                hasMiddleContents: '中',
                                hasLargeContents: '大'
                            }
                        }
                    ]
                },
                {
                    name: 'scrollY',
                    label: __('スクロールY', 'catpow'),
                    values: 'hasScrollY',
                    sub: [
                        {
                            name: 'containerHeight',
                            type: 'gridbuttons',
                            label: __('コンテナの高さ', 'catpow'),
                            values: {
                                isSmallContainer: '小',
                                isMiddleContainer: '中',
                                isLargeContainer: '大'
                            }
                        }
                    ]
                },
                'color'
            ];
            wp.hooks.applyFilters('catpow.blocks.container.selectiveClasses', CP.finderProxy(selectiveClasses));
            return selectiveClasses;
        }, []);
        return [
            wp.element.createElement("div", {
                className: classes
            }, wp.element.createElement("div", {
                className: "body"
            }, wp.element.createElement(InnerBlocks, {
                template: [
                    [
                        'core/paragraph',
                        {
                            content: CP.dummyText.text
                        }
                    ]
                ],
                templateLock: false
            }))),
            wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
                title: "クラス",
                icon: "art",
                set: setAttributes,
                attr: attributes,
                selectiveClasses: selectiveClasses,
                filters: CP.filters.container || {}
            }), wp.element.createElement(PanelBody, {
                title: "CLASS",
                icon: "admin-generic",
                initialOpen: false
            }, wp.element.createElement(TextareaControl, {
                label: "クラス",
                onChange: (classes)=>setAttributes({
                        classes
                    }),
                value: classes
            })))
        ];
    },
    save ({ attributes , className , setAttributes  }) {
        const { id , classes ='' , color  } = attributes;
        CP.wordsToFlags(classes);
        return wp.element.createElement("div", {
            className: classes
        }, wp.element.createElement("div", {
            className: "body"
        }, wp.element.createElement(InnerBlocks.Content, null)));
    }
});
