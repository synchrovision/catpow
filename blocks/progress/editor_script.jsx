registerBlockType('catpow/progress',{
	title: '🐾 Progress',
	description:'進捗のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {Fragment,useMemo,useCallback}=wp.element;
		const {Flex,FlexItem,FlexBlock,PanelBody,Button,Spinner,SelectControl,CheckboxControl,TextControl}=wp.components;
		const {post,settings,selections,activeLabel,progress}=attributes;
		
		const selectiveClasses=useMemo(()=>[
			{input:'text',label:'設定名',key:'post'}
		],[]);
		
		const setSettings=useCallback((args)=>{
			const {currentItemIndex,...otherArgs}=args;
			if(currentItemIndex!==undefined){setAttributes({currentItemIndex});}
			setAttributes({settings:{...settings,...otherArgs}});
		},[setAttributes,attributes]);
		const registerSettings=useCallback(()=>{
			const post_id=wp.data.select('core/editor').getCurrentPostId();
			wp.apiFetch({path:'/cp/v1/blocks/config/progress/settings/register',method:'post',data:{post_id,settings}}).then((res)=>{
				setAttributes({post:res.post,selections:false});
			});
		},[settings]);
		const updateSettings=useCallback(()=>{
			wp.apiFetch({path:'/cp/v1/blocks/config/progress/settings/update',method:'post',data:{post,settings}});
		},[post,settings]);
		const deleteSettings=useCallback(()=>{
			wp.apiFetch({path:'/cp/v1/blocks/config/progress/settings/delete',method:'post',data:{post}}).then(()=>{
				setAttributes({post:'default',settings:false,selections:false});
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
				>
					{states.hasCounter &&
						<div className='counter'>
							{countPrefix && <span class="prefix">{countPrefix}</span>}
							<span className="number">{index+1}</span>
							{countSuffix && <span class="suffix">{countSuffix}</span>}
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
				console.log(settings);
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
		
		const states=(settings && settings.classes)?CP.wordsToFlags(settings.classes):{};
		
        return (
			<Fragment>
				<InspectorControls>
					<PanelBody title="設定" initialOpen={false} icon="admin-generic">
						{selections?(
							<SelectControl
								value={post}
								options={Object.keys(selections).map((label)=>{return {
									label,value:selections[label]
								}})}
								onChange={(post)=>{
									setAttributes({post,settings:false});
								}}
							/>
						):<CenterSpinner/>}
						<CheckboxControl
							label="番号"
							onChange={(flag)=>{
								states.hasCounter=flag;
								setSettings({classes:CP.flagsToWords(states)});
							}}
							checked={states.hasCounter}
						/>
						{states.hasCounter && (
							<Fragment>
								<TextControl
									label="番号前テキスト"
									value={settings.countPrefix}
									onChange={(countPrefix)=>{setSettings({countPrefix})}}
								/>
								<TextControl
									label="番号後テキスト"
									value={settings.countSuffix}
									onChange={(countSuffix)=>{setSettings({countSuffix})}}
								/>
							</Fragment>
						)}
						{settings?(
							<CP.EditItemsTable
								set={setSettings}
								attr={settings}
								columns={[
									{type:'text',key:'label'},
								]}
							/>
						):<CenterSpinner/>}
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
					</PanelBody>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				<Fragment>
					{settings?(
						<div className={'wp-block-catpow-progress '+settings.classes}>
							<ul className="items"><Items/></ul>
						</div>
					):<CenterSpinner/>}
				</Fragment>
			</Fragment>
        );
    },
	save({attributes,className}){
		return false;
	}
});