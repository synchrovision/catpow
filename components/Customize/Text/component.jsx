Catpow.Customize.Text = (props) => {
	const { useState, useCallback, useMemo, useEffect, useRef, useReducer } = wp.element;
	const { value, onChange, param } = props;

	return (
		<input
			type={param.type || "text"}
			value={value}
			onChange={(e) => {
				onChange(e.currentTarget.value);
			}}
		/>
	);
};
