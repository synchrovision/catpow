CP.config.graphics={
	imageKeys:{
		base:{src:"src",srcset:"srcset",alt:"alt"},
		image:{src:"src",srcset:"srcset",alt:"alt",items:"items"},
	}
};

registerBlockType('catpow/graphics',{
	title: '🐾 graphics',
	description:'画像を自由にレイアウトします。',
	icon:'format-image',
	category: 'catpow',
	attributes:{
		id:{source:'attribute',selector:'.wp-block-catpow-graphics',attribute:'id',default:''},
		classes:{source:'attribute',selector:'.wp-block-catpow-graphics',attribute:'class',default:'wp-block-catpow-graphics hasBaseImage'},
		src:{source:'attribute',selector:'[src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
		srcset:{source:'attribute',selector:'[src]',attribute:'srcset'},
		alt:{source:'attribute',selector:'[src]',attribute:'alt'},
		height:{source:'attribute',selector:'.wp-block-catpow-graphics','attribute':'data-height',default:'60'},
		heightSP:{source:'attribute',selector:'.wp-block-catpow-graphics','attribute':'data-height-sp',default:'120'},
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
				title:{source:'children',selector:'.title'},
				lead:{source:'children',selector:'.lead'},
				text:{source:'children',selector:'.text'},
				link:{source:'attribute',attribute:'href'}
			},
			default:[
				{
					id:'graphics_image1',
					classes:'item isImage',
					rect:'25 25 50',
					rectSP:'25 25 50',
					src:cp.theme_url+'/images/dummy.jpg',
					srcset:'',
					alt:'',
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
        const {id,classes='',src,srcset,alt,height,heightSP,items=[]}=attributes;
		
		if(!id){
			setAttributes({id:'g'+(new Date().getTime().toString(16))})
		}
		
		attributes.EditMode=attributes.EditMode || 'pc';
		var isModeSP=attributes.EditMode=='sp';
		
		var cssData={},cssDataSP={};
		
		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.graphics;
		
		const selectiveClasses=[
			{
				label:'ベース画像',
				values:'hasBaseImage',
			 	sub:[
					{input:'image',label:'画像',keys:imageKeys.base,ofSP:isModeSP,sizes:isModeSP?'480px':false}
				]
			}
		];
		selectiveClasses.push({label:'高さ',input:'text',key:'height'});
		selectiveClasses.push({label:'SP版高さ',input:'text',key:'heightSP'});
		const selectiveItemClasses=[
			{label:'タイプ',filter:'type',values:{isImage:'画像',isText:'テキスト'},sub:{
				isImage:[
					{label:'タイプ',filter:'imageType',values:['type1','type2','type3']},
					{input:'text',label:'代替テキスト',key:'alt'},
					{input:'text',label:'リンク',key:'link'}
				],
				isText:[
					{label:'タイプ',filter:'textType',values:['type1','type2','type3']},
					'color',
					{label:'ヌキ文字',values:'inverse'},
					{label:'見出し',values:'hasTitle'},
					{label:'リード',values:'hasLead'},
					{label:'テキスト',values:'hasText'}
				]
			}},
			{label:'フェードイン',values:'fadeIn'},
			{label:'スライドイン',values:'slideIn',sub:[
				{type:'radio',filer:'slideIn',label:'方向',values:{
					slideInLeft:'左',
					slideInRight:'右',
					slideInUp:'上',
					slideInDown:'下',
					slideInFront:'前',
					slideInBack:'後'
				}},
			]},
			{label:'回転',filter:'roll',values:'roll',sub:[
			 	{type:'radio',label:'方向',values:{rollLeft:'左',rollRight:'右'}},
			 	{type:'radio',label:'速度',values:{rollSlow:'遅い',rollFast:'速い'}},
			 ]},
			{label:'ホバー',filter:'hover',values:'hover',sub:[
				{label:'フェード',values:'hoverFade'},
				{type:'radio',label:'動き',values:{
					hoverNoMove:'なし',
					hoverZoom:'ズーム',
					hoverLift:'リフト',
					hoverJump:'ジャンプ',
				}}
			]}
		];
		
		if(!states.hasBaseImage){
			cssData['#'+id+' .base']={'padding-top':height+'%'};
			cssDataSP['#'+id+' .base']={'padding-top':heightSP+'%'};
		}
		
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
				var rectKey='rect'+(isModeSP?'SP':'');
				var rectDate=items[i][rectKey].split(' ');
				if(tgtItem.type==='pos'){
					if(e.altKey){
						items.splice(i,0,JSON.parse(JSON.stringify(items[i])));
					}
					rectDate[0]=parseInt((e.clientX-bnd.left)/bnd.width*1000)/10;
					rectDate[1]=parseInt((e.clientY-bnd.top)/bnd.height*1000)/10;
					items[i][rectKey]=rectDate.join(' ');
					tgtItem.node.style.left='';
					tgtItem.node.style.top='';
				}
				else if(tgtItem.type==='del'){
					items.splice(i,1);
				}
				else if(tgtItem.type==='dup'){
					items.splice(i,0,JSON.parse(JSON.stringify(items[i])));
					rectDate[0]=parseFloat(rectDate[0])+1;
					rectDate[1]=parseFloat(rectDate[1])+1;
					items[i][rectKey]=rectDate.join(' ');
				}
				else if(tgtItem.type==='bnd'){
					var tgtBnd=tgtItem.node.getBoundingClientRect();
					rectDate[2]=parseInt((e.clientX-tgtBnd.left)/bnd.width*1000)/10;
					items[i][rectKey]=rectDate.join(' ');
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
			if(tgt.classList.contains('pos')){
				if(isModeSP){
					var item=items[tgt.parentNode.dataset.index];
					item['rectSP']=item['rect'];
					tgtItem=false;
					save();
				}
			}
			else if(tgt.classList.contains('bnd')){
				var item=items[tgt.parentNode.dataset.index];
				var rectKey='rect'+(isModeSP?'SP':'');
			}
		};
		
        return [
			<BlockControls>
				<Toolbar
					controls={[
						{
							icon: 'desktop',
							title: 'PC',
							isActive: !isModeSP,
							onClick: () => setAttributes({EditMode:'pc'})
						}
					]}
				/>
				<Toolbar
					controls={[
						{
							icon: 'smartphone',
							title: 'SP',
							isActive: isModeSP,
							onClick: () => setAttributes({EditMode:'sp'})
						}
					]}
				/>
			</BlockControls>,
			<div
				id={id}
				className={classes+(isModeSP?' sp':' pc')}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUp}
				onDoubleClick={onDoubleClick}
			>
				<div class="base">
					{states.hasBaseImage && 
						<img src={src} srcset={srcset} alt={alt} sizes={isModeSP?'480px':false}/>
					}
				</div>
				{items.map((item,index)=>{
					var bnd=item.rect.split(' ').map((val)=>val+'%');
					var bndSP=item.rectSP.split(' ').map((val)=>val+'%');
					var itemID=id+'_item_'+index;
					var itemStates=CP.wordsToFlags(item.classes);
					var itemClasses=item.classes;
					var itemSelected=attributes.currentItemIndex==index;
					if(isSelected){itemClasses+=' visible active actived';}
					if(itemSelected){itemClasses+=' selected';}
					cssData['#'+itemID]={left:bnd[0],top:bnd[1],width:bnd[2]};
					cssDataSP['#'+itemID]={left:bndSP[0],top:bndSP[1],width:bndSP[2]};
					
					const itemBody=()=>{
						if(itemSelected){
							if(itemStates.isText){
								return (
									<Fragment>
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
									</Fragment>
								);
							}
							return (
								<SelectResponsiveImage
									attr={attributes}
									set={(data)=>{
										if(isModeSP){
											Object.assign(data.items[index],{
												src:item.src,
												srcset:data.items[index].src+' 480w,'+item.src,
											});
										}
										setAttributes(data);
									}}
									sizes={isModeSP?'480px':false}
									keys={imageKeys.image}
									index={index}
								/>
							);
						}
						if(itemStates.isText){
							return (
								<Fragment>
									{itemStates.hasTitle && <h3 className="title"><RichText.Content value={item.title}/></h3>}
									{itemStates.hasLead && <h4 className="lead"><RichText.Content value={item.lead}/></h4>}
									{itemStates.hasText && <p className="text"><RichText.Content value={item.text}/></p>}
								</Fragment>
							);
						}
						return (
							<ResponsiveImage
								attr={attributes}
								sizes={isModeSP?'480px':false}
								keys={imageKeys.image}
								index={index}
							/>
						);
						
					};
					
					return el(
						'span',
						{
							id:itemID,
							className:itemClasses,
							'data-index':index,
							'data-rect':item.rect,
							'data-rect-sp':item.rectSP
						},
						<Fragment>
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
						</Fragment>
					);
				})}
				<style>
					{CP.createStyleCode(isModeSP?cssDataSP:cssData)}
				</style>
			</div>,
			<InspectorControls>
				<SelectClassPanel
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
				<SelectItemClassPanel
					title='アイテム'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={attributes.currentItemIndex}
					itemClasses={selectiveItemClasses}
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
				<ItemControlInfoPanel/>
			</InspectorControls>
        ];
    },
	save({attributes,className,setAttributes}){
        const {id,classes,height,heightSP,items=[]}=attributes;
		
		var cssData={},cssDataSP={};
		
		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.graphics;
		
		if(!states.hasBaseImage){
			cssData['#'+id+' .base']={'padding-top':height+'%'};
			cssDataSP['#'+id+' .base']={'padding-top':heightSP+'%'};
		}
		
		return (
			<div id={id} className={classes} data-height={height} data-height-sp={heightSP}>
				<div class="base">
					{states.hasBaseImage && 
						<ResponsiveImage
							attr={attributes}
							keys={imageKeys.base}
						/>
					}
				</div>
				{items.map((item,index)=>{
					var bnd=item.rect.split(' ').map((val)=>val+'%');
					var bndSP=item.rectSP.split(' ').map((val)=>val+'%');
					var itemID=id+'_item_'+index;
					var itemStates=CP.wordsToFlags(item.classes);
					cssData['#'+itemID]={left:bnd[0],top:bnd[1],width:bnd[2]};
					cssDataSP['#'+itemID]={left:bndSP[0],top:bndSP[1],width:bndSP[2]};
					
					
					const itemBody=()=>{
						if(itemStates.isText){
							return (
								<Fragment>
									{itemStates.hasTitle && <h3 className="title"><RichText.Content value={item.title}/></h3>}
									{itemStates.hasLead && <h4 className="lead"><RichText.Content value={item.lead}/></h4>}
									{itemStates.hasText && <p className="text"><RichText.Content value={item.text}/></p>}
								</Fragment>
							);
						}
						return (
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								index={index}
							/>
						);
					};
					
					return el(
						item.link?'a':'span',
						{
							id:itemID,
							className:item.classes,
							href:item.link,
							'data-rect':item.rect,
							'data-rect-sp':item.rectSP
						},
						itemBody()
					);
				})}
				<style>
					{CP.createStyleCode(cssData)}
					{'@media(max-width:768px){'+CP.createStyleCode(cssDataSP)+'}'}
				</style>
			</div>
		);
	}
});