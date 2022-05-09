registerBlockType('catpow/cond',{
	title:'🐾 Cond',
	description:'日時やログインユーザーによってコンテンツの表示が切り替わるコンテナです。',
	icon:'editor-code',
	category:'catpow-functional',
	transforms:{
		from: [
			{
				type:'block',
				blocks:['core/group'],
				transform:(attributes,innerBlocks)=>{
					return createBlock('catpow/cond',{},innerBlocks);
				},
			},
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		return [
			<div className="embedded_content">
				<div class="label">
					表示条件：
					{attributes.schedule}
					{attributes.is_user_logged_in!=0 && 'ログイン'+(attributes.is_user_logged_in==1?'している':'していない')}
					{attributes.input_value}
					{attributes.content_value}
				</div>
				<InnerBlocks/>
			</div>,
			<InspectorControls>
				<PanelBody title="表示条件" icon="admin-generic">
					<TextareaControl
						label='スケジュール'
						onChange={(schedule)=>setAttributes({schedule})}
						value={attributes.schedule}
					/>
					<SelectControl
						label='ログイン'
						onChange={(is_user_logged_in)=>{setAttributes({is_user_logged_in})}}
						value={attributes.is_user_logged_in}
						options={[
							{label:'していない',value:'-1'},
							{label:'どちらでも',value:'0'},
							{label:'している',value:'1'},
						]}
					/>
					{attributes.is_user_logged_in == '1' &&
						<div className="sub">
							<TextareaControl
								label='権限'
								onChange={(current_user_can)=>setAttributes({current_user_can})}
								value={attributes.current_user_can}
							/>
							<TextareaControl
								label='ユーザー情報'
								onChange={(user_value)=>setAttributes({user_value})}
								value={attributes.user_value}
							/>
						</div>
					}
					<TextareaControl
						label='フォーム入力値'
						onChange={(input_value)=>setAttributes({input_value})}
						value={attributes.input_value}
					/>
					<TextareaControl
						label='コンテンツ情報'
						onChange={(content_value)=>setAttributes({content_value})}
						value={attributes.content_value}
					/>
				</PanelBody>
			</InspectorControls>
		];
	},


	save({attributes,className,setAttributes}){
		return (<InnerBlocks.Content/>);
	}
});

