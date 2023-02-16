wp.hooks.addFilter(
    'catpow.EventInputs',
    'catpow/editor',
    function(EventInputs,{item,save}){
		EventInputs.push(
			<CP.EventInputCards
				title={'Yahoo SS conversion'}
				value={item['yssEvent']}
				onChange={(yssEvent)=>{save({yssEvent});}}
				processer={window.Catpow.yss}
			/>
		);
		return EventInputs;
	}
);