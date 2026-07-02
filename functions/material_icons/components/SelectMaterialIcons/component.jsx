import { chunk } from "catpow/util";
import { Bem } from "catpow/component";
import { clsx } from "clsx";

import MatrialIconNames from "./materiaIconNames.json";

Catpow.SelectMaterialIcons = (props) => {
	const { className = "cp-selectmaterialicons", value, color, onSelect, onChange, ...otherProps } = props;
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
					if (action.iconName !== undefined) {
						newState.iconName = action.iconName;
					}
					if (action.keyword !== undefined) {
						newState.keyword = action.keyword;
						if (newState.keyword === "") {
							newState.activeIconNames = MatrialIconNames;
						} else {
							newState.activeIconNames = MatrialIconNames.filter((iconName) => iconName.includes(newState.keyword));
						}
					}
					break;
			}
			return newState;
		},
		{ page: 0, keyword: "", iconName: value, activeIconNames: MatrialIconNames },
	);

	const cache = useMemo(() => {
		if (Catpow.SelectMaterialIcons.cache == null) {
			Catpow.SelectMaterialIcons.cache = {};
		}
		return Catpow.SelectMaterialIcons.cache;
	}, []);

	useEffect(() => {
		if (state.iconName != null && state.iconName !== value) {
			if (onSelect) {
				onSelect(state.iconName);
			}
			if (onChange) {
				onChange(state.iconName);
			}
		}
	}, [state.iconName]);

	return (
		<Bem>
			<div className={clsx(className, open ? "is-open" : "is-close")} {...otherProps}>
				<span className="_icon" style={{ fontFamily: "Material Icons" }} onClick={() => setOpen(true)}>
					{value}
				</span>
				<Catpow.Popover open={open} onClose={() => setOpen(false)}>
					<div className={className + "__popover"}>
						<div className="_current">
							<span className="_icon" style={{ fontFamily: "Material Icons" }}>
								{value}
							</span>
							<div className="_iconname">{value}</div>
						</div>
						<div className="_search">
							<input type="text" placeholder="Search images..." value={state.keyword} onChange={(e) => dispatch({ type: "update", keyword: e.target.value })} />
						</div>
						<div className="_pages">
							{[...chunk(state.activeIconNames, 100)].map((pageIconNames, index) => (
								<div className={clsx("_page", { "is-active": state.page === index })} key={index}>
									<ul className="items_">
										{pageIconNames.map((iconName) => {
											return (
												<li className={clsx("_item", { "is-active": value == iconName })} key={iconName}>
													<span className="_icon" style={{ fontFamily: "Material Icons" }} onClick={() => dispatch({ type: "update", iconName })}>
														{iconName}
													</span>
												</li>
											);
										})}
									</ul>
								</div>
							))}
						</div>
						<div className="_pagenation">
							{[...chunk(state.activeIconNames, 100)].map((_, index) => (
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
