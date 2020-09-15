<?php
$mail_conf_post_type=$conf_data['meta']['send_mail']['value'];
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[-1],
	'push'=>[1],
	'send_mail'=>[$mail_conf_post_type.'/notice',$mail_conf_post_type.'/thanks'],
	'check_task'=>[-1]
];
ob_start();
?>
<!-- wp:catpow/simpletable -->
<table class="wp-block-catpow-simpletable inputs"><tbody><?php
	foreach($conf_data['meta']['mail']['meta'] as $name=>$conf){
		$classes='item';
		if($conf['required']??false){$classes.=' required';}
		else{$classes.=' optional';}
		echo "<tr class=\"{$classes}\"><th>{$conf['label']}</th><td>[output {$name}]</td></tr>";
	}
?></tbody></table>
<!-- /wp:catpow/simpletable -->

<?php
$post_data['post_content']=ob_get_clean();