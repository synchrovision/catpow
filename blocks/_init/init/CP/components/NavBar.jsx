﻿import { bem } from "catpow/util";

export const NavBar = (props) => {
	const { value, label, onChange } = props;
	const { useMemo, useState } = wp.element;
	const classes = bem("cp-navbar");

	const { options } = useMemo(() => CP.parseSelections(props.options), [props.options]);

	return (
		<div className={classes()}>
			<ul className={classes.items()}>
				{label && <li className={classes.items.item("is-label")}>{label}</li>}
				{options.map((option) => (
					<li
						className={classes.items.item({
							"is-active": option.value === value,
						})}
						onClick={() => onChange(option.value)}
						key={option.label}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
};
