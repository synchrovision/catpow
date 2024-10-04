/* global console wp Catpow*/

Catpow.util.ready(()=>{
	const renderComponent=(el)=>{
		const component=wp.element.createElement(Catpow[el.dataset.cpComponent],JSON.parse(el.textContent));
		wp.element.render(component,el);
	}
	const observer=new MutationObserver((mutationList)=>{
		mutationList.forEach((mutation)=>{
			if(mutation.type==='childList'){
				mutation.addedNodes.forEach((node)=>{
					if(node.nodeType!==Node.ELEMENT_NODE){return;}
					node.querySelectorAll('[data-cp-component]').forEach(renderComponent);
				});
			}
		});
	});
	document.querySelectorAll('[data-cp-component]').forEach(renderComponent);
	observer.observe(document.body,{childList:true,subtree:true});
});