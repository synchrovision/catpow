registerBlockType('catpow/chart',{
	title: '🐾 Chart',
	description:'グラフを表示します。',
	icon: 'chart-bar',
	category: 'catpow',
	attributes:{
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-chart BarChart'},
		graph:{
			source:'query',
			selector:'svg',
			query:{
				title:{source:'text',selector:'g.texts text.title'},
				unit:{source:'text',selector:'g.texts text.unit'},
				rowTitle:{source:'text',selector:'g.texts text.rowTitle'},
				rowUnit:{source:'text',selector:'g.texts text.rowUnit'},
				colTitle:{source:'text',selector:'g.texts text.colTitle'},
				colUnit:{source:'text',selector:'g.texts text.colUnit'},
				total:{source:'attribute',selector:'data-total'},
				rows:{
					source:'query',
					selector:'g.graph g.row',
					query:{
						classes:{source:'attribute',attribute:'class'},
						label:{source:'attribute',attribute:'data-label'},
						vals:{
							source:'query',
							selector:'.val',
							query:{
								value:{source:'attribute',attribute:'data-value'},
							}
						}
					},
				},
				cols:{
					source:'query',
					selector:'g.graph g.col',
					query:{
						classes:{source:'attribute',attribute:'class'},
						label:{source:'attribute',attribute:'data-label'},
					}
				}
			},
			default:[{
				title:'男女比',
				unit:'%',
				rowTitle:'性別',
				rowUnit:'',
				colTitle:'日数',
				colUnit:'日',
				rows:[
					{classes:'row weak',label:'1',vals:[{value:80},{value:20}]},
					{classes:'row normal',label:'2',vals:[{value:50},{value:50}]},
					{classes:'row strong',label:'3',vals:[{value:20},{value:80}]}
				],
				cols:[
					{classes:'col color1',label:'男'},
					{classes:'col color2',label:'女'},
				]
			}]
		}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {classes,graph}=attributes;
		const primaryClass='wp-block-catpow-chart';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
		var states={
			hasTitle:false,
			hasTitleCaption:false,
			hasText:false,
			hasBackgroundImage:false
		}
		
        
		var selectiveClasses=[
			{
				label:'タイプ',
				filter:'type',
				values:{
					BarChart:'棒グラフ',
					PieChat:'円グラフ',
					LineChart:'折れ線グラフ',
					RadarChart:'レーダーチャート'
				}
			}
		];
		let type=CP.getSelectiveClass({attr:attributes},selectiveClasses[0].values);
		
		var graphCopy=jQuery.extend(true,{},graph[0]);
		
		const hasClass=(cls)=>(classArray.indexOf(cls)!==-1);
		Object.keys(states).forEach(function(key){this[key]=hasClass(key);},states);
		
		const DataTable=()=>{
			return (
			 <div className="dataTable">
				 <table>
					 <thead>
						 <tr>
							 <th colSpan={graphCopy.cols.length+1}>
								<TextControl
									onChange={(label)=>{
										graphCopy.label=label;
										setAttributes({graph:graphCopy});
									}}
									value={graphCopy.label}
									placeholder='タイトル'
								/>
							 </th>
						 </tr>
						 <tr>
							 <th></th>
							 {graphCopy.cols.map((col,c)=>{
								 return (
									 <th>
										<TextControl
											onChange={(label)=>{
												col.label=label;
												setAttributes({graph:graphCopy});
											}}
											value={col.label}
											placeholder={'項目'+(c+1)}
										/>
									 </th>
								 );
							 })}
						 </tr>
					 </thead>
					 <tbody>
					 {graphCopy.rows.map((row,r)=>{
						 return (
							<tr>
								 <th>
									<TextControl
										onChange={(label)=>{
											row.label=label;
											setAttributes({graph:graphCopy});
										}}
										value={row.label}
										placeholder={'項目'+(r+1)}
									/>
								 </th>
								 {row.vals.map((val,c)=>{
									 return (
										 <td>
											<TextControl
												onChange={(val)=>{
													val.value=val;
													setAttributes({graph:graphCopy});
												}}
												value={val.value}
												placeholder={'値'+(c+1)}
											/>
										 </td>
									 );
								 })}
							</tr>
						 );
					 })}
					 </tbody>
				 </table>
			 </div>
			);
		}
		
		
        return [
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.chart || {}}
				/>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(clss)=>setAttributes({classes:clss})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
			</InspectorControls>,
			<div className={classes}>
				{el(Catpow[type+'Output'],graphCopy)}
			</div>,
			//isSelected?DataTable():''
        ];
    },
	save({attributes,className}){
		const {classes,graph}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		
		var selectiveClasses=[
			{
				label:'タイプ',
				values:{
					BarChart:'棒グラフ',
					PieChat:'円グラフ',
					LineChart:'折れ線グラフ',
					RadarChart:'レーダーチャート'
				}
			}
		];
		let type=CP.getSelectiveClass({attr:attributes},selectiveClasses[0].values);
		
		
		var states={
			hasTitle:false,
			hasTitleCaption:false,
			hasText:false,
			hasBackgroundImage:false
		}
		
		const hasClass=(cls)=>(classArray.indexOf(cls)!==-1);
		Object.keys(states).forEach(function(key){this[key]=hasClass(key);},states);
		
		return (
			<div className={classes}>
				{el(Catpow[type+'Output'],graph[0])}
			</div>
		);
	},
});