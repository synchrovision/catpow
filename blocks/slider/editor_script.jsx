CP.config.slider={
	devices:['sp','tb'],
	imageKeys:{
		image:{src:"src",alt:"alt",code:'imageCode',items:"items"},
		slide:{src:"slideSrc",alt:"slideAlt",srscet:"slideSrcset",code:'slideCode',sources:'slideSources',items:"items"},
		backgroundImage:{src:"backgroundImageSrc",alt:"backgroundImageAlt",srcset:"backgroundImageSrcset",code:'backgroundImageCode',sources:'backgroundImageSources',items:"items"}
	},
	imageSizes:{
		image:'vga'
	}
};

registerBlockType('catpow/slider',{
	title: '🐾 Slider',
	description:'スライダーのブロックです。',
	icon:'video-alt3',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-slider story hasTitle hasText hasImage';
					if(!attributes.controlClasses){attributes.controlClasses='controls loop autoplay flickable';}
					if(!attributes.config){attributes.config='{}';}
					return createBlock('catpow/slider',attributes);
				},
			},
		]
	},
	
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {useState,useMemo}=wp.element;
		const {classes='',controlClasses='',config,items,doLoop,EditMode=false,AltMode=false,device}=attributes;
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,imageSizes}=CP.config.slider;
		
		var statesClasses=[
			{label:'アロー',values:'hasArrows'},
			{label:'ドット',values:'hasDots'},
			{input:'range',label:'表示スライド',json:'config',key:'initialSlide',min:0,max:items.length-1}
		];
		var animateClasses=[
			{label:'ループ',values:'loop',sub:[
				{label:'アイテムを反復',values:'loopItems'}
			]},
			{label:'自動再生',values:'autoplay',sub:[
				{input:'range',label:'自動再生間隔（単位:0.1秒）',json:'config',key:'interval',coef:100,min:0,max:100},
				{input:'range',label:'操作停止時間（単位:0.1秒）',json:'config',key:'wait',coef:100,min:0,max:100},
				{label:'ホバーで停止',values:'stopbyhover'}
			]}
		];
		var controllerClasses=[
			{label:'フリック操作',values:'flickable'},
			{label:'スクロール操作',values:'scrollable'},
			{label:'閉じる操作',values:'closable'}
		];
		
		const selectiveClasses=useMemo(()=>{
			const {devices,imageKeys,imageSizes}=CP.config.slider;
			const selectiveClasses=[
				{
					name:'type',
					label:'タイプ',values:['visual','story','articles','index'],
					filter:'type',
					type:'gridbuttons',
					sub:{
						visual:[
							{name:'hasTitle',label:'見出し',values:'hasTitle',sub:[
								{name:'subTitle',label:'サブタイトル',values:'hasSubTitle'},
								{name:'text',label:'テキスト',values:'hasText'},
								{name:'brightText',label:'白文字',values:'brightText',sub:[
									{name:'colorBG',label:'色付き背景',values:'colorBG'}
								]}
							]},
							{name:'slide',label:'スライド画像',values:'hasSlide'},
							{name:'image',label:'イメージ画像',values:'hasImage',sub:[
								{name:'thumbnail',label:'サムネール',values:'hasThumbnail'}
							]},
							{name:'backgroundImage',label:'背景画像',values:'hasBackgroundImage',sub:[
								{name:'paleBG',label:'背景画像を薄く',values:'paleBG'}
							 ]},
							{name:'link',label:'リンク',values:'hasLink'}
						],
						story:[
							{name:'subTitle',label:'サブタイトル',values:'hasSubTitle'},
							{name:'brightText',label:'白文字',values:'brightText',sub:[
								{name:'colorBG',label:'色付き背景',values:'colorBG'}
							]},
							{name:'image',label:'画像',values:'hasImage',sub:[
								{name:'thumbnail',label:'サムネール',values:'hasThumbnail'}
							]},
							{name:'backgroundImage',label:'背景画像',values:'hasBackgroundImage',sub:[
								{name:'paleBG',label:'背景画像を薄く',values:'paleBG'}
							 ]},
							{name:'link',label:'リンク',values:'hasLink'}
						],
						articles:[
							{name:'title',label:'タイトル',values:'hasTitle'},
							{name:'text',label:'テキスト',values:'hasText'},
							{name:'image',label:'画像',values:'hasImage'},
							{name:'link',label:'リンク',values:'hasLink'}
						],
						index:[
							{name:'subTitle',label:'サブタイトル',values:'hasSubTitle'},
							{name:'image',label:'画像',values:'hasImage'},
							{name:'link',label:'リンク',values:'hasLink'}
						]
					},
					bind:{
						story:['hasTitle','hasText'],
						index:['hasTitle','hasText']
					},
					item:{
						visual:[
							'color',
							'pattern',
							{name:'slide',input:'picture',label:'スライド画像',keys:imageKeys.slide,devices,cond:'hasSlide'},
							{name:'backgroundImage',input:'picture',label:'背景画像',keys:imageKeys.backgroundImage,devices,cond:'hasBackgroundImage'}
						],
						story:[
							'color',
							'pattern',
							{name:'backgroundImage',input:'picture',label:'背景画像',keys:imageKeys.backgroundImage,devices,cond:'hasBackgroundImage'}
						]
					}
				},
				{
					label:'テンプレート',
					values:'isTemplate',
					sub:[
						{name:'loop',input:'bool',label:'ループ',key:'doLoop',sub:[
							{name:'contentPath',label:'content path',input:'text',key:'content_path'},
							{name:'query',label:'query',input:'textarea',key:'query'},
							{name:'loopCount',label:'プレビューループ数',input:'range',key:'loopCount',min:1,max:16}
						]}
					]
				}
			];
			wp.hooks.applyFilters('catpow.blocks.slider.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		
		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};

		
		var rtn=[];
		var thumbs=[];
		var dots=[];
		
		let configData=JSON.parse(config);
		if(configData.initialSlide === undefined){configData.initialSlide=0;}
		const gotoItem=(i)=>{
			configData.initialSlide=(i+items.length)%items.length;
			setAttributes({currentItemIndex:configData.initialSlide,config:JSON.stringify(configData)});
		};
		const prevItem=()=>{
			gotoItem(configData.initialSlide-1);
		};
		const nextItem=()=>{
			gotoItem(configData.initialSlide+1);
		};
		
		const pushItem=(item,index)=>{
			var posClass,itemClass,imageIndex;
			imageIndex=(index-configData.initialSlide+items.length)%items.length;
			if(imageIndex==0){posClass='active';}
			else if(imageIndex < Math.floor(items.length/2)){
				posClass='after';
			}
			else{
				posClass='before';
				imageIndex-=items.length;
			}
			itemClass=posClass+' image'+imageIndex+' thumb'+imageIndex;
			rtn.push(
				<CP.Item
					tag='li'
					className={itemClass}
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
				>
					{states.hasSlide &&
						<div className='slide'>
							<CP.SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.slide}
								devices={devices}
								device={device}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasImage &&
						<div className='image'>
							<CP.SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.image}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{(states.hasTitle || states.hasSubTitle || states.hasText) && 
						<div class="texts">
							{states.hasTitle && 
								<h3 className="title">
									<RichText
										onChange={(title)=>{item.title=title;save();}}
										value={item.title}
									/>
								</h3>
							}
							{states.hasSubTitle &&
								<h4 className="subtitle">
									<RichText
										onChange={(subTitle)=>{item.subTitle=subTitle;save();}}
										value={item.subTitle}
									/>
								</h4>
							}
							{states.hasText &&
								<p className="text">
									<RichText
										onChange={(text)=>{item.text=text;save();}}
										value={item.text}
									/>
								</p>
							}
						</div>
					}
					{states.hasBackgroundImage &&
						<div className='background'>
							<CP.SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.backgroundImage}
								devices={devices}
								device={device}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasLink &&
						<div className='link'>
							<TextControl
								onChange={(linkUrl)=>{item.linkUrl=linkUrl;save();}}
								value={item.linkUrl}
								placeholder='URLを入力'
							/>
						</div>
					}
				</CP.Item>
			);
			if(states.hasImage && states.hasThumbnail){
				thumbs.push(
					<li class={'item '+posClass+' thumb'+imageIndex} onClick={()=>gotoItem(index)}>
						<CP.SelectResponsiveImage
							attr={attributes}
							set={setAttributes}
							keys={imageKeys.image}
							index={index}
							isTemplate={states.isTemplate}
						/>
					</li>
				);
			}
			if(states.hasDots){
				dots.push(<li class={'dot '+posClass+' dot'+imageIndex} onClick={()=>gotoItem(index)}></li>);
			}
		}
		
		const l=items.length;
		for(let i=0;i<l;i++){pushItem(items[i%l],i%l);}
		
		if(attributes.EditMode===undefined){attributes.EditMode=false;}
		
		
		return (
			<Fragment>
				<CP.SelectModeToolbar
					set={setAttributes}
					attr={attributes}
				/>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.slider || {}}
					/>
					<CP.SelectClassPanel
						title='表示設定'
						icon='admin-appearance'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={statesClasses}
						filters={CP.filters.slider || {}}
					/>
					<CP.SelectClassPanel
						classKey='controlClasses'
						title='アニメーション設定'
						icon='video-alt3'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={animateClasses}
						filters={CP.filters.slider || {}}
					/>
					<CP.SelectClassPanel
						classKey='controlClasses'
						title='操作設定'
						icon='universal-access'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={controllerClasses}
						filters={CP.filters.slider || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
						/>
						<TextareaControl
							label='コントローラークラス'
							onChange={(controlClasses)=>setAttributes({controlClasses})}
							value={controlClasses}
						/>
					</PanelBody>
					<CP.SelectClassPanel
						title='スライド'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						triggerClasses={selectiveClasses[0]}
						filters={CP.filters.slider || {}}
					/>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				{attributes.EditMode?(
					<div className="alt_content">
						<div class="label">
							<Icon icon="edit"/>
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{type:'picture',label:'slide',keys:imageKeys.slide,devices,cond:states.hasSlide},
								{type:'text',key:'slideCode',cond:states.isTemplate && states.hasSlide},
								{type:'image',label:'image',keys:imageKeys.image,cond:states.hasImage},
								{type:'text',key:'imageCode',cond:states.isTemplate && states.hasImage},
								{type:'picture',label:'bg',keys:imageKeys.backgroundImage,devices,cond:states.hasBackgroundImage},
								{type:'text',key:'backgroundImageCode',cond:states.isTemplate && states.hasBackgroundImage},
								{type:'text',key:'title',cond:states.hasTitle},
								{type:'text',key:'subTitle',cond:states.hasSubTitle},
								{type:'text',key:'text',cond:states.hasText},
								{type:'text',key:'linkUrl',cond:states.hasLink}
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				):(
					<Fragment>
						{(AltMode && doLoop)?(
							<div className="alt_content">
								<div class="label">
									<Icon icon="welcome-comments"/>
								</div>
								<InnerBlocks/>
							</div>
						):(
							<div className={classes}>
								<ul class="contents">{rtn}</ul>
								<div className={controlClasses} data-config={config}>
									{states.hasArrows && <div class='arrow prev' onClick={prevItem}> </div>}
									{states.hasImage && states.hasThumbnail && <ul class="thumbnail">{thumbs}</ul>}
									{states.hasDots && <ul class="dots">{dots}</ul>}
									{states.hasArrows && <div class='arrow next' onClick={nextItem}> </div>}
								</div>
							</div>
						)}
					</Fragment>
				)}
			</Fragment>
		);
	},
	save({attributes,className}){
		const {classes='',controlClasses='',config,items=[],doLoop}=attributes;
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,imageSizes}=CP.config.slider;
		
		var rtn=[];
		var thumbs=[];
		items.map(function(item,index){
			rtn.push(
				<li className={item.classes}>
					{states.hasSlide &&
						<div className='slide'>
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.slide}
								devices={devices}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasImage &&
						<div className='image'>
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{(states.hasTitle || states.hasSubTitle || states.hasText) && 
						<div class="texts">
							{states.hasTitle && <h3 className="title"><RichText.Content value={item.title}/></h3>}
							{states.hasSubTitle && <h4 className="subtitle"><RichText.Content value={item.subTitle}/></h4>}
							{states.hasText && <p className="text"><RichText.Content value={item.text}/></p>}
						</div>
					}
					{states.hasBackgroundImage &&
						<div className='background'>
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.backgroundImage}
								devices={devices}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasLink && <div className='link'><a href={item.linkUrl}> </a></div>}
				</li>
			);
			if(states.hasImage && states.hasThumbnail){
				thumbs.push(
					<li class={item.classes}>
						<CP.ResponsiveImage
							attr={attributes}
							keys={imageKeys.image}
							index={index}
							isTemplate={states.isTemplate}
						/>
					</li>
				);
			}
		});
		
		return (
			<Fragment>
				<div className={classes}>
					<ul class="contents">
						{rtn}
					</ul>
					<div className={controlClasses} data-config={config}>
						{states.hasArrows && <div class='arrow prev'> </div>}
						{states.hasImage && states.hasThumbnail && <ul class="thumbnail">{thumbs}</ul>}
						{states.hasDots && <ul class="dots"><li class="dot"> </li></ul>}
						{states.hasArrows && <div class='arrow next'> </div>}
					</div>
				</div>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</Fragment>
		);
	},
	deprecated:[
		{
			attributes:{
				classes:{source:'attribute',selector:'div',attribute:'class',default:'hasTitle hasText hasImage'},
				controlClasses:{source:'attribute',selector:'div.controls',attribute:'class',default:'controls loop autoplay flickable'},
				config:{
					source:'attribute',
					selector:'div.controls',
					attribute:'data-config',
					default:'{}'
				},
				items:{
					source:'query',
					selector:'li.item',
					query:{
						title:{source:'children',selector:'.text h3'},
						subTitle:{source:'children',selector:'.text h4'},
						src:{source:'attribute',selector:'.image [src]',attribute:'src'},
						alt:{source:'attribute',selector:'.image [src]',attribute:'alt'},
						text:{source:'children',selector:'.text p'},
						url:{source:'attribute',selector:'a',attribute:'href'},
						bg:{source:'attribute',attribute:'style'}
					},
					default:[
						{
							title:['Title'],
							subTitle:['SubTitle'],
							src:cp.theme_url+'/images/dummy.jpg',
							alt:'dummy',
							text:['Text'],
							url:'https://',
							bg:"background-image:url('"+cp.theme_url+"/images/dummy.jpg')",
						}
					]
				}
			},
			
			save({attributes,className}){
				const {classes='',controlClasses='',config,items=[]}=attributes;
				var classArray=_.uniq(classes.split(' '));
				var controlClassArray=_.uniq(controlClasses.split(' '));
				var states={
					hasArrows:false,
					hasDots:false,
					hasThumbnail:false,

					hasTitle:false,
					hasSubTitle:false,
					hasText:false,
					hasImage:false,
					hasBackgroundImage:false
				};
				var controlStates={
					loop:false,
					autoplay:false,
					flickable:false,
					scrollable:false,
					stopbyhover:false,
					closable:false,
				};
				const hasClass=(cls)=>(classArray.indexOf(cls)!==-1);
				Object.keys(states).forEach(function(key){this[key]=hasClass(key);},states);
				const hasControlClass=(cls)=>(controlClassArray.indexOf(cls)!==-1);
				Object.keys(controlStates).forEach(function(key){this[key]=hasClass(key);},controlStates);

				var rtn=[];
				var thumbs=[];
				items.map(function(item,index){
					if(states.hasBackgroundImage){
						if(typeof item.bg === 'string'){
							item.bg={backgroundImage:item.bg.substr('background-image:'.length)};
						}
					}
					else{item.bg={}}
					rtn.push(
						<li class={'item'} style={item.bg}>
							{states.hasImage &&
								<div className='image'>
									<img src={item.src} alt={item.alt}/>
								</div>
							}
							<div class="text">
								{states.hasTitle && <h3><RichText.Content value={item.title}/></h3>}
								{states.hasSubTitle && <h4><RichText.Content value={item.subTitle}/></h4>}
								{states.hasText && <p><RichText.Content value={item.text}/></p>}
							</div>
						</li>
					);
					if(states.hasThumbnail){
						thumbs.push(
							<li class={'item'} style={item.bg}>
								<img src={item.src} alt={item.alt}/>
							</li>
						);
					}
				});

				return <div className={classes}>
					<ul class="contents">{rtn}</ul>
					<div className={controlClasses} data-config={config}>
						{states.hasArrows && <div class='arrow prev'> </div>}
						{states.hasThumbnail && <ul class="thumbnail">{thumbs}</ul>}
						{states.hasDots && <ul class="dots"><li class="dot"> </li></ul>}
						{states.hasArrows && <div class='arrow next'> </div>}
					</div>
				</div>;
			},
		},
		{
			save({attributes,className}){
				const {classes='',controlClasses='',config,items=[]}=attributes;
				var classArray=_.uniq(classes.split(' '));
				var controlClassArray=_.uniq(controlClasses.split(' '));

				var states=CP.wordsToFlags(classes);

				const imageKeys={
					image:{src:"src",alt:"alt",code:'imageCode',items:"items"},
					slide:{src:"slideSrc",alt:"slideAlt",srscet:"slideSrcset",code:'slideCode',items:"items"},
					backgroundImage:{src:"backgroundImageSrc",alt:"backgroundImageAlt",srcset:"backgroundImageSrcset",code:'backgroundImageCode',items:"items"}
				};

				var rtn=[];
				var thumbs=[];
				items.map(function(item,index){
					rtn.push(
						<li className={item.classes}>
							{states.hasSlide &&
								<div className='slide'>
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.slide}
										index={index}
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							{states.hasImage &&
								<div className='image'>
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.image}
										index={index}
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							{(states.hasTitle || states.hasSubTitle || states.hasText) && 
								<div class="text">
									{states.hasTitle && <h3><RichText.Content value={item.title}/></h3>}
									{states.hasSubTitle && <h4><RichText.Content value={item.subTitle}/></h4>}
									{states.hasText && <p><RichText.Content value={item.text}/></p>}
								</div>
							}
							{states.hasBackgroundImage &&
								<div className='background'>
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.backgroundImage}
										index={index}
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							{states.hasLink && <div className='link'><a href={item.linkUrl}> </a></div>}
						</li>
					);
					if(states.hasImage && states.hasThumbnail){
						thumbs.push(
							<li class={item.classes}>
								<CP.ResponsiveImage
									attr={attributes}
									keys={imageKeys.image}
									index={index}
									isTemplate={states.isTemplate}
								/>
							</li>
						);
					}
				});

				return <div className={classes}>
					<ul class="contents">
						{states.doLoop && '[loop_template '+(loopParam || '')+']'}
						{rtn}
						{states.doLoop && '[/loop_template]'}
					</ul>
					<div className={controlClasses} data-config={config}>
						{states.hasArrows && <div class='arrow prev'> </div>}
						{states.hasImage && states.hasThumbnail && <ul class="thumbnail">{thumbs}</ul>}
						{states.hasDots && <ul class="dots"><li class="dot"> </li></ul>}
						{states.hasArrows && <div class='arrow next'> </div>}
					</div>
				</div>;
			},
			migrate(attributes){
				var states=CP.wordsToFlags(classes);
				attributes.content_path=attributes.loopParam.split(' ')[0];
				attributes.query=attributes.loopParam.split(' ').slice(1).join("\n");
				attributes.doLoop=states.doLoop;
				return attributes;
			}
		}
	]
});