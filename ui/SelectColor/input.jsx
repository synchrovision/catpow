Catpow.UI.SelectColor=(props)=>{
	const {useMemo,useState,useCallback}=wp.element;
	const {name}=props;
	const [value,setValue]=useState(props.value);
	const {bem}=Catpow.util;
	const classes=bem('SelectColor');
	
	const parseColorClass=useCallback((colorClass)=>{
		if(colorClass){
			const matches=colorClass.match(/^color((|_|\-\-)(\-?\d+))$/);
			if(matches){
				return {
					fixed:matches[2]==='--',
					absolute:matches[2]==='',
					relative:matches[2]==='_',
					value:matches[3]
				};
			}
		}
		return {fixed:false,absolute:false,relative:false,value:0};
	});
	const generateColorClass=useCallback((data)=>'color'+(data.fixed?'--':(data.relative?'_':''))+data.value,[]);
	const data=useMemo(()=>parseColorClass(value),[value]);
	
	const Selections=useCallback((props)=>{
		const {fixed=false,absolute=false,relative=false,active=false,selected}=props;
		return (
			<ul className={classes.items({fixed,absolute,relative,active})}>
				{Array.from(Array(13),(v,value)=>{
					const colorClass=generateColorClass({fixed,absolute,relative,value})
					return (
						<li
							className={classes.items.item(colorClass,{active:colorClass==selected,fixed,absolute,relative})}
							onClick={()=>setValue(colorClass)}
							key={colorClass}
						> </li>
					);
				})}
			</ul>
		);
	},[]);
	
	return (
		<div className={classes()}>
			<Selections selected={value} fixed={true} active={data.fixed}/>
			<Selections selected={value} absolute={true} active={data.absolute}/>
			<Selections selected={value} relative={true} active={data.relative}/>
			<Catpow.UI.HiddenValues name={name} value={value}/>
		</div>
	);
}