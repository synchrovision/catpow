import * as inputComponents from "./inputComponents/index.js";
import { JsonEditor } from "./JsonEditor.jsx";

export const getInputComponentForSchema = (schema, params) => {
	if (schema.hasOwnProperty("@editor")) {
		if (JsonEditor[schema["@editor"]]) {
			return JsonEditor[schema["@editor"]];
		}
	}
	if (schema.hasOwnProperty("options")) {
		if (Array.isArray(schema.options) || Object.keys(schema.options).every((key) => typeof schema.options[key] !== "object")) {
			const length = Array.isArray(schema.options) ? schema.options.length : Object.keys(schema.options).lenght;
			if (length < 8 && !params.compact) {
				return inputComponents.Radio;
			}
			if (length < 64) {
				return inputComponents.Select;
			}
			return inputComponents.SearchSelect;
		}
		return inputComponents.StepSelect;
	}
	if (schema.type === "null") {
		return inputComponents.None;
	}
	if (schema.const) {
		return inputComponents.ReadOnly;
	}
	if (schema.enum) {
		if (schema.enum.length < 8 && !params.compact) {
			return inputComponents.Radio;
		}
		if (schema.enum.length < 64) {
			return inputComponents.Select;
		}
		return inputComponents.SearchSelect;
	}
	if (schema.type === "boolean") {
		return inputComponents.Toggle;
	}
	if (schema.type === "string") {
		if (schema.format) {
			switch (schema.format) {
				case "date-time":
					return inputComponents.DateTime;
				case "date":
					return inputComponents.Date;
				case "time":
					return inputComponents.Time;
				case "duration":
					return inputComponents.Duration;
				default:
					return inputComponents.Text;
			}
		}
		if (schema.hasOwnProperty("pattern") || (schema.hasOwnProperty("maxLength") && schema.maxLength < 40)) {
			return inputComponents.Text;
		}
		return inputComponents.Textarea;
	}
	if (schema.type === "integer" || schema.type === "number") {
		if (schema.hasOwnProperty("minimum") && schema.hasOwnProperty("maximum")) {
			return inputComponents.Range;
		}
		return inputComponents.Number;
	}
	if (schema.type === "array") {
		if (schema.items.enum) {
			if (schema.items.enum.length < 16) {
				return inputComponents.Checkbox;
			}
			return inputComponents.SearchSelect;
		}
		return inputComponents.ArrayInput;
	}
	if (schema.type === "object") {
		return inputComponents.ObjectInput;
	}
	return inputComponents.Text;
};
