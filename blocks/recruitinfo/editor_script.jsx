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
	{ label: "正社員（フルタイム）", value: "FULL_TIME" },
	{ label: "パート・アルバイト", value: "PART_TIME" },
	{ label: "業務委託", value: "CONTRACTOR" },
	{ label: "派遣社員", value: "TEMPORARY" },
	{ label: "インターン", value: "INTERN" },
	{ label: "その他", value: "OTHER" },
];

const salaryUnitOptions = [
	{ label: "時給", value: "HOUR" },
	{ label: "日給", value: "DAY" },
	{ label: "週給", value: "WEEK" },
	{ label: "月給", value: "MONTH" },
	{ label: "年俸", value: "YEAR" },
];

const getEmploymentTypeLabel = (values = []) =>
	employmentTypeOptions
		.filter(({ value }) => values.includes(value))
		.map(({ label }) => label)
		.join("、");

const getSalaryLabel = ({ salaryValue, salaryMinValue, salaryMaxValue, salaryCurrency, salaryUnitText }) => {
	const unit = salaryUnitOptions.find(({ value }) => value === salaryUnitText)?.label || "";
	const currency = salaryCurrency === "JPY" ? "円" : ` ${salaryCurrency}`;
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
					label: "タイプ",
					values: { isTypeFlat: "フラット", isTypeCard: "カード", isTypeFrame: "フーレム" },
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
		const location = jobLocationType === "TELECOMMUTE" ? `リモート（${applicantLocationRequirements || "地域未指定"}）` : [addressRegion, addressLocality, streetAddress].filter(Boolean).join("");
		const salary = getSalaryLabel(attributes);

		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title="設定" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="掲載情報" initialOpen={true}>
						<TextControl label="掲載日" type="date" value={datePosted} onChange={(datePosted) => setAttributes({ datePosted })} />
						<TextControl label="掲載終了日" type="date" value={validThrough} onChange={(validThrough) => setAttributes({ validThrough })} />
						<TextControl label="求人ID" value={identifier} onChange={(identifier) => setAttributes({ identifier })} />
					</PanelBody>
					<PanelBody title="雇用形態" initialOpen={false}>
						{employmentTypeOptions.map((option) => (
							<CheckboxControl key={option.value} label={option.label} checked={employmentType.includes(option.value)} onChange={(checked) => updateEmploymentType(option.value, checked)} />
						))}
					</PanelBody>
					<PanelBody title="雇用主" initialOpen={false}>
						<TextControl label="組織名" value={hiringOrganizationName} onChange={(hiringOrganizationName) => setAttributes({ hiringOrganizationName })} />
						<TextControl label="組織URL" type="url" value={hiringOrganizationSameAs} onChange={(hiringOrganizationSameAs) => setAttributes({ hiringOrganizationSameAs })} />
						<TextControl label="ロゴ画像URL" type="url" value={hiringOrganizationLogo} onChange={(hiringOrganizationLogo) => setAttributes({ hiringOrganizationLogo })} />
					</PanelBody>
					<PanelBody title="勤務地" initialOpen={false}>
						<SelectControl
							label="勤務形態"
							value={jobLocationType}
							options={[
								{ label: "勤務地へ出勤", value: "" },
								{ label: "完全リモート", value: "TELECOMMUTE" },
							]}
							onChange={(jobLocationType) => setAttributes({ jobLocationType })}
						/>
						{jobLocationType === "TELECOMMUTE" ? (
							<TextControl label="応募可能地域（国名）" value={applicantLocationRequirements} onChange={(applicantLocationRequirements) => setAttributes({ applicantLocationRequirements })} />
						) : (
							<>
								<TextControl label="国コード" value={addressCountry} onChange={(addressCountry) => setAttributes({ addressCountry })} />
								<TextControl label="都道府県" value={addressRegion} onChange={(addressRegion) => setAttributes({ addressRegion })} />
								<TextControl label="市区町村" value={addressLocality} onChange={(addressLocality) => setAttributes({ addressLocality })} />
								<TextControl label="町名・番地・建物名" value={streetAddress} onChange={(streetAddress) => setAttributes({ streetAddress })} />
								<TextControl label="郵便番号" value={postalCode} onChange={(postalCode) => setAttributes({ postalCode })} />
							</>
						)}
					</PanelBody>
					<PanelBody title="給与" initialOpen={false}>
						<SelectControl label="単位" value={salaryUnitText} options={salaryUnitOptions} onChange={(salaryUnitText) => setAttributes({ salaryUnitText })} />
						<TextControl label="固定額" type="number" value={salaryValue} onChange={(salaryValue) => setAttributes({ salaryValue })} />
						<TextControl label="下限額" type="number" value={salaryMinValue} onChange={(salaryMinValue) => setAttributes({ salaryMinValue })} />
						<TextControl label="上限額" type="number" value={salaryMaxValue} onChange={(salaryMaxValue) => setAttributes({ salaryMaxValue })} />
						<TextControl label="通貨コード" value={salaryCurrency} onChange={(salaryCurrency) => setAttributes({ salaryCurrency })} />
					</PanelBody>
					<PanelBody title="応募" initialOpen={false}>
						<TextControl label="応募先URL" type="url" value={applicationUrl} onChange={(applicationUrl) => setAttributes({ applicationUrl })} />
						<ToggleControl label="応募先URLから直接応募できる" checked={directApply} onChange={(directApply) => setAttributes({ directApply })} />
					</PanelBody>
				</InspectorControls>
				<CP.Bem prefix="wp-block-catpow">
					<article {...useBlockProps({ className: classes, style: vars })}>
						<header className="_header">
							<RichText tagName={HeadingTag} className="_title" value={title} onChange={(title) => setAttributes({ title })} placeholder="募集職種" />
							{hiringOrganizationName && <p className="_organization">{hiringOrganizationName}</p>}
						</header>
						<RichText tagName="div" className="_description" value={description} onChange={(description) => setAttributes({ description })} placeholder="仕事内容を入力" />
						<dl className="_details">
							{getEmploymentTypeLabel(employmentType) && (
								<div className="_item">
									<dt>雇用形態</dt>
									<dd>{getEmploymentTypeLabel(employmentType)}</dd>
								</div>
							)}
							{location && (
								<div className="_item">
									<dt>勤務地</dt>
									<dd>{location}</dd>
								</div>
							)}
							{salary && (
								<div className="_item">
									<dt>給与</dt>
									<dd>{salary}</dd>
								</div>
							)}
							{datePosted && (
								<div className="_item">
									<dt>掲載日</dt>
									<dd>{datePosted}</dd>
								</div>
							)}
							{validThrough && (
								<div className="_item">
									<dt>掲載終了日</dt>
									<dd>{validThrough}</dd>
								</div>
							)}
						</dl>
						{applicationUrl && (
							<p className="_apply">
								<span className="_button">応募する</span>
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
				? `リモート（${attributes.applicantLocationRequirements || "地域未指定"}）`
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
									<dt>雇用形態</dt>
									<dd>{getEmploymentTypeLabel(employmentType)}</dd>
								</div>
							)}
							{location && (
								<div className="_item">
									<dt>勤務地</dt>
									<dd>{location}</dd>
								</div>
							)}
							{salary && (
								<div className="_item">
									<dt>給与</dt>
									<dd>{salary}</dd>
								</div>
							)}
							{datePosted && (
								<div className="_item">
									<dt>掲載日</dt>
									<dd>{datePosted}</dd>
								</div>
							)}
							{validThrough && (
								<div className="_item">
									<dt>掲載終了日</dt>
									<dd>{validThrough}</dd>
								</div>
							)}
						</dl>
						{applicationUrl && (
							<p className="_apply">
								<a className="_button" href={applicationUrl}>
									応募する
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
