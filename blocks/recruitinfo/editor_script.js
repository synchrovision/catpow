(() => {
  // ../blocks/recruitinfo/editor_script.jsx
  var { useMemo } = wp.element;
  var getPlainText = (html) => wp.richText.getTextContent(wp.richText.create({ html: String(html || "") }));
  var compact = (value) => {
    if (Array.isArray(value)) {
      const values = value.map(compact).filter((item) => item !== void 0);
      return values.length ? values : void 0;
    }
    if (value && typeof value === "object") {
      const object = Object.entries(value).reduce((result, [key, item]) => {
        const compacted = compact(item);
        if (compacted !== void 0) {
          result[key] = compacted;
        }
        return result;
      }, {});
      return Object.keys(object).length ? object : void 0;
    }
    if (value === "" || value === null || value === void 0) {
      return void 0;
    }
    return value;
  };
  var employmentTypeOptions = [
    { label: "\u6B63\u793E\u54E1\uFF08\u30D5\u30EB\u30BF\u30A4\u30E0\uFF09", value: "FULL_TIME" },
    { label: "\u30D1\u30FC\u30C8\u30FB\u30A2\u30EB\u30D0\u30A4\u30C8", value: "PART_TIME" },
    { label: "\u696D\u52D9\u59D4\u8A17", value: "CONTRACTOR" },
    { label: "\u6D3E\u9063\u793E\u54E1", value: "TEMPORARY" },
    { label: "\u30A4\u30F3\u30BF\u30FC\u30F3", value: "INTERN" },
    { label: "\u305D\u306E\u4ED6", value: "OTHER" }
  ];
  var salaryUnitOptions = [
    { label: "\u6642\u7D66", value: "HOUR" },
    { label: "\u65E5\u7D66", value: "DAY" },
    { label: "\u9031\u7D66", value: "WEEK" },
    { label: "\u6708\u7D66", value: "MONTH" },
    { label: "\u5E74\u4FF8", value: "YEAR" }
  ];
  var getEmploymentTypeLabel = (values = []) => employmentTypeOptions.filter(({ value }) => values.includes(value)).map(({ label }) => label).join("\u3001");
  var getSalaryLabel = ({ salaryValue, salaryMinValue, salaryMaxValue, salaryCurrency, salaryUnitText }) => {
    const unit = salaryUnitOptions.find(({ value }) => value === salaryUnitText)?.label || "";
    const currency = salaryCurrency === "JPY" ? "\u5186" : ` ${salaryCurrency}`;
    if (salaryValue) {
      return `${unit} ${salaryValue}${currency}`;
    }
    if (salaryMinValue || salaryMaxValue) {
      return `${unit} ${salaryMinValue || "\u2014"}\u301C${salaryMaxValue || "\u2014"}${currency}`;
    }
    return "";
  };
  var createStructuredData = (attributes) => {
    const {
      title,
      description,
      datePosted,
      validThrough,
      employmentType,
      hiringOrganizationName,
      hiringOrganizationSameAs,
      hiringOrganizationLogo,
      identifier,
      jobLocationType,
      applicantLocationRequirements,
      addressCountry,
      addressRegion,
      addressLocality,
      streetAddress,
      postalCode,
      salaryCurrency,
      salaryValue,
      salaryMinValue,
      salaryMaxValue,
      salaryUnitText,
      applicationUrl,
      directApply
    } = attributes;
    const quantitativeValue = salaryValue ? { "@type": "QuantitativeValue", value: salaryValue, unitText: salaryUnitText } : { "@type": "QuantitativeValue", minValue: salaryMinValue, maxValue: salaryMaxValue, unitText: salaryUnitText };
    return compact({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: getPlainText(title),
      description: String(description || ""),
      datePosted,
      validThrough: validThrough ? `${validThrough}T23:59:59+09:00` : "",
      employmentType,
      hiringOrganization: {
        "@type": "Organization",
        name: hiringOrganizationName,
        sameAs: hiringOrganizationSameAs,
        logo: hiringOrganizationLogo
      },
      identifier: identifier ? {
        "@type": "PropertyValue",
        name: hiringOrganizationName,
        value: identifier
      } : void 0,
      jobLocation: jobLocationType === "TELECOMMUTE" ? void 0 : {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry,
          addressRegion,
          addressLocality,
          streetAddress,
          postalCode
        }
      },
      jobLocationType,
      applicantLocationRequirements: jobLocationType === "TELECOMMUTE" && applicantLocationRequirements ? { "@type": "Country", name: applicantLocationRequirements } : void 0,
      baseSalary: salaryValue || salaryMinValue || salaryMaxValue ? {
        "@type": "MonetaryAmount",
        currency: salaryCurrency,
        value: quantitativeValue
      } : void 0,
      url: applicationUrl,
      directApply
    });
  };
  wp.blocks.registerBlockType("catpow/recruitinfo", {
    example: CP.example,
    edit({ attributes, setAttributes }) {
      const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { CheckboxControl, PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;
      const {
        classes,
        vars,
        HeadingTag,
        title,
        description,
        datePosted,
        validThrough,
        employmentType = [],
        hiringOrganizationName,
        hiringOrganizationSameAs,
        hiringOrganizationLogo,
        identifier,
        jobLocationType,
        applicantLocationRequirements,
        addressCountry,
        addressRegion,
        addressLocality,
        streetAddress,
        postalCode,
        salaryCurrency,
        salaryValue,
        salaryMinValue,
        salaryMaxValue,
        salaryUnitText,
        applicationUrl,
        directApply
      } = attributes;
      const selectiveClasses = useMemo(() => {
        var selectiveClasses2 = [
          "headingTag",
          "level",
          "hasContentWidth",
          "hasMargin",
          "hasPadding",
          "color",
          "colorScheme",
          {
            name: "type",
            type: "buttons",
            label: "\u30BF\u30A4\u30D7",
            values: { isTypeFlat: "\u30D5\u30E9\u30C3\u30C8", isTypeCard: "\u30AB\u30FC\u30C9", isTypeFrame: "\u30D5\u30FC\u30EC\u30E0" }
          },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.recruitinfo.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const updateEmploymentType = (value, checked) => setAttributes({
        employmentType: checked ? [.../* @__PURE__ */ new Set([...employmentType, value])] : employmentType.filter((item) => item !== value)
      });
      const location = jobLocationType === "TELECOMMUTE" ? `\u30EA\u30E2\u30FC\u30C8\uFF08${applicantLocationRequirements || "\u5730\u57DF\u672A\u6307\u5B9A"}\uFF09` : [addressRegion, addressLocality, streetAddress].filter(Boolean).join("");
      const salary = getSalaryLabel(attributes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u8A2D\u5B9A", icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u63B2\u8F09\u60C5\u5831", initialOpen: true }, /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u63B2\u8F09\u65E5", type: "date", value: datePosted, onChange: (datePosted2) => setAttributes({ datePosted: datePosted2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u63B2\u8F09\u7D42\u4E86\u65E5", type: "date", value: validThrough, onChange: (validThrough2) => setAttributes({ validThrough: validThrough2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u6C42\u4EBAID", value: identifier, onChange: (identifier2) => setAttributes({ identifier: identifier2 }) })), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u96C7\u7528\u5F62\u614B", initialOpen: false }, employmentTypeOptions.map((option) => /* @__PURE__ */ wp.element.createElement(CheckboxControl, { key: option.value, label: option.label, checked: employmentType.includes(option.value), onChange: (checked) => updateEmploymentType(option.value, checked) }))), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u96C7\u7528\u4E3B", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u7D44\u7E54\u540D", value: hiringOrganizationName, onChange: (hiringOrganizationName2) => setAttributes({ hiringOrganizationName: hiringOrganizationName2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u7D44\u7E54URL", type: "url", value: hiringOrganizationSameAs, onChange: (hiringOrganizationSameAs2) => setAttributes({ hiringOrganizationSameAs: hiringOrganizationSameAs2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u30ED\u30B4\u753B\u50CFURL", type: "url", value: hiringOrganizationLogo, onChange: (hiringOrganizationLogo2) => setAttributes({ hiringOrganizationLogo: hiringOrganizationLogo2 }) })), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u52E4\u52D9\u5730", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        SelectControl,
        {
          label: "\u52E4\u52D9\u5F62\u614B",
          value: jobLocationType,
          options: [
            { label: "\u52E4\u52D9\u5730\u3078\u51FA\u52E4", value: "" },
            { label: "\u5B8C\u5168\u30EA\u30E2\u30FC\u30C8", value: "TELECOMMUTE" }
          ],
          onChange: (jobLocationType2) => setAttributes({ jobLocationType: jobLocationType2 })
        }
      ), jobLocationType === "TELECOMMUTE" ? /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u5FDC\u52DF\u53EF\u80FD\u5730\u57DF\uFF08\u56FD\u540D\uFF09", value: applicantLocationRequirements, onChange: (applicantLocationRequirements2) => setAttributes({ applicantLocationRequirements: applicantLocationRequirements2 }) }) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u56FD\u30B3\u30FC\u30C9", value: addressCountry, onChange: (addressCountry2) => setAttributes({ addressCountry: addressCountry2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u90FD\u9053\u5E9C\u770C", value: addressRegion, onChange: (addressRegion2) => setAttributes({ addressRegion: addressRegion2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u5E02\u533A\u753A\u6751", value: addressLocality, onChange: (addressLocality2) => setAttributes({ addressLocality: addressLocality2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u753A\u540D\u30FB\u756A\u5730\u30FB\u5EFA\u7269\u540D", value: streetAddress, onChange: (streetAddress2) => setAttributes({ streetAddress: streetAddress2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u90F5\u4FBF\u756A\u53F7", value: postalCode, onChange: (postalCode2) => setAttributes({ postalCode: postalCode2 }) }))), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u7D66\u4E0E", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(SelectControl, { label: "\u5358\u4F4D", value: salaryUnitText, options: salaryUnitOptions, onChange: (salaryUnitText2) => setAttributes({ salaryUnitText: salaryUnitText2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u56FA\u5B9A\u984D", type: "number", value: salaryValue, onChange: (salaryValue2) => setAttributes({ salaryValue: salaryValue2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u4E0B\u9650\u984D", type: "number", value: salaryMinValue, onChange: (salaryMinValue2) => setAttributes({ salaryMinValue: salaryMinValue2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u4E0A\u9650\u984D", type: "number", value: salaryMaxValue, onChange: (salaryMaxValue2) => setAttributes({ salaryMaxValue: salaryMaxValue2 }) }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u901A\u8CA8\u30B3\u30FC\u30C9", value: salaryCurrency, onChange: (salaryCurrency2) => setAttributes({ salaryCurrency: salaryCurrency2 }) })), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u5FDC\u52DF", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u5FDC\u52DF\u5148URL", type: "url", value: applicationUrl, onChange: (applicationUrl2) => setAttributes({ applicationUrl: applicationUrl2 }) }), /* @__PURE__ */ wp.element.createElement(ToggleControl, { label: "\u5FDC\u52DF\u5148URL\u304B\u3089\u76F4\u63A5\u5FDC\u52DF\u3067\u304D\u308B", checked: directApply, onChange: (directApply2) => setAttributes({ directApply: directApply2 }) }))), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("article", { ...useBlockProps({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, /* @__PURE__ */ wp.element.createElement(RichText, { tagName: HeadingTag, className: "_title", value: title, onChange: (title2) => setAttributes({ title: title2 }), placeholder: "\u52DF\u96C6\u8077\u7A2E" }), hiringOrganizationName && /* @__PURE__ */ wp.element.createElement("p", { className: "_organization" }, hiringOrganizationName)), /* @__PURE__ */ wp.element.createElement(RichText, { tagName: "div", className: "_description", value: description, onChange: (description2) => setAttributes({ description: description2 }), placeholder: "\u4ED5\u4E8B\u5185\u5BB9\u3092\u5165\u529B" }), /* @__PURE__ */ wp.element.createElement("dl", { className: "_details" }, getEmploymentTypeLabel(employmentType) && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u96C7\u7528\u5F62\u614B"), /* @__PURE__ */ wp.element.createElement("dd", null, getEmploymentTypeLabel(employmentType))), location && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u52E4\u52D9\u5730"), /* @__PURE__ */ wp.element.createElement("dd", null, location)), salary && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u7D66\u4E0E"), /* @__PURE__ */ wp.element.createElement("dd", null, salary)), datePosted && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u63B2\u8F09\u65E5"), /* @__PURE__ */ wp.element.createElement("dd", null, datePosted)), validThrough && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u63B2\u8F09\u7D42\u4E86\u65E5"), /* @__PURE__ */ wp.element.createElement("dd", null, validThrough))), applicationUrl && /* @__PURE__ */ wp.element.createElement("p", { className: "_apply" }, /* @__PURE__ */ wp.element.createElement("span", { className: "_button" }, "\u5FDC\u52DF\u3059\u308B")))));
    },
    save({ attributes }) {
      const { RichText, useBlockProps } = wp.blockEditor;
      const { classes, vars, HeadingTag, title, description, hiringOrganizationName, employmentType = [], datePosted, validThrough, applicationUrl } = attributes;
      const location = attributes.jobLocationType === "TELECOMMUTE" ? `\u30EA\u30E2\u30FC\u30C8\uFF08${attributes.applicantLocationRequirements || "\u5730\u57DF\u672A\u6307\u5B9A"}\uFF09` : [attributes.addressRegion, attributes.addressLocality, attributes.streetAddress].filter(Boolean).join("");
      const salary = getSalaryLabel(attributes);
      const structuredData = createStructuredData(attributes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("article", { ...useBlockProps.save({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: title }), hiringOrganizationName && /* @__PURE__ */ wp.element.createElement("p", { className: "_organization" }, hiringOrganizationName)), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_description", value: description }), /* @__PURE__ */ wp.element.createElement("dl", { className: "_details" }, getEmploymentTypeLabel(employmentType) && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u96C7\u7528\u5F62\u614B"), /* @__PURE__ */ wp.element.createElement("dd", null, getEmploymentTypeLabel(employmentType))), location && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u52E4\u52D9\u5730"), /* @__PURE__ */ wp.element.createElement("dd", null, location)), salary && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u7D66\u4E0E"), /* @__PURE__ */ wp.element.createElement("dd", null, salary)), datePosted && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u63B2\u8F09\u65E5"), /* @__PURE__ */ wp.element.createElement("dd", null, datePosted)), validThrough && /* @__PURE__ */ wp.element.createElement("div", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("dt", null, "\u63B2\u8F09\u7D42\u4E86\u65E5"), /* @__PURE__ */ wp.element.createElement("dd", null, validThrough))), applicationUrl && /* @__PURE__ */ wp.element.createElement("p", { className: "_apply" }, /* @__PURE__ */ wp.element.createElement("a", { className: "_button", href: applicationUrl }, "\u5FDC\u52DF\u3059\u308B")))), /* @__PURE__ */ wp.element.createElement("script", { type: "application/ld+json" }, JSON.stringify(structuredData).replace(/</g, "\\u003c")));
    }
  });
})();
