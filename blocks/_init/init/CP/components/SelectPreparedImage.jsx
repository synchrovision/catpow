import clsx from "clsx";

export const SelectPreparedImage = ({ className = "cp-selectpreparedimage", name, value, color = 0, onChange, ...otherProps }) => {
	const { useState, useEffect, useReducer } = wp.element;
	const { setURLparams, removeURLparam } = Catpow.util;

	const [open, setOpen] = useState(false);

	const [state, dispatch] = useReducer(
		(state, action) => {
			const newState = { ...state };
			switch (action.type) {
				case "nextPage":
					newState.page--;
					break;
				case "prevPage":
					newState.page++;
					break;
				case "gotoPage":
					newState.page = action.page;
					break;
				case "update":
					if (action.images) {
						newState.images = action.images;
						const bareURL = removeURLparam(value, "c");
						newState.image = action.images.find((image) => image.url === bareURL);
					}
					if (action.image) {
						newState.image = action.image;
					}
			}
			return newState;
		},
		{ page: 0, images: null, image: null }
	);

	useEffect(() => {
		if (state.images === null) {
			if (CP.cache.has([SelectPreparedImage, name])) {
				dispatch({ type: "update", images: CP.cache.get([SelectPreparedImage, name]) });
			} else {
				wp.apiFetch({ path: "cp/v1/images/" + name }).then((images) => {
					CP.cache.set([SelectPreparedImage, name], images);
					dispatch({ type: "update", images });
				});
			}
		}
	}, [state.images]);
	useEffect(() => {
		onChange({
			...state.image,
			url: setURLparams(state.image ? state.image.url : value, {
				c: color,
				theme: wpinfo.theme,
			}),
		});
	}, [state.image]);

	if (state.images === null) {
		return false;
	}
	return (
		<CP.Bem>
			<div className={clsx(className, "is-" + name, open ? "is-open" : "is-close")} {...otherProps}>
				<img className="_img" src={value} alt="" width="40" height="40" onClick={() => setOpen(true)} />
				<Catpow.Popover open={open} onClose={() => setOpen(false)}>
					<CP.Bem>
						<ul className={className + "-items"}>
							{state.images.map((image) => {
								const url = setURLparams(image.url, { c: color, theme: wpinfo.theme });
								return (
									<li className={clsx("-item", { "is-active": value == url })} key={image.url}>
										<img src={url} alt={image.alt} onClick={() => dispatch({ type: "update", image })} />
									</li>
								);
							})}
						</ul>
					</CP.Bem>
				</Catpow.Popover>
			</div>
		</CP.Bem>
	);
};
