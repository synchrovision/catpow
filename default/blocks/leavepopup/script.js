(cb=>document.readyState!=='loading'?cb():document.addEventListener('DOMContentLoaded',cb))(()=>{
	const isFromSameHost=(()=>{
		if(!document.referrer){return false;}
		return window.location.hostname === new URL(document.referrer).hostname;
	})();
	const popupEl=document.querySelector('.wp-block-catpow-leavepopup');
	if(!popupEl){return;}
	popupEl.querySelectorAll(':scope>.bg, :scope>.body>.close').forEach(function(el){
		el.addEventListener('click',function(){
			popupEl.classList.remove('is-open');
			popupEl.classList.add('is-close');
		});
	});
	if(!isFromSameHost || popupEl.classList.contains('isForPage')){
		const pushDummyStateOnce=()=>{
			history.pushState(null,null,null);
			document.removeEventListener('click',pushDummyStateOnce);
		}
		document.addEventListener('click',pushDummyStateOnce);
		window.addEventListener('popstate',()=>{
			popupEl.classList.remove('is-close');
			popupEl.classList.add('is-open');
		});
	}
});