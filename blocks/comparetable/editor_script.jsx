const {__}=wp.i18n;
CP.config.comparetable={
	imageKeys:{
		image:{src:"src",alt:"alt",code:"imageCode",items:"rows",subItems:"cells"}
	}
};
wp.blocks.registerBlockType('catpow/comparetable',{
	transforms:{
		from: [
			{
				type:'files',
				isMatch: function(files){
					if(files[1]){return false;}
					return files[0].type==='text/csv';
				},
				priority: 10,
				transform:(files)=>{
					var attributes={
						classes:'wp-block-catpow-comparetable spec',
						rows:[{classes:'',cells:[{text:['Title'],classes:'th'}]}],
						file:files[0]
					};
					return wp.blocks.createBlock('catpow/comparetable',attributes);
				},
			},
			{
				type:'block',
				blocks:CP.tableConvertibles,
				transform:(attributes)=>{
					attributes.classes="wp-block-catpow-comparetable spec";
					return wp.blocks.createBlock('catpow/comparetable',attributes);
				}
			},
			{
				type:'block',
				blocks:['core/table'],
				transform:(attributes)=>{
					return wp.blocks.createBlock('catpow/comparetable',{
						classes:"wp-block-catpow-comparetable spec",
						rows:attributes.body.map((row)=>({
							cells:row.cells.map((cell)=>({
								text:wp.blocks.parseWithAttributeSchema(cell.content,{source:'html'})
							}))
						}))
					});
				}
			}
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo,useCallback}=wp.element;
		const {InnerBlocks,InspectorControls,RichText,useBlockProps}=wp.blockEditor;
		const {Icon,PanelBody,TextareaControl}=wp.components;
		const {rows=[],cols=[],doLoop,AltMode=false,r=0,c=0,vars,headerColClasses,firstCellClasses}=attributes;
		const {imageKeys}=CP.config.comparetable;
		const classes=Catpow.util.bem('wp-block-catpow-comparetable');
		var states=CP.classNamesToFlags(attributes.classes);
		
		if(attributes.file){
			var reader=new FileReader();
			reader.addEventListener('loadend',()=>{
				var attr={
					classes:'spec has-tags',
					rows:[],
					file:false
				};
				var csvData=CP.parseCSV(reader.result);
				csvData.map((row,r)=>{
					attr.rows.push({classes:'',cells:row.map((val)=>{return {text:[val],classes:''}})});
				});
				setAttributes(attr);
			});
			reader.readAsText(attributes.file);
		}
		
		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{name:'type',type:'buttons',label:'タイプ',values:{'is-style-spec':'spec','is-style-sheet':'sheet','is-style-plan':'plan'}},
				{name:'transposiiton',label:'転置',values:'do-transposition'},
				{name:'tags',label:'タグ',values:'has-tags'},
				{name:'headerColumn',label:__('見出し列','catpow'),values:'has-header-column',sub:[
					{name:'width',label:__('幅','catpow'),vars:'vars',key:'--cp-header-column-width',input:'range',min:20,max:400,step:5}
				]},
				{name:'columnWidth',label:__('列幅固定','catpow'),values:'has-fixed-column-width',sub:[
				 	{name:'width',label:__('幅','catpow'),vars:'vars',key:'--cp-column-width',input:'range',min:20,max:400,step:5}
				 ]},
				{name:'tableWidth',label:__('表幅','catpow'),vars:'vars',key:'--cp-table-width',input:'range',min:200,max:3200,step:10,cond:(states)=>!states['has-fixed-column-width']},
				'color',
				'isTemplate'
			];
			wp.hooks.applyFilters('catpow.blocks.comparetable.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveRowClasses=useMemo(()=>{
			const selectiveRowClasses=[
				{name:'type',type:'buttons',label:'タイプ',values:{
					'is-standard':'通常',
					'is-premium':'高品質',
					'is-recommended':'推奨',
					'is-deprecated':'非推奨',
				}}
			];
			wp.hooks.applyFilters('catpow.blocks.comparetable.selectiveRowClasses',CP.finderProxy(selectiveRowClasses));
			return selectiveRowClasses;
		},[]);
		const selectiveHeaderRowClasses=useMemo(()=>{
			const selectiveHeaderRowClasses=[
				'fontSize',
				'textAlign',
				'verticalAlign'
			];
			wp.hooks.applyFilters('catpow.blocks.comparetable.selectiveHeaderRowClasses',CP.finderProxy(selectiveHeaderRowClasses));
			return selectiveHeaderRowClasses;
		},[]);
		const selectiveColClasses=useMemo(()=>{
			const selectiveColClasses=[
				{name:'isImage',label:__('画像','catpow'),values:'is-image'},
				'fontSize',
				'textAlign',
				'verticalAlign'
			];
			wp.hooks.applyFilters('catpow.blocks.comparetable.selectiveColClasses',CP.finderProxy(selectiveColClasses));
			return selectiveColClasses;
		},[]);
		const selectiveHeaderColClasses=useMemo(()=>{
			const selectiveHeaderColClasses=[
				'fontSize',
				'textAlign',
				'verticalAlign'
			];
			wp.hooks.applyFilters('catpow.blocks.comparetable.selectiveHeaderColClasses',CP.finderProxy(selectiveHeaderColClasses));
			return selectiveHeaderColClasses;
		},[]);
		const selectiveCellClasses=useMemo(()=>{
			const selectiveCellClasses=[
				{name:'type',type:'buttons',label:'タイプ',values:{
					'is-equal':'等',
					'is-positive':'正',
					'is-negative':'負',
				}},
			];
			wp.hooks.applyFilters('catpow.blocks.comparetable.selectiveCellClasses',CP.finderProxy(selectiveCellClasses));
			return selectiveCellClasses;
		},[]);
		const selectiveHeaderColCellClasses=useMemo(()=>{
			const selectiveHeaderColCellClasses=[
				{name:'label',type:'buttons',label:'ラベル',values:'has-label'},
			];
			wp.hooks.applyFilters('catpow.blocks.comparetable.selectiveHeaderColCellClasses',CP.finderProxy(selectiveHeaderColCellClasses));
			return selectiveHeaderColCellClasses;
		},[]);
		const selectiveFirstCellClasses=useMemo(()=>{
			const selectiveFirstCellClasses=[
				{name:'type',type:'buttons',label:'タイプ',values:{
					'is-spacer':'空白',
					'is-label':'ラベル',
					'is-title':'タイトル'
				}},
			];
			wp.hooks.applyFilters('catpow.blocks.comparetable.selectiveFirstCellClasses',CP.finderProxy(selectiveFirstCellClasses));
			return selectiveFirstCellClasses;
		},[]);
		
		const getCssVarsForCell=useCallback((r,c)=>{
			return {'--cp-row-index':`${r+1}`,'--cp-column-index':`${c+1}`};
		},[]);
		
		const saveItems=()=>{
			setAttributes({rows:JSON.parse(JSON.stringify(rows))});
		}
		
		const addRow=(index)=>{
			rows.splice(index,0,rows[index]);
			saveItems();
		}
		const deleteRow=(index)=>{
			rows.splice(index,1);
			saveItems();
		}
		const upRow=(index)=>{
			rows.splice(rowIndex,0,rows.splice(index,1)[0]);
			saveItems();
		}
		const downRow=(index)=>{
			rows.splice(index-1,0,rows.splice(index,1)[0]);
			saveItems();
		}

		const addColumn=(index)=>{
			cols.splice(index,0,cols[index]);
			rows.map((row)=>row.cells.splice(index,0,row.cells[index]));
			saveItems();
		}
		const deleteColumn=(index)=>{
			cols.splice(index,1);
			rows.map((row)=>row.cells.splice(index,1));
			saveItems();
		}
		const upColumn=(index)=>{
			cols.splice(rowIndex,0,cols.splice(index,1)[0]);
			rows.map((row)=>{row.cells.splice(rowIndex,0,row.cells.splice(index,1)[0])});
			saveItems();
		}
		const downColumn=(index)=>{
			cols.splice(index-1,0,cols.splice(index,1)[0]);
			rows.map((row)=>{row.cells.splice(index-1,0,row.cells.splice(index,1)[0])});
			saveItems();
		}
		
		const blockProps=useBlockProps({className:classes(attributes.classes),style:vars});
		
		const hasHeaderRow=!states.doTransposition || states.hasHeaderColumn;
		const hasHeaderColumn=states.doTransposition || states.hasHeaderColumn;
		
		const tagCells=states.doTransposition?rows.map((row)=>row.cells[0]):rows[0].cells;
		
		return (
			<>
				<CP.SelectModeToolbar
					set={setAttributes}
					attr={attributes}
					modes={['AltMode']}
				/>
				<>
					{(AltMode && doLoop)?(
						<div className="alt_content">
							<div className="label">
								<Icon icon="welcome-comments"/>
							</div>
							<InnerBlocks/>
						</div>
					):(
						<div {...blockProps}>
							{states.hasTags && (
								<ul className={classes.tags()}>
									{tagCells.map((cell,tagIndex)=>{
										if(states.hasHeaderColumn && tagIndex===0){return false;}
										return (
											<li className={classes.tags.tag(cell.classes)} data-wp-on--click="actions.onClickTag" data-wp-class--is-active="callbacks.isTagActive" data-index={tagIndex} key={tagIndex}>
												<RichText.Content value={cell.text}/>
											</li>
										);
									})}
								</ul>
							)}
							<div className={classes.box()}>
								<div className={classes.box._body()}>
									<table className={classes.table()} style={{'--cp-row-count':`${rows.length}`,'--cp-column-count':`${rows[0].cells.length}`}}>
										<colgroup className={classes.table.colgroup()}>
											{cols.map((col,index)=><col className={classes.table.colgroup.col(col.classes)} data-col-class={col.classes} key={index}/>)}
										</colgroup>
										{hasHeaderRow && (
											<thead className={classes.table.thead()}>
												<tr className={classes.table.thead.tr(rows[0].classes)} data-row-class={rows[0].classes}>
													{rows[0].cells.map((cell,columnIndex)=>{
														const lineClass=['is-even-line','is-odd-line'][(states.doTransposition?columnIndex:0)%2];
														if(states.hasHeaderColumn && columnIndex==0){
															const cellStates=CP.classNamesToFlags(firstCellClasses);
															return (
																<td
																	className={classes.table.thead.tr.td(rows[0].classes,headerColClasses,firstCellClasses)}
																	data-cell-class={cell.classes}
																	onClick={()=>setAttributes({r:0,c:columnIndex})}
																	style={getCssVarsForCell(0,columnIndex)}
																	key={columnIndex}
																>
																	{!cellStates.isSpacer && (
																		<div data-role="contents">
																			<RichText onChange={(text)=>{cell.text=text;saveItems();}} value={cell.text}/>
																		</div>
																	)}
																</td>
															);
														}
														const cellStates=CP.classNamesToFlags(cell.classes);
														return (
															<th
																className={classes.table.thead.tr.th(rows[0].classes,cell.classes,lineClass)}
																data-cell-class={cell.classes}
																onClick={()=>setAttributes({r:0,c:columnIndex})}
																style={getCssVarsForCell(0,columnIndex)}
																key={columnIndex}
															>
																{cellStates.hasLabel && (
																	<div className={classes.table.thead.tr.th.label()} data-role="label">
																		<RichText onChange={(label)=>{cell.label=label;saveItems();}} value={cell.label}/>
																	</div>
																)}
																<div className={classes.table.thead.tr.th.contents()} data-role="contents">
																	<RichText onChange={(text)=>{cell.text=text;saveItems();}} value={cell.text}/>
																</div>

															</th>
														);
													})}
												</tr>
											</thead>
										)}
										<tbody className={classes.table.tbody()}>
											{rows.map((row,rowIndex)=>{
												if(hasHeaderRow && rowIndex===0){return false;}
												return <tr className={classes.table.tbody.tr(row.classes)} data-row-class={row.classes} key={rowIndex}>
													{row.cells.map((cell,columnIndex)=>{
														const colStates=CP.classNamesToFlags(cols[columnIndex]?.classes);
														const cellStates=CP.classNamesToFlags(cell.classes);
														const lineClass=['is-even-line','is-odd-line'][(states.doTransposition?columnIndex:rowIndex)%2];
														var controles=[];
														if(isSelected && (columnIndex == row.cells.length-1)){
															controles.push(
																<div className="itemControl rowControl" key="rowControl">
																	<div className='btn up' onClick={()=>downRow(rowIndex)}></div>
																	<div className='btn delete' onClick={()=>deleteRow(rowIndex)}></div>
																	<div className='btn clone' onClick={()=>addRow(rowIndex)}></div>
																	<div className='btn down' onClick={()=>upRow(rowIndex)}></div>
																</div>
															);
														}
														if(isSelected && (rowIndex == rows.length-1)){
															controles.push(
																<div className="itemControl columnControl" key="columnControl">
																	<div className='btn left' onClick={()=>downColumn(columnIndex)}></div>
																	<div className='btn delete' onClick={()=>deleteColumn(columnIndex)}></div>
																	<div className='btn clone' onClick={()=>addColumn(columnIndex)}></div>
																	<div className='btn right' onClick={()=>upColumn(columnIndex)}></div>
																</div>
															);
														}
														if(hasHeaderColumn && columnIndex==0){
															return (
																<th
																	className={classes.table.tbody.tr.th(row.classes,headerColClasses,cell.classes,lineClass)}
																	data-cell-class={cell.classes}
																	onClick={()=>setAttributes({r:rowIndex,c:columnIndex})}
																	style={getCssVarsForCell(rowIndex,columnIndex)}
																	key={columnIndex}
																>
																	
																	{cellStates.hasLabel && (
																		<div className={classes.table.tbody.tr.th.label()} data-role="label">
																			<RichText onChange={(label)=>{cell.label=label;saveItems();}} value={cell.label}/>
																		</div>
																	)}
																	<div className={classes.table.tbody.tr.th.contents()} data-role="contents">
																		<RichText onChange={(text)=>{cell.text=text;saveItems();}} value={cell.text}/>
																	</div>
																	{controles}
																</th>
															);
														}
														return (
															<td
																className={classes.table.tbody.tr.td(row.classes,cols[columnIndex]?.classes,cell.classes,lineClass)}
																data-cell-class={cell.classes}
																onClick={()=>setAttributes({r:rowIndex,c:columnIndex})}
																style={getCssVarsForCell(rowIndex,columnIndex)}
																key={columnIndex}
															>
																{cellStates.hasLabel && (
																	<div className={classes.table.tbody.tr.td.label()} data-role="label">
																		<RichText onChange={(label)=>{cell.label=text;saveItems();}} value={cell.label}/>
																	</div>
																)}
																{colStates.isImage?(
																	<div className={classes.table.tbody.tr.td.image()} data-role="image">
																		<CP.SelectResponsiveImage
																			className={classes.table.tbody.tr.td.image._img()}
																			attr={attributes}
																			set={setAttributes}
																			keys={imageKeys.image}
																			index={rowIndex}
																			subIndex={columnIndex}
																			size='large'
																			isTemplate={states.isTemplate}
																		/>
																	</div>				 
																):(
																	<div className={classes.table.tbody.tr.td.contents()} data-role="contents">
																			<RichText onChange={(text)=>{cell.text=text;saveItems();}} value={cell.text}/>
																	</div>
																)}
																{controles}
															</td>
														);
													})}
												</tr>
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					)}
				</>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
					{(r===0)?(
						<CP.SelectClassPanel
							title='行'
							icon='art'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={selectiveHeaderRowClasses}
							items={rows}
							itemsKey="rows"
							index={r}
						/>
					):(
						<CP.SelectClassPanel
							title='行'
							icon='art'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={selectiveRowClasses}
							items={rows}
							itemsKey="rows"
							index={r}
						/>
					)}
					{(states.hasHeaderColumn && c===0)?(
						<CP.SelectClassPanel
							title='列'
							icon='art'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={selectiveHeaderColClasses}
							classKey='headerColClasses'
						/>
					):(
						<CP.SelectClassPanel
							title='列'
							icon='art'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={selectiveColClasses}
							items={cols}
							itemsKey="cols"
							index={c}
						/>
					)}
					{(states.hasHeaderColumn && r===0 && c===0)?(
						<CP.SelectClassPanel
							title='セル'
							icon='art'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={selectiveFirstCellClasses}
							classKey='firstCellClasses'
						/>
					):(
						<CP.SelectClassPanel
							title='セル'
							icon='art'
							set={setAttributes}
							attr={attributes}
							selectiveClasses={(c===0)?selectiveHeaderColCellClasses:selectiveCellClasses}
							items={rows}
							itemsKey="rows"
							index={r}
							subItemsKey="cells"
							subIndex={c}
						/>
					)}
				</InspectorControls>
			</>
		);
	},

	save({attributes,className}){
		const {useState,useMemo,useCallback}=wp.element;
		const {InnerBlocks,RichText,useBlockProps}=wp.blockEditor;
		const {rows=[],cols=[],loopParam,doLoop,vars,headerColClasses,firstCellClasses}=attributes;
		const {imageKeys}=CP.config.comparetable;
		const classes=Catpow.util.bem('wp-block-catpow-comparetable');
		
		const getCssVarsForCell=(r,c)=>{
			return {'--cp-row-index':`${r+1}`,'--cp-column-index':`${c+1}`};
		};
		
		var states=CP.classNamesToFlags(attributes.classes);
		const blockProps=useBlockProps.save({
			className:classes(attributes.classes),
			'data-wp-interactive':"comparetable",
			'data-wp-context':JSON.stringify({current:0,isActive:true,showTags:false,hasHeaderColumn:states.hasHeaderColumn}),
			'data-wp-init':"callbacks.initBlock",
			'data-wp-class--is-showing-tags':"context.showTags",
			'data-header-col-class':headerColClasses,
			style:vars
		});
		
		const hasHeaderRow=!states.doTransposition || states.hasHeaderColumn;
		const hasHeaderColumn=states.doTransposition || states.hasHeaderColumn;
		
		const tagCells=states.doTransposition?rows.map((row)=>row.cells[0]):rows[0].cells;
		
		
		return (
			<>
				<div {...blockProps}>
					{states.hasTags && (
						<ul className={classes.tags()}>
							{tagCells.map((cell,tagIndex)=>{
								if(states.hasHeaderColumn && tagIndex===0){return false;}
								return (
									<li className={classes.tags.tag(cell.classes)} data-wp-on--click="actions.onClickTag" data-wp-class--is-active="callbacks.isTagActive" data-index={tagIndex} key={tagIndex}>
										<RichText.Content value={cell.text}/>
									</li>
								);
							})}
						</ul>
					)}
					<div className={classes.box()}>
						<div className={classes.box._body()}>
							<table className={classes.table()} style={{'--cp-row-count':`${rows.length}`,'--cp-column-count':`${rows[0].cells.length}`}}>
								<colgroup className={classes.table.colgroup()}>
									{cols.map((col,index)=><col className={classes.table.colgroup.col(col.classes)} data-col-class={col.classes} key={index}/>)}
								</colgroup>
								{hasHeaderRow && (
									<thead className={classes.table.thead()}>
										<tr className={classes.table.thead.tr(rows[0].classes)} data-row-class={rows[0].classes}>
											{rows[0].cells.map((cell,columnIndex)=>{
												const lineClass=['is-even-line','is-odd-line'][(states.doTransposition?columnIndex%2:0)];
												if(states.hasHeaderColumn && columnIndex==0){
													const cellStates=CP.classNamesToFlags(firstCellClasses);
													return (
														<td
															className={classes.table.thead.tr.td(rows[0].classes,headerColClasses,firstCellClasses)}
															data-cell-class={cell.classes}
															style={getCssVarsForCell(0,columnIndex)}
															key={columnIndex}
														>
															{!cellStates.isSpacer && (
																<div data-role="contents">
																	<RichText.Content value={cell.text}/>
																</div>
															)}
														</td>
													);
												}
												const cellStates=CP.classNamesToFlags(cell.classes);
												return (
													<th
														className={classes.table.thead.tr.th(rows[0].classes,cell.classes,lineClass)}
														data-cell-class={cell.classes}
														data-index={columnIndex}
														style={getCssVarsForCell(0,columnIndex)}
														key={columnIndex}
													>
														{cellStates.hasLabel && (
															<div className={classes.table.thead.tr.th.label()} data-role="label">
																<RichText.Content value={cell.label}/>
															</div>
														)}
														<div className={classes.table.thead.tr.th.contents()} data-role="contents">
															<RichText.Content value={cell.text}/>
														</div>
													</th>
												);
											})}
										</tr>
									</thead>
								)}
								<tbody className={classes.table.tbody()}>
									{rows.map((row,rowIndex)=>{
										if(hasHeaderRow && rowIndex===0){return false;}
										return <tr className={classes.table.tbody.tr()} data-row-class={row.classes} key={rowIndex}>
											{row.cells.map((cell,columnIndex)=>{
												const colStates=CP.classNamesToFlags(cols[columnIndex]?.classes);
												const cellStates=CP.classNamesToFlags(cell.classes);
												const lineClass=['is-even-line','is-odd-line'][(states.doTransposition?columnIndex:rowIndex)%2];
												if(hasHeaderColumn && columnIndex==0){
													return (
														<th
															className={classes.table.tbody.tr.th(row.classes,headerColClasses,cell.classes,lineClass)}
															data-cell-class={cell.classes}
															style={getCssVarsForCell(rowIndex,columnIndex)}
															key={columnIndex}
														>
															{cellStates.hasLabel && (
																<div className={classes.table.thead.tr.th.label()} data-role="label">
																	<RichText.Content value={cell.label}/>
																</div>
															)}
															<div className={classes.table.thead.tr.th.contents()} data-role="contents">
																<RichText.Content value={cell.text}/>
															</div>
														</th>
													);
												}
												return (
													<td
														className={classes.table.tbody.tr.td(row.classes,cols[columnIndex]?.classes,cell.classes,lineClass)}
														data-cell-class={cell.classes}
														style={getCssVarsForCell(rowIndex,columnIndex)}
														key={columnIndex}
													>
														{cellStates.hasLabel && (
															<div className={classes.table.tbody.tr.td.label()} data-role="label">
																<RichText.Content value={cell.label}/>
															</div>
														)}
														{colStates.isImage?(
															<div className={classes.table.tbody.tr.td.image()} data-role="image">
																<CP.ResponsiveImage
																	className={classes.table.tbody.tr.td.image._img()}
																	attr={attributes}
																	keys={imageKeys.image}
																	index={rowIndex}
																	subIndex={columnIndex}
																	isTemplate={states.isTemplate}
																/>
															</div>				 
														):(
															<div className={classes.table.tbody.tr.td.contents()} data-role="contents">
																<RichText.Content value={cell.text}/>
															</div>
														)}
													</td>
												);
											})}
										</tr>
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</>
		);
	}
});