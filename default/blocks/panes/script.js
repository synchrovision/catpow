jQuery(function($){
	$('ul.wp-block-catpow-listed.faq li.item header').on('click',function(){
		$(this).toggleClass('active').next().slideToggle();
	}).next().hide();
	$('ul.wp-block-catpow-listed,ul.wp-block-catpow-listed>li.item').cp_scrollspy();
	$('ul.wp-block-catpow-listed.menu.large .image').cp_parallax();
	for(var i=0;i<5;i++){
		$('ul.wp-block-catpow-listed.menu').append('<li class="spacer"> </li>');
	}
});