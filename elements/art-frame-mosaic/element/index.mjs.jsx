import { el, svgEl, bem, hfloor, hceil, hunit, applyBem, srand } from "catpow/util";
import { translateColor } from "catpow/scssc";
import cssCode from "css:./style.css";

class ArtFrameMosaic extends HTMLElement {
	static observedAttributes = ["w", "h", "fill", "seed", "direction"];
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
		const params = { w: 20, h: 120, fill: 20, seed: 16, direction: "both" };
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
		const fills1 = svgEl("path", { class: "_fills is-fills-1", fill: translateColor("mx") }, []);
		const fills2 = svgEl("path", { class: "_fills is-fills-2", fill: translateColor("ax") }, []);
		const arts = svgEl("svg", { xmlns: "http://www.w3.org/2000/svg", class: "_arts", style: "position:absolute;inset:0;width:100%" }, [fills1,fills2]);
		const resizeObserver = new ResizeObserver((entries) => {
			const { width, height } = entries[0].contentRect;
			const { w, h, fill, seed, direction } = params;
			let d = `M 0 0 l ${width} 0 l 0 ${height} l ${-width} 0 z`;
			let ad1 = ``;
			let ad2 = ``;
			let cols = Math.round(width / w);
			let u = width / cols;
			let rows = Math.floor(h / u);
			const rnd = srand(seed);
			if (direction === "both" || direction === "top") {
				for (let r = 0; r < rows; r++) {
					for (let c = 0; c < cols; c++) {
						const n = rnd(0, rows * 32);
						if (n < r * 32 + 32) {
							continue;
						}
						const x = c * u;
						const y = r * u;
						if (fill > rnd(0, 100)) {
							if(10 < rnd(0,100)){
								ad1 += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
							}
							else{
								ad2 += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
							}
						} else {
							d += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
						}
					}
				}
			}
			if (direction === "both" || direction === "bottom") {
				for (let r = 0; r < rows; r++) {
					for (let c = 0; c < cols; c++) {
						const n = rnd(0, rows * 32);
						if (n < r * 32 + 32) {
							continue;
						}
						const x = c * u;
						const y = height - (r + 1) * u;
						if (fill > rnd(0, 100)) {
							if(10 < rnd(0,100)){
								ad1 += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
							}
							else{
								ad2 += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
							}
						} else {
							d += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
						}
					}
				}
			}
			arts.setAttribute("viewBox", `0 0 ${width} ${height}`);
			fills1.setAttribute("d", ad1);
			fills2.setAttribute("d", ad2);
			body.style.setProperty("clip-path", `path(evenodd,"${d}")`);
		});
		resizeObserver.observe(body);
		this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "mosaic-" }, [body, arts]), { prefix: "art-frame" }));
	}
}
customElements.define("art-frame-mosaic", ArtFrameMosaic);
