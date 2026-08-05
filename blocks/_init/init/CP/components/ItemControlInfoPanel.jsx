const { __ } = wp.i18n;

export const ItemControlInfoPanel = () => {
	const { PanelBody } = wp.components;
	return (
		<PanelBody title={__("操作", "catpow")} initialOpen={false} icon="info">
			<table>
				<tbody>
					<tr>
						<th>⌘/Ctrl + S</th>
						<td>{__("保存", "catpow")}</td>
					</tr>
					<tr>
						<th>⌘/Ctrl + D</th>
						<td>{__("複製", "catpow")}</td>
					</tr>
					<tr>
						<th>⌘/Ctrl + delete</th>
						<td>{__("削除", "catpow")}</td>
					</tr>
					<tr>
						<th>⌘/Ctrl + ↑</th>
						<td>{__("前のアイテムと入れ替え", "catpow")}</td>
					</tr>
					<tr>
						<th>⌘/Ctrl + ↓</th>
						<td>{__("次のアイテムと入れ替え", "catpow")}</td>
					</tr>
				</tbody>
			</table>
		</PanelBody>
	);
};
