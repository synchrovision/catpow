CP.YssEventInput=(props)=>{
	const {onChange}=props;
	const {useState,useReducer,useCallback,useEffect}=wp.element;
	const {Card,CardHeader,CardBody}=wp.components;
	const {parseEventString,createEventString}=window.Catpow.yss;
	const eventParams=[
		{type:'text',label:'ラベル',name:'label'},
		{type:'number',label:'値',name:'value'}
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
	return (
		<BaseControl>
			<Card>
				<CardHeader>Yahoo Listing Event</CardHeader>
				<CardBody>
					<table>
						{eventParams.map((param)=>{
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
					</table>
				</CardBody>
			</Card>
		</BaseControl>
	);
}