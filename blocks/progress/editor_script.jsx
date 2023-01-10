wp.blocks.registerBlockType('catpow/progress',{
	title: '🐾 Progress',
	description:'進捗のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {Fragment,useMemo,useCallback,useEffect}=wp.element;
		const {InspectorControls}=wp.blockEditor;
		const {Flex,FlexItem,FlexBlock,PanelBody,Button,Spinner,SelectControl,CheckboxControl,TextControl}=wp.components;
		const {post,settings,selections,activeLabel,progress,isWaiting=false}=attributes;

		const selectiveClasses=useMemo(()=>[
			{input:'select',key:'post',values:selections},
			{input:'range',key:'step',min:0,max:settings?(settings.items.length-1):0}
		],[selections,settings]);
		const settingsSelectiveClasses=useMemo(()=>[
			{type:'buttons',label:'サイズ',values:['small','medium','large']},
			{label:'番号',values:'hasCounter',sub:[
				{input:'text',label:'番号前テキスト',key:'countPrefix'},
				{input:'text',label:'番号後テキスト',key:'countSuffix'}
			]}
		],[]);
		const sizeSettings=useMemo(()=>CP.parseSelections(['small','medium','large']),[]);

		const setSettings=useCallback((args)=>{
			const {currentItemIndex,...otherArgs}=args;
			if(currentItemIndex!==undefined){setAttributes({currentItemIndex});}
			setAttributes({settings:{...settings,...otherArgs}});
		},[setAttributes,attributes]);
		const registerSettings=useCallback(()=>{
			const post_id=wp.data.select('core/editor').getCurrentPostId();
			setAttributes({isWaiting:true});
			wp.apiFetch({path:'/cp/v1/blocks/config/progress/settings/register',method:'post',data:{post_id,settings}}).then((res)=>{
				setAttributes({post:res.post,selections:false,isWaiting:false});
			});
		},[settings]);
		const updateSettings=useCallback(()=>{
			setAttributes({isWaiting:true});
			wp.apiFetch({path:'/cp/v1/blocks/config/progress/settings/update',method:'post',data:{post,settings}}).then((res)=>{
				setAttributes({isWaiting:false});
			});
		},[post,settings]);
		const deleteSettings=useCallback(()=>{
			setAttributes({isWaiting:true});
			wp.apiFetch({path:'/cp/v1/blocks/config/progress/settings/delete',method:'post',data:{post}}).then(()=>{
				setAttributes({post:'default',settings:false,selections:false,isWaiting:false});
			});
		},[post]);

		const Items=useCallback((props)=>{
			const {countPrefix,countSuffix}=settings;
			const states=CP.wordsToFlags(settings.classes);
			return settings.items.map((item,index)=>(
				<li 
					className={'item '+(index==attributes.step?'active':'')}
					onClick={(e)=>{
						setAttributes({step:index});
					}}
					key={index}
				>
					{states.hasCounter &&
						<div className='counter'>
							{countPrefix && <span className="prefix">{countPrefix}</span>}
							<span className="number">{index+1}</span>
							{countSuffix && <span className="suffix">{countSuffix}</span>}
						</div>
					}
					<div className='label'>
						<RichText
							onChange={(label)=>{item.label=label;setSettings(settings);}}
							value={item.label}
						/>
					</div>
				</li>
			));
		},[setAttributes,attributes,setSettings,settings,isSelected]);

		if(!settings){
			wp.apiFetch({path:'/cp/v1/blocks/config/progress/settings',method:'post',data:{post}}).then((settings)=>{
				setAttributes({settings});
			});
		}
		if(!selections){
			wp.apiFetch({path:'/cp/v1/blocks/config/progress/settings/selections'}).then((selections)=>{
				setAttributes({selections});
			});
		}
		const CenterSpinner=useCallback((props)=>(
			<Flex justify="center">
				<FlexItem>
					<Spinner/>
				</FlexItem>
			</Flex>
		),[]);
		useEffect(()=>{setAttributes({settings:false})},[post]);

		const states=(settings && settings.classes)?CP.wordsToFlags(settings.classes):{};

		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel
						title="クラス"
						initialOpen={true}
						icon="admin-generic"
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
					{settings?(
						<CP.SelectClassPanel
							title="設定"
							initialOpen={false}
							icon="admin-generic"
							set={setSettings}
							attr={settings}
							selectiveClasses={settingsSelectiveClasses}
						>
							<CP.EditItemsTable
								set={setSettings}
								attr={settings}
								columns={[
									{type:'text',key:'label'},
								]}
							/>
							{!isWaiting?(
								<>
									<Flex justify="center">
										<FlexItem>
											<Button isPrimary onClick={updateSettings}>設定を更新</Button>
										</FlexItem>
									</Flex>
									<Flex justify="center">
										<FlexItem>
											<Button isLink onClick={registerSettings}>登録</Button>｜<Button isLink isDestructive onClick={deleteSettings}>削除</Button>
										</FlexItem>
									</Flex>
								</>
							):<CenterSpinner/>}
						</CP.SelectClassPanel>
					):<CenterSpinner/>}
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				<>
					{settings?(
						<div className={'wp-block-catpow-progress '+settings.classes}>
							<ul className="items"><Items/></ul>
						</div>
					):<CenterSpinner/>}
				</>
			</>
		);
	},
	save({attributes,className}){
		return false;
	}
});