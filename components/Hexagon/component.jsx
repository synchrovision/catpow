Catpow.Hexagon = function (props) {
	let { children, id, src, imageBounds, handler, ...otherProps } = props;

	let hexagon;
	if (src) {
		imageBounds = imageBounds || [-30, 0, 160, 120];
		hexagon = (
			<svg className="cp-hexagon" viewBox="0 0 100 120">
				<clipPath id={id + "_clip"}>
					<polygon points="0,30 0,90 50,120 100,90 100,30 50,0" />
				</clipPath>
				<g clip-path={"url(#" + id + "_clip)"}>
					<image x={imageBounds[0]} y={imageBounds[1]} width={imageBounds[2]} height={imageBounds[3]} href={src}></image>
				</g>
			</svg>
		);
	} else {
		hexagon = (
			<svg className="cp-hexagon" viewBox="0 0 100 120">
				<polygon points="0,30 0,90 50,120 100,90 100,30 50,0" />
			</svg>
		);
	}
	return (
		<div id={id} {...otherProps}>
			{hexagon}
			{children && <div className="contents">{children}</div>}
			{handler && <div className="handlers">{handler}</div>}
		</div>
	);
};
