import {store,getElement,getContext,withScope} from '@wordpress/interactivity';


store("pagenavigation",{
	state:{
	},
	actions:{
		onClickToggle(e){
			const openItems=getContext().openItems;
			const id=e.currentTarget.closest('[data-post-id]').dataset.postId;
			openItems[id]=!openItems[id];
		}
	},
	callbacks:{
		isItemActive:()=>getContext().activeItems[getElement().attributes['data-post-id']],
		isItemOpen:()=>getContext().openItems[getElement().attributes['data-post-id']]
	}
});