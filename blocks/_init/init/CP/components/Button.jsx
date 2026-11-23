import { clsx } from "clsx";
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;

export const Button = (props) => {
	const { tag: Tag = "div", blockTypeName, attributes, isLink = true, itemKeys, keys, ...otherProps } = props;

	const item = (itemKeys ? CP.getTheItem(props) : attributes) || {};
	const states = CP.classNamesToFlags(item.buttonClasses);

	const LinkTag = isLink ? "a" : "span";
	const href = item[keys?.href ?? "buttonHref"] || "";
	const linkProps = isLink ? { href } : {};
	if (isLink && /^\w+:\/\//.test(href)) {
		Object.assign(linkProps, { rel: "noopener", target: "_blank" });
	}

	return (
		<CP.Bem prefix="wp-block-catpow">
			<Tag className={item.buttonClasses}>
				{states.hasMicroCopy && <RichText.Content tagName="span" className="_copy cp-button__copy" value={item.buttonCopy} />}
				<LinkTag className="-button cp-button__link" {...otherProps} {...CP.extractEventDispatcherAttributes(blockTypeName, attributes, itemKeys)} {...linkProps}>
					{states.hasIcon && <CP.OutputIcon className="_icon cp-button__link-icon" item={item} />}
					<RichText.Content tagName="span" className="_text cp-button__link-text" value={item.buttonText} />
				</LinkTag>
				{states.hasCaption && <RichText.Content tagName="span" className="_caption cp-button__caption" value={item.buttonCaption} />}
			</Tag>
		</CP.Bem>
	);
};
Button.Edit = (props) => {
	const { tag = "div", blockTypeName, setAttributes, attributes, isItem, itemKeys, keys, ...otherProps } = props;
	const { useMemo, useEffect, useState } = wp.element;
	const linkKeys = { ...keys, href: keys?.href ?? "buttonHref" };

	const item = useMemo(() => (itemKeys ? CP.getTheItem(props) : attributes) || {}, [attributes, itemKeys]);
	const states = CP.classNamesToFlags(item.buttonClasses);

	const ItemComponent = isItem ? CP.Item : PlainComponent;

	return (
		<CP.Bem prefix="wp-block-catpow">
			<ItemComponent tag={tag} className={item.buttonClasses} {...{ setAttributes, attributes, itemKeys }}>
				{states.hasMicroCopy && (
					<RichText
						tagName="span"
						className="_copy cp-button__copy"
						value={item.buttonCopy}
						placeholder={__("マイクロコピー", "catpow")}
						onChange={(buttonCopy) => CP.updateItem(props, { buttonCopy })}
					/>
				)}
				<CP.Link.Edit className="-button cp-button__link" {...{ setAttributes, attributes, itemKeys }} keys={linkKeys}>
					{states.hasIcon && <CP.OutputIcon className="_icon cp-button__link-icon" item={item} />}
					<RichText tagName="span" className="_text cp-button__link-text" value={item.buttonText} onChange={(buttonText) => CP.updateItem(props, { buttonText })} />
				</CP.Link.Edit>
				{states.hasCaption && (
					<RichText
						tagName="span"
						className="_caption cp-button__caption"
						value={item.buttonCaption}
						placeholder={__("キャプション", "catpow")}
						onChange={(buttonCaption) => CP.updateItem(props, { buttonCaption })}
					/>
				)}
			</ItemComponent>
		</CP.Bem>
	);
};

const PlainComponent = (props) => {
	const { tag: Tag = "div", setAttributes, attributes, itemKeys = [], children, ...otherProps } = props;
	return <Tag {...otherProps}>{children}</Tag>;
};
