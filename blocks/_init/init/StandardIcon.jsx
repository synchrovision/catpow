import { CP } from "./CP.jsx";

CP.StandardIcon = {
	Input: (props) => {
		const { item, prm, save } = props;
		prm.keys = prm.keys || {};
		prm.keys.src = prm.keys.src || prm.input + "Src";
		prm.keys.alt = prm.keys.alt || prm.input + "Alt";
		return (
			<CP.SelectPreparedImage
				name={prm.input}
				value={item[prm.keys.src]}
				color={prm.color || CP.getColor({ attr: item }) || 0}
				onChange={(image) => {
					save({
						[prm.keys.src]: image.url,
						[prm.keys.alt]: image.alt,
					});
				}}
			/>
		);
	},
	Output: (props) => {
		const { className = "icon", item } = props;
		return (
			<span className={className}>
				<img src={item.iconSrc} alt={item.iconAlt} />
			</span>
		);
	},
};
