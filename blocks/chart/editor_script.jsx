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
				title:{source:'text',selector:'g.ChartText text.title'},
				unit:{source:'text',selector:'g.ChartText text.unit'},
				rowTitle:{source:'text',selector:'g.ChartText text.rowTitle'},
				rowUnit:{source:'text',selector:'g.ChartText text.rowUnit'},
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
				title:'ステータス',
				unit:'pt',
				rowTitle:'日数',
				rowUnit:'日',
				rows:[
					{classes:'row weak',label:'1',vals:[{value:30},{value:40},{value:40},{value:40},{value:40}]},
					{classes:'row normal',label:'2',vals:[{value:40},{value:60},{value:30},{value:20},{value:50}]},
					{classes:'row strong',label:'3',vals:[{value:50},{value:80},{value:20},{value:30},{value:60}]}
				],
				cols:[
					{classes:'col color1',label:'VIT'},
					{classes:'col color2',label:'STR'},
					{classes:'col color3',label:'AGR'},
					{classes:'col color4',label:'INT'},
					{classes:'col color5',label:'MND'},
				]
			}]
		}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {classes,graph,EditMode=false}=attributes;
		const primaryClass='wp-block-catpow-chart';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
        
		var selectiveClasses=[
			{
				label:'タイプ',
				filter:'type',
				values:{
					BarChart:'棒グラフ',
					PieChart:'円グラフ',
					LineChart:'折れ線グラフ',
					RadarChart:'レーダーチャート'
				}
			},
			{label:'値を表示',values:'hasValue',sub:[
				{label:'単位を表示',values:'hasUnit'}
			]},
			{label:'枠線を表示',values:'hasFrame'},
			{label:'罫線を表示',values:'hasGrid'}
		];
		let type=CP.getSelectiveClass({attr:attributes},selectiveClasses[0].values);
		
		const states=CP.wordsToFlags(classes);
		const save=()=>{setAttributes({graph:JSON.parse(JSON.stringify(graph))});};
		
		const DataTable=()=>{
			return (
			 <div className="dataTable">
				 <table>
					 <thead>
						 <tr>
							 <th colSpan={graph[0].cols.length+1}>
								<TextControl
									onChange={(label)=>{
										graph[0].label=label;
										save();
									}}
									value={graph[0].label}
									placeholder='タイトル'
								/>
							 </th>
						 </tr>
						 <tr>
							 <th></th>
							 {graph[0].cols.map((col,c)=>{
								 return (
									 <th>
										<TextControl
											onChange={(label)=>{
												col.label=label;
												save();
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
					 {graph[0].rows.map((row,r)=>{
						 return (
							<tr>
								 <th>
									<TextControl
										onChange={(label)=>{
											row.label=label
											save();
										}}
										value={row.label}
										placeholder={'項目'+(r+1)}
									/>
								 </th>
								 {row.vals.map((val,c)=>{
									 return (
										 <td>
											<TextControl
												onChange={(value)=>{
													val.value=value;
													save();
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
		
        return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={[
							{
								icon: 'edit',
								title: 'EditMode',
								isActive: EditMode,
								onClick: () => setAttributes({EditMode:!EditMode})
							}
						]}
					/>
				</BlockControls>
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
				</InspectorControls>
				{EditMode?(
					DataTable()
				):(
					<div className={classes}>
						{el(Catpow[type+'Output'],{...states,...graph[0]})}
					</div>
				)}
			</Fragment>
        );
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
		const states=CP.wordsToFlags(classes);
		
		
		return (
			<div className={classes}>
				{el(Catpow[type+'Output'],{...states,...graph[0]})}
			</div>
		);
	},
});