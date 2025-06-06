export const EventInputCards = (props) => {
	const { title, onChange } = props;
	const { useState, useReducer, useCallback, useEffect, useMemo } = wp.element;
	const { BaseControl, Card, CardHeader, CardBody, CardFooter, Flex, FlexItem, FlexBlock, Icon, TextControl } = wp.components;
	const { processerId, eventTypes, parseEventValue, createEventValue, createEventString, eventParams } = props.processer;

	const reducer = useCallback((state, action) => {
		switch (action.type) {
			case "UPDATE_ALL": {
				return { events: action.events };
			}
			case "UPDATE": {
				state.events[action.index] = {
					...state.events[action.index],
					...action.event,
				};
				return { ...state };
			}
			case "CLONE": {
				state.events.splice(action.index, 0, { ...state.events[action.index] });
				return { ...state };
			}
			case "REMOVE": {
				state.events.splice(action.index, 1);
				return { ...state };
			}
		}
		return state;
	}, []);
	const [state, dispatch] = useReducer(reducer, { events: [] });
	const eventParamsWithoutLabel = useMemo(() => {
		const eventParamsWithoutLabel = {};
		Object.keys(eventParams).forEach((name) => {
			const { label, ...otherParams } = eventParams[name];
			eventParamsWithoutLabel[name] = otherParams;
		});
		return eventParamsWithoutLabel;
	}, [eventParams]);
	const eventTypeList = useMemo(() => {
		if (!eventTypes) {
			return [];
		}
		return Object.keys(eventTypes).filter((eventType) => eventType !== "_custom");
	}, [eventTypes]);
	useEffect(() => {
		const timer = setTimeout(() => {
			onChange(createEventValue(state.events));
		}, 500);
		return () => clearTimeout(timer);
	}, [state]);
	useEffect(() => {
		const events = parseEventValue(props.value);
		if (events) {
			if (state.events.length < 1) {
				dispatch({ type: "UPDATE_ALL", events });
			}
		}
	}, [props.value]);

	const EventInputCard = useCallback((props) => {
		const { event, index, canRemove } = props;
		const [editMode, setEditMode] = useState(false);
		const activeEventParamNames = useMemo(() => {
			if (eventTypes && event.eventType) {
				const eventType = eventTypes[event.eventType] || eventTypes["_custom"];
				if (eventType) {
					return Object.keys(eventParams).filter((paramName) => {
						return eventParams[paramName].common || eventType.options.indexOf(paramName) >= 0;
					});
				}
			}
			return Object.keys(eventParams).filter((paramName) => !eventParams[paramName].limited);
		}, [eventTypes, eventParams, event.eventType]);
		return (
			<Card className="cp-eventinputcard">
				<CardHeader className="cp-eventinputcard__header">
					<Flex>
						<FlexBlock>{title}</FlexBlock>
						<FlexItem>
							{canRemove && (
								<Icon
									icon="remove"
									onClick={() => {
										dispatch({ type: "REMOVE", index });
									}}
								/>
							)}
							<Icon
								icon="insert"
								onClick={() => {
									dispatch({ type: "CLONE", index });
								}}
							/>
							<Icon icon="edit" onClick={() => setEditMode(!editMode)} />
						</FlexItem>
					</Flex>
				</CardHeader>
				{editMode && (
					<CardBody className="cp-eventinputcard__body">
						{eventTypes && (
							<div className="cp-eventinputcard__item">
								<div className="cp-eventinputcard__item__inputs">
									<TextControl
										value={event.eventType || ""}
										onChange={(val) => {
											dispatch({
												type: "UPDATE",
												event: { eventType: val },
												index,
											});
										}}
										list={CP.getDataListId(processerId + "EventTypes", eventTypeList)}
									/>
								</div>
							</div>
						)}
						<div className="cp-eventinputcard__item">
							<div className="cp-eventinputcard__item__pref">@</div>
							<div className="cp-eventinputcard__item__inputs">
								<TextControl
									value={event.event || ""}
									onChange={(val) => {
										dispatch({ type: "UPDATE", event: { event: val }, index });
									}}
									list={CP.getDataListId(props.eventList || "mouseEvent")}
								/>
							</div>
						</div>
						{activeEventParamNames.map((paramName) => {
							const param = eventParams[paramName];
							return (
								<div className={"cp-eventinputcard__item is-type-" + (param.type || "text")} key={paramName}>
									<div className="cp-eventinputcard__item__title">{param.label}</div>
									<div className="cp-eventinputcard__item__inputs">
										<CP.DynamicInput
											param={eventParamsWithoutLabel[paramName]}
											value={event[paramName] || ""}
											onChange={(val) => {
												dispatch({
													type: "UPDATE",
													event: { [paramName]: val },
													index,
												});
											}}
										/>
									</div>
								</div>
							);
						})}
					</CardBody>
				)}
				<CardFooter className="cp-eventinputcard__footer" size="xSmall" justify="center">
					{createEventString(event)}
				</CardFooter>
			</Card>
		);
	}, []);
	return (
		<BaseControl>
			{state.events.length > 0 ? (
				state.events.map((event, index) => <EventInputCard event={event} index={index} canRemove={state.events.length > 1} key={index} />)
			) : (
				<EventInputCard event={{}} index={0} />
			)}
		</BaseControl>
	);
};
