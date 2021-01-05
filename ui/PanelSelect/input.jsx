/*
絞り込み選択のUI

*/
Catpow.UI.PanelSelect=(props)=>{
	var classes='PanelSelect';
	const {useState}=wp.element;
	const [value,setValue]=useState(props.value);
	const limit=props.limit || false;
	
	return (
		<div className={'PanelSelect'}>
			<ul class="items">
				{props.items.map((item)=>{
					const isActive=value.indexOf(item.value)>0;

				})}
			</ul>
			<Catpow.UI.HiddenValues name={props.name} value={value}/>
		</div>
	);
}