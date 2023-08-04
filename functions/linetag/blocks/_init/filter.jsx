wp.hooks.addFilter(
    'catpow.EventInputs',
    'catpow/editor',
    function(EventInputs,{item,save}){
		EventInputs.push(
			<CP.EventInputCards
				title={'LINE Tag Event'}
				value={item['linetagEvent']}
				onChange={(linetagEvent)=>{save({linetagEvent});}}
				processer={window.Catpow.linetag}
			/>
		);
		return EventInputs;
	}
);