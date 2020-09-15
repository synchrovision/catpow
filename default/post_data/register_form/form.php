<?php
ob_start();
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[-1],
	'push'=>[-1],
	'send_mail'=>[]
];
$role=explode('-',$path_data[1])[1];
?>

<!-- wp:catpow/section -->
<section class="wp-block-catpow-section center column round thin_border check"><div class="contents"><header><div class="title"><h2><?=$GLOBALS['user_datas'][$role]['label']?>登録</h2></div></header><div class="text">

<!-- wp:catpow/formbuttons -->
<ul class="wp-block-catpow-formbuttons buttons"><li class="item primary mail">[button 新規登録 step1]</li></ul>
<!-- /wp:catpow/formbuttons -->
<!-- wp:shortcode -->[§ message]<!-- /wp:shortcode -->
</div></div></section>
<!-- /wp:catpow/section -->

<?php
$post_data['post_content']=ob_get_clean();