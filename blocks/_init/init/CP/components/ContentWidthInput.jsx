import {Bem} from 'catpow/component';
import { clsx } from "clsx";
import { SizingInput, WidthInput } from "catpow/component/Input";
import { useState, useMemo, useCallback } from "react";

export const ContentWidthInput = (props) => {
	const { Icon } = wp.components;
	const { onChange } = props;

	const onChangeWidth = useCallback((width) => {}, [onChange]);
	const onChangeMaxWidth = useCallback((maxWidth) => {onChange({...})}, [onChange]);

	return (
		<Bem prefix="cp">
			<div className="contentwidthinput-">
				<div className="_input">
					<SizingInput>
						<WidthInput min={min} max={max} onChange={onChangeMaxWidth} />
					</SizingInput>
				</div>
			</div>
		</Bem>
	);
};
