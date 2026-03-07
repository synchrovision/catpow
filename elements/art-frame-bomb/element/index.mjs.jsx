import { el, svgEl, bem, hfloor, hceil, hunit, applyBem, srand } from "catpow/util";
import cssCode from "css:./style.css";

class ArtFrameBomb extends HTMLElement {
	static observedAttributes = ["w", "b", "h", "f", "seed", "direction"];
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
		const params = { w: 30, b: 30, h: 60, f: 50, seed: 16, direction: "both" };
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
			let { w, b, h, f, seed, direction } = params;
			b *= 4;
			let d = "";
			const rnd = srand(seed);
			const r = h / 2 + (width * width) / h / 8;
			const rad = Math.asin(width / (2 * r)) * 2;
			const n = Math.ceil(rad / (Math.asin(w / 8 / r) * 2));
			const uRad = rad / n;
			const sh = h + b;
			const ox = width / 2;
			const bf = (b * f) / 200;
			const bs = b - bf;

			if (direction === "both" || direction === "top") {
				d += ` M 0 ${sh}`;
				const oy = r + b;
				let prevF = 0;
				let prevR = r - b;
				let prevRad = -rad / 2;
				for (let i = 0; i <= n; i++) {
					const crrF = i < n ? rnd(0, f) / 200 : 0;
					const crrR = r + b * crrF;
					const crrTopR = f > 0 ? r + bs + (b * (prevF + crrF)) / 2 : r + b;
					const crrRad = uRad * i - rad / 2;
					const crrTopRad = crrRad - uRad * (0.5 + (f > 0 ? ((prevF - crrF) * 50) / f : 0));

					const x1 = ox + crrTopR * Math.sin(crrTopRad);
					const y1 = oy - crrTopR * Math.cos(crrTopRad);
					const x2 = ox + crrR * Math.sin(crrRad);
					const y2 = oy - crrR * Math.cos(crrRad);
					d += ` L ${x1} ${y1} ${x2} ${y2}`;

					prevF = crrF;
					prevR = crrR;
					prevRad = crrRad;
				}
			} else {
				d += ` M 0 0 L ${width} 0`;
			}
			if (direction === "both" || direction === "bottom") {
				d += ` L ${width} ${height - sh}`;
				const oy = height - r - b;
				let prevF = 0;
				let prevR = r - b;
				let prevRad = -rad / 2;
				for (let i = 0; i <= n; i++) {
					const crrF = i < n ? rnd(0, f) / 200 : 0;
					const crrR = r + b * crrF;
					const crrTopR = f > 0 ? r + bs + (b * (prevF + crrF)) / 2 : r + b;
					const crrRad = uRad * i - rad / 2;
					const crrTopRad = crrRad - uRad * (0.5 + (f > 0 ? ((prevF - crrF) * 50) / f : 0));

					const x1 = ox - crrTopR * Math.sin(crrTopRad);
					const y1 = oy + crrTopR * Math.cos(crrTopRad);
					const x2 = ox - crrR * Math.sin(crrRad);
					const y2 = oy + crrR * Math.cos(crrRad);
					d += ` L ${x1} ${y1} ${x2} ${y2}`;

					prevF = crrF;
					prevR = crrR;
					prevRad = crrRad;
				}
			} else {
				d += ` L ${width} ${height} L 0 ${height} Z`;
			}
			body.style.setProperty("clip-path", `path("${d}")`);
		});
		resizeObserver.observe(body);
		this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "bomb-" }, [body]), { prefix: "art-frame" }));
	}
}

customElements.define("art-frame-bomb", ArtFrameBomb);
