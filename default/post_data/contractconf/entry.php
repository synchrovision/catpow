<?php
$post_data['post_title']=__('エントリー','catpow');
$post_data['meta']=[
	'to'=>'[output email]',
	'from'=>get_option('admin_email'),
	'type'=>'html',
];
$post_data['post_content']=cp::get_block_code('t-body',[
	'headerText'=>sprintf('<img class="wp-image" src="%s" alt="%s" style="width: 250px;"/>',get_theme_file_uri('images/logo.svg'),get_bloginfo('title')),
	'footerText'=>get_bloginfo('name').'<br/>'.home_url(),
	'textMail'=>sprintf(__("下記のURLにて必要事項を入力して申込を行ってください。\n%s",'catpow'),"[task url]")
],[
	cp::get_block_code('t-box',['classes'=>'large'],[
		cp::get_block_code('t-heading',[
			'classes'=>'headline center large',
			'title'=>__('申込フォーム','catpow')
		]),
		cp::get_block_code('t-paragraph',[
			'classes'=>'center large',
			'text'=>__('下記のボタンから必要事項を入力して申込を行ってください。','catpow')
		]),
		cp::get_block_code('t-button',[
			'classes'=>'large',
			'url'=>'[task url]',
			'title'=>__('申込フォームへ','catpow')
		]),
		cp::get_block_code('t-paragraph',[
			'classes'=>'left small',
			'text'=>__('リンクの有効期限は15分です。有効期限が切れた場合はお手数ですが申込メール送信からやり直してください。','catpow')
		])
	])
]);