import { chunk } from "catpow/util";
import { Bem } from "catpow/component";
import { clsx } from "clsx";

Catpow.SelectPreparedImage = (props) => {
	const { className = "cp-selectpreparedimage", name, value, color, onSelect, onChange, ...otherProps } = props;
	const { useState, useEffect, useReducer, useMemo } = wp.element;
	const { getURLparam, setURLparam, setURLparams, removeURLparam } = Catpow.util;

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
					if (action.keyword !== undefined) {
						newState.keyword = action.keyword;
					}
					if (action.images) {
						newState.images = action.images;
						const bareURL = removeURLparam(value, "c");
						newState.image = action.images.find((image) => image.url === bareURL);
					}
					if (action.keyword !== undefined || action.images) {
						if (newState.keyword === "") {
							newState.activeImages = newState.images;
						} else {
							newState.activeImages = newState.images.filter((image) => image.filename.includes(newState.keyword) || image.alt.includes(newState.keyword));
						}
					}
					if (action.image) {
						newState.image = action.image;
					}
					break;
			}
			return newState;
		},
		{ page: 0, images: null, image: null, keyword: "", activeImages: [] },
	);

	const cache = useMemo(() => {
		if (Catpow.SelectPreparedImage.cache == null) {
			Catpow.SelectPreparedImage.cache = {};
		}
		return Catpow.SelectPreparedImage.cache;
	}, []);

	useEffect(() => {
		if (state.images === null) {
			if (cache[name]) {
				dispatch({ type: "update", images: cache[name] });
			} else {
				wp.apiFetch({ path: "cp/v1/images/" + name }).then((images) => {
					cache[name] = images;
					dispatch({ type: "update", images });
				});
			}
		}
	}, [state.images]);
	useEffect(() => {
		if (state.image != null && state.image.url !== value) {
			if (onSelect) {
				onSelect(state.image);
			}
			if (onChange) {
				onChange(state.image.url);
			}
		}
	}, [state.image]);

	if (state.images === null) {
		return false;
	}

	return (
		<Bem>
			<div className={clsx(className, "is-" + name, open ? "is-open" : "is-close")} {...otherProps}>
				<img className="_img" src={value} alt="" width="40" height="40" onClick={() => setOpen(true)} />
				<Catpow.Popover open={open} onClose={() => setOpen(false)}>
					<div className={className + "__popover"}>
						<div className="_current">
							<img className="_img" src={value} alt="" />
							<div className="_filename">{value.split("/").pop()}</div>
						</div>
						<div className="_search">
							<input type="text" placeholder="Search images..." value={state.keyword} onChange={(e) => dispatch({ type: "update", keyword: e.target.value })} />
						</div>
						<div className="_pages">
							{[...chunk(state.activeImages, 100)].map((pageImages, index) => (
								<div className={clsx("_page", { "is-active": state.page === index })} key={index}>
									<ul className="items_">
										{pageImages.map((image) => {
											return (
												<li className={clsx("_item", { "is-active": value == image.url })} key={image.url}>
													<img className="_img" src={image.url} alt={image.alt} onClick={() => dispatch({ type: "update", image })} />
												</li>
											);
										})}
									</ul>
								</div>
							))}
						</div>
						<div className="_pagenation">
							{[...chunk(state.activeImages, 100)].map((_, index) => (
								<button key={index} className={clsx("_btn", { "is-active": state.page === index })} onClick={() => dispatch({ type: "gotoPage", page: index })}>
									{index + 1}
								</button>
							))}
						</div>
					</div>
				</Catpow.Popover>
			</div>
		</Bem>
	);
};
