/* global wp Catpow*/
Catpow.util.ready(()=>{
	document.body.addEventListener('click',(e)=>{
		const unit=e.target.closest('[data-role="cp-meta-item-unit"]');
		if(unit){
			const decButton=e.target.closest('[data-role="cp-input-item-decrease"]');
			const incButton=e.target.closest('[data-role="cp-input-item-increase"]');
			if(decButton){
				unit.remove();
				document.dispatchEvent(new CustomEvent('update_form'));
			}
			else if(incButton){
				unit.after(unit.cloneNode(true));
				reset_multiple_input_attr(unit.closest('[data-role="cp-meta-item"]'));
				document.dispatchEvent(new CustomEvent('update_form'));
			}
		}
	});
});

function reset_multiple_input_attr(item){
	item.querySelectorAll('[data-role="cp-meta-item-unit"]').forEach((el)=>{
		if(document.getElementById(el.id)===el)return;
		var orgID=el.id;
		var path=orgID.split('--');
		var n=parseInt(path.pop());
		var m=n+1;
		var baseID=path.join('--');
		var newID=baseID+'--'+m;
		while(document.getElementById(newID)){m++;newID=baseID+'--'+m;}
		var baseName=path[0]+'['+path.slice(1).join('][')+']';
		var orgName=baseName+'['+n+']';
		var newName=baseName+'['+m+']';
		el.id=newID;
		el.querySelectorAll(':input,[id^="'+orgID+'"]').forEach((el)=>{
			if(el.name){
				el.name=el.name.replace(orgName,newName);
			}
			if(el.id){
				el.id=el.id.replace(orgID,newID);
				var label=el.closest('label');
				if(label && label.htmlFor){
					label.htmlFor=label.htmlFor.replace(orgID,newID);
				}
			}
		});
		el.querySelectorAll('[data-ui]').forEach((el)=>{
			var props=JSON.parse(JSON.stringify(window.Catpow.UI.props[el.id.replace(newID,orgID)]));
			props.name=props.name.replace(orgName,newName);
			window.Catpow.UI.props[el.id]=props;
			wp.element.render(
				wp.element.createElement(
					window.Catpow.UI[el.dataset.ui],
					props
				),
				el
			);
		});
	});
}