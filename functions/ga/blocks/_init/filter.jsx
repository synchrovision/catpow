wp.hooks.addFilter(
    'catpow.EventInputs',
    'catpow/editor',
    function(EventInputs,{item,save}){
		EventInputs.push(
			<CP.GaEventInput 
				value={item['event']}
				onChange={(event)=>{save({event});}}
			/>
		);
		return EventInputs;
	}
);