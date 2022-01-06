wp.hooks.addFilter(
    'catpow.EventInputs',
    'catpow/editor',
    function(EventInputs,{item,save}){
		EventInputs.push(
			<CP.YssEventInput 
				value={item['yssEvent']}
				onChange={(yssEvent)=>{save({yssEvent});}}
			/>
		);
		return EventInputs;
	}
);