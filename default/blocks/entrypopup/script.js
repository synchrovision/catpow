jQuery(function($){
	$('.wp-block-catpow-entrypopup').each(function(){
		var $block=$(this);
		$block.find('>.bg,>.body>.close').on('click',function(){
			$block.removeClass('open');
		});
	});
});