export const observeSelector=(selector,callback)=>{
	const observer=new MutationObserver((mutationList)=>{
		mutationList.forEach((mutation)=>{
			if(mutation.type==='childList'){
				mutation.addedNodes.forEach((node)=>{
					if(node instanceof Element){
						node.querySelectorAll(selector).forEach(callback);
					}
				});
			}
		});
	});
	observer.observe(document.body,{childList:true,subtree:true});
	document.querySelectorAll(selector).forEach(callback);
}