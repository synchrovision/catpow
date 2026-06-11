Catpow.Popover = function (props) {
	const { className = "cp-popover", children, open = false, onClose, size = "middle", closeButton = false, closeOnClickAway = true } = props;
	const { Fragment, useEffect, useLayoutEffect, useState, useRef } = wp.element;

	const [isOpen, setIsOpen] = useState(!!open);
	const [popoverRef, setPopoverRef] = useState();

	useEffect(() => {
		setIsOpen(!!open);
	}, [open]);
	useLayoutEffect(() => {
		if (popoverRef?.togglePopover) {
			popoverRef.togglePopover(isOpen);
		}
	}, [isOpen]);

	console.log("Popover");
	return (
		<Catpow.Bem>
			<div className={`${className} is-size-${size} is-${isOpen ? "open" : "close"}`}>
				<div
					className="_anchor"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				></div>
				<div className="_body" inert={!isOpen} inert={!isOpen} popover={closeOnClickAway ? "auto" : "manual"} ref={setPopoverRef}>
					<div className="_arrow"></div>
					<div className="_contents">{children}</div>
					{closeButton && (
						<div className="_control">
							<div className="_button is-button-close" onClick={() => setIsOpen(false)}></div>
						</div>
					)}
				</div>
			</div>
		</Catpow.Bem>
	);
};
