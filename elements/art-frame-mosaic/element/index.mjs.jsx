import { el, svgEl, bem, hfloor, hceil, hunit, applyBem, srand } from "catpow/util";
import cssCode from "css:./style.css";

class ArtFrameMosaic extends HTMLElement {
	static observedAttributes = ["w", "h", "seed", "direction"];
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
		const params = { w: 20, h: 40, seed: 16, direction: "both" };
		for (const key of Object.keys(params)) {
			if (this.hasAttribute(key)) {
				switch (typeof params[key]) {
					case "object":
						params[key] = JSON.parse(this.getAttribute(key));
						break;
					case "boolean":
						params[key] = !/0|false|no/i.test(this.getAttribute(key));
						break;
					case "number":
						params[key] = parseInt(this.getAttribute(key));
						break;
					default:
						params[key] = this.getAttribute(key);
						break;
				}
			}
		}
		const style = el("style", {}, [cssCode]);
		const body = el("div", { class: "_body" }, [el("slot")]);
		const resizeObserver = new ResizeObserver((entries) => {
			const { width, height } = entries[0].contentRect;
			const { w, h, seed, direction } = params;
			let d = `M 0 0 l ${width} 0 l 0 ${height} l ${-width} 0 z`;
			let cols = Math.round(width / w);
			let u = width / cols;
			let rows = Math.floor(h / u);
			const rnd = srand(seed);
			if (direction === "both" || direction === "top") {
				for (let r = 0; r < rows; r++) {
					for (let c = 0; c < cols; c++) {
						if (rnd(0, rows * 32) < r * 32 + 32) {
							continue;
						}
						const x = c * u;
						const y = r * u;
						d += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
					}
				}
			}
			if (direction === "both" || direction === "bottom") {
				for (let r = 0; r < rows; r++) {
					for (let c = 0; c < cols; c++) {
						if (rnd(0, rows * 32) < r * 32 + 32) {
							continue;
						}
						const x = c * u;
						const y = height - (r + 1) * u;
						d += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
					}
				}
			}
			body.style.setProperty("clip-path", `path(evenodd,"${d}")`);
		});
		resizeObserver.observe(body);
		this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "mosaic-" }, [body]), { prefix: "art-frame" }));
	}
}
customElements.define("art-frame-mosaic", ArtFrameMosaic);
