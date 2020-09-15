<?php
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[-1],
	'push'=>[-1],
	'send_mail'=>[],
	'check_task'=>[-1]
];
ob_start(); ?>
<!-- wp:catpow/simpletable -->
<table class="wp-block-catpow-simpletable inputs"><tbody><?php
	foreach($conf_data['meta']['mail']['meta'] as $name=>$conf){
		$classes='item';
		if($conf['required']??false){$classes.=' required';}
		else{$classes.=' optional';}
		echo "<tr class=\"{$classes}\"><th>{$conf['label']}</th><td>[input {$name}]</td></tr>";
	}
?></tbody></table>
<!-- /wp:catpow/simpletable -->

<!-- wp:catpow/formbuttons -->
<ul class="wp-block-catpow-formbuttons buttons m"><li class="item"><div class="button" data-action="confirm">確認</div></li></ul>
<!-- /wp:catpow/formbuttons -->

<?php
$post_data['post_content']=ob_get_clean();