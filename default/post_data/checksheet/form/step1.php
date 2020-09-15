<?php
$role=explode('-',$path_data[1])[1];
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[1],
	'push'=>[-1],
	'send_mail'=>['register_mail/confirm-'.$role],
	'check_task'=>[-1]
];
ob_start();
?>
<!-- wp:paragraph -->
<p class="has-regular-font-size">確認メールを送信しました。メールに記載されているURLにアクセスしてから次のステップへ進んでください。</p>
<!-- /wp:paragraph -->

<!-- wp:catpow/formbuttons -->
<ul class="wp-block-catpow-formbuttons buttons"><li class="item primary check">[button 次へ step2]</li></ul>
<!-- /wp:catpow/formbuttons -->
<?php
$post_data['post_content']=ob_get_clean();