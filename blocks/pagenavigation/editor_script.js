(() => {
	// ../blocks/pagenavigation/editor_script.tsx
	var { __ } = wp.i18n;
	wp.blocks.registerBlockType("catpow/pagenavigation", {
		edit({ attributes, className, setAttributes, isSelected }) {
			const { useMemo } = wp.element;
			const { InspectorControls } = wp.blockEditor;
			const { PanelBody, TextareaControl } = wp.components;
			const { serverSideRender: ServerSideRender } = wp;
			const { query } = attributes;
			const selectiveClasses = useMemo(() => {
				const selectiveClasses2 = [
					{ name: "type", type: "gridbuttons", label: "\u30BF\u30A4\u30D7", values: { "is-style-tree": "tree", "is-style-list": "list", "is-style-card": "card", "is-style-grid": "grid" } },
					{ name: "hasOwnTitle", input: "bool", label: "\u30AB\u30B9\u30BF\u30E0\u30BF\u30A4\u30C8\u30EB", key: "hasOwnTitle" },
					{ name: "title", input: "text", label: "\u30BF\u30A4\u30C8\u30EB", key: "title", cond: (states, props) => props.attr.hasOwnTitle },
					{ name: "level", label: "level", input: "range", key: "level", min: 0, max: 3 },
					{ name: "depth", label: "depth", input: "range", key: "depth", min: 0, max: 2 },
					{ name: "query", label: "query", input: "textarea", key: "query" },
					"hasMargin",
				];
				wp.hooks.applyFilters("catpow.blocks.pagenavigation.selectiveClasses", CP.finderProxy(selectiveClasses2));
				return selectiveClasses2;
			}, []);
			return /* @__PURE__ */ wp.element.createElement(
				wp.element.Fragment,
				null,
				/* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/pagenavigation", attributes }),
				/* @__PURE__ */ wp.element.createElement(
					InspectorControls,
					null,
					/* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u8A2D\u5B9A", icon: "admin-generic", set: setAttributes, attr: attributes, selectiveClasses })
				)
			);
		},
		save({ attributes, className }) {
			return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null);
		},
	});
})();
