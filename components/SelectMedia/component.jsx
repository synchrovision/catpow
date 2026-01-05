Catpow.SelectMedia = (props) => {
	const { useCallback, useMemo } = wp.element;
	const { className = "cp-selectmedia", mime, src, onChange, ...otherProps } = props;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const onClick = useCallback(() => {
		if (undefined === Catpow.uploader) {
			Catpow.uploader = wp.media({
				title: "Select Image",
				button: { text: "Select" },
				multiple: false,
			});
		}
		Catpow.uploader
			.off("select")
			.on("select", () => {
				onChange(Catpow.uploader.state().get("selection").first().toJSON());
			})
			.open();
	}, [onChange]);

	const dummy = useMemo(() => {
		return props.dummy || wpinfo.theme_url + "/images/dummy.jpg";
	}, [props.dummy]);
	const type = useMemo(() => (!mime ? "image" : mime.split("/")[0]), [mime]);

	if (type === "audio") {
		return <audio className={classes("is-type-audio")} src={src} onClick={onClick} {...otherProps}></audio>;
	}
	if (type === "video") {
		return <video className={classes("is-type-video")} src={src} onClick={onClick} autoplay={1} loop={1} playsinline={1} muted={1} {...otherProps}></video>;
	}
	return <img className={classes("is-type-image")} src={src || dummy} onClick={onClick} {...otherProps} />;
};
