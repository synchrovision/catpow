import { Bem } from "catpow/component";
import { flagsToClassNames } from "catpow/util";

Catpow.Finder.Focused = (props) => {
	const { useState, useCallback, useContext } = wp.element;
	const { __, sprintf } = wp.i18n;
	const { state, dispatch, info } = useContext(Catpow.FinderContext);
	const { roleGroups } = info;
	const { cols } = state.index;

	const hasRoleGroup = useCallback(
		(group) => {
			return !roleGroups[group].every((role) => !state.colsByRole[role] || !state.colsByRole[role].length);
		},
		[state.colsByRole, roleGroups]
	);
	const ucfirst = useCallback((str) => str.charAt(0).toUpperCase() + str.slice(1), []);

	const flags = { cpFinderFocused: true };
	Object.keys(roleGroups).map((group) => {
		flags["has" + ucfirst(group)] = hasRoleGroup(group);
	});

	return (
		<Bem prefix="cp-finder">
			<div className={flagsToClassNames(flags)}>
				<table className="_items">
					{Object.keys(roleGroups).map((group) => {
						if (!hasRoleGroup(group)) {
							return false;
						}
						return roleGroups[group].map((role) => {
							if (!state.colsByRole[role] || !state.colsByRole[role].length) {
								return false;
							}
							return state.colsByRole[role].map((col) => (
								<tr className="_item">
									<th className="_label">{col.label}</th>
									<td className="_value">
										<Catpow.Output conf={col} {...state.focused[col.name]} />
									</td>
								</tr>
							));
						});
					})}
				</table>
			</div>
		</Bem>
	);
};
