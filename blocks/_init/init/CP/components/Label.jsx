export const Label = (props) => {
	const { className = "cp-label", icon = "admin-generic", ...otherProps } = props;
	const { Icon } = wp.components;

	return (
		<CP.Bem>
			<div className={className} {...otherProps}>
				<Icon icon={icon} />
				<span className="_body">{props.children}</span>
			</div>
		</CP.Bem>
	);
};
