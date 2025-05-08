import { CP } from "./CP.jsx";

CP.ItemControlInfoPanel = () => {
	const { PanelBody } = wp.components;
	return (
		<PanelBody title="操作" initialOpen={false} icon="info">
			<table>
				<tbody>
					<tr>
						<th>⌘/Ctrl + S</th>
						<td>保存</td>
					</tr>
					<tr>
						<th>⌘/Ctrl + D</th>
						<td>複製</td>
					</tr>
					<tr>
						<th>⌘/Ctrl + delete</th>
						<td>削除</td>
					</tr>
					<tr>
						<th>⌘/Ctrl + ↑</th>
						<td>前のアイテムと入れ替え</td>
					</tr>
					<tr>
						<th>⌘/Ctrl + ↓</th>
						<td>次のアイテムと入れ替え</td>
					</tr>
				</tbody>
			</table>
		</PanelBody>
	);
};
