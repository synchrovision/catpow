registerBlockType('catpow/datatable',{
	title: '🐾 DataTable',
	description:'一行または１列の見出しを持つテーブルです。',
	icon: 'editor-table',
	category: 'catpow',
	
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
						classes:'wp-block-catpow-datatable spec',
						rows:[{classes:'',cells:[{text:['Title'],classes:'th'}]}],
						file:files[0]
					};
					return createBlock('catpow/datatable',attributes);
				},
			},
			{
				type:'block',
				blocks:CP.tableConvertibles,
				transform:(attributes)=>{
					attributes.classes="wp-block-catpow-datatable spec";
					return createBlock('catpow/datatable',attributes);
				}
			},
			{
				type:'block',
				blocks:['core/table'],
				transform:(attributes)=>{
					return createBlock('catpow/datatable',{
						classes:"wp-block-catpow-datatable spec",
						rows:attributes.body.map((row)=>({
							cells:row.cells.map((cell)=>({
								text:wp.blocks.parseWithAttributeSchema(cell.content,{source:'children'})
							}))
						}))
					});
				}
			}
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {classes,rows,doLoop,AltMode=false}=attributes;
		const primaryClass='wp-block-catpow-datatable';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
		var states=CP.wordsToFlags(classes);
		
		if(attributes.file){
			var reader=new FileReader();
			reader.addEventListener('loadend',()=>{
				var attr={
					classes:'wp-block-catpow-datatable spec hasHeaderRow hasHeaderColumn',
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
		
		var statesClasses=[
			{label:'ヘッダ行',values:'hasHeaderRow'},
			{label:'ヘッダ列',values:'hasHeaderColumn'},
		];
		var selectiveClasses=[
			{label:'タイプ',filter:'type',values:['spec','sheet','plan']},
			'color',
			{input:'bool',label:'ループ',key:'doLoop',sub:[
				{label:'content path',input:'text',key:'content_path'},
				{label:'query',input:'textarea',key:'query'}
			]}
		];
		
		
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
            rows.splice(index+1,0,rows.splice(index,1)[0]);
            saveItems();
        }
		const downRow=(index)=>{
            rows.splice(index-1,0,rows.splice(index,1)[0]);
            saveItems();
        }
		
		const addColumn=(index)=>{
            rows.map((row)=>row.cells.splice(index,0,row.cells[index]));
            saveItems();
        }
		const deleteColumn=(index)=>{
            rows.map((row)=>row.cells.splice(index,1));
            saveItems();
        }
		const upColumn=(index)=>{
            rows.map((row)=>{row.cells.splice(index+1,0,row.cells.splice(index,1)[0])});
            saveItems();
        }
		const downColumn=(index)=>{
            rows.map((row)=>{row.cells.splice(index-1,0,row.cells.splice(index,1)[0])});
            saveItems();
        }
		
		return (
			<Fragment>
				<SelectModeToolbar
					set={setAttributes}
					attr={attributes}
					modes={['AltMode']}
				/>
				<Fragment>
					{(AltMode && doLoop)?(
						<div className="alt_content">
							<div class="label">
								<Icon icon="welcome-comments"/>
							</div>
							<InnerBlocks/>
						</div>
					):(
						<table className={classes}>
							{states.hasHeaderRow && 
								<thead>
									<tr>
										{rows[0].cells.map((cell,index)=>{
											if(index===0){
												if(states.hasHeaderColumn && cell.text.length===0){cell.classes='spacer';}
												else if(cell.classes=='spacer'){cell.classes='';}
											}
											return (
												<th className={cell.classes}>
													<RichText onChange={(text)=>{cell.text=text;saveItems();}} value={cell.text}/>
												</th>
											);
										})}
									</tr>
								</thead>
							}
							<tbody>
								{rows.map((row,index)=>{
									if(states.hasHeaderRow && index==0){return false;}
									return <tr>
										{row.cells.map((cell,columnIndex)=>{
											var children=[<RichText onChange={(text)=>{cell.text=text;saveItems();}} value={cell.text}/>];
											if(isSelected && (columnIndex == row.cells.length-1)){
												children.push(
													<div class="itemControl rowControl">
														<div className='btn up' onClick={()=>downRow(index)}></div>
														<div className='btn delete' onClick={()=>deleteRow(index)}></div>
														<div className='btn clone' onClick={()=>addRow(index)}></div>
														<div className='btn down' onClick={()=>upRow(index)}></div>
													</div>
												);
											}
											if(isSelected && (index == rows.length-1)){
												children.push(
													<div class="itemControl columnControl">
														<div className='btn left' onClick={()=>downColumn(columnIndex)}></div>
														<div className='btn delete' onClick={()=>deleteColumn(columnIndex)}></div>
														<div className='btn clone' onClick={()=>addColumn(columnIndex)}></div>
														<div className='btn right' onClick={()=>upColumn(columnIndex)}></div>
													</div>
												);
											}
											return wp.element.createElement(
												(states.hasHeaderColumn && columnIndex==0)?'th':'td',
												{className:cell.classes},
												children
											);
										})}
									</tr>
								})}
							</tbody>
						</table>
					)}
				</Fragment>
				<InspectorControls>
					<SelectClassPanel
						title='表示設定'
						icon='admin-appearance'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={statesClasses}
						filters={CP.filters.datatable || {}}
					/>
					<SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.datatable || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
    },

	save({attributes,className}){
		const {classes='',rows,loopParam,doLoop}=attributes;
		var classArray=classes.split(' ');
		
		var states=CP.wordsToFlags(classes);
		
		return (
			<Fragment>
				<table className={classes}>
					{states.hasHeaderRow && 
						<thead>
							<tr>
								{rows[0].cells.map((cell,index)=>{
									return (
										<th className={cell.classes}><RichText.Content value={cell.text}/></th>
									);
								})}
							</tr>
						</thead>
					}
					<tbody>
						{rows.map((row,index)=>{
							if(states.hasHeaderRow && index==0){return false;}
							return <tr>
								{row.cells.map((cell,columnIndex)=>{
									return wp.element.createElement(
										(states.hasHeaderColumn && columnIndex==0)?'th':'td',
										{className:cell.classes},
										cell.text
									);
								})}
							</tr>
						})}
					</tbody>
				</table>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</Fragment>
		);
	},
	deprecated:[
		{
			save({attributes,className}){
				const {classes='',rows,loopParam}=attributes;
				var classArray=classes.split(' ');

				var states=CP.wordsToFlags(classes);

				return (
					<table className={classes}>
						{states.hasHeaderRow && 
							<thead>
								<tr>
									{rows[0].cells.map((cell,index)=>{
										return (
											<th className={cell.classes}><RichText.Content value={cell.text}/></th>
										);
									})}
								</tr>
							</thead>
						}
						<tbody>
							{states.doLoop && '[loop_template '+(loopParam || '')+']'}
							{rows.map((row,index)=>{
								if(states.hasHeaderRow && index==0){return false;}
								return <tr>
									{row.cells.map((cell,columnIndex)=>{
										return wp.element.createElement(
											(states.hasHeaderColumn && columnIndex==0)?'th':'td',
											{className:cell.classes},
											cell.text
										);
									})}
								</tr>
							})}
							{states.doLoop && '[/loop_template]'}
						</tbody>
					</table>
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