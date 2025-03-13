import { CP } from "./CP.jsx";

CP.DynamicInput = (props) => {
	const { useMemo } = wp.element;
	const { RadioControl, RangeControl, SelectControl, TextControl, TextareaControl, ToggleControl } = wp.components;

	const { param, value, onChange } = props;
	const type = param.type || param.input || "text";
	const { options } = useMemo(() => {
		if (!param.options && !param.values) {
			return {};
		}
		return CP.parseSelections(param.options || param.values);
	}, [param.options, param.values]);

	switch (type) {
		case "radio": {
			return <RadioControl label={param.label || null} onChange={onChange} selected={value} options={options} />;
		}
		case "select": {
			return <SelectControl label={param.label || null} onChange={onChange} value={value} options={options} />;
		}
		case "buttons": {
			return <CP.SelectButtons label={param.label || null} onChange={onChange} selected={value} options={options} />;
		}
		case "gridbuttons": {
			return <CP.SelectGridButtons label={param.label || null} onChange={onChange} selected={value} options={options} />;
		}
		case "range": {
			if (!param.coef) {
				param.coef = 1;
			}
			return (
				<RangeControl label={param.label || null} onChange={(value) => onChange(value * param.coef)} value={value / param.coef} min={param.min || 0} max={param.max || 10} step={param.step || 1} />
			);
		}
		case "bool": {
			return <ToggleControl label={param.label || null} checked={value} onChange={onChange} />;
		}
		case "data": {
			return <CP.DataInputTable label={param.label || null} cols={param.cols} value={value} onChange={onChange} />;
		}
		case "textarea": {
			return <TextareaControl label={param.label || null} value={value} onChange={onChange} />;
		}
		default: {
			return <TextControl label={param.label || null} type={param.type} value={value} onChange={onChange} list={param.list && CP.getDataListId(param.list, param.values)} />;
		}
	}
};
