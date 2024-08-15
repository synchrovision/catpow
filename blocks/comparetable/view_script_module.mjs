import {store,getElement,getContext,withScope} from '@wordpress/interactivity';


store("comparetable",{
	state:{
		get current(){
			return getContext().current;
		}
	},
	actions:{
		onClickTag:(e)=>{
			const tagEl=e.currentTarget;
			const blockEl=tagEl.closest('.wp-block-catpow-comparetable');
			const thEl=blockEl.querySelector(`.wp-block-catpow-comparetable-table-thead-tr-th[data-index="${tagEl.dataset.index}"]`);
			thEl.scrollIntoView({block:'nearest',inline:getContext().hasHeaderColumn?'start':'center'});
			getContext().current=tagEl.dataset.index;
		}
	},
	callbacks:{
		initBlock:()=>{
			const blockEl=getElement().ref;
			const boxEl=blockEl.querySelector('.wp-block-catpow-comparetable-box');
			const tableEl=blockEl.querySelector('.wp-block-catpow-comparetable-table');
			const thEls=Array.from(blockEl.querySelectorAll(`.wp-block-catpow-comparetable-table-thead-tr-th`));
			const updateCurrent=getContext().hasHeaderColumn?(
				withScope(()=>{
					getContext().current=thEls.find((thEl)=>thEl.getBoundingClientRect().left>0).dataset.index;
				})
			):(
				withScope(()=>{
					getContext().current=thEls.find((thEl)=>{
						console.log({right:thEl.getBoundingClientRect().right,innerWidth:window.innerWidth});
						return thEl.getBoundingClientRect().right*2>window.innerWidth
					}).dataset.index;
				})
			)
			let timer=setTimeout(updateCurrent,200);
			boxEl.addEventListener('scroll',(e)=>{
				clearTimeout(timer);
				timer=setTimeout(updateCurrent,200);
			});
			const resizeObserver=new ResizeObserver(withScope(()=>{
				getContext().showTags=tableEl.getBoundingClientRect().width>window.innerWidth;
			}));
			resizeObserver.observe(boxEl);
		},
		isTagActive:()=>getContext().current==getElement().attributes['data-index']
	}
});