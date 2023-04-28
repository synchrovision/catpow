(cb=>document.readyState!=='loading'?cb():document.addEventListener('DOMContentLoaded',cb))(()=>{
	document.querySelectorAll('.wp-block-catpow-entrypopup').forEach(function(block){
		block.querySelectorAll(':scope>.bg, :scope>.body>.close').forEach(function(el){
			el.addEventListener('click',function(){
				console.log('CLIKC');
				block.classList.remove('open');
			});
		});
	});
});