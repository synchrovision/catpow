wp.hooks.addFilter("catpow.IconComponent", "catpow/editor", () => "EmbedIcon");
CP.EmbedIcon = {
	Input: (props) => {
		const { item, prm, save } = props;
		return (
			<Catpow.SelectPreparedImage
				name="icon"
				value={item.embedIconSrc}
				color="currentColor"
				onChange={(src) => {
					save({
						embedIconSrc: src,
					});
				}}
			/>
		);
	},
	Output: (props) => {
		const { className = "icon", item } = props;
		return (
			<svg className={className} data-src={item?.embedIconSrc} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
				<use href={item?.embedIconSrc?.replace(/\?.+$/, "") + "?c=currentColor#root"} />
			</svg>
		);
	},
};
