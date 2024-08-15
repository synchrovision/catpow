export const renderComponents=()=>{
	const list=document.querySelectorAll('[data-component]');
	Array.prototype.forEach.call(list,(el)=>{
		wp.element.render(wp.element.createElement(window[el.dataset.component]),{...el.dataset});
	});
};