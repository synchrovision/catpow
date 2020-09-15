<?php
$post_data['meta']=[
	'to'=>'[output email]',
	'from'=>get_option('admin_email'),
];
ob_start();
?>
登録が完了しました。
<?php $post_data['post_content']=ob_get_clean(); ?>