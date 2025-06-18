import { ObjectInput } from "./inputComponents/ObjectInput.jsx";
import { Input } from "./inputComponents/Input.jsx";
import { Bem } from "catpow/component";
import { useThrottle } from "catpow/hooks";
import clsx from "clsx";
export const DataContext = wp.element.createContext({});

export const JsonEditor = (props) => {
	const { useState, useCallback, useMemo, useEffect, useRef, useReducer } = wp.element;
	const { className = "cp-jsoneditor-editor", title = "JsonEditor", schema, debug = false, onChange, autoSave = false, showHeader = true, children: getAdditionalInputComponent } = props;

	const [hasChange, setHasChange] = useState(false);
	const json = useMemo(() => {
		if (typeof props.json === "object") {
			return props.json;
		}
		if (props.json == null) {
			return {};
		}
		const json = JSON.parse(props.json);
		if (json == null) {
			return {};
		}
		return json;
	}, []);

	const rootAgent = useMemo(() => {
		const rootAgent = Catpow.schema(schema, { debug }).createAgent(json);
		let timer,
			isHold = false;
		rootAgent.on("change", (e) => {
			setHasChange(true);
		});
		rootAgent.on("update", (e) => {
			if (autoSave) {
				if (!isHold) {
					save();
					isHold = true;
					setTimeout(
						() => {
							isHold = false;
						},
						autoSave === true ? 1000 : autoSave
					);
				} else {
					clearTimeout(timer);
					timer = setTimeout(save, autoSave === true ? 1000 : autoSave);
				}
			}
		});
		return rootAgent;
	}, []);

	const save = useCallback(() => {
		onChange(typeof props.json === "object" ? rootAgent.value : JSON.stringify(rootAgent.value));
		setHasChange(false);
	}, [rootAgent, setHasChange, onChange]);

	const data = useMemo(() => {
		return { getAdditionalInputComponent };
	}, [getAdditionalInputComponent]);

	return (
		<DataContext.Provider value={data}>
			<Bem>
				<div className={className}>
					<div className="_body">
						{showHeader && (
							<div className="_header">
								<div className="_title">{title}</div>
								<div className="_controls">
									<div className={clsx("_save", { "is-active": hasChange })} onClick={() => save()}>
										Save
									</div>
								</div>
							</div>
						)}
						<div className="_contents">
							<ObjectInput agent={rootAgent} />
						</div>
					</div>
				</div>
			</Bem>
		</DataContext.Provider>
	);
};

JsonEditor.Input = Input;
