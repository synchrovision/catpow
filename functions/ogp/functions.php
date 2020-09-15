<?php
add_action('head_attr',function(){
	echo ' prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#"';
});
add_action('wp_head',function(){
	if(is_single()){
		global $post_types;
		$post_type_data=$post_types[get_post_type()];
		if(has_post_thumbnail()){$image=get_the_post_thumbnail_url();}
		elseif(isset($post_type_data['meta']['image'])){
			$image=wp_get_attachment_image_src(get_post_meta(get_the_ID(),'image',true),'vga')['url'];
		}
		else{$image=false;}
		if(isset($post_type_data['meta']['desc'])){
			$desc=get_post_meta(get_the_ID(),'desc',true);
		}
		else{$desc=get_the_excerpt();}
		?>
		<meta property="og:title" content="<?php the_title();?>" />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="<?php the_permalink();?>" />
		<meta property="og:image" content="<?= $image?:cp::get_file_url('images/logo.png'); ?>" />
		<meta property="og:site_name" content="<?php bloginfo('blogname') ?>" />
		<meta property="og:description" content="<?= $desc ?>" /> 
		<?php if($fb_app_id=get_option('fb_app_id')): ?>
		<meta property="fb:app_id" content="<?= $fb_app_id ?>" />
		<?php endif; ?>
		<meta name="twitter:card" content="<?= $image?'summary_large_image':'summary' ?>" />
		<meta name="twitter:description" content="<?= $desc ?>" />
		<?php
	}
});