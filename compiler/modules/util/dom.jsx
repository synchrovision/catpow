export const el=(tag,props,children,namespace)=>{
	const el=namespace?document.createElementNS(namespace,tag):document.createElement(tag);;
	const appendChild=(child)=>{
		if(child instanceof Node){
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
		el.setAttribute(key,props[key]);
	});
	appendChild(children);
	return el;
};
export const xhtmlEl=(tag,props,children)=>el(tag,props,children,'http://www.w3.org/1999/xhtml');
export const svgEl=(tag,props,children)=>el(tag,props,children,'http://www.w3.org/2000/svg');
export const mathEl=(tag,props,children)=>el(tag,props,children,'http://www.w3.org/1998/Math/MathML');