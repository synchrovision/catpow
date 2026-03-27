import { useState, useEffect } from "react";
import { clsx } from "clsx";

export const Collapsible = (props) => {
	const { className = "cp-collapsible", icon = "admin-generic", title = "", children, ...otherProps } = props;

	const [isOpen, setIsOpen] = useState(false);

	return (
		<CP.Bem>
			<div className={clsx(className, isOpen ? "is-open" : "is-close")} {...otherProps}>
				<div className="_label" onClick={() => setIsOpen(!isOpen)}>
					{title}
				</div>
				<div className="_body">{children}</div>
			</div>
		</CP.Bem>
	);
};
