CP.config.switcher={
	factors:{
		schedule:'日時',
		is_user_logged_in:'ログイン',
		current_user_can:'ユーザー権限',
		user_value:'ユーザー情報',
		input_value:'フォーム入力値',
		content_value:'コンテンツ情報',
	},
	factorFlags:{
		schedule:4,
		is_user_logged_in:4,
		current_user_can:4,
		user_value:7,
		input_value:7,
		content_value:7,
	},
	flagValues:{
		field:1,
		compare:2,
		values:4,
	}
};
wp.blocks.registerBlockType('catpow/switcher',{
	title:'🐾 Switcher',
	description:'日時やログインユーザーによってコンテンツの内容が切り替わるコンテナです。',
	icon:'networking',
	category:'catpow-functional',
	example:CP.example,
	edit(props){
		const {attributes,className,setAttributes,isSelected,clientId}=props;
		const {useState,useEffect,useMemo,useCallback}=wp.element;
		const {currentIndex=0}=attributes;
		const [newBlocks,setNewBlocks]=useState(false);
		const {factors,factorFlags,flagValues}=CP.config.switcher;

		const selectiveClasses=useMemo(()=>{
			const {factors,factorFlags,flagValues}=CP.config.switcher;
			const selectiveClasses=[
				{
					name:'factor',
					label:'ファクター',
					input:'select',
					key:'factor',
					values:factors
				},
				{
					name:'field',
					label:'フィールド',
					input:'text',
					key:'field',
					cond:(states,{attr})=>factorFlags[attr.factor]&flagValues['field']
				},
				{
					name:'compare',
					label:'比較',
					input:'buttons',
					key:'compare',
					values:['=','IN','BETWEEN'],
					cond:(states,{attr})=>factorFlags[attr.factor]&flagValues['compare']
				},
				{
					name:'values',
					label:'値',
					input:'textarea',
					key:'values',
					cond:(states,{attr})=>factorFlags[attr.factor]&flagValues['values']
				}
			];
			wp.hooks.applyFilters('catpow.blocks.switcher.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const values=useMemo(()=>attributes.values.split("\n"),[attributes.values]);
		useEffect(()=>{
			const editor=wp.data.dispatch('core/block-editor');
			const blocks=wp.data.select('core/block-editor').getBlock(clientId).innerBlocks;
			const newBlocks=values.map((cond,index)=>{
				if(undefined === blocks[index]){
					return wp.blocks.createBlock('catpow/switchercontent',{cond});
				}
				editor.updateBlockAttributes(blocks[index].clientId,{cond});
				return blocks[index];
			});
			if(blocks.length!==newBlocks.length){
				setNewBlocks(newBlocks);
			}
		},[values]);
		useEffect(()=>{
			if(newBlocks){
				const editor=wp.data.dispatch('core/block-editor');
				editor.replaceInnerBlocks(clientId,newBlocks);
				const blocks=wp.data.select('core/block-editor').getBlock(clientId).innerBlocks;
				values.map((cond,index)=>{
					editor.updateBlockAttributes(blocks[index].clientId,{cond});
				});
				setNewBlocks(false);
			}
		},[currentIndex]);
		useEffect(()=>{
			switch(attributes.factor){
				case 'schedule':setAttributes({values:"0:00~6:00\n6:00~12:00\n12:00~18:00\n18:00~24:00"});break;
				case 'is_user_logged_in':setAttributes({values:"out\nin"});break;
				case 'current_user_can':setAttributes({values:"administrator\neditor\nauthor\ncontributor\nsubscriber"});break;
			}
		},[attributes.factor]);
		const currentBlockId='block-'+wp.data.select('core/block-editor').getBlock(clientId).innerBlocks[currentIndex]?.clientId;
		return (
			<>
				<div className="switcherEdit" data-current-index={currentIndex}>
					<ul className="tabs">
						<li className="tab icon">
							<Icon icon="networking"/>
						</li>
						<li className="tab">
							{factors[attributes.factor]}
						</li>
						{factorFlags[attributes.factor]&flagValues['field']?(
							<li className="tab">
								{attributes.field}
								{factorFlags[attributes.factor]&flagValues['compare'] && '　'+attributes.compare}
							</li>
						):false}
						{factorFlags[attributes.factor]&flagValues['values']?values.map((cond,index)=>(
							<li
								className={"tab"+(index===currentIndex?' active':'')}
								onClick={()=>{setAttributes({currentIndex:index})}}
							>{cond}</li>
						)):false}
					</ul>
					<div className="contents">
						<InnerBlocks
							template={values.map((cond)=>['catpow/switchercontent',{cond}])}
							allowedBlocks={['catpow/switchercontent']}
						/>
					</div>
				</div>
				{currentBlockId && <style>{CP.createStyleCode({['#'+currentBlockId]:{display:'block'}})}</style>}
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						classKey='factor'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.switcher || {}}
						initialOpen={true}
					/>
				</InspectorControls>
			</>
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
		cond:{source:'attribute',label:'条件',selector:'switcherContent',attribute:'cond',default:'content'},
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
			<>
				<switcherContent cond={cond}>
					<InnerBlocks.Content/>
				</switcherContent>
			</>
		);
	}
});

