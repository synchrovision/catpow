import { CP } from "./CP.jsx";
import { clsx } from "clsx";
import { PositionInput } from "catpow/component/Input";
import { useState, useMemo } from "react";

const valueToPosition = (val) => {
	let [y, x] = val.split(" ");
	if (x === undefined || x === "center") {
		x = 50;
	} else if (x === "left") {
		x = 0;
	} else if (x === "right") {
		x = 100;
	} else {
		x = parseInt(x);
		if (isNaN(x)) {
			x = 50;
		}
	}
	if (y === undefined || y === "center") {
		y = 50;
	} else if (y === "top") {
		y = 0;
	} else if (y === "bottom") {
		y = 100;
	} else {
		y = parseInt(y);
		if (isNaN(y)) {
			y = 50;
		}
	}
	return { x, y };
};
const positionToValue = (pos) => {
	let { x, y } = pos;
	if (x === 0) x = "left";
	else if (x === 50) x = "center";
	else if (x === 100) x = "right";
	else {
		x += "%";
	}
	if (y === 0) y = "top";
	else if (y === 50) y = "center";
	else if (y === 100) y = "bottom";
	else {
		y += "%";
	}
	return `${y} ${x}`;
};

CP.PositionInput = (props) => {
	const { Button, ButtonGroup, Icon } = wp.components;
	const { onChange } = props;

	const pos = useMemo(() => valueToPosition(props.value), [props.value]);
	const [showGrid, setShowGrid] = useState(pos.x % 10 === 0 && pos.y % 10 === 0);

	return (
		<CP.Bem prefix="cp">
			<div className="positioninput-">
				<div className="_input">
					<PositionInput onChange={(pos) => onChange(positionToValue(pos))} {...pos} grid={showGrid ? 10 : 0} snap={showGrid} />
				</div>
				<div className="_controls">
					<Icon
						className={clsx("_icon", { "is-active": showGrid })}
						icon="grid-view"
						size={16}
						onClick={() => {
							setShowGrid(!showGrid);
						}}
					/>
				</div>
			</div>
		</CP.Bem>
	);
};
