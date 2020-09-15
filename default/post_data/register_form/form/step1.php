<?php
$role=explode('-',$path_data[1])[1];
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[1],
	'push'=>[-1],
	'send_mail'=>[]
];
$metas_primary=[];
$metas_has_children=[];
foreach($GLOBALS['user_datas'][$role]['meta'] as $name=>$conf){
	$meta_class=\cp::get_class_name('meta',$conf['type']);
	if($meta_class::$has_children && !$meta_class::$is_unit_input){
		$metas_has_children[$name]=$conf;
	}
	else{
		$metas_primary[$name]=$conf;
	}
}
ob_start();
?>
<!-- wp:catpow/section -->
<section class="wp-block-catpow-section center column round thin_border check"><div class="contents"><header><div class="title"><h2><?=$GLOBALS['user_datas'][$role]['label']?>登録</h2></div></header><div class="text"><!-- wp:catpow/simpletable -->
<table class="wp-block-catpow-simpletable inputs"><tbody><tr class="item required"><th>メールアドレス</th><td>[input email]</td></tr></tbody></table>
<!-- /wp:catpow/simpletable -->
	
<!-- wp:catpow/formbuttons -->
<ul class="wp-block-catpow-formbuttons buttons"><li class="item primary check">[button 次へ step2]</li></ul>
<!-- /wp:catpow/formbuttons -->
<!-- wp:shortcode -->[§ message]<!-- /wp:shortcode -->
</div></div></section>
<!-- /wp:catpow/section -->


<?php
$post_data['post_content']=ob_get_clean();