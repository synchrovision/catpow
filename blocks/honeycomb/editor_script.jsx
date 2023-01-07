CP.config.honeycomb={
	imageKeys:{
		image:{src:"src",items:"items"},
	}
};

wp.blocks.registerBlockType('catpow/honeycomb',{
	title: '🐾 honeycomb',
	description:'六角形のパネルをレイアウトします。',
	icon:(
		<svg viewBox="0 0 512 512">
			<path d="M282.6,176.3l71.7,41.4v82.8l-71.7,41.4L211,300.4v-82.8L282.6,176.3 M282.6,168l-78.9,45.5v91.1l78.9,45.5l78.9-45.5
				v-91.1L282.6,168L282.6,168z"/>
			<polygon points="120.9,357 120.9,448 199.7,493.6 278.6,448 278.6,357 199.7,311.5 	"/>
			<polygon points="30.9,214 30.9,305 109.7,350.6 188.6,305 188.6,214 109.7,168.5 	"/>
			<polygon points="117.9,65 117.9,156 196.7,201.6 275.6,156 275.6,65 196.7,19.5 	"/>
			<polygon points="290.4,357.9 290.4,449 369.3,494.5 448.1,449 448.1,357.9 369.3,312.4 	"/>
		</svg>
	),
	category: 'catpow',
	attributes:{
		id:{source:'attribute',selector:'.wp-block-catpow-honeycomb',attribute:'id',default:''},
		classes:{source:'attribute',selector:'.wp-block-catpow-honeycomb',attribute:'class',default:'wp-block-catpow-honeycomb hasBaseImage'},
		breakpoints:{source:'attribute',selector:'.wp-block-catpow-honeycomb','attribute':'data-breakpoints',default:'480,960'},
		grid:{source:'attribute',selector:'.wp-block-catpow-honeycomb','attribute':'data-grid',default:'4 6,6 4,8 3'},
		items:{
			source:'query',
			selector:'.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				order:{source:'attribute','attribute':'data-order'},
				src:{source:'attribute',selector:'svg image',attribute:'href'},
				title:{source:'children',selector:'.title'},
				text:{source:'children',selector:'.text'},
			},
			default:[
				{
					classes:'item hasImage hasTitle hasText',
					order:'2 2 2 1,2 2 2 1,2 2 2 1',
					src:wpinfo.theme_url+'/images/dummy.jpg',
					title:['Title'],
					text:['Text'],
				}
			]
		},
		bp:{source:'attribute',default:'0'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {BlockControls,InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl,TextControl} = wp.components;
		const {id,classes,items=[]}=attributes;
		let {breakpoints,grid}=attributes;

		if(!id){
			setAttributes({id:'hnc'+(new Date().getTime().toString(16))})
		}
		if(undefined==attributes.bp){
			setAttributes({bp:breakpoints[0]});
		}

		breakpoints=breakpoints.split(',');
		breakpoints.unshift('0');
		grid=grid.split(',').map((val)=>val.split(' '));
		let bpIndex=breakpoints.indexOf(attributes.bp);
		if(bpIndex<0){setAttributes({bp:breakpoints[0]});}
		const currentGrid=grid[bpIndex];

		var cssDatas={};

		breakpoints.map((bp,bpIndex)=>{
			cssDatas[bp]={
				['#'+id]:CP.createGridStyleCodeData(grid[bpIndex])
			};
		});

		var states=CP.wordsToFlags(classes);

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[];
			wp.hooks.applyFilters('catpow.blocks.honeycomb.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemClasses=useMemo(()=>{
			const {imageKeys}=CP.config.honeycomb;
			const selectiveItemClasses=[
				'color',
				{name:'image',label:'画像',values:'hasImage',sub:[
					{input:'image',keys:imageKeys.image}
				]},
				{name:'title',label:'タイトル',values:'hasTitle'},
				{name:'text',label:'テキスト',values:'hasText'}
			];
			wp.hooks.applyFilters('catpow.blocks.honeycomb.selectiveItemClasses',CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		},[]);


		var tgtItem=false;

		const itemHandler=[
			<div className="handler move" data-drawaction="move"><Icon icon="move"/></div>,
			<div className="handler clone" data-drawaction="clone"><Icon icon="plus-alt"/></div>,
			<div className="handler delete" data-drawaction="delete"><Icon icon="dismiss"/></div>
		];

		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		}


		return [
			<BlockControls>
				<CP.SelectBreakPointToolbar
					breakpoints={breakpoints}
					value={attributes.bp}
					onChange={(bp)=>setAttributes({bp})}
				/>
			</BlockControls>,
			<Catpow.DrawArea
				id={id}
				className={classes}
				onCatch={(e)=>{
					console.log('onCatch');
				}}
				onDraw={(e)=>{
					e.moveItem();
				}}
				onRelease={(e)=>{
					e.resetItem();
					console.log(e);
					if(e.action==='delete'){
						items.splice(e.index,1);
						save();
						return;
					}
					var order=items[e.index].order.split(',');
					if(e.action==='clone'){
						items.splice(e.index,0,JSON.parse(JSON.stringify(items[e.index])));
					}
					order[bpIndex]=
						Math.max(1,Math.min(currentGrid[0]-1,Math.ceil(e.x/e.w*currentGrid[0])))
						+' '+
						Math.max(1,Math.min(currentGrid[1],Math.ceil(e.y/e.h*currentGrid[1])))
						+' 2 1';
					items[e.index].order=order.join(',');
					save();
				}}
				style={{
					width:((attributes.bp=='0')?breakpoints[1]:attributes.bp)+'px',
					margin:'0 auto',
					border:'solid 1px #888'
				}}
			>
				{items.map((item,index)=>{
					var itemID=id+'_item_'+index;
					var itemStates=CP.wordsToFlags(item.classes);
					var itemClasses=item.classes;
					var itemSelected=attributes.currentItemIndex==index;
					var order=item.order.split(',').map((val)=>val.split(' '));
					if(itemSelected){itemClasses+=' selected';}
					breakpoints.map((bp,bpIndex)=>{
						cssDatas[bp]=cssDatas[bp] || {};
						cssDatas[bp]['#'+itemID]=CP.createGridItemStyleCodeData(order[bpIndex]);
					});
					return (
						<Catpow.Hexagon
							id={itemID}
							className={itemClasses}
							data-index={index}
							src={itemStates.hasImage?item.src:false}
							handler={itemHandler}
							onClick={()=>{setAttributes({currentItemIndex:index})}}
						>
							{itemStates.hasTitle &&
								<h3>
									<RichText
										placeholder='Title'
										onChange={(title)=>{item.title=title;save();}}
										value={item.title}
									/>
								</h3>
							}
							{itemStates.hasText &&
								<p>
									<RichText
										placeholder='Text'
										onChange={(text)=>{item.text=text;save();}}
										value={item.text}
									/>
								</p>
							}
						</Catpow.Hexagon>
					);
				})}
				<style>
					{CP.createStyleCode(cssDatas[attributes.bp])}
				</style>
			</Catpow.DrawArea>,
			<InspectorControls>
				<PanelBody title="Grid" icon="admin-links" initialOpen={false}>
					<TextControl
						label='BreakPoints'
						onChange={(breakpoints)=>{setAttributes({breakpoints});}}
						value={attributes.breakpoints}
					/>
					<TextControl
						label='Grid'
						onChange={(grid)=>{setAttributes({grid});}}
						value={attributes.grid}
					/>
				</PanelBody>
				<PanelBody title="ID" icon="admin-links" initialOpen={false}>
					<TextControl
						label='ID'
						onChange={(id)=>{setAttributes({id:id});}}
						value={id}
					/>
				</PanelBody>
				<CP.SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.buttons || {}}
				/>
				<CP.SelectClassPanel
					title='アイテム'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={attributes.currentItemIndex}
					selectiveClasses={selectiveItemClasses}
					filters={CP.filters.honeycomb || {}}
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
		];
	},
	save({attributes,className,setAttributes}){
		const {RichText}=wp.blockEditor;
		const {id,classes,items=[]}=attributes;
		let {breakpoints,grid}=attributes;

		breakpoints=breakpoints.split(',');
		breakpoints.unshift('0');
		grid=grid.split(',').map((val)=>val.split(' '));

		var cssDatas={};

		breakpoints.map((bp,bpIndex)=>{
			cssDatas[bp]={
				['#'+id]:CP.createGridStyleCodeData(grid[bpIndex])
			};
		});

		var states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.honeycomb;

		return (
			<div
				id={id}
				className={classes}
				data-breakpoints={breakpoints}
				data-grid={grid}
			>
				{items.map((item,index)=>{
					var itemID=id+'_item_'+index;
					var itemStates=CP.wordsToFlags(item.classes);
					item.order=item.order || '';
					var order=item.order.split(',').map((val)=>val.split(' '));
					breakpoints.map((bp,bpIndex)=>{
						cssDatas[bp]=cssDatas[bp] || {};
						cssDatas[bp]['#'+itemID]=CP.createGridItemStyleCodeData(order[bpIndex]);
					});
					return (
						<Catpow.Hexagon
							id={itemID}
							className={item.classes}
							src={itemStates.hasImage?item.src:false}
							data-order={item.order}
						>
							{itemStates.hasTitle &&
								<h3><RichText.Content value={item.title}/></h3>
							}
							{itemStates.hasText &&
								<p><RichText.Content value={item.text}/></p>
							}
						</Catpow.Hexagon>
					);
				})}
				<style>
					{breakpoints.map((bp)=>{
						if('0'==bp){return CP.createStyleCode(cssDatas[bp]);}
						return '@media(min-width:'+bp+'px){'+CP.createStyleCode(cssDatas[bp])+'}';
					})}
				</style>
			</div>
		);
	}
});