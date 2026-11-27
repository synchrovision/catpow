const { __, sprintf } = wp.i18n;

const { useMemo } = wp.element;

const getPlainText = (html) => wp.richText.getTextContent(wp.richText.create({ html: String(html || "") }));

const compact = (value) => {
	if (Array.isArray(value)) {
		const values = value.map(compact).filter((item) => item !== undefined);
		return values.length ? values : undefined;
	}
	if (value && typeof value === "object") {
		const object = Object.entries(value).reduce((result, [key, item]) => {
			const compacted = compact(item);
			if (compacted !== undefined) {
				result[key] = compacted;
			}
			return result;
		}, {});
		return Object.keys(object).length ? object : undefined;
	}
	if (value === "" || value === null || value === undefined) {
		return undefined;
	}
	return value;
};

const employmentTypeOptions = [
	{ label: __("正社員（フルタイム）", "catpow"), value: "FULL_TIME" },
	{ label: __("パート・アルバイト", "catpow"), value: "PART_TIME" },
	{ label: __("業務委託", "catpow"), value: "CONTRACTOR" },
	{ label: __("派遣社員", "catpow"), value: "TEMPORARY" },
	{ label: __("インターン", "catpow"), value: "INTERN" },
	{ label: __("その他", "catpow"), value: "OTHER" },
];

const salaryUnitOptions = [
	{ label: __("時給", "catpow"), value: "HOUR" },
	{ label: __("日給", "catpow"), value: "DAY" },
	{ label: __("週給", "catpow"), value: "WEEK" },
	{ label: __("月給", "catpow"), value: "MONTH" },
	{ label: __("年俸", "catpow"), value: "YEAR" },
];

const getEmploymentTypeLabel = (values = []) =>
	employmentTypeOptions
		.filter(({ value }) => values.includes(value))
		.map(({ label }) => label)
		.join("、");

const getSalaryLabel = ({ salaryValue, salaryMinValue, salaryMaxValue, salaryCurrency, salaryUnitText }) => {
	const unit = salaryUnitOptions.find(({ value }) => value === salaryUnitText)?.label || "";
	const currency = salaryCurrency === "JPY" ? __("円", "catpow") : ` ${salaryCurrency}`;
	if (salaryValue) {
		return `${unit} ${salaryValue}${currency}`;
	}
	if (salaryMinValue || salaryMaxValue) {
		return `${unit} ${salaryMinValue || "—"}〜${salaryMaxValue || "—"}${currency}`;
	}
	return "";
};

const createStructuredData = (attributes) => {
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
		directApply,
	} = attributes;
	const quantitativeValue = salaryValue
		? { "@type": "QuantitativeValue", value: salaryValue, unitText: salaryUnitText }
		: { "@type": "QuantitativeValue", minValue: salaryMinValue, maxValue: salaryMaxValue, unitText: salaryUnitText };
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
			logo: hiringOrganizationLogo,
		},
		identifier: identifier
			? {
					"@type": "PropertyValue",
					name: hiringOrganizationName,
					value: identifier,
				}
			: undefined,
		jobLocation:
			jobLocationType === "TELECOMMUTE"
				? undefined
				: {
						"@type": "Place",
						address: {
							"@type": "PostalAddress",
							addressCountry,
							addressRegion,
							addressLocality,
							streetAddress,
							postalCode,
						},
					},
		jobLocationType,
		applicantLocationRequirements: jobLocationType === "TELECOMMUTE" && applicantLocationRequirements ? { "@type": "Country", name: applicantLocationRequirements } : undefined,
		baseSalary:
			salaryValue || salaryMinValue || salaryMaxValue
				? {
						"@type": "MonetaryAmount",
						currency: salaryCurrency,
						value: quantitativeValue,
					}
				: undefined,
		url: applicationUrl,
		directApply,
	});
};

