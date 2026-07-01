import { store, getElement, getContext, withScope } from "@wordpress/interactivity";

store("catpow/sidebar-articlenav", {
	state: {},
	actions: {
		onClickItem(e) {
			e.preventDefault();
			const id = e.currentTarget.closest("[data-section-id]").dataset.sectionId;
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
			if (id) {
				history.pushState(null, "", `#${id}`);
			}
		},
	},
	callbacks: {
		initBlock: () => {
			const ctx = getContext();
			const block = getElement().ref;
			const sidebar = block.closest(".wp-block-catpow-sidebar");
			const mainColumn = sidebar?.querySelector(".wp-block-catpow-sidebar-column.is-column-main");
			const sections = mainColumn?.querySelectorAll(".wp-block-catpow-section[id]") || [];
			const items = [];
			const stack = [{ level: 0, items }];

			[...sections].forEach((section, index) => {
				const headingElement = section.querySelector(".wp-block-catpow-section__header-title-heading,.wp-block-catpow-section__header-titleimage");
				if (!headingElement) {
					return;
				}
				const level = parseInt(headingElement.tagName.slice(1), 10) || 2;
				const label = headingElement.textContent.trim();
				if (!label) {
					return;
				}
				const item = { id: section.id, href: `#${section.id}`, label, items: [] };
				while (stack.length > 1 && stack[stack.length - 1].level >= level) {
					stack.pop();
				}
				stack[stack.length - 1].items.push(item);
				stack.push({ id: section.id, level, items: item.items });
			});

			ctx.items = items;
			ctx.activeItems = {};

			const observerOptions = {
				root: null,
				rootMargin: "-19% 0px -80% 0px",
				threshold: 0,
			};
			const observer = new IntersectionObserver(
				withScope((entries) => {
					const activeItems = { ...ctx.activeItems };
					entries.forEach((entry) => {
						activeItems[entry.target.id] = entry.isIntersecting;
					});
					ctx.activeItems = activeItems;
				}),
				observerOptions,
			);
			sections.forEach((section) => observer.observe(section));
			return () => {
				observer.disconnect();
			};
		},
		isItemActive: () => !!getContext().activeItems?.[getElement()?.ref?.dataset?.sectionId],
	},
});
