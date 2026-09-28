import { clsx } from "clsx";
const { useState, useLayoutEffect } = wp.element;
const { Icon } = wp.components;
const { __ } = wp.i18n;

export const ToggleVisible = (props) => {
	const { className = "cp-togglevisible", ...otherProps } = props;

	const [isVisible, setIsVisible] = useState(true);
	const [ref, setRef] = useState(false);

	useLayoutEffect(() => {
		if (!ref) return;
		const block = ref.closest(".wp-block");
		block.classList.toggle("is-visible", isVisible);
		const observer = new MutationObserver((entries) => {
			block.classList.toggle("is-visible", isVisible);
		});
		observer.observe(block, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, [ref, isVisible]);

	return (
		<CP.Bem>
			<div className={clsx(className, isVisible ? "is-active" : "is-inactive")} onClick={() => setIsVisible(!isVisible)} {...otherProps} ref={setRef}>
				<Icon className="_icon" icon={isVisible ? "visibility" : "hidden"} />
			</div>
		</CP.Bem>
	);
};
