(() => {
  // ../components/Customize/NavMenuFields/component.jsx
  (() => {
    const { useState, useRef, useEffect, useLayoutEffect, createRoot, render, unmountComponentAtNode } = wp.element;
    const api = wp.customize;
    function FieldGroup({ location, html, sourceId, itemId, active, settingPrefix }) {
      const container = useRef(null);
      const previous = useRef("");
      useLayoutEffect(() => {
        const template = document.createElement("template");
        template.innerHTML = html;
        const fields = container.current;
        fields.replaceChildren(template.content);
        for (const script of fields.querySelectorAll("script")) {
          const executable = document.createElement("script");
          for (const { name, value } of script.attributes) {
            executable.setAttribute(name, value);
          }
          executable.async = false;
          executable.textContent = script.textContent;
          script.replaceWith(executable);
        }
      }, [html]);
      useEffect(() => {
        const fields = container.current;
        const source = `nav[${location}][${sourceId}]`;
        const target = `nav[${location}][${itemId}]`;
        const serialize = (prefix) => {
          const values = new URLSearchParams();
          for (const input of fields.querySelectorAll("input[name], select[name], textarea[name]")) {
            if (!input.name.startsWith(source + "[") || input.matches(":disabled, [type=file], [type=button], [type=submit], [type=reset], [type=image]")) {
              continue;
            }
            if (input.matches("[type=radio], [type=checkbox]") && !input.checked) {
              continue;
            }
            const name = prefix + input.name.slice(source.length);
            if (input.tagName === "SELECT") {
              for (const option of input.selectedOptions) {
                if (!option.matches(":disabled")) {
                  values.append(name, option.value);
                }
              }
            } else {
              values.append(name, input.value);
            }
          }
          return values.toString();
        };
        previous.current = serialize(source);
        const save = () => {
          const value = serialize(source);
          if (!active || !fields.isConnected || previous.current === value) {
            return;
          }
          previous.current = value;
          const id = `${settingPrefix}[${itemId}][${location}]`;
          const setting = api(id) || api.create(id, id, null, {
            transport: "postMessage",
            previewer: api.previewer
          });
          setting.set(serialize(target));
        };
        fields.addEventListener("input", save);
        fields.addEventListener("change", save);
        const observer = new MutationObserver(save);
        observer.observe(fields, { subtree: true, childList: true, attributes: true, attributeFilter: ["value"] });
        return () => {
          observer.disconnect();
          fields.removeEventListener("input", save);
          fields.removeEventListener("change", save);
        };
      }, [location, sourceId, itemId, active, settingPrefix]);
      return /* @__PURE__ */ wp.element.createElement("div", { ref: container, className: `wp_nav_menu_item_custom_fields wp-clearfix ${location}`, hidden: !active });
    }
    function NavMenuFields({ control, config, sourceId, itemId }) {
      const [locations, setLocations] = useState([]);
      const [visited, setVisited] = useState([]);
      useEffect(() => {
        const settings = Object.keys(config.templates).map((location) => [location, api(`nav_menu_locations[${location}]`)]);
        const refresh = () => {
          const item = control.setting();
          const assigned = item ? settings.filter(([, setting]) => setting && Number(setting()) === Number(item.nav_menu_term_id)).map(([location]) => location) : [];
          setLocations(assigned);
          setVisited((previous) => [.../* @__PURE__ */ new Set([...previous, ...assigned])]);
        };
        settings.forEach(([, setting]) => setting?.bind(refresh));
        control.setting.bind(refresh);
        refresh();
        return () => {
          settings.forEach(([, setting]) => setting?.unbind(refresh));
          control.setting.unbind(refresh);
        };
      }, [control, config]);
      return visited.map((location) => {
        const templates = config.templates[location];
        const html = templates[sourceId] ?? templates[config.templateId].replaceAll(config.templateId, String(sourceId));
        return /* @__PURE__ */ wp.element.createElement(FieldGroup, { key: location, location, html, sourceId, itemId, active: locations.includes(location), settingPrefix: config.prefix });
      });
    }
    Catpow.Customize.NavMenuFields = NavMenuFields;
    NavMenuFields.mount = (config) => {
      const roots = /* @__PURE__ */ new Map();
      const watchControl = (control) => {
        if (control.params.type !== "nav_menu_item") {
          return;
        }
        const itemId = Number(control.params.menu_item_id);
        const renderControl = () => {
          const container = control.container[0]?.querySelector(".catpow-customize-nav-menu-fields");
          if (!control.expanded() || !container || !control.setting()) {
            return;
          }
          if (!roots.has(itemId)) {
            const host2 = document.createElement("div");
            const root2 = createRoot ? createRoot(host2) : {
              render: (element) => render(element, host2),
              unmount: () => unmountComponentAtNode(host2)
            };
            roots.set(itemId, { host: host2, root: root2, sourceId: itemId });
          }
          const { host, root, sourceId } = roots.get(itemId);
          if (host.parentNode !== container) {
            container.append(host);
          }
          root.render(/* @__PURE__ */ wp.element.createElement(NavMenuFields, { control, config, sourceId, itemId }));
        };
        control.deferred.embedded.done(() => {
          control.expanded.bind(renderControl);
          control.setting.bind((value) => {
            if (value || !roots.has(itemId)) {
              return;
            }
            roots.get(itemId).root.unmount();
            roots.delete(itemId);
          });
          renderControl();
        });
      };
      api.bind("saved", (response) => {
        for (const update of response.nav_menu_item_updates || []) {
          const previousId = Number(update.previous_post_id);
          const entry = roots.get(previousId);
          if (update.status === "inserted" && entry) {
            entry.host.remove();
            roots.delete(previousId);
            roots.set(Number(update.post_id), entry);
          }
        }
      });
      api.bind("ready", () => {
        api.control.each(watchControl);
        api.control.bind("add", watchControl);
      });
    };
  })();
})();
