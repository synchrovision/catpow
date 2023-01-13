/* global console wp Catpow*/
window.Catpow.UI=window.Catpow.UI || {};
window.Catpow.UI.props=window.Catpow.UI.props || {};

Catpow.UI.render=(el)=>{
	if(!('ui' in el.dataset)){
		el.querySelectorAll('[data-ui]').forEach(Catpow.UI.render);
		return;
	}
	if('createRoot' in wp.element){
		wp.element.createRoot(el).render(
			wp.element.createElement(Catpow.UI[el.dataset.ui],window.Catpow.uiProps[el.id])
		);
	}
	else{
		wp.element.render(
			wp.element.createElement(Catpow.UI[el.dataset.ui],window.Catpow.uiProps[el.id]),el
		);
	}
};
Catpow.UI.observe=(el)=>{
	Catpow.UI.observer.observe(el,{childList:true,subtree:true});
}
Catpow.UI.observer=new MutationObserver((mutationList)=>{
	mutationList.forEach((mutation)=>{
		if(mutation.type==='childList'){
			mutation.addedNodes.forEach((node)=>{
				node.querySelectorAll(['data-ui']).forEach(Catpow.UI.render);
			});
		}
	});
});