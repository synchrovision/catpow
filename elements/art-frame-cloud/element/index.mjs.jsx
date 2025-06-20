import { el, svgEl, bem, hfloor, hceil, hunit, applyBem, srand } from "catpow/util";
import cssCode from "css:./style.css";

class ArtFrameCloud extends HTMLElement {
	static observedAttributes = ["r", "b", "h", "f", "seed", "direction"];
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
		const params = { r: 6, b: 30, h: 60, f: 50, seed: 16, direction: "both" };
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
			const { r, b, h, f, seed, direction } = params;
			let d = "";
			const rnd = srand(seed);
			const cr = h / 2 + (width * width) / h / 8;
			const cRad = Math.asin(width / (2 * cr)) * 2;
			const urc = 1 - b / 200;
			const ur = r * urc;
			const uRad = cRad / Math.ceil(cRad / (Math.asin(r / 2 / cr) * 2));
			const maxURad = uRad + (uRad * f) / 200;
			const maxR = cr * Math.sin(maxURad / 2) * 2;
			const maxUr = maxR * urc;
			const uah = maxUr - Math.sqrt(maxUr * maxUr - (maxR / 2) * (maxR / 2));

			if (direction === "both" || direction === "top") {
				d += ` M 0 ${h + uah}`;
				let pRad = -cRad / 2;
				for (let rad = uRad - cRad / 2; rad < cRad / 2; rad += uRad) {
					const tRad = rad - (uRad * f) / 200 + (uRad * rnd(0, f)) / 100;
					const tr = cr * Math.sin(tRad - pRad);
					pRad = tRad;
					const ur = tr * (urc + rnd(0, f) / 200);
					const x = cr * Math.sin(tRad) + width / 2;
					const y = cr - cr * Math.cos(tRad) + uah;
					d += ` A ${ur} ${ur} 0 0 1 ${x} ${y}`;
				}
				const ur = r * urc;
				d += ` A ${ur} ${ur} 0 0 1 ${width} ${h + uah}`;
			} else {
				d += ` M 0 0 L ${width} 0`;
			}
			if (direction === "both" || direction === "bottom") {
				d += ` L ${width} ${height - h - uah}`;
				let pRad = -cRad / 2;
				for (let rad = uRad - cRad / 2; rad < cRad / 2; rad += uRad) {
					const tRad = rad - (uRad * f) / 200 + (uRad * rnd(0, f)) / 100;
					const tr = cr * Math.sin(tRad - pRad);
					pRad = tRad;
					const ur = tr * (urc + rnd(0, f) / 200);
					const x = width / 2 - cr * Math.sin(tRad);
					const y = height - (cr - cr * Math.cos(tRad) + uah);
					d += ` A ${ur} ${ur} 0 0 1 ${x} ${y}`;
				}
				d += ` A ${ur} ${ur} 0 0 1 0 ${height - h - uah} Z`;
			} else {
				d += ` L ${width} ${height} L 0 ${height} Z`;
			}
			body.style.setProperty("clip-path", `path("${d}")`);
		});
		resizeObserver.observe(body);
		this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "cloud-" }, [body]), { prefix: "art-frame" }));
	}
}

customElements.define("art-frame-cloud", ArtFrameCloud);
