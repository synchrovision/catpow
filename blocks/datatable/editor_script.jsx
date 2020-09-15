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
	attributes:{
		classes:{source:'attribute',selector:'table',attribute:'class',default:'wp-block-catpow-datatable spec hasHeaderRow hasHeaderColumn'},
		
		rows:{
			source:'query',
			selector:'table tr',
			query:{
				classes:{source:'attribute',attribute:'class'},
				cells:{
					source:'query',
					selector:'th,td',
					query:{
						text:{source:'children'},
						classes:{source:'attribute',attribute:'class'},
						style:{source:'attribute',attribute:'style'}
					}
				}
			},
			default:[
				{classes:'',cells:[
					{text:[''],classes:'spacer'},
					{text:['Title'],classes:''},
					{text:['Title'],classes:''}
				]},
				{classes:'',cells:[
					{text:['Title'],classes:''},
					{text:['Content'],classes:''},
					{text:['Content'],classes:''}
				]},
				{classes:'',cells:[
					{text:['Title'],classes:''},
					{text:['Content'],classes:''},
					{text:['Content'],classes:''}
				]}
			]
		},
		file:{type:'object'},
		blockState:{type:'object',default:{enableBlockFormat:true}},
		loopParam:{type:'text',default:''}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {classes,rows}=attributes;
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
			{label:'ループ',values:'doLoop',sub:[
				{label:'パラメータ',input:'text',key:'loopParam'}
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
		
		
		
		return [
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
			</table>,
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
		];
    },

	save({attributes,className}){
		const {classes,rows,loopParam}=attributes;
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
					{states.doLoop && '[template_loop '+(loopParam || '')+']'}
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
					{states.doLoop && '[/template_loop]'}
                </tbody>
			</table>
		);
	}
});