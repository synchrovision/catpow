jQuery(function($){
	$('.wp-block-catpow-accordion>.container').height(0);
	$('.wp-block-catpow-accordion > .header').on('click',function(){
		var $block=$(this).parent();
		var $container=$block.children('.container');
		if($block.hasClass('open')){
			$block.removeClass('open');
			$container.height(0);
		}
		else{
			if($block.hasClass('exclusive')){
				$('.wp-block-catpow-accordion').removeClass('open').children('.container').height(0);
			}
			$block.addClass('open');
			$container.height($container.children('.contents').outerHeight());
		}
	});
});