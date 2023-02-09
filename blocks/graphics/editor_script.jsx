CP.config.graphics={
	devices:['sp','tb'],
	devicesForCss:['pc','tb','sp'],
	imageKeys:{
		base:{src:"src",srcset:"srcset",sources:'sources',alt:"alt"},
		image:{src:"src",srcset:"srcset",sources:'sources',alt:"alt",items:"items"},
	},
	getCssDatas:(attr,states)=>{
		const {id,items,heights}=attr;
		const {devicesForCss}=CP.config.graphics;
		let rtn={};
		devicesForCss.map((device)=>{rtn[device]={};});
		if(!states.hasBaseImage && heights){
			heights.split(',').map((height,deviceIndex)=>{
				rtn[devicesForCss[deviceIndex]]['#'+id+' .base']={'padding-top':height+'%'};
			});
		}
		items.map((item,index)=>{
			item.rect.split(',').map((rect,deviceIndex)=>{
				const bnd=rect.split(' ').map((val)=>val+'%');
				rtn[devicesForCss[deviceIndex]]['#'+id+'_item_'+index]={left:bnd[0],top:bnd[1],width:bnd[2],height:bnd[3]};
			});
		});
		return rtn;
	},
	renderCssDatas:(cssDatas)=>{
		return CP.config.graphics.devicesForCss.map((device)=>{
			if(device==='pc'){return CP.createStyleCode(cssDatas[device]);}
			return '@media'+CP.devices[device].media_query+'{'+CP.createStyleCode(cssDatas[device])+'}';
		}).join('');
	},
	parseRectAttr:(rect)=>{
		return rect.split(',').map((rect)=>rect.split(' '));
	},
	getRectAttr:(rectDatas)=>{
		return rectDatas.map((rectData)=>rectData.join(' ')).join(',');
	}
};

