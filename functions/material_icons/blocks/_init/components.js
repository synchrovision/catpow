(() => {
  // ../functions/material_icons/blocks/_init/components.jsx
  wp.hooks.addFilter("catpow.IconComponent", "catpow/editor", () => "MaterialIcon");
  CP.MaterialIcon = {
    Input: (props) => {
      const { className = "material-icon", item, prm, save } = props;
      return /* @__PURE__ */ wp.element.createElement(
        Catpow.SelectMaterialIcons,
        {
          value: item.materialIconName,
          onChange: (materialIconName) => {
            save({ materialIconName });
          }
        }
      );
    },
    Output: (props) => {
      const { className = "material-icon", item } = props;
      return /* @__PURE__ */ wp.element.createElement("span", { className, style: { fontFamily: "Material Icons" } }, item.materialIconName);
    }
  };
})();