wp.blocks.registerBlockType("catpow/recruitinfo", {
	example: CP.example,
	edit({ attributes, setAttributes }) {
		const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { CheckboxControl, PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;
		const {
			isTemplate,
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
			directApply,
		} = attributes;

		const selectiveClasses = useMemo(() => {
			var selectiveClasses = [
				{
					name: "type",
					type: "buttons",
					label: __("タイプ", "catpow"),
					values: { isTypeFlat: __("フラット", "catpow"), isTypeCard: __("カード", "catpow"), isTypeFrame: __("フーレム", "catpow") },
				},
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.recruitinfo.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const updateEmploymentType = (value, checked) =>
			setAttributes({
				employmentType: checked ? [...new Set([...employmentType, value])] : employmentType.filter((item) => item !== value),
			});
		const location = jobLocationType === "TELECOMMUTE" ? sprintf(__("リモート（%s）", "catpow"), applicantLocationRequirements || __("地域未指定", "catpow")) : [addressRegion, addressLocality, streetAddress].filter(Boolean).join("");
		const salary = getSalaryLabel(attributes);

		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title={__("設定", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title={__("掲載情報", "catpow")} initialOpen={true}>
						<TextControl label={__("掲載日", "catpow")} type="date" value={datePosted} onChange={(datePosted) => setAttributes({ datePosted })} />
						<TextControl label={__("掲載終了日", "catpow")} type="date" value={validThrough} onChange={(validThrough) => setAttributes({ validThrough })} />
						<TextControl label={__("求人ID", "catpow")} value={identifier} onChange={(identifier) => setAttributes({ identifier })} />
					</PanelBody>
					<PanelBody title={__("雇用形態", "catpow")} initialOpen={false}>
						{employmentTypeOptions.map((option) => (
							<CheckboxControl key={option.value} label={option.label} checked={employmentType.includes(option.value)} onChange={(checked) => updateEmploymentType(option.value, checked)} />
						))}
					</PanelBody>
					<PanelBody title={__("雇用主", "catpow")} initialOpen={false}>
						<TextControl label={__("組織名", "catpow")} value={hiringOrganizationName} onChange={(hiringOrganizationName) => setAttributes({ hiringOrganizationName })} />
						<TextControl label={__("組織URL", "catpow")} type="url" value={hiringOrganizationSameAs} onChange={(hiringOrganizationSameAs) => setAttributes({ hiringOrganizationSameAs })} />
						<TextControl label={__("ロゴ画像URL", "catpow")} type="url" value={hiringOrganizationLogo} onChange={(hiringOrganizationLogo) => setAttributes({ hiringOrganizationLogo })} />
					</PanelBody>
					<PanelBody title={__("勤務地", "catpow")} initialOpen={false}>
						<SelectControl
							label={__("勤務形態", "catpow")}
							value={jobLocationType}
							options={[
								{ label: __("勤務地へ出勤", "catpow"), value: "" },
								{ label: __("完全リモート", "catpow"), value: "TELECOMMUTE" },
							]}
							onChange={(jobLocationType) => setAttributes({ jobLocationType })}
						/>
						{jobLocationType === "TELECOMMUTE" ? (
							<TextControl label={__("応募可能地域（国名）", "catpow")} value={applicantLocationRequirements} onChange={(applicantLocationRequirements) => setAttributes({ applicantLocationRequirements })} />
						) : (
							<>
								<TextControl label={__("国コード", "catpow")} value={addressCountry} onChange={(addressCountry) => setAttributes({ addressCountry })} />
								<TextControl label={__("都道府県", "catpow")} value={addressRegion} onChange={(addressRegion) => setAttributes({ addressRegion })} />
								<TextControl label={__("市区町村", "catpow")} value={addressLocality} onChange={(addressLocality) => setAttributes({ addressLocality })} />
								<TextControl label={__("町名・番地・建物名", "catpow")} value={streetAddress} onChange={(streetAddress) => setAttributes({ streetAddress })} />
								<TextControl label={__("郵便番号", "catpow")} value={postalCode} onChange={(postalCode) => setAttributes({ postalCode })} />
							</>
						)}
					</PanelBody>
					<PanelBody title={__("給与", "catpow")} initialOpen={false}>
						<SelectControl label={__("単位", "catpow")} value={salaryUnitText} options={salaryUnitOptions} onChange={(salaryUnitText) => setAttributes({ salaryUnitText })} />
						<TextControl label={__("固定額", "catpow")} type="number" value={salaryValue} onChange={(salaryValue) => setAttributes({ salaryValue })} />
						<TextControl label={__("下限額", "catpow")} type="number" value={salaryMinValue} onChange={(salaryMinValue) => setAttributes({ salaryMinValue })} />
						<TextControl label={__("上限額", "catpow")} type="number" value={salaryMaxValue} onChange={(salaryMaxValue) => setAttributes({ salaryMaxValue })} />
						<TextControl label={__("通貨コード", "catpow")} value={salaryCurrency} onChange={(salaryCurrency) => setAttributes({ salaryCurrency })} />
					</PanelBody>
					<PanelBody title={__("応募", "catpow")} initialOpen={false}>
						<TextControl label={__("応募先URL", "catpow")} type="url" value={applicationUrl} onChange={(applicationUrl) => setAttributes({ applicationUrl })} />
						<ToggleControl label={__("応募先URLから直接応募できる", "catpow")} checked={directApply} onChange={(directApply) => setAttributes({ directApply })} />
					</PanelBody>
				</InspectorControls>
				<CP.Bem prefix="wp-block-catpow">
					<article {...useBlockProps({ className: classes, style: vars })}>
						<header className="_header">
							<RichText tagName={HeadingTag} className="_title" value={title} onChange={(title) => setAttributes({ title })} placeholder={__("募集職種", "catpow")} />
							{hiringOrganizationName && <p className="_organization">{hiringOrganizationName}</p>}
						</header>
						<RichText tagName="div" className="_description" value={description} onChange={(description) => setAttributes({ description })} placeholder={__("仕事内容を入力", "catpow")} />
						<dl className="_details">
							{getEmploymentTypeLabel(employmentType) && (
								<div className="_item">
									<dt>{__("雇用形態", "catpow")}</dt>
									<dd>{getEmploymentTypeLabel(employmentType)}</dd>
								</div>
							)}
							{location && (
								<div className="_item">
									<dt>{__("勤務地", "catpow")}</dt>
									<dd>{location}</dd>
								</div>
							)}
							{salary && (
								<div className="_item">
									<dt>{__("給与", "catpow")}</dt>
									<dd>{salary}</dd>
								</div>
							)}
							{datePosted && (
								<div className="_item">
									<dt>{__("掲載日", "catpow")}</dt>
									<dd>{datePosted}</dd>
								</div>
							)}
							{validThrough && (
								<div className="_item">
									<dt>{__("掲載終了日", "catpow")}</dt>
									<dd>{validThrough}</dd>
								</div>
							)}
						</dl>
						{applicationUrl && (
							<p className="_apply">
								<span className="_button">{__("応募する", "catpow")}</span>
							</p>
						)}
					</article>
				</CP.Bem>
			</>
		);
	},
	save({ attributes }) {
		const { RichText, useBlockProps } = wp.blockEditor;
		const { classes, vars, HeadingTag, title, description, hiringOrganizationName, employmentType = [], datePosted, validThrough, applicationUrl } = attributes;
		const location =
			attributes.jobLocationType === "TELECOMMUTE"
				? sprintf(__("リモート（%s）", "catpow"), attributes.applicantLocationRequirements || __("地域未指定", "catpow"))
				: [attributes.addressRegion, attributes.addressLocality, attributes.streetAddress].filter(Boolean).join("");
		const salary = getSalaryLabel(attributes);
		const structuredData = createStructuredData(attributes);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<article {...useBlockProps.save({ className: classes, style: vars })}>
						<header className="_header">
							<RichText.Content tagName={HeadingTag} className="_title" value={title} />
							{hiringOrganizationName && <p className="_organization">{hiringOrganizationName}</p>}
						</header>
						<RichText.Content tagName="div" className="_description" value={description} />
						<dl className="_details">
							{getEmploymentTypeLabel(employmentType) && (
								<div className="_item">
									<dt>{__("雇用形態", "catpow")}</dt>
									<dd>{getEmploymentTypeLabel(employmentType)}</dd>
								</div>
							)}
							{location && (
								<div className="_item">
									<dt>{__("勤務地", "catpow")}</dt>
									<dd>{location}</dd>
								</div>
							)}
							{salary && (
								<div className="_item">
									<dt>{__("給与", "catpow")}</dt>
									<dd>{salary}</dd>
								</div>
							)}
							{datePosted && (
								<div className="_item">
									<dt>{__("掲載日", "catpow")}</dt>
									<dd>{datePosted}</dd>
								</div>
							)}
							{validThrough && (
								<div className="_item">
									<dt>{__("掲載終了日", "catpow")}</dt>
									<dd>{validThrough}</dd>
								</div>
							)}
						</dl>
						{applicationUrl && (
							<p className="_apply">
								<a className="_button" href={applicationUrl}>
									{__("応募する", "catpow")}
								</a>
							</p>
						)}
					</article>
				</CP.Bem>
				<script type="application/ld+json">{JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>
			</>
		);
	},
});
