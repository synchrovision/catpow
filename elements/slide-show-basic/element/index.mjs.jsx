import { el, svgEl, hfloor, hceil, hunit, applyBem } from "catpow/util";
import cssCode from "css:./style.css";

class SlideShowBasic extends HTMLElement {
	static observedAttributes = ["duration", "interval", "zoom", "slide"];
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	connectedCallback() {
		this.pictures = [...this.querySelectorAll("picture")];
		this.render();
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (this.pictures) {
			this.render();
		}
	}
	render() {
		const params = { duration: 20, interval: 20, zoom: 0, slide: false };
		for (const key of Object.keys(params)) {
			if (this.hasAttribute(key)) {
				if (key === "slide") {
					params[key] = !["no", "false", "0", "-1"].includes(this.getAttribute(key));
				} else {
					params[key] = parseInt(this.getAttribute(key));
				}
			}
		}
		const { duration, interval, zoom, slide } = params;
		const pictures = this.pictures;
		const delay = duration * 0.5 + duration * 0.5 * interval * 0.01;
		const fadeDuration = duration * 0.5 - duration * 0.5 * interval * 0.01;
		const totalDuration = (pictures.length - 1) * delay + duration;
		const options = {
			duration: totalDuration,
			iterations: Infinity,
		};
		const keyframes = [
			{ opacity: 0, transform: `scale(${1 - Math.min(0, zoom) / 100})`, zIndex: 1000 },
			{ opacity: 1, offset: fadeDuration / totalDuration },
			{ transform: `scale(${1 + Math.max(0, zoom) / 100})`, offset: duration / totalDuration },
			{ zIndex: 1 },
		];
		console.log(keyframes);
		pictures.forEach((picture, index) => {
			console.log({ ...options, delay: delay * index });
			picture.setAttribute("class", "_picture");
			[...picture.children].forEach((child) => child.removeAttribute("class"));
			picture.animate(keyframes, { ...options, delay: delay * index });
		});
		const style = el("style", {}, [cssCode]);
		const body = el("div", { class: "_body" }, pictures);
		this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "basic-" }, [body]), { prefix: "slide-show" }));
	}
}
customElements.define("slide-show-basic", SlideShowBasic);
