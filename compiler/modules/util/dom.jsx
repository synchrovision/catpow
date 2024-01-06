export const el=(tag,props,children)=>{
	const el=document.createElement(tag);
	Object.keys(props).forEach((key)=>{
		el[key]=props[key];
	});
	if(Array.isArray(children)){
		children.forEach((child)=>{
			if(typeof child === 'string'){
				el.appendChild(document.createTextNode(child));
			}
			else{el.appendChild(child);}
		});
	}
	return el;
};