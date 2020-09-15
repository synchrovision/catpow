jQuery(function($){
	$('ul.wp-block-catpow-listed.faq li.item header').on('click',function(){
		$(this).toggleClass('active').next().slideToggle();
	}).next().hide();
});