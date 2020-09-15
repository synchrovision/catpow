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
	
	attributes:{
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-slider story hasTitle hasText hasImage'},
		controlClasses:{source:'attribute',selector:'div.controls',attribute:'class',default:'controls loop autoplay flickable'},
		config:{
			source:'attribute',
			selector:'div.controls',
			attribute:'data-config',
			default:'{}'
		},
		items:{
			source:'query',
			selector:'ul.contents li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				title:{source:'children',selector:'.text h3'},
				subTitle:{source:'children',selector:'.text h4'},
				src:{source:'attribute',selector:'.image [src]',attribute:'src'},
				alt:{source:'attribute',selector:'.image [src]',attribute:'alt'},
				slideSrc:{source:'attribute',selector:'.slide [src]',attribute:'src'},
				slideAlt:{source:'attribute',selector:'.slide [src]',attribute:'alt'},
				slideSrcset:{source:'attribute',selector:'.slide [src]',attribute:'srcset'},
				text:{source:'children',selector:'.text p'},
				linkUrl:{source:'attribute',selector:'a',attribute:'href'},
				backgroundImageSrc:{source:'attribute',selector:'.background [src]',attribute:'src'},
				backgroundImageAlt:{source:'attribute',selector:'.background [src]',attribute:'alt'},
				backgroundImageSrcset:{source:'attribute',selector:'.background [src]',attribute:'srcset'}
			},
			default:[
				{
					classes:'item',
					title:['Title'],
					subTitle:['SubTitle'],
					src:cp.theme_url+'/images/dummy.jpg',
					alt:'dummy',
					text:['Text'],
					linkUrl:'https://',
					backgroundImageSrc:cp.theme_url+'/images/dummy_bg.jpg',
					backgroundImageAlt:'dummy',
					backgroundImageSrcset:null
				}
			]
		},
		blockState:{type:'object',default:{enableBlockFormat:false}}
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {classes,controlClasses,config,items}=attributes;
		const primaryClass='wp-block-catpow-slider';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var controlClassArray=_.uniq(attributes.controlClasses.split(' '));
		var classNameArray=className.split(' ');
		
		
		const imageKeys={
			image:{src:"src",alt:"alt",items:"items"},
			slide:{src:"slideSrc",alt:"slideAlt",srscet:"slideSrcset",items:"items"},
			backgroundImage:{src:"backgroundImageSrc",alt:"backgroundImageAlt",srcset:"backgroundImageSrcset",items:"items"}
		};
		const imageSizes={
			image:'vga'
		};
		
		var states=CP.wordsToFlags(classes);
		var statesClasses=[
			{label:'アロー',values:'hasArrows'},
			{label:'ドット',values:'hasDots'},
			{input:'range',label:'表示スライド',json:'config',key:'initialSlide',min:0,max:items.length-1}
		];
		var animateClasses=[
			{label:'ループ',values:'loop',key:'controlClasses',sub:[
				{label:'アイテムを反復',key:'controlClasses',values:'loopItems'}
			]},
			{label:'自動再生',values:'autoplay',key:'controlClasses',sub:[
				{input:'range',label:'自動再生間隔（単位:0.1秒）',json:'config',key:'interval',coef:100,min:0,max:100},
				{input:'range',label:'操作停止時間（単位:0.1秒）',json:'config',key:'wait',coef:100,min:0,max:100},
				{label:'ホバーで停止',values:'stopbyhover',key:'controlClasses'}
			]}
		];
		var controllerClasses=[
			{label:'フリック操作',values:'flickable',key:'controlClasses'},
			{label:'スクロール操作',values:'scrollable',key:'controlClasses'},
			{label:'閉じる操作',values:'closable',key:'controlClasses'}
		];
		var selectiveClasses=[
			{
				label:'タイプ',values:['visual','story','articles','index'],
				filter:'type',
				sub:{
					visual:[
						{label:'見出し',values:'hasTitle',sub:[
							{label:'サブタイトル',values:'hasSubTitle'},
							{label:'テキスト',values:'hasText'},
							{label:'白文字',values:'brightText',sub:[
								{label:'色付き背景',values:'colorBG'}
							]}
						]},
						{label:'スライド画像',values:'hasSlide'},
						{label:'イメージ画像',values:'hasImage',sub:[
							{label:'サムネール',values:'hasThumbnail'}
						]},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
						 	{label:'背景画像を薄く',values:'paleBG'}
						 ]},
						{label:'リンク',values:'hasLink'}
					],
					story:[
						{label:'サブタイトル',values:'hasSubTitle'},
						{label:'白文字',values:'brightText',sub:[
							{label:'色付き背景',values:'colorBG'}
						]},
						{label:'画像',values:'hasImage',sub:[
							{label:'サムネール',values:'hasThumbnail'}
						]},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
						 	{label:'背景画像を薄く',values:'paleBG'}
						 ]},
						{label:'リンク',values:'hasLink'}
					],
					articles:[
						{label:'タイトル',values:'hasTitle'},
						{label:'テキスト',values:'hasText'},
						{label:'画像',values:'hasImage'},
						{label:'リンク',values:'hasLink'}
					],
					index:[
						{label:'サブタイトル',values:'hasSubTitle'},
						{label:'画像',values:'hasImage'},
						{label:'リンク',values:'hasLink'}
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
						{input:'image',label:'PC版背景画像',keys:imageKeys.backgroundImage},
						{input:'image',label:'SP版背景画像',keys:imageKeys.backgroundImage,ofSP:true,sizes:'480px'}
					],
					story:[
						'color',
						'pattern',
						{input:'image',label:'PC版背景画像',keys:imageKeys.backgroundImage},
						{input:'image',label:'SP版背景画像',keys:imageKeys.backgroundImage,ofSP:true,sizes:'480px'}
					]
				}
			}
		];
		
		let itemsCopy=items.map((obj)=>jQuery.extend(true,{},obj));

		
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
				<Item
					tag='li'
					className={itemClass}
					set={setAttributes}
					attr={attributes}
					items={itemsCopy}
					index={index}
				>
					{states.hasSlide &&
						<div className='slide'>
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.slide}
								index={index}
							/>
						</div>
					}
					{states.hasImage &&
						<div className='image'>
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.image}
								index={index}
							/>
						</div>
					}
					{(states.hasTitle || states.hasSubTitle || states.hasText) && 
						<div class="text">
							{states.hasTitle && 
								<h3>
									<RichText
										onChange={(text)=>{itemsCopy[index].title=text;setAttributes({items:itemsCopy});}}
										value={item.title}
									/>
								</h3>
							}
							{states.hasSubTitle &&
								<h4>
									<RichText
										onChange={(subTitle)=>{itemsCopy[index].subTitle=subTitle;setAttributes({items:itemsCopy});}}
										value={item.subTitle}
									/>
								</h4>
							}
							{states.hasText &&
								<p>
									<RichText
										onChange={(text)=>{itemsCopy[index].text=text;setAttributes({items:itemsCopy});}}
										value={item.text}
									/>
								</p>
							}
						</div>
					}
					{states.hasBackgroundImage &&
						<div className='background'>
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.backgroundImage}
								index={index}
							/>
						</div>
					}
					{states.hasLink &&
						<div className='link'>
							<TextControl onChange={(linkUrl)=>{
								itemsCopy[index].linkUrl=linkUrl;
								setAttributes({items:itemsCopy});
							}} value={item.linkUrl} placeholder='URLを入力'/>
						</div>
					}
				</Item>
			);
			if(states.hasImage && states.hasThumbnail){
				thumbs.push(
					<li class={'item '+posClass+' thumb'+imageIndex} onClick={()=>gotoItem(index)}>
						<img src={item.src} alt={item.alt}/>
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
		
		
		return [
			<BlockControls>
				<Toolbar
					controls={[
						{
							icon: 'edit',
							title: 'EditMode',
							isActive: attributes.EditMode,
							onClick: () => setAttributes({EditMode:!attributes.EditMode})
						}
					]}
				/>
			</BlockControls>,
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.slider || {}}
				/>
				<SelectClassPanel
					title='表示設定'
					icon='admin-appearance'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={statesClasses}
					filters={CP.filters.slider || {}}
				/>
				<SelectClassPanel
					title='アニメーション設定'
					icon='video-alt3'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={animateClasses}
					filters={CP.filters.slider || {}}
				/>
				<SelectClassPanel
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
						onChange={(clss)=>setAttributes({classes:clss})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
				<SelectItemClassPanel
					title='スライド'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={itemsCopy}
					index={attributes.currentItemIndex}
					triggerClasses={selectiveClasses[0]}
					filters={CP.filters.slider || {}}
				/>
				<ItemControlInfoPanel/>
			</InspectorControls>,
			<div className={attributes.EditMode?(primaryClass+' edit'):classes}>
				<ul class="contents">{rtn}</ul>
				<div className={controlClasses} data-config={config}>
					{states.hasArrows && <div class='arrow prev' onClick={prevItem}> </div>}
					{states.hasImage && states.hasThumbnail && <ul class="thumbnail">{thumbs}</ul>}
					{states.hasDots && <ul class="dots">{dots}</ul>}
					{states.hasArrows && <div class='arrow next' onClick={nextItem}> </div>}
				</div>
			</div>
		];
	},
	save({attributes,className}){
		const {classes,controlClasses,config,items}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		var controlClassArray=_.uniq(attributes.controlClasses.split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		const imageKeys={
			image:{src:"src",alt:"alt",items:"items"},
			slide:{src:"slideSrc",alt:"slideAlt",srscet:"slideSrcset",items:"items"},
			backgroundImage:{src:"backgroundImageSrc",alt:"backgroundImageAlt",srcset:"backgroundImageSrcset",items:"items"}
		};
		
		var rtn=[];
		var thumbs=[];
		items.map(function(item,index){
			rtn.push(
				<li className={item.classes}>
					{states.hasSlide &&
						<div className='slide'>
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.slide}
								index={index}
							/>
						</div>
					}
					{states.hasImage &&
						<div className='image'>
							<img src={item.src} alt={item.alt}/>
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
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.backgroundImage}
								index={index}
							/>
						</div>
					}
					{states.hasLink && <div className='link'><a href={item.linkUrl}> </a></div>}
				</li>
			);
			if(states.hasImage && states.hasThumbnail){
				thumbs.push(
					<li class={item.classes}>
						<img src={item.src} alt={item.alt}/>
					</li>
				);
			}
		});
		
		return <div className={classes}>
			<ul class="contents">{rtn}</ul>
			<div className={controlClasses} data-config={config}>
				{states.hasArrows && <div class='arrow prev'> </div>}
				{states.hasImage && states.hasThumbnail && <ul class="thumbnail">{thumbs}</ul>}
				{states.hasDots && <ul class="dots"><li class="dot"> </li></ul>}
				{states.hasArrows && <div class='arrow next'> </div>}
			</div>
		</div>;
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
				const {classes,controlClasses,config,items}=attributes;
				var classArray=_.uniq(attributes.classes.split(' '));
				var controlClassArray=_.uniq(attributes.controlClasses.split(' '));
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
		}
	]
});