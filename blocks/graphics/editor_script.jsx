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
		if(!states.hasBaseImage){
			heights.split(',').map((height,deviceIndex)=>{
				rtn[devicesForCss[deviceIndex]]['#'+id+' .base']={'padding-top':height+'%'};
			});
		}
		items.map((item,index)=>{
			item.rect.split(',').map((rect,deviceIndex)=>{
				const bnd=rect.split(' ').map((val)=>val+'%');
				rtn[devicesForCss[deviceIndex]]['#'+id+'_item_'+index]={left:bnd[0],top:bnd[1],width:bnd[2]};
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
	attributes:{
		id:{source:'attribute',selector:'.wp-block-catpow-graphics',attribute:'id',default:''},
		classes:{source:'attribute',selector:'.wp-block-catpow-graphics',attribute:'class',default:'wp-block-catpow-graphics hasBaseImage'},
		src:{source:'attribute',selector:'[src]',attribute:'src',default:wpinfo.theme_url+'/images/dummy_bg.jpg'},
		srcset:{source:'attribute',selector:'[src]',attribute:'srcset'},
		alt:{source:'attribute',selector:'[src]',attribute:'alt'},
		sources:CP.getPictureSoucesAttributesForDevices(CP.config.graphics.devices,'.base picture','dummy_bg.jpg'),
		height:{source:'attribute',selector:'.wp-block-catpow-graphics','attribute':'data-heights',default:'120,80,60'},
		items:{
			source:'query',
			selector:'.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				rect:{source:'attribute','attribute':'data-rect'},
				rectSP:{source:'attribute','attribute':'data-rect-sp'},
				src:{source:'attribute',selector:'[src]',attribute:'src'},
				srcset:{source:'attribute',selector:'[src]',attribute:'srcset'},
				alt:{source:'attribute',selector:'[src]',attribute:'alt'},
				sources:CP.getPictureSoucesAttributes(),
				title:{source:'html',selector:'.title'},
				lead:{source:'html',selector:'.lead'},
				text:{source:'html',selector:'.text'},
				link:{source:'attribute',attribute:'href'}
			},
			default:[
				{
					id:'graphics_image1',
					classes:'item isImage',
					rect:'25 25 50,25 25 50,25 25 50',
					src:wpinfo.theme_url+'/images/dummy.jpg',
					srcset:'',
					alt:'',
					sources:CP.getPictureSoucesAttributesDefaultValueForDevices(CP.config.graphics.devices),
					title:['Title'],
					lead:['Lead'],
					text:['Text'],
					link:''
				}
			]
		}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {InspectorControls,RichText}=wp.blockEditor;
		const {Icon,PanelBody,TextareaControl,TextControl}=wp.components;
		const {id,classes='',src,srcset,alt,heights,items=[],device}=attributes;

		if(!id){
			setAttributes({id:'g'+(new Date().getTime().toString(16))})
		}

		attributes.EditMode=attributes.EditMode || 'pc';
		var isModeSP=attributes.EditMode=='sp';

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
				},
				{name:'height',label:'高さ',input:'text',key:'heights'}
			];
			wp.hooks.applyFilters('catpow.blocks.graphics.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemClasses=useMemo(()=>{
			const {devices,devicesForCss,imageKeys,getCssDatas,renderCssDatas,parseRectAttr,getRectAttr}=CP.config.graphics;
			const selectiveItemClasses=[
				{name:'type',label:'タイプ',filter:'type',values:{isImage:'画像',isText:'テキスト'},sub:{
					isImage:[
						{name:'imageType',label:'タイプ',filter:'imageType',values:['type1','type2','type3']},
						{name:'alt',input:'text',label:'代替テキスト',key:'alt'},
						{name:'link',input:'text',label:'リンク',key:'link'},
						{name:'image',input:'picture',label:'画像',keys:imageKeys.image,devices}
					],
					isText:[
						{name:'textType',label:'タイプ',filter:'textType',values:['type1','type2','type3']},
						'color',
						{name:'inverse',label:'ヌキ文字',values:'inverse'},
						{name:'title',label:'見出し',values:'hasTitle'},
						{name:'lead',label:'リード',values:'hasLead'},
						{name:'text',label:'テキスト',values:'hasText'}
					]
				}},
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


		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		}

		const onMouseDown=(e)=>{
			var tgt=e.target;
			var itemNode=tgt.closest('.item');
			if(!itemNode){tgtItem=false;setAttributes({currentItemIndex:i});return;}
			var i=itemNode.dataset.index;
			tgtItem={node:itemNode};
			if(tgt.classList.contains('pos')){tgtItem.type='pos';}
			if(tgt.classList.contains('del')){tgtItem.type='del';}
			if(tgt.classList.contains('dup')){tgtItem.type='dup';}
			if(tgt.classList.contains('bnd')){tgtItem.type='bnd';}
			tgtItem.node.style.animation='none';
			tgtItem.node.style.transition='none';
			tgtItem.node.style.transform='scale(1)';
			if(attributes.currentItemIndex!=i){
				setAttributes({currentItemIndex:i});
			}
		};
		const onMouseMove=(e)=>{
			if(!tgtItem){return;}
			var bnd=e.currentTarget.getBoundingClientRect();
			if(tgtItem.type==='pos'){
				tgtItem.node.style.left=(e.clientX-bnd.left)+'px';
				tgtItem.node.style.top=(e.clientY-bnd.top)+'px';
			}
			else if(tgtItem.type==='bnd'){
				var tgtBnd=tgtItem.node.getBoundingClientRect();
				tgtItem.node.style.width=(e.clientX-tgtBnd.left)+'px';
			}
		};
		const onMouseUp=(e)=>{
			if(tgtItem){
				var bnd=e.currentTarget.getBoundingClientRect();
				var i=tgtItem.node.dataset.index;
				let rectDatas=parseRectAttr(items[i].rect);
				const deviceIndex=device?devicesForCss.indexOf(device):0;
				let rectData=rectDatas[deviceIndex];

				if(tgtItem.type==='pos'){
					if(e.altKey){
						items.splice(i,0,JSON.parse(JSON.stringify(items[i])));
					}
					rectData[0]=parseInt((e.clientX-bnd.left)/bnd.width*1000)/10;
					rectData[1]=parseInt((e.clientY-bnd.top)/bnd.height*1000)/10;
					items[i].rect=getRectAttr(rectDatas);
					tgtItem.node.style.left='';
					tgtItem.node.style.top='';
				}
				else if(tgtItem.type==='del'){
					items.splice(i,1);
				}
				else if(tgtItem.type==='dup'){
					items.splice(i,0,JSON.parse(JSON.stringify(items[i])));
					rectData[0]=parseFloat(rectData[0])+1;
					rectData[1]=parseFloat(rectData[1])+1;
					items[i].rect=getRectAttr(rectDatas);
				}
				else if(tgtItem.type==='bnd'){
					var tgtBnd=tgtItem.node.getBoundingClientRect();
					rectData[2]=parseInt((e.clientX-tgtBnd.left)/bnd.width*1000)/10;
					items[i].rect=getRectAttr(rectDatas);
					tgtItem.node.style.width='';
				}
				tgtItem.node.style.animation='';
				tgtItem.node.style.transition='';
				tgtItem.node.style.transform='';
				tgtItem=false;
				save();
			}
		};
		const onDoubleClick=(e)=>{
			var tgt=e.target;
		};

		return (
			<>
				<CP.SelectDeviceToolbar attr={attributes} set={setAttributes} devices={devices}/>
				<div
					id={id}
					className={classes+(device?' alt_content '+device:'')}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onDoubleClick={onDoubleClick}
				>
					{device &&
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
								device={device}
							/>
						}
					</div>
					{items.map((item,index)=>{
						var itemStates=CP.wordsToFlags(item.classes);
						var itemClasses=item.classes;
						var itemSelected=attributes.currentItemIndex==index;
						if(isSelected){itemClasses+=' visible active actived';}
						if(itemSelected){itemClasses+=' selected';}

						const itemBody=()=>{
							if(itemSelected){
								if(itemStates.isText){
									return (
										<>
											{itemStates.hasTitle && 
												<h3 className="title">
													<RichText
														placeholder='Title'
														onChange={(title)=>{console.log(title);item.title=title;save();}}
														value={item.title}
													/>
												 </h3>
											}
											{itemStates.hasLead && 
												<h4 className="lead">
													<RichText
														placeholder='Lead'
														onChange={(lead)=>{item.lead=lead;save();}}
														value={item.lead}
													/>
												 </h4>
											}
											{itemStates.hasText && 
												<p className="text">
													<RichText
														placeholder='Text'
														onChange={(text)=>{item.text=text;save();}}
														value={item.text}
													/>
												 </p>
											}
										</>
									);
								}
								return (
									<CP.SelectResponsiveImage
										attr={attributes}
										set={setAttributes}
										devices={devices}
										device={device}
										keys={imageKeys.image}
										index={index}
									/>
								);
							}
							if(itemStates.isText){
								return (
									<>
										{itemStates.hasTitle && <h3 className="title"><RichText.Content value={item.title}/></h3>}
										{itemStates.hasLead && <h4 className="lead"><RichText.Content value={item.lead}/></h4>}
										{itemStates.hasText && <p className="text"><RichText.Content value={item.text}/></p>}
									</>
								);
							}
							return (
								<CP.ResponsiveImage
									attr={attributes}
									keys={imageKeys.image}
									devices={devices}
									device={device}
									index={index}
								/>
							);

						};

						return el(
							'span',
							{
								id:id+'_item_'+index,
								className:itemClasses,
								'data-index':index,
								'data-rect':item.rect,
								key:index
							},
							<>
								{itemBody()}
								{isSelected && itemSelected && 
									<div className="control">
										<div className="pos">
											<Icon icon="move"/>
										</div>
										<div className="del">
											<Icon icon="dismiss"/>
										</div>
										<div className="dup">
											<Icon icon="plus-alt"/>
										</div>
										<div className="bnd">
											<Icon icon="leftright"/>
										</div>
									</div>
								}
							</>
						);
					})}
					<style>
						{device?(
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
					/>
					<PanelBody title="ID" icon="admin-links" initialOpen={false}>
						<TextControl
							label='ID'
							onChange={(id)=>{setAttributes({id:id});}}
							value={id}
						/>
					</PanelBody>
					<CP.SelectClassPanel
						title='アイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						selectiveClasses={selectiveItemClasses}
						filters={CP.filters.graphics || {}}
					/>
					{items[attributes.currentItemIndex] && 
						<PanelBody title="ITEM CLASS" icon="admin-generic" initialOpen={false}>
							<TextareaControl
								label='クラス'
								onChange={(classes)=>{
									items[attributes.currentItemIndex].classes=classes;
									save();
								}}
								value={items[attributes.currentItemIndex].classes}
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
		const {id,classes,heights,heightSP,items=[]}=attributes;

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
								<>
									{itemStates.hasTitle && <h3 className="title"><RichText.Content value={item.title}/></h3>}
									{itemStates.hasLead && <h4 className="lead"><RichText.Content value={item.lead}/></h4>}
									{itemStates.hasText && <p className="text"><RichText.Content value={item.text}/></p>}
								</>
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

					return el(
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