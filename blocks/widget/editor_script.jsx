/*
* 有効化されている機能が提供する埋め込み用コード
* functions/[funciton]/blocks.php を埋め込み、もしくは 
* Catpow\blocks\[funciton]::render();を実行
*/
wp.blocks.registerBlockType('catpow/widget',{
	title: '🐾 Widget',
	description:'拡張機能に定義された埋め込みコンテンツを表示します。',
	icon: 'editor-code',
	category: 'catpow-embed',
	example:CP.example,
	edit({attributes,setAttributes,className}){
        const {func,param}=attributes;
        let statesClasses,panels;

        if(func){
            statesClasses=cpEmbeddablesTree.widget[func].conf.map((conf)=>{
                conf.json='param';
                return conf;
            });
        }
        
        
        return [
			<div class="widgetded_content">
				<div class="label">{func}</div>
				<ServerSideRender block='catpow/widget' attributes={attributes}/>
			</div>,
			<InspectorControls>
				<PanelBody title="Path">
					<TreeSelect
						label='path'
						selectedId={func}
						tree={Object.values(cpEmbeddablesTree.widget)}
						onChange={(func)=>{setAttributes({func:func});}}
					/>
				</PanelBody>
                {statesClasses && 
                    <CP.SelectClassPanel
                        title='設定'
                        icon='admin-appearance'
                        set={setAttributes}
                        attr={attributes}
                        selectiveClasses={statesClasses}
                    />
                }
			</InspectorControls>
        ];
    },

	save({attributes,className,setAttributes}){
		return 'null';
	}
});