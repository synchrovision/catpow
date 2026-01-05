Catpow.Parallax = (props) => {
	const { useEffect, useRef } = wp.element;
	const { className = "cp-parallax" } = props;

	const ref = useRef({});
	const bg = useRef({});

	useEffect(() => {
		var requestID;
		const update = () => {
			requestID = window.requestAnimationFrame(update);
			const winh = window.innerHeight;
			const bnd = ref.current.getBoundingClientRect();
			var tgth = bnd.height;
			if (bnd.top > winh || bnd.top + tgth < 0) {
				return;
			}
			var p1 = bnd.top / (winh - tgth);
			var p2 = (bnd.top + tgth) / (winh + tgth);
			var chlh = bg.current.getBoundingClientRect().height;
			if ((tgth > chlh) ^ (chlh > winh)) {
				bg.current.style.transform = "translate3d(0," + (tgth - (tgth + chlh) * p2) + "px,0)";
			} else {
				bg.current.style.transform = "translate3d(0," + (tgth - chlh) * p1 + "px,0)";
			}
		};
		update();
		return () => {
			window.cancelAnimationFrame(requestID);
		};
	}, [props]);

	return (
		<div className="cp-parallax" ref={ref}>
			<div className="cp-parallax__contents" ref={bg}>
				{props.children}
			</div>
		</div>
	);
};
