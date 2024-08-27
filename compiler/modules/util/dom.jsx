export const el=(tag,props,children)=>{
	const el=document.createElement(tag);
	const appendChild=(child)=>{
		if(child instanceof HTMLElement){
			el.appendChild(child);
		}
		else if(typeof child === 'string'){
			el.appendChild(document.createTextNode(child));
		}
		else if(Array.isArray(child)){
			child.forEach(appendChild);
		}
		else{
			console.error('can not append child : ',child);
		}
	}
	Object.keys(props).forEach((key)=>{
		el[key]=props[key];
	});
	appendChild(children);
	return el;
};