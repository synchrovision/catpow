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
			const { w, b, h, f, seed, direction } = params;
			let d = "";
			const rnd = srand(seed);
			const r1 = h / 2 + (width * width) / h / 8;
			const rad = Math.asin(width / (2 * r1)) * 2;
			const n = Math.ceil(rad / (Math.asin(w / 2 / r1) * 2));
			const uRad = rad / n;
			const maxURad = uRad + (uRad * f) / 400;
			const maxW = r1 * Math.sin(maxURad / 2) * 2;
			const maxUh = (maxW * (2 + b)) / 10;

			if (direction === "both" || direction === "top") {
				d += ` M 0 ${h + maxUh}`;
				let pRad = -rad / 2;
				for (let i = 0; i <= n; i++) {
					const crrRad = uRad * i - rad / 2;
					let tRad2 = crrRad;
					if (i < n) {
						tRad2 + (uRad * rnd(-f, f)) / 400;
					}
					const dRad = tRad2 - pRad;
					const tRad1 = tRad2 - dRad / 2;
					pRad = tRad2;
					const er = r1 + (((r1 * Math.sin(dRad / 2) * 2 * (2 + b)) / 10) * rnd(200 - f, 200)) / 200;
					const x1 = er * Math.sin(tRad1) + width / 2;
					const y1 = r1 + maxUh - er * Math.cos(tRad1);
					const x2 = r1 * Math.sin(tRad2) + width / 2;
					const y2 = r1 + maxUh - r1 * Math.cos(tRad2);
					d += ` L ${x1} ${y1} ${x2} ${y2}`;
				}
			} else {
				d += ` M 0 0 L ${width} 0`;
			}
			if (direction === "both" || direction === "bottom") {
				d += ` L ${width} ${height - h - maxUh}`;
				let pRad = -rad / 2;
				for (let i = 0; i <= n; i++) {
					const crrRad = uRad * i - rad / 2;
					let tRad2 = crrRad;
					if (i < n) {
						tRad2 + (uRad * rnd(-f, f)) / 400;
					}
					const dRad = tRad2 - pRad;
					const tRad1 = tRad2 - dRad / 2;
					pRad = tRad2;
					const er = r1 + (((r1 * Math.sin(dRad / 2) * 2 * (2 + b)) / 10) * rnd(200 - f, 200)) / 200;
					const x1 = width / 2 - er * Math.sin(tRad1);
					const y1 = height - maxUh - r1 + er * Math.cos(tRad1);
					const x2 = width / 2 - r1 * Math.sin(tRad2);
					const y2 = height - maxUh - r1 + r1 * Math.cos(tRad2);
					d += ` L ${x1} ${y1} ${x2} ${y2}`;
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
