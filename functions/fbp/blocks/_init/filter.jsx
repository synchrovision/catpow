wp.hooks.addFilter(
    'catpow.EventInputs',
    'catpow/editor',
    function(EventInputs,{item,save}){
		EventInputs.push(
			<CP.EventInputCards
				title={'FacebookPixel Event'}
				value={item['fbpEvent']}
				onChange={(fbpEvent)=>{save({fbpEvent});}}
				processer={window.Catpow.fbp}
			/>
		);
		return EventInputs;
	}
);