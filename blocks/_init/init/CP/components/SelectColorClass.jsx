export const SelectColorClass = (props) => {
	const { BaseControl } = wp.components;
	const { label, help } = props;

	return (
		<BaseControl label={label} help={help}>
			<CP.SelectThemeColor onChange={props.onChange} selected={props.selected} />
		</BaseControl>
	);
};
