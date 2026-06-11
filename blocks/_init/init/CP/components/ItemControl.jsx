import clsx from "clsx";

export const ItemControl = (props) => {
	const { id, className = "", tagName: Tag = "div", controls, children } = props;
	const float = Object.hasOwnProperty("float") ? props.float : Tag != "td";
	const { useState, useLayoutEffect } = wp.element;

	const [open, setOpen] = useState(false);

	return (
		<CP.Bem prefix="cp">
			<Tag
				id={id}
				className={clsx("itemcontrol-", className, {
					"is-open": open,
					"is-position-absolute": float,
				})}
			>
				<div className="_body">
					{Object.keys(controls).map((key) => {
						return <div className={clsx("_button", "is-" + key)} onClick={controls[key]} key={key}></div>;
					})}
					{children && (
						<>
							<div className={clsx("_button", "is-edit")} onClick={() => setOpen(!open)}></div>
							<div className="_inputs">{children}</div>
						</>
					)}
				</div>
			</Tag>
		</CP.Bem>
	);
};
