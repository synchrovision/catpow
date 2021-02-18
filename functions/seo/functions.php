<?php
use Catpow\util\seo;
add_action('head_attr',function(){
	echo ' prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#"';
});
add_action('wp_head',function(){
	$image=seo::get_image();
	$desc=seo::get_desc();
	$url=seo::get_url();
	?>
	<meta name="description" content="<?=$desc?>"/>
	<meta property="og:title" content="<?= wp_get_document_title();?>" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="<?= $url;?>" />
	<meta property="og:image" content="<?= $image; ?>" />
	<meta property="og:site_name" content="<?php bloginfo('blogname') ?>" />
	<meta property="og:description" content="<?= $desc ?>" /> 
	<?php if($fb_app_id=get_option('fb_app_id')): ?>
	<meta property="fb:app_id" content="<?= $fb_app_id ?>" />
	<?php endif; ?>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:description" content="<?= $desc ?>" />
	<?php
});