wp.blocks.registerBlockType('catpow/graphics',{
	title: '🐾 graphics',
	description:'画像を自由にレイアウトします。',
	icon:'format-image',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {__}=wp.i18n;
		const {useState,useMemo,useCallback,useEffect,useReducer,useRef}=wp.element;
		const {BlockControls,InspectorControls,RichText}=wp.blockEditor;
		const {BaseControl,Icon,PanelBody,RangeControl,TextareaControl,TextControl,Toolbar,ToolbarGroup,ToolbarButton}=wp.components;
		const {id,classes='',src,srcset,alt,heights,items=[],device}=attributes;
		const {bem}=Catpow.util;
		
		const [currentItemNode,setCurrentItemNode]=useState(false);
		const [currentItemIndex,setCurrentItemIndex]=useState(-1);
		const [containerNode,setContainerNode]=useState(false);
		
		const states=CP.wordsToFlags(classes);
		const {devices,devicesForCss,imageKeys,getCssDatas,renderCssDatas,parseRectAttr,getRectAttr}=CP.config.graphics;
		const cssDatas=getCssDatas(attributes,states);

		const selectiveClasses=useMemo(()=>{
			const {devices,devicesForCss,imageKeys,getCssDatas,renderCssDatas,parseRectAttr,getRectAttr}=CP.config.graphics;
			const selectiveClasses=[
				{
					name:'baseImage',
					label:'ベース画像',
					values:'hasBaseImage',
					sub:[
						{name:'picture',input:'picture',keys:imageKeys.base,devices}
					]
				}
			];
			wp.hooks.applyFilters('catpow.blocks.graphics.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemClasses=useMemo(()=>{
			const {devices,devicesForCss,imageKeys,getCssDatas,renderCssDatas,parseRectAttr,getRectAttr}=CP.config.graphics;
			const selectiveItemClasses=[
				{name:'type',type:'buttons',label:'タイプ',filter:'type',values:{isImage:'画像',isText:'テキスト'},sub:{
					isImage:[
						{name:'type',type:'buttons',values:['type1','type2','type3']},
						{name:'alt',input:'text',label:'代替テキスト',key:'alt'},
						{name:'link',input:'text',label:'リンク',key:'link'},
						{name:'image',input:'picture',label:'画像',keys:imageKeys.image,devices}
					],
					isText:[
						{name:'type',type:'buttons',values:['type1','type2','type3']},
						'color',
						{name:'inverse',label:'ヌキ文字',values:'inverse',sub:[
							{name:'hasBackground',label:'背景色',values:'hasBackground'}
						]},
						{name:'title',label:'見出し',values:'hasTitle'},
						{name:'lead',label:'リード',values:'hasLead'},
						{name:'text',label:'テキスト',values:'hasText'}
					]
				}},
				{name:'hasBoxShadow',label:'影（ボックス）',values:'hasBoxShadow'},
				{name:'hasTextShadow',label:'影（テキスト）',values:'hasTextShadow'},
				{name:'isEllipse',label:'円形',values:'isEllipse'},
				{name:'fadeIn',label:'フェードイン',values:'fadeIn'},
				{name:'fadeIn',label:'フェードイン',values:'fadeIn'},
				{name:'slideIn',label:'スライドイン',values:'slideIn',sub:[
					{name:'direction',type:'radio',filer:'slideIn',label:'方向',values:{
						slideInLeft:'左',
						slideInRight:'右',
						slideInUp:'上',
						slideInDown:'下',
						slideInFront:'前',
						slideInBack:'後'
					}},
				]},
				{name:'roll',label:'回転',filter:'roll',values:'roll',sub:[
					{name:'direction',type:'radio',label:'方向',values:{rollLeft:'左',rollRight:'右'}},
					{name:'speed',type:'radio',label:'速度',values:{rollSlow:'遅い',rollFast:'速い'}},
				 ]},
				{name:'hover',label:'ホバー',filter:'hover',values:'hover',sub:[
					{name:'fade',label:'フェード',values:'hoverFade'},
					{name:'motion',type:'radio',label:'動き',values:{
						hoverNoMove:'なし',
						hoverZoom:'ズーム',
						hoverLift:'リフト',
						hoverJump:'ジャンプ',
					}}
				]}
			];
			wp.hooks.applyFilters('catpow.blocks.graphics.selectiveItemClasses',CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		},[]);

		var tgtItem=false;
		
		useEffect(()=>{
			if(!id || document.querySelectorAll('#'+id).length>1){
				setAttributes({id:'g'+(new Date().getTime().toString(16))});
			}
		},[!id]);

		const save=useCallback(()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))})
		},[items]);

		const InputHeights=useCallback((props)=>{
			const {onChange,value}=props;
			const marks=useMemo(()=>[
				{value:50,label:'50'},
				{value:100,label:'100'},
				{value:200,label:'200'},
				{value:400,label:'400'}
			],[]);
			
			const devices=CP.config.graphics.devicesForCss;
			
			const init=useCallback((states)=>{
				if(!states.value){
					states.value=wp.data.select('core/blocks').getBlockType('catpow/graphics').attributes.heights.default;
				}
				states.heights=states.value.split(',').map((n)=>parseInt(n));
				return states;
			},[]);
			
			const reducer=useCallback((states,action)=>{
				const heights=states.heights.slice();
				heights[action.index]=action.value;
				const value=heights.join(',');
				onChange(value,action.device);
				return {value,heights};	
			},[]);
			const [states,dispatch]=useReducer(reducer,{value},init);
		
			
			return (
				<BaseControl label={__('高さ','catpow')}>
					{devices.map((device,index)=>(
						<RangeControl
							key={device}
							value={states.heights[index]}
							currentInput={states.heights[index]}
							beforeIcon={CP.devices[device].icon}
							min={10}
							max={400}
							marks={marks}
							withInputField={true}
							onChange={(value)=>dispatch({index,device,value})}
						/>
					))}
				</BaseControl>
			);
		},[]);
		const copyFirstRect=useCallback(()=>{
			const deviceIndex=device?devicesForCss.indexOf(device):0;
			const f=(item)=>{
				const rectData=parseRectAttr(item.rect);
				rectData[deviceIndex]=rectData[0];
				item.rect=getRectAttr(rectData);
			};
			if(currentItemIndex>-1){
				f(items[currentItemIndex]);
			}
			else{
				items.forEach(f);
			}
			save();
		},[devicesForCss,device,save,items,currentItemIndex]);
		
		return (
			<>
				<CP.SelectDeviceToolbar attr={attributes} set={setAttributes} devices={CP.config.graphics.devicesForCss} defaultInput='pc'/>
				<BlockControls>
					<ToolbarGroup label="control">
						{device!=='pc' && <ToolbarButton icon="update" label="update" onClick={copyFirstRect}/>}
						{currentItemIndex > -1 &&
							<ToolbarButton
								icon="insert"
								label="insert"
								onClick={()=>{
									items.splice(currentItemIndex,0,JSON.parse(JSON.stringify(items[currentItemIndex])));
									save();
								}}
							/>
						}
						{currentItemIndex > -1 &&
							<ToolbarButton
								icon="remove"
								label="remove"
								onClick={()=>{
									items.splice(currentItemIndex,1);
									save();
								}}
							/>
						}
					</ToolbarGroup>
				</BlockControls>
				<div id={id} className={classes+(isSelected?' alt_content '+device:'')} ref={setContainerNode}>
					{isSelected && 
						<div className="label">
							<Icon icon={CP.devices[device].icon}/>
						</div>
					}
					<div className="base">
						{states.hasBaseImage && 
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.base}
								devices={devices}
								device={device==='pc'?null:device}
							/>
						}
					</div>
					{isSelected && 
						<CP.BoundingBox
							target={currentItemNode}
							container={containerNode}
							onChange={()=>{
								const bnd=containerNode.getBoundingClientRect();
								const tgtBnd=currentItemNode.getBoundingClientRect();
								const rectDatas=parseRectAttr(items[currentItemIndex].rect);
								const deviceIndex=device?devicesForCss.indexOf(device):0;
								rectDatas[deviceIndex]=[
									parseInt((tgtBnd.left-bnd.left)/bnd.width*1000)/10,
									parseInt((tgtBnd.top-bnd.top)/bnd.height*1000)/10,
									parseInt(tgtBnd.width/bnd.width*1000)/10,
									parseInt(tgtBnd.height/bnd.height*1000)/10
								];
								items[currentItemIndex].rect=getRectAttr(rectDatas);
								save();
							}}
							onDeselect={()=>{
								setCurrentItemIndex(-1);
							}}
							onDuplicate={()=>{
								items.splice(currentItemIndex,0,JSON.parse(JSON.stringify(items[currentItemIndex])));
								save();
							}}
							onDelete={()=>{
								items.splice(currentItemIndex,1);
								save();
							}}
							viewMode={device}
						/>
					}
					{items.map((item,index)=>{
						var itemStates=CP.wordsToFlags(item.classes);
						var itemClasses=item.classes;
						var itemSelected=currentItemIndex==index;
						if(isSelected){itemClasses+=' visible active actived';}
						if(itemSelected){itemClasses+=' selected';}

						const itemBody=()=>{
							if(itemSelected){
								if(itemStates.isText){
									return (
										<span className="body">
											{itemStates.hasTitle && 
												<RichText
													tagName="h3"
													className="title"
													placeholder='Title'
													onChange={(title)=>{console.log(title);item.title=title;save();}}
													value={item.title}
												/>
											}
											{itemStates.hasLead && 
												<RichText
													tagName="h4"
													className="lead"
													placeholder='Lead'
													onChange={(lead)=>{item.lead=lead;save();}}
													value={item.lead}
												/>
											}
											{itemStates.hasText && 
												<RichText
													tagName="p"
													className="text"
													placeholder='Text'
													onChange={(text)=>{item.text=text;save();}}
													value={item.text}
												/>
											}
										</span>
									);
								}
								return (
									<CP.SelectResponsiveImage
										attr={attributes}
										set={setAttributes}
										devices={devices}
										device={device==='pc'?null:device}
										keys={imageKeys.image}
										index={index}
									/>
								);
							}
							if(itemStates.isText){
								return (
									<span className="body">
										{itemStates.hasTitle && <h3 className="title"><RichText.Content value={item.title}/></h3>}
										{itemStates.hasLead && <h4 className="lead"><RichText.Content value={item.lead}/></h4>}
										{itemStates.hasText && <p className="text"><RichText.Content value={item.text}/></p>}
									</span>
								);
							}
							return (
								<CP.ResponsiveImage
									attr={attributes}
									keys={imageKeys.image}
									devices={devices}
									device={device==='pc'?null:device}
									index={index}
								/>
							);

						};

						return wp.element.createElement(
							'span',
							{
								id:id+'_item_'+index,
								className:itemClasses,
								'data-index':index,
								'data-rect':item.rect,
								ref:itemSelected?setCurrentItemNode:null,
								onClick:(e)=>setCurrentItemIndex(index),
								key:index
							},
							itemBody()
						);
					})}
					<style>
						{device!=='pc'?(
							CP.createStyleCode(cssDatas[device])
						):(
							renderCssDatas(cssDatas)
						)}
					</style>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.graphics || {}}
						initialOpen={true}
					>
						{!states.hasBaseImage && (
							<InputHeights
								value={heights}
								onChange={(heights,device)=>{
									setAttributes({heights,device});
								}}
							/>
						)}
						<TextControl
							label='ID'
							onChange={(id)=>{setAttributes({id:id});}}
							value={id}
						/>
					</CP.SelectClassPanel>
					<CP.SelectClassPanel
						title='アイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={currentItemIndex}
						selectiveClasses={selectiveItemClasses}
						filters={CP.filters.graphics || {}}
						initialOpen={true}
					/>
					{items[currentItemIndex] && 
						<PanelBody title="ITEM CLASS" icon="admin-generic" initialOpen={false}>
							<TextareaControl
								label='クラス'
								onChange={(classes)=>{
									items[currentItemIndex].classes=classes;
									save();
								}}
								value={items[currentItemIndex].classes}
							/>
						</PanelBody>
					}
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
			</>
		);
	},
	save({attributes,className,setAttributes}){
		const {RichText}=wp.blockEditor;
		const {id,classes,heights,items=[]}=attributes;
		const {bem}=Catpow.util;

		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,getCssDatas,renderCssDatas}=CP.config.graphics;

		const cssDatas=getCssDatas(attributes,states);

		return (
			<div id={id} className={classes} data-heights={heights}>
				<div className="base">
					{states.hasBaseImage && 
						<CP.ResponsiveImage
							attr={attributes}
							keys={imageKeys.base}
							devices={devices}
						/>
					}
				</div>
				{items.map((item,index)=>{
					var itemStates=CP.wordsToFlags(item.classes);
					const itemBody=()=>{
						if(itemStates.isText){
							return (
								<span className="body">
									{itemStates.hasTitle && <h3 className="title"><RichText.Content value={item.title}/></h3>}
									{itemStates.hasLead && <h4 className="lead"><RichText.Content value={item.lead}/></h4>}
									{itemStates.hasText && <p className="text"><RichText.Content value={item.text}/></p>}
								</span>
							);
						}
						return (
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								index={index}
								devices={devices}
							/>
						);
					};

					return wp.element.createElement(
						item.link?'a':'span',
						{
							id:id+'_item_'+index,
							className:item.classes,
							href:item.link,
							'data-rect':item.rect,
							key:index
						},
						itemBody()
					);
				})}
				<style>{renderCssDatas(cssDatas)}</style>
			</div>
		);
	}
});