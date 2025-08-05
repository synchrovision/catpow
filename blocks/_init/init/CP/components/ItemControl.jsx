import clsx from "clsx";

export const ItemControl = (props) => {
	const { className = "", tag: Tag = "div", controls, children } = props;
	const float = Object.hasOwnProperty("float") ? props.float : Tag != "td";
	const { useState } = wp.element;

	const [open, setOpen] = useState(false);

	return (
		<CP.Bem prefix="cp">
			<Tag
				className={clsx("itemcontrol-", className, {
					"is-open": open,
					"is-position-absolute": float,
				})}
			>
				{Object.keys(controls).map((key) => {
					return <div className={clsx("-button", "is-" + key)} onClick={controls[key]} key={key}></div>;
				})}
				{children && (
					<>
						<div className={clsx("-button", "is-edit")} onClick={() => setOpen(!open)}></div>
						<div className="-inputs">{children}</div>
					</>
				)}
			</Tag>
		</CP.Bem>
	);
};
