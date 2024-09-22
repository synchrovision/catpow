export const renderComponents=()=>{
	const list=document.querySelectorAll('[data-component]');
	Array.prototype.forEach.call(list,(el)=>{
		wp.element.render(wp.element.createElement(window[el.dataset.component]),{...el.dataset});
	});
};
export const nl2br=(text)=>{
	return text.split(/(\n)/).map((line,index)=>line==="\n"?<br/>:line);
};
