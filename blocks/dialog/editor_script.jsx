registerBlockType('catpow/dialog',{
	title: '🐾 Dialog',
	description:'フキダシで会話を表現するブロックです。',
	icon: 'format-chat',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-dialog';
					return createBlock('catpow/dialog',attributes);
				},
			},
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items=[],classes='',countPrefix,countSuffix,subCountPrefix,subCountSuffix,loopCount,doLoop,EditMode=false,AltMode=false}=attributes;
		const primaryClass='wp-block-catpow-dialog';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		var states=CP.wordsToFlags(classes);
		
		var selectiveClasses=[
			{
				label:'テンプレート',
				values:'isTemplate',
				sub:[
					{input:'bool',label:'ループ',key:'doLoop',sub:[
						{label:'content path',input:'text',key:'content_path'},
						{label:'query',input:'textarea',key:'query'},
						{label:'プレビューループ数',input:'range',key:'loopCount',min:1,max:16}
					]}
				]
			}
		];
		const itemClasses=[
			'color',
			{type:'buttons',label:'position',values:['left','right']},
			{type:'gridbuttons',label:'type',filter:'type',values:['say','shout','think','whisper']}
		];
		
		let itemsCopy=items.map((obj)=>jQuery.extend(true,{},obj));
		
		
		let rtn=[];
		const imageKeys={
			headerImage:{src:"headerImageSrc",alt:"headerImageAlt",code:"headerImageCode",items:"items"}
		};

		itemsCopy.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<CP.Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={itemsCopy}
					index={index}
					isSelected={isSelected}
				>
					<header>
						<div className='image'>
							<CP.SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.headerImage}
								index={index}
								size='thumbnail'
								isTemplate={states.isTemplate}
							/>
						</div>
						<div className='text'>
							<h3>
								<RichText
									onChange={(text)=>{itemsCopy[index].title=text;setAttributes({items:itemsCopy});}}
									value={item.title}
								/>
							</h3>
						</div>
					</header>
					<div class="contents">
						<p>
							<RichText
								onChange={(text)=>{itemsCopy[index].text=text;setAttributes({items:itemsCopy});}}
								value={item.text}
							/>
						</p>
					</div>
				</CP.Item>
			);
		});
		
		if(rtn.length<loopCount){
			let len=rtn.length;
			while(rtn.length<loopCount){
				rtn.push(rtn[rtn.length%len]);
			}
		}
		
        return (
			<Fragment>
				<CP.SelectModeToolbar
					set={setAttributes}
					attr={attributes}
				/>
				<InspectorControls>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
						/>
					</PanelBody>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.banners || {}}
					/>
					<CP.SelectClassPanel
						title='リストアイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={itemsCopy}
						index={attributes.currentItemIndex}
						selectiveClasses={itemClasses}
						filters={CP.filters.dialog || {}}
					/>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				<Fragment>
					{EditMode?(
						<div className="alt_content">
							<div class="label">
								<Icon icon="edit"/>
							</div>
							<CP.EditItemsTable
								set={setAttributes}
								attr={attributes}
								columns={[
									{type:'image',label:'header',keys:imageKeys.headerImage,cond:true},
									{type:'text',key:'headerImageCode',cond:states.isTemplate},
									{type:'text',key:'title',cond:true},
									{type:'text',key:'text',cond:true}
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
								<ul className={classes}>{rtn}</ul>
							)}
						</Fragment>
					 )}
				</Fragment>
			</Fragment>
        );
    },
	save({attributes,className}){
		const {items=[],classes='',countPrefix,countSuffix,subCountPrefix,subCountSuffix,linkUrl,linkText,loopParam,doLoop}=attributes;
		var classArray=_.uniq(classes.split(' '));
		
		var states=CP.wordsToFlags(classes);
		const imageKeys={
			headerImage:{src:"headerImageSrc",alt:"headerImageAlt",code:"headerImageCode",items:"items"}
		};
		
		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes}>
					<header>
						<div class='image'>
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.headerImage}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
						<div className='text'>
							<h3><RichText.Content value={item.title}/></h3>
						</div>
					</header>
						<div class="contents">
						<p><RichText.Content value={item.text}/></p>
					</div>
				</li>
			);
		});
		return (
			<Fragment>
				<ul className={classes}>
					{rtn}
				</ul>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</Fragment>
		);
	},
	deprecated:[
		{
			save({attributes,className}){
				const {items=[],classes='',countPrefix,countSuffix,subCountPrefix,subCountSuffix,linkUrl,linkText,loopParam}=attributes;
				var classArray=_.uniq(classes.split(' '));

				var states=CP.wordsToFlags(classes);

				let rtn=[];
				items.map((item,index)=>{
					rtn.push(
						<li className={item.classes}>
							<header>
								<div class='image'><img src={item.headerImageSrc} alt={item.headerImageAlt}/></div>
								<div className='text'>
									<h3><RichText.Content value={item.title}/></h3>
								</div>
							</header>
								<div class="contents">
								<p><RichText.Content value={item.text}/></p>
							</div>
						</li>
					);
				});
				return (
					<ul className={classes}>
						{states.doLoop && '[loop_template '+loopParam+']'}
						{rtn}
						{states.doLoop && '[/loop_template]'}
					</ul>
				);
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