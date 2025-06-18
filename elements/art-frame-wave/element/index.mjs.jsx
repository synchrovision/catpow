import { el, svgEl, bem, hfloor, hceil, hunit, applyBem } from "catpow/util";
import cssCode from "css:./style.css";

class ArtFrameWave extends HTMLElement {
	static observedAttributes = ["dx", "dy", "r", "direction"];
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	connectedCallback() {
		this.render();
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}
	render() {
		const params = { dx: 50, dy: 50, r: 50, direction: "both" };
		for (const key of Object.keys(params)) {
			if (this.hasAttribute(key)) {
				if (key === "direction") {
					params[key] = this.getAttribute(key);
				} else if (key === "dx" || key === "dy" || key === "r") {
					params[key] = parseInt(this.getAttribute(key));
				}
			}
		}
		const style = el("style", {}, [cssCode]);
		const body = el("div", { class: "_body" }, [el("slot")]);
		const resizeObserver = new ResizeObserver((entries) => {
			const { width, height } = entries[0].contentRect;
			const { dx, dy, direction } = params;
			const r = (params.r * dx) / 100;
			const ut = ` c ${r / 2} 0, ${dx - r / 2} ${dy}, ${dx} ${dy}, ${r / 2} 0, ${dx - r / 2} ${-dy}, ${dx} ${-dy}`;
			const ub = ` c ${-r / 2} 0, ${-dx + r / 2} ${-dy}, ${-dx} ${-dy}, ${-r / 2} 0, ${-dx + r / 2} ${dy}, ${-dx} ${dy}`;
			const n = Math.ceil(width / dx / 2);
			const w = n * dx * 2;
			let d = "M 0 0";
			if (direction === "both" || direction === "top") {
				d += ut.repeat(n);
			} else {
				d += ` l ${w} 0`;
			}
			d += ` l 0 ${height}`;
			if (direction === "both" || direction === "bottom") {
				d += ub.repeat(n);
			} else {
				d += ` l ${-w} 0`;
			}
			d += " z";
			body.style.setProperty("clip-path", `path("${d}")`);
		});
		resizeObserver.observe(body);
		this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "wave-" }, [body]), { prefix: "art-frame" }));
	}
}
customElements.define("art-frame-wave", ArtFrameWave);
