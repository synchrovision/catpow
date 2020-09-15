<?php
$article_conf_data=$GLOBALS['post_types'][substr($post_type,0,-5)]??[];
$post_data['post_title']=$article_conf_data['label'];
$metas_primary=[];
$metas_has_children=[];
foreach($article_conf_data['meta']??[] as $name=>$conf){
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
<section class="wp-block-catpow-section center column round thin_border check"><div class="contents"><header><div class="title"><h2><?=$GLOBALS['user_datas'][$role]['label']?>登録</h2></div></header><div class="text"><!-- wp:catpow/simpletable --><table class="wp-block-catpow-simpletable inputs"><tbody>
<?php foreach($metas_primary as $name=>$conf):?>
<tr class="item<?=empty($conf['required'])?'':' required'?>"><th><?=$conf['label']?></th><td>[output <?=$name?>]</td></tr>
<?php endforeach;?>
</tbody></table>
<!-- /wp:catpow/simpletable -->
	
<?php foreach($metas_has_children as $name=>$parent_conf):?>
<!-- wp:shortcode -->[loop <?=$name?>]<!-- /wp:shortcode -->
<!-- wp:catpow/simpletable --><table class="wp-block-catpow-simpletable inputs"><tbody>
<?php foreach($parent_conf['meta'] as $name=>$conf):?>
<tr class="item<?=empty($conf['required'])?'':' required'?>"><th><?=$conf['label']?></th><td>[output <?=$name?>]</td></tr>
<?php endforeach;?>
</tbody></table>
<!-- /wp:catpow/simpletable -->
<!-- wp:shortcode -->[/loop]<!-- /wp:shortcode -->
<?php endforeach; ?>
</div></div></section>
<!-- /wp:catpow/section -->


<?php
$post_data['post_content']=ob_get_clean();