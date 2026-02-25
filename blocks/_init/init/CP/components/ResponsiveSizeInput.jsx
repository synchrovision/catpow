import { RangeInput } from "catpow/component";
import { useState, useMemo } from "react";
import { useThrottle } from "catpow/hooks";

const valueToSizes = (val) => {
	const [, vw, rem] = (val && val.match(/^min\((\d+)vw,([\d\.]+)rem,100%\)$/)) || [, 0, 0];
	return { vw, rem };
};
const sizesToValue = (size) => {
	let { vw, rem } = size;
	return `min(${vw}vw,${rem}rem,100%)`;
};

export const ResponsiveSizeInput = (props) => {
	const { value, steps = { 10: 0, 100: 2 }, order = ["rem", "vw"], snap = true, onChange } = props;

	const [sizes, setSizes] = useState(valueToSizes(value));
	useThrottle(
		() => {
			onChange(sizesToValue(sizes));
		},
		100,
		[sizes],
	);

	return (
		<CP.Bem prefix="cp">
			<div className="responsivesizeinput-">
				<RangeInput values={sizes} steps={steps} order={order} snap={snap} onChange={(size) => setSizes(size)} />
				<div className="_previews" style={{ "--rem": sizes.rem, "--vw": sizes.vw }}>
					<div className="-preview is-preview-pc is-preview-rem">
						<div className="_label">
							<output className="_value">{sizes.rem}rem</output>
						</div>
					</div>
					{sizes.rem * 4 < sizes.vw ? (
						<div className="-preview is-preview-sp is-preview-rem">
							<div className="_label">
								<output className="_value">{sizes.rem}rem</output>
							</div>
						</div>
					) : (
						<div className="-preview is-preview-sp is-preview-vw">
							<div className="_label">
								<output className="_value">{sizes.vw}vw</output>
							</div>
						</div>
					)}
				</div>
			</div>
		</CP.Bem>
	);
};
