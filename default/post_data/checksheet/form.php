<?php
ob_start();
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[-1],
	'push'=>[-1]
];
$role=explode('-',$path_data[1])[1];
?>
<!-- wp:catpow/simpletable -->
<table class="wp-block-catpow-simpletable inputs"><tbody><tr class="item required"><th>メールアドレス</th><td>[input email]</td></tr></tbody></table>
<!-- /wp:catpow/simpletable -->

<!-- wp:catpow/formbuttons -->
<ul class="wp-block-catpow-formbuttons buttons"><li class="item primary mail">[button 確認メールを送信 step1]</li></ul>
<!-- /wp:catpow/formbuttons -->
<?php
$post_data['post_content']=ob_get_clean();