<?php
//標準時間セット
date_default_timezone_set('Asia/Tokyo');


if(class_exists('cp')){
	
	/*管理バー*/
	if(!current_user_can('administrator')){show_admin_bar(false);}


	/*カスタマイズ機能*/
	add_theme_support('title-tag');
	add_theme_support('custom-header',['default-image'=>cp::get_file_url('/images/header.jpg')]);
	add_theme_support('custom-logo',['default-image'=>cp::get_file_url('/images/logo.png')]);
	add_theme_support('custom-background',['default-image'=>cp::get_file_url('/images/bg.png')]);

	/*通知メール*/
	add_filter('wp_mail_from_name',function($name){return get_option('blogname');});
	//add_filter('wp_mail_from',function($email){return get_option('admin_email');});


	/*管理画面アクセス制限*/
	add_action('admin_head',function(){cp::user_cap_barrier('edit_others_posts');});


	/*自動段落タグ無効化*/
	remove_filter('the_content','wpautop');
	remove_filter('the_excerpt','wpautop');


	/*追加スクリプト*/
	add_action('wp_enqueue_scripts',function(){
		wp_enqueue_script('cp_menu');
		wp_enqueue_script('cp_article_nav');
	});
	
	add_image_size('sp',640);
	
	/*カスタムカラー無効*/
	add_theme_support('editor-color-palette');
	add_theme_support('disable-custom-colors');
	
	/*カスタムフォントサイズ無効*/
	add_theme_support('editor-font-sizes',[
		['name'=>'大','slug'=>'large','size'=>18],
		['name'=>'中','slug'=>'regular','size'=>14],
		['name'=>'小','slug'=>'small','size'=>12],
	]);
	add_theme_support('disable-custom-font-sizes');
	
	/*デフォルトブロックパターン無効*/
	remove_theme_support('core-block-patterns');
}
