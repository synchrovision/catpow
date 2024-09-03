(() => {
  // modules/util/range.jsx
  var range = function* (start, end, step = 1) {
    for (let i = start; i <= end; i += step) {
      yield i;
    }
  };

  // ../blocks/diagnosis/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.diagnosis = {
    devices: ["sp", "tb"],
    imageKeys: {
      image: { src: "src", alt: "alt", sources: "sources", items: "sections" }
    }
  };
  wp.blocks.registerBlockType("catpow/diagnosis", {
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo, useCallback } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { sections = [], currentSection = -1, currentButton = -1, currentStep = 0, numSteps = 3, EditMode = false } = attributes;
      const { devices, imageKeys } = CP.config.diagnosis;
      const classes = Catpow.util.bem("wp-block-catpow-diagnosis");
      var states = CP.classNamesToFlags(attributes.classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "numSteps", input: "range", key: "numSteps", label: "\u30B9\u30C6\u30C3\u30D7\u6570", min: 2, max: 21 },
          { name: "scoreColumns", input: "dataset", key: "scoreColumns", label: "\u30B9\u30B3\u30A2\u9805\u76EE", items: {
            label: { type: "text", label: "\u30E9\u30D9\u30EB", default: "\u30B9\u30B3\u30A2" },
            name: { type: "text", label: "\u5909\u6570\u540D", default: "score" },
            show: { type: "bool", label: "\u958B\u793A", default: true }
          } },
          { name: "hasCount", label: "\u8A2D\u554F\u756A\u53F7", values: "has-count", sub: [
            { name: "countPrefix", input: "text", label: "\u756A\u53F7\u524D\u7F6E\u30C6\u30AD\u30B9\u30C8", key: "countPrefix" },
            { name: "countSuffix", input: "text", label: "\u756A\u53F7\u5F8C\u7F6E\u30C6\u30AD\u30B9\u30C8", key: "countSuffix" }
          ] },
          { name: "doSendEvent", label: "\u8A08\u6E2C\u30A4\u30D9\u30F3\u30C8\u9001\u4FE1", values: "do-send-event" },
          "color"
        ];
        wp.hooks.applyFilters("catpow.blocks.diagnosis.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveSectionClasses = useMemo(() => {
        const selectiveSectionClasses2 = [
          { name: "type", type: "gridbuttons", label: "\u30BB\u30AF\u30B7\u30E7\u30F3\u30BF\u30A4\u30D7", values: { "is-section-start": "\u958B\u59CB", "is-section-question": "\u8A2D\u554F", "is-section-result": "\u7D50\u679C" } },
          { name: "step", input: "range", key: "step", label: "\u30B9\u30C6\u30C3\u30D7", min: 0, max: 20, effect: (value, states2, props) => {
            if (props.attr.numSteps <= value) {
              props.set({ numSteps: value + 1 });
            }
          } },
          { name: "hasImage", label: "\u753B\u50CF", values: "has-image", sub: [
            { name: "size", type: "gridbuttons", label: "\u30B5\u30A4\u30BA", values: { "has-small-image": "\u5C0F", "has-medium-image": "\u4E2D", "has-large-image": "\u5927" } },
            { name: "image", input: "picture", keys: imageKeys.image, devices }
          ] },
          "color"
        ];
        wp.hooks.applyFilters("catpow.blocks.diagnosis.selectiveSectionClasses", CP.finderProxy(selectiveSectionClasses2));
        return selectiveSectionClasses2;
      }, []);
      const selectiveButtonClasses = useMemo(() => {
        const selectiveButtonClasses2 = [
          "color"
        ];
        wp.hooks.applyFilters("catpow.blocks.diagnosis.selectiveButtonClasses", CP.finderProxy(selectiveButtonClasses2));
        return selectiveButtonClasses2;
      }, []);
      const save = () => {
        setAttributes({ sections: JSON.parse(JSON.stringify(sections)) });
      };
      const blockProps = useBlockProps({ className: classes(attributes.classes) });
      const stepOptions = useMemo(() => {
        const stepOptions2 = [...range(0, numSteps - 1)];
        stepOptions2.push("ALL");
        return stepOptions2;
      }, [numSteps]);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectModeToolbar,
        {
          set: setAttributes,
          attr: attributes,
          modes: ["EditMode"]
        }
      ), isSelected && !EditMode && /* @__PURE__ */ wp.element.createElement(
        CP.NavBar,
        {
          label: "Step",
          options: stepOptions,
          value: currentStep,
          onChange: (currentStep2) => setAttributes({ currentStep: currentStep2 })
        }
      ), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          itemsKey: "sections",
          columns: [
            { type: "text", key: "step" },
            { type: "text", key: "title" },
            { type: "text", key: "lead" },
            { type: "text", key: "desc" }
          ]
        }
      )) : /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, /* @__PURE__ */ wp.element.createElement(Catpow.Digit, { value: "6" }), attributes.sections.map((section, index) => {
        const sectionStates = CP.classNamesToFlags(section.classes);
        return /* @__PURE__ */ wp.element.createElement(
          CP.Item,
          {
            tag: "div",
            className: classes.section({ "is-active": currentStep === "ALL" || section.step == currentStep }),
            set: setAttributes,
            attr: attributes,
            items: attributes.sections,
            index,
            indexKey: "currentSection",
            isSelected,
            key: section.id
          },
          /* @__PURE__ */ wp.element.createElement("div", { className: classes.section._header() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.title() }, states.hasCount && sectionStates.isSectionQuestion && /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.title.count() }, attributes.countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.title.count.prefix() }, attributes.countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.title.count.number() }, section.step), attributes.countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.title.count.suffix() }, attributes.countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.title._text(), "data-role": "title" }, /* @__PURE__ */ wp.element.createElement(RichText, { value: section.title, onChange: (title) => {
            item.title = title;
            save();
          } })))),
          /* @__PURE__ */ wp.element.createElement("div", { className: classes.section._body() }, sectionStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: classes.section._body.image() }, /* @__PURE__ */ wp.element.createElement(
            CP.SelectResponsiveImage,
            {
              className: classes.section.image._img(),
              attr: attributes,
              set: setAttributes,
              keys: imageKeys.image,
              index,
              size: "vga",
              isTemplate: states.isTemplate
            }
          )), /* @__PURE__ */ wp.element.createElement("div", { className: classes.section._body.text() }, sectionStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: classes.section.lead(), value: section.lead, "data-role": "lead" }, /* @__PURE__ */ wp.element.createElement(RichText, { value: section.lead, onChange: (lead) => {
            item.lead = lead;
            save();
          } })), sectionStates.hasDesc && /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.desc(), "data-role": "desc" }, /* @__PURE__ */ wp.element.createElement(RichText, { value: section.desc, onChange: (desc) => {
            item.desc = desc;
            save();
          } })), states.hasScore && sectionStates.isSectionResult && /* @__PURE__ */ wp.element.createElement("dl", { className: classes.section.score() }, /* @__PURE__ */ wp.element.createElement("template", { "data-wp-each--score": "context.scores" }, /* @__PURE__ */ wp.element.createElement("dt", { className: classes.section.score.label(), "data-wp-text": "context.score.label" }), /* @__PURE__ */ wp.element.createElement("dd", { className: classes.section.score.point() }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.score.point.number(), "data-wp-text": "context.score.point" }), /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.score.point.unit(), "data-wp-text": "context.score.unit" })))), sectionStates.isSectionResult ? /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, sectionStates.hasButtons && /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.buttons() }, section.buttons.map((button, buttonIndex) => {
            return /* @__PURE__ */ wp.element.createElement(
              "a",
              {
                tagName: "a",
                className: classes.section.buttons.button(button.classes),
                "data-button-class": button.classes,
                href: button.href,
                "data-role": "button",
                key: buttonIndex
              },
              /* @__PURE__ */ wp.element.createElement(RichText, { value: button.text, onChange: (text) => {
                button.text = text;
                save();
              } })
            );
          }))) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes.section.buttons() }, section.buttons.map((button, buttonIndex) => {
            return /* @__PURE__ */ wp.element.createElement(
              "li",
              {
                className: classes.section.buttons.button(button.classes),
                "data-button-class": button.classes,
                "data-button-id": button.id,
                "data-wp-on--click": "actions.onClickButton",
                "data-flag": button.flag,
                "data-score": button.score,
                "data-role": "button",
                key: buttonIndex
              },
              /* @__PURE__ */ wp.element.createElement(RichText, { value: button.text, onChange: (text) => {
                button.text = text;
                save();
              } })
            );
          }))))
        );
      }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses
        }
      ), currentSection >= 0 && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30BB\u30AF\u30B7\u30E7\u30F3",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses: selectiveSectionClasses,
          items: sections,
          itemsKey: "sections",
          index: currentSection
        }
      ), currentSection >= 0 && currentButton >= 0 && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30DC\u30BF\u30F3",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses: selectiveButtonClasses,
          items: sections,
          itemsKey: "sections",
          index: currentSection,
          subItemsKey: "buttons",
          subIndex: currentButton
        }
      )));
    },
    save({ attributes, className }) {
      const { useState, useMemo, useCallback } = wp.element;
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { sections = [] } = attributes;
      const { imageKeys } = CP.config.diagnosis;
      const classes = Catpow.util.bem("wp-block-catpow-diagnosis");
      var states = CP.classNamesToFlags(attributes.classes);
      const context = { step: 0, count: 0, activeSection: 0 };
      const blockProps = useBlockProps.save({
        className: classes(attributes.classes),
        "data-wp-interactive": "diagnosis",
        "data-wp-context": JSON.stringify(context),
        "data-wp-init": "callbacks.initBlock"
      });
      return /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, /* @__PURE__ */ wp.element.createElement("div", { "data-cp-component": "Digit" }, /* @__PURE__ */ wp.element.createElement("script", { type: "application/json" }, JSON.stringify({ value: 6 }))), attributes.sections.map((section, index) => {
        const sectionStates = CP.classNamesToFlags(section.classes);
        return /* @__PURE__ */ wp.element.createElement(
          "div",
          {
            className: classes.section(section.classes),
            "data-section-class": section.classes,
            "data-section-id": section.id,
            "data-step": section.step,
            "data-cond": section.cond,
            "data-wp-class--is-active": "callbacks.isActiveSection",
            "data-index": index,
            "data-role": "section",
            key: index
          },
          /* @__PURE__ */ wp.element.createElement("div", { className: classes.section._header() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.title() }, states.hasCount && sectionStates.isSectionQuestion && /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.title.count() }, attributes.countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.title.count.prefix() }, attributes.countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.title.count.number(), "data-wp-text": "state.step" }), attributes.countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.title.count.suffix() }, attributes.countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.title._text(), "data-role": "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: section.title })))),
          /* @__PURE__ */ wp.element.createElement("div", { className: classes.section._body() }, sectionStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: classes.section._body.image() }, /* @__PURE__ */ wp.element.createElement("img", { className: classes.section.image._img(), src: section.src, alt: section.alt, "data-role": "image" })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.section._body.text() }, sectionStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: classes.section.lead(), value: section.lead, "data-role": "lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: section.lead })), sectionStates.hasDesc && /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.desc(), "data-role": "desc" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: section.desc })), states.hasScore && sectionStates.isSectionResult && /* @__PURE__ */ wp.element.createElement("dl", { className: classes.section.score() }, /* @__PURE__ */ wp.element.createElement("template", { "data-wp-each--score": "context.scores" }, /* @__PURE__ */ wp.element.createElement("dt", { className: classes.section.score.label(), "data-wp-text": "context.score.label" }), /* @__PURE__ */ wp.element.createElement("dd", { className: classes.section.score.point() }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.score.point.number(), "data-wp-text": "context.score.point" }), /* @__PURE__ */ wp.element.createElement("span", { className: classes.section.score.point.unit(), "data-wp-text": "context.score.unit" })))), sectionStates.isSectionResult ? /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, sectionStates.hasButtons && /* @__PURE__ */ wp.element.createElement("div", { className: classes.section.buttons() }, section.buttons.map((button, buttonIndex) => {
            return /* @__PURE__ */ wp.element.createElement(
              "a",
              {
                tagName: "a",
                className: classes.section.buttons.button(button.classes),
                "data-button-class": button.classes,
                href: button.href,
                "data-role": "button",
                key: buttonIndex
              },
              /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: button.text })
            );
          }))) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes.section.buttons() }, section.buttons.map((button, buttonIndex) => {
            return /* @__PURE__ */ wp.element.createElement(
              "li",
              {
                className: classes.section.buttons.button(button.classes),
                "data-button-class": button.classes,
                "data-button-id": button.id,
                "data-wp-on--click": "actions.onClickButton",
                "data-flag": button.flag,
                "data-score": button.score,
                "data-role": "button",
                key: buttonIndex
              },
              /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: button.text })
            );
          }))))
        );
      })));
    }
  });
})();
