wp.blocks.registerBlockType("catpow/megamenu", {
	title: "🐾 MegaMenu",
	icon: "clock",
	category: "catpow-embed",
	example: CP.example,
	supports: {
		customClassName: false,
	},
	edit({ attributes, setAttributes, className }) {
		const { useState, useCallback, useMemo, useEffect } = wp.element;
		const { InspectorControls, useBlockProps } = wp.blockEditor;
		const { config, resolvedPropsJson = null, EditMode = false } = attributes;

		useEffect(() => {
			wp.apiFetch({
				path: "/cp/v1/blocks/config/megamenu/config",
			})
				.then((res) => {
					setAttributes({ config: res });
				})
				.catch((e) => {
					console.error(e);
				});
		}, []);

		useEffect(() => {
			if (config) {
				updateResolvedPropsJson(attributes.props || config.defaultProps);
			}
		}, [attributes.props, config]);

		const updateResolvedPropsJson = useCallback((props) => {
			if (props) {
				wp.apiFetch({
					path: "/cp/v1/blocks/config/megamenu/resolve",
					method: "POST",
					data: { props },
				})
					.then((res) => {
						setAttributes({ resolvedPropsJson: res.props });
					})
					.catch((e) => {
						console.error(e);
					});
			}
		}, []);

		const resolvedProps = useMemo(() => {
			if (!resolvedPropsJson) {
				return null;
			}
			return JSON.parse(resolvedPropsJson);
		}, [resolvedPropsJson]);

		const onChangeHandle = useCallback((props) => {
			updateResolvedPropsJson(props);
			setAttributes({ props });
		}, []);

		const blockProps = useBlockProps({ className: attributes.classes });
		if (!config || !resolvedProps) {
			return <Catpow.Spinner />;
		}

		return (
			<>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				<div {...blockProps}>
					<Catpow.MegaMenu {...resolvedProps} />
				</div>
				{EditMode && <Catpow.JsonEditor json={attributes.props} debug={false} schema={config.schema} onChange={onChangeHandle} />}
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { useBlockProps } = wp.blockEditor;
		return <div {...useBlockProps.save({ className: attributes.classes })}></div>;
	},
});
