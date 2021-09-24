<?php
$post_data['post_title']='お問い合わせありがとうございます。';
$post_data['meta']=[
	'to'=>'[output email]',
	'from'=>get_option('admin_email'),
	'type'=>'html',
];
$post_data['post_content']=cp::get_block_code('t-body',[
	'headerText'=>sprintf('<img class="wp-image" src="%s" alt="%s" style="width: 250px;"/>',get_theme_file_uri('images/logo.svg'),get_bloginfo('title')),
	'footerText'=>get_bloginfo('name').'<br/>'.home_url(),
	'textMail'=>implode("\n",array_map(function($conf,$name){
		return "{$conf['label']}：[output {$name}]";
	},$conf_data['inputs'],array_keys($conf_data['inputs'])))
],[
	cp::get_block_code('t-box',[],[
		implode("\n",array_map(function($conf,$name){
			return cp::get_block_code('t-paragraph',[
				'classes'=>'medium left',
				'text'=>"{$conf['label']}：[output {$name}]"
			]);
		},$conf_data['inputs'],array_keys($conf_data['inputs'])))
	])
]);