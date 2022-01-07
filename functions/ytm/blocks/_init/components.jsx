CP.YssEventInput=(props)=>{
	const {onChange}=props;
	const {useState,useReducer,useCallback,useEffect}=wp.element;
	const {Card,CardHeader,CardBody,Flex,FlexItem,FlexBlock,Icon}=wp.components;
	const {parseEventValue,createEventValue}=window.Catpow.yss;
	const eventParams=[
		{type:'text',label:'イベント',name:'event'},
		{type:'text',label:'ラベル',name:'label'},
		{type:'number',label:'値',name:'value'}
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
		return (
			<Card>
				<CardHeader>
					<Flex >
						<FlexBlock>Yahoo SS conversion</FlexBlock>
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
					</table>
				</CardBody>
			</Card>
		)
	},[]);
	
	return (
		<BaseControl>
		{state.events.length>0?(
			state.events.map((event,index)=>(<EventInputCard event={event} index={index}/>))
		):(
			<EventInputCard event={{}} index={0}/>
		)}
		</BaseControl>
	);
}