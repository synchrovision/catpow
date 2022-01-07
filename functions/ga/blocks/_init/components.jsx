CP.GaEventInput=(props)=>{
	const {onChange}=props;
	const {useState,useReducer,useCallback,useEffect}=wp.element;
	const {Card,CardHeader,CardBody,Flex,FlexItem,FlexBlock,Icon}=wp.components;
	const {parseEventValue,createEventValue}=window.Catpow.ga;
	const eventParams=[
		{type:'text',label:'イベント',name:'event',isExtended:false},
		{type:'text',label:'アクション',name:'action',isExtended:false},
		{type:'text',label:'カテゴリ',name:'category',isExtended:false},
		{type:'text',label:'ラベル名',name:'label_name',isExtended:true},
		{type:'text',label:'ラベル',name:'label',isExtended:false},
		{type:'number',label:'値',name:'value',isExtended:true},
		{type:'text',label:'送信先',name:'send_to',isExtended:true}
	];
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'UPDATE':{
				state.events[action.index]={...state.events[action.index],...action.event};
				const value=createEventValue(state.events);
				onChange(value);
				return {...state,value};
			}
			case 'CLONE':{
				state.events.splice(action.index,0,{...state.events[action.index]});
				const value=createEventValue(state.events);
				onChange(value);
				return {...state,value};
			}
			case 'REMOVE':{
				state.events.splice(action.index,1);
				const value=createEventValue(state.events);
				onChange(value);
				return {...state,value};
			}
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{
		value:props.value,
		events:parseEventValue(props.value)
	});
	
	const EventInputCard=useCallback((props)=>{
		const {event,index}=props;
		const [useExtended,setUseExtended]=useState(eventParams.some((prm)=>prm.isExtended && !!event[prm.name]));
		return (
			<Card>
				<CardHeader>
					<Flex >
						<FlexBlock>Google Analitics Event</FlexBlock>
						<FlexItem>
							<Icon
								icon="insert"
								onClick={()=>{
									dispatch({type:'CLONE',index});
								}}
							/>
							{state.events.length>1 && (
								<Icon
									icon="remove"
									onClick={()=>{
										dispatch({type:'REMOVE',index});
									}}
								/>
							)}
						</FlexItem>
					</Flex>
				</CardHeader>
				<CardBody>
					<table>
						{eventParams.map((param)=>{
							if(!useExtended && param.isExtended){return false;}
							return (
								<tr>
									<th width="80">{param.label}</th>
									<td>
										<TextControl
											value={event[param.name]}
											type={param.type}
											onChange={(val)=>{
												dispatch({type:'UPDATE',event:{[param.name]:val},index});
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
		)
	},[]);
	
	
	return (
		<BaseControl>
		{state.events.map((event,index)=>(<EventInputCard event={event} index={index}/>))}
		</BaseControl>
	);
}