/**
 * Finderの表示項目を絞り込みするコンポーネント
 */

Catpow.Finder.FilterControl = (props) => {
	const { useState, useContext } = wp.element;
	const { __ } = wp.i18n;
	const { state, dispatch } = useContext(Catpow.FinderContext);
	const [open, setOpen] = useState(false);
	const { cols } = state.index;

	return (
		<div className="cp-finder-control cp-finder-filtercontrol">
			<ul className="items">
				<li className={"item" + (Object.keys(state.query).length ? " active" : "")}>
					<div className={"icon dashicons dashicons-filter"} onClick={() => setOpen(!open)}></div>
					<Catpow.Popover open={open}>
						<table className="cp-finder-filtercontrol__table">
							<tbody className="cp-finder-filtercontrol__table-tbody">
								{Object.keys(state.index.cols).map((key) => {
									const col = state.index.cols[key];
									if (col.role === "group") {
										return (
											<tr className="cp-finder-filtercontrol__table-tbody-tr" key={key}>
												<th className="cp-finder-filtercontrol__table-tbody-tr-th">{col.label}</th>
												<td className="cp-finder-filtercontrol__table-tbody-tr-td">
													{Object.keys(col.dict).map((val) => {
														const isActive = state.query[key] && state.query[key].indexOf(val) !== -1;
														return (
															<Catpow.CheckBox label={col.dict[val]} selected={isActive} onChange={(selected) => dispatch({ type: (selected ? "add" : "remove") + "Query", key, val })} key={val} />
														);
													})}
												</td>
											</tr>
										);
									}
									return false;
								})}
							</tbody>
						</table>
					</Catpow.Popover>
				</li>
			</ul>
		</div>
	);
};
