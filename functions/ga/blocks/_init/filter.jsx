wp.hooks.addFilter("catpow.EventInputs", "catpow/editor", function (EventInputs, { item, save }) {
	EventInputs.push(
		<CP.EventInputCards
			title={"Google Analitics Event"}
			value={item["event"]}
			onChange={(event) => {
				save({ event });
			}}
			processer={window.Catpow.ga}
		/>
	);
	return EventInputs;
});
