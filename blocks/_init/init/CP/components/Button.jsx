import { clsx } from "clsx";
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;

export const Button = (props) => {
	const { tag: Tag = "div", className, attributes, isLink = true, itemKeys, keys = {}, ...otherProps } = props;

	const item = (itemKeys ? CP.getTheItem(props) : attributes) || {};
	const states = CP.classNamesToFlags(className);

	const LinkTag = isLink ? "a" : "span";
	const linkProps = isLink ? { href: item[keys.href] || "" } : {};
	if (isLink && /^\w+:\/\//.test(item[keys.href])) {
		Object.assign(linkProps, { rel: "noopener", target: "_blank" });
	}

	return (
		<CP.Bem prefix="wp-block-catpow">
			<Tag className={className}>
				{states.hasMicroCopy && <RichText.Content tagName="span" className="_copy cp-button__copy" value={item.copy} />}
				<LinkTag className="-button cp-button__link" {...otherProps} {...linkProps}>
					{states.hasIcon && <CP.OutputIcon className="_icon cp-button__link-icon" item={item} />}
					<RichText.Content tagName="span" className="_text cp-button__link-text" value={item.text} />
				</LinkTag>
				{states.hasCaption && <RichText.Content tagName="span" className="_caption cp-button__caption" value={item.caption} />}
			</Tag>
		</CP.Bem>
	);
};
Button.Edit = (props) => {
	const { tag = "div", className, setAttributes, attributes, isItem, itemKeys, keys = {}, ...otherProps } = props;
	const { useMemo, useEffect, useState } = wp.element;

	const item = useMemo(() => (itemKeys ? CP.getTheItem(props) : attributes) || {}, [attributes, itemKeys]);
	const states = CP.classNamesToFlags(className);

	const ItemComponent = isItem ? CP.Item : PlainComponent;

	return (
		<CP.Bem prefix="wp-block-catpow">
			<ItemComponent tag={tag} className={className} {...{ setAttributes, attributes, itemKeys }}>
				{states.hasMicroCopy && (
					<RichText tagName="span" className="_copy cp-button__copy" value={item.copy} placeholder={__("マイクロコピー", "catpow")} onChange={(copy) => CP.updateItem(props, { copy })} />
				)}
				<CP.Link.Edit className="-button cp-button__link" {...{ setAttributes, attributes, itemKeys, keys }}>
					{states.hasIcon && <CP.OutputIcon className="_icon cp-button__link-icon" item={item} />}
					<RichText tagName="span" className="_text cp-button__link-text" value={item.text} onChange={(text) => CP.updateItem(props, { text })} />
				</CP.Link.Edit>
				{states.hasCaption && (
					<RichText tagName="span" className="_caption cp-button__caption" value={item.caption} placeholder={__("キャプション", "catpow")} onChange={(caption) => CP.updateItem(props, { caption })} />
				)}
			</ItemComponent>
		</CP.Bem>
	);
};

const PlainComponent = (props) => {
	const { tag: Tag = "div", setAttributes, attributes, itemKeys = [], children, ...otherProps } = props;
	return <Tag {...otherProps}>{children}</Tag>;
};
