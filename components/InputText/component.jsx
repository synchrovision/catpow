Catpow.InputText = (props) => {
	const { onChange, size = null, map = null } = props;
	const { useState, useMemo, useCallback, useEffect, useReducer } = wp.element;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem("cp-inputtext"), []);

	const [value, setValue] = useState(props.value);

	const reverseMap = useMemo(() => {
		if (!map) {
			return null;
		}
		const reverseMap = {};
		for (let key in map) {
			reverseMap[map[key]] = key;
		}
		return reverseMap;
	}, [map]);

	useEffect(() => {
		setValue((reverseMap && reverseMap[props.value]) || props.value);
	}, [setValue, props.value, reverseMap]);

	useEffect(() => {
		const timer = setTimeout(() => {
			onChange((map && map[value]) || value);
		}, 500);
		return () => clearTimeout(timer);
	}, [value, map]);

	const onBlurHandle = useCallback(
		(e) => {
			if (props.default && !value) {
				setValue(props.default);
			}
		},
		[props.default]
	);

	const [datalistId, datalist] = useMemo(() => {
		if (props.datalist == null) {
			return [null, null];
		}
		const datalistId = (performance.now() * 1000).toString(16);
		const datalist = Array.isArray(props.datalist) ? props.datalist : props.datalist.split(",");
		return [datalistId, datalist];
	}, [props.datalist]);

	return (
		<div className={classes()}>
			<input type="text" className={classes.input()} size={size} value={value} onChange={(e) => setValue(e.currentTarget.value)} onBlur={onBlurHandle} list={datalistId} />
			{datalist && (
				<datalist id={datalistId}>
					{datalist.map((val) => (
						<option value={val} key={val}></option>
					))}
				</datalist>
			)}
		</div>
	);
};
