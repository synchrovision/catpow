jQuery(function($){
	$('div.wp-block-catpow-articlenav').each(function(){
		$(this).cp_article_nav($(this).closest('div.wp-block-catpow-sidebar').find('div.wp-block-catpow-maincolumn'));
	});
});