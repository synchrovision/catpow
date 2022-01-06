CP.GaEventInput=(props)=>{
	const {onChange}=props;
	const {useState,useReducer,useCallback,useEffect}=wp.element;
	const {Card,CardHeader,CardBody}=wp.components;
	const {parseEventString,createEventString}=window.Catpow.ga;
	const eventParams=[
		{type:'text',label:'イベント',name:'event',isExtended:true},
		{type:'text',label:'アクション',name:'action',isExtended:false},
		{type:'text',label:'カテゴリ',name:'category',isExtended:false},
		{type:'text',label:'ラベル名',name:'label_name',isExtended:true},
		{type:'text',label:'ラベル',name:'label',isExtended:false},
		{type:'number',label:'値',name:'value',isExtended:true}
	];
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'UPDATE':{
				const event={...state.event,...action.event};
				const value=createEventString(event);
				onChange(value);
				return {...state,event,value};
			}
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{
		value:props.value,
		event:parseEventString(props.value)
	});
	const [useExtended,setUseExtended]=useState(!!(state.event.label_name || state.event.value));
	return (
		<BaseControl>
			<Card>
				<CardHeader>Google Analitics Event</CardHeader>
				<CardBody>
					<table>
						{eventParams.map((param)=>{
							if(!useExtended && param.isExtended){return false;}
							return (
								<tr>
									<th width="80">{param.label}</th>
									<td>
										<TextControl
											value={state.event[param.name]}
											type={param.type}
											onChange={(val)=>{
												dispatch({type:'UPDATE',event:{[param.name]:val}});
											}}
										/>
									</td>
								</tr>
							);
						})}
						<tr>
							<th></th>
							<td>
								<CheckboxControl
									label="拡張設定"
									onChange={(flag)=>{setUseExtended(flag)}}
									checked={useExtended}
								/>
							</td>
						</tr>
					</table>
				</CardBody>
			</Card>
		</BaseControl>
	);
}