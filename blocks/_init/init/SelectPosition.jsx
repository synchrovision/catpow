import { CP } from "./CP.jsx";
import { clsx } from "clsx";

const isRegularPosition = (pos) => pos.match(/^(top|center|bottom) (left|center|right)$/);

CP.SelectPosition = (props) => {
	return (
		<CP.Bem prefix="cp">
			<table className="selectposition-">
				<tbody className="_body">
					{["top", "center", "bottom"].map((v) => (
						<tr className="_row">
							{["left", "center", "right"].map((h) => {
								const val = `${v} ${h}`;
								return <td className={clsx("_cell", { "is-active": val === props.value })} onClick={() => props.onChange(val)}></td>;
							})}
						</tr>
					))}
				</tbody>
			</table>
		</CP.Bem>
	);
};
