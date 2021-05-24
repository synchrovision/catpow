Catpow.Finder.Focused=(props)=>{
	const {useState,useCallback,useContext}=wp.element;
	const {__,sprintf}=wp.i18n;
	const {state,dispatch,info}=useContext(Catpow.FinderContext);
	const {roleGroups}=info;
	const {cols}=state.index;
	
	const flagsToWords=useCallback((classes)=>Object.keys(classes).filter((key)=>classes[key]).join(' '),[]);
	const hasRoleGroup=useCallback((group)=>{
		return !roleGroups[group].every((role)=>!state.colsByRole[role] || !state.colsByRole[role].length);
	},[state.colsByRole,roleGroups]);
	const ucfirst=useCallback((str)=>str.charAt(0).toUpperCase()+str.slice(1),[]);
	
	const flags={FinderFocused:true};
	Object.keys(roleGroups).map((group)=>{
		flags['has'+ucfirst(group)]=hasRoleGroup(group);
	});
	
	return (
		<div className={flagsToWords(flags)}>
			<table class="items">
			{Object.keys(roleGroups).map((group)=>{
				if(!hasRoleGroup(group)){return false;}
				return roleGroups[group].map((role)=>{
					if(!state.colsByRole[role] || !state.colsByRole[role].length){return false;}
					return state.colsByRole[role].map((col)=>(
						<tr class="item">
							<th class="label">{col.label}</th>
							<td class="value"><Catpow.Output conf={col} {...state.focused[col.name]}/></td>
						</tr>
					))
				});
			})}
			</table>
		</div>
	);
}