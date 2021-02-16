registerBlockType('catpow/switcher',{
	title:'🐾 Switcher',
	description:'日時やログインユーザーによってコンテンツの内容が切り替わるコンテナです。',
	icon:'editor-code',
	category:'catpow-functional',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected,clientId}){
		const {currentIndex=0}=attributes;
		const selectiveClasses=[
			{
				label:'ファクター',
				input:'select',
				key:'factor',
				values:{
					schedule:'日時',
					is_user_logged_in:'ログイン',
					current_user_can:'ユーザー権限',
					user_value:'ユーザー情報',
					input_value:'フォーム入力値',
					content_value:'コンテンツ情報',
				}
			},
			{
				label:'フィールド',
				input:'text',
				key:'field',
				cond:['user_value','input_value','content_value'].indexOf(attributes.factor) >-1
			},
			{
				label:'比較',
				input:'buttons',
				key:'compare',
				values:['=','IN','BETWEEN'],
				cond:['user_value','input_value','content_value'].indexOf(attributes.factor) >-1
			},
			{
				label:'値',
				input:'textarea',
				key:'values',
				cond:['schedule','current_user_can','user_value','input_value','content_value'].indexOf(attributes.factor) >-1
			}
		];
		const values=attributes.values.split("\n");
        return (
			<Fragment>
				<div className="switcherEdit" data-current-index={currentIndex}>
					<ul className="tabs">
					{values.map((cond,index)=>(
						<li
							className={"tab"+(index===currentIndex?' active':'')}
							onClick={()=>{setAttributes({currentIndex:index})}}
						>{cond}</li>
					))}
					</ul>
					<div className="contents">
						<InnerBlocks
							template={values.map((cond)=>['catpow/switchercontent',{cond}])} 
							templateLock='all'
						/>
					</div>
				</div>
				<InspectorControls>
					<SelectClassPanel
						title='クラス'
						icon='art'
						classKey='factor'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.switcher || {}}
					/>
				</InspectorControls>
			</Fragment>
        );
    },
	save({attributes,className,setAttributes}){
		return (<InnerBlocks.Content/>);
	}
});


registerBlockType('catpow/switchercontent',{
	title:'🐾 SwitcherContent',
	icon:'editor-code',
	category:'catpow',
    parent:['catpow/switcher'],
	attributes:{
		cond:{type:'attribute',label:'条件',selector:'switcherContent',attribute:'cond',default:'content'},
	},
	edit({attributes,className,setAttributes,clientId}){
		const {cond}=attributes;
		
        return (
			<div className={'switcherContent'}>
				<InnerBlocks template={[['core/paragraph']]} templateLock={false}/>
			</div>
		);
    },
	save({attributes,className,setAttributes}){
		const {cond}=attributes;
		return (
			<Fragment>
				<switcherContent cond={cond}>
					<InnerBlocks.Content/>
				</switcherContent>
			</Fragment>
		);
	}
});

