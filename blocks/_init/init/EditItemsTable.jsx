import {CP} from './CP.jsx';

CP.EditItemsTable=(props)=>{
	const {set,attr,itemsKey='items',columns,isTemplate}=props;
	const {RichText}=wp.blockEditor;
	const items=attr[itemsKey] || [];
	const save=()=>{
		set({[itemsKey]:JSON.parse(JSON.stringify(items))});	
	};
	
	return (
		<table className="editItemsTable">
			<thead>
				<tr>
					{columns.map((col,c)=>((!('cond' in col) || col.cond)?<th key={c}>{col.label || col.key}</th>:false))}
					<th></th>
				</tr>
			</thead>
			<tbody>
				{items.map((item,index)=>{
					const propsForControl={tag:'tr',set,itemsKey,items,index};
					return (
						<tr
							onClick={(e)=>{
								set({currentItemIndex:index});
							}}
							key={index}
						>
							{columns.map((col,c)=>{
								if('cond' in col && !col.cond){return false;}
								switch(col.type){
									case 'text':
										return (
											<td key={c}>
												<RichText
													value={item[col.key]}
													onChange={(value)=>{
														item[col.key]=value;
														save();
													}}
												/>
											</td>
										);
									case 'image':
										return (
											<td key={c}>
												<CP.SelectResponsiveImage
													attr={attr}
													set={set}
													keys={{items:itemsKey,src:col.key,...col.keys}}
													index={index}
													size={col.size || 'vga'}
													isTemplate={isTemplate}
												/>
											</td>
										);
									case 'picture':
										return (
											<td key={c}>
												<CP.SelectPictureSources
													index={index}
													attr={attr}
													set={set}
													keys={{items:itemsKey,...col.keys}}
													sizes={col.sizes}
													devices={col.devices}
													isTemplate={isTemplate}
												/>
											</td>
										);
									case 'items':
										col.columns.forEach((subCol)=>{
											if(subCol.keys){subCol.keys.subItems=col.key;}
										});
										return (
											<td key={c}>
												<CP.EditItemsTable
													set={()=>{
														save();
													}}
													attr={item}
													itemsKey={col.itemsKey}
													columns={col.columns}
													isTemplate={isTemplate}
												/>
											</td>
										);
								}
							})}
							<td>
								<div className='itemControl'>
									<div className='btn delete' onClick={(e)=>CP.deleteItem(propsForControl)}></div>
									<div className='btn clone' onClick={(e)=>CP.cloneItem(propsForControl)}></div>
									<div className='btn up' onClick={(e)=>CP.upItem(propsForControl)}></div>
									<div className='btn down' onClick={(e)=>CP.downItem(propsForControl)}></div>
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};