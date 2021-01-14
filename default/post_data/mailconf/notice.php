<?php
$post_data['post_title']='【お問い合わせ】[output name]様より';
$post_data['meta']=[
	'to'=>get_option('admin_email'),
	'from'=>get_option('admin_email'),
];
ob_start();
?>
<!-- wp:catpow/t-body -->
<textmail>
<?php foreach($conf_data['inputs'] as $name=>$conf):?>
<?=$conf['label']?>：[output <?=$name?>]
<?php endforeach; ?>
</textmail><table width="100%" align="center" class="wp-block-catpow-t-body hasHeader hasFooter"><thead class="wp-block-catpow-t-body__header"><tr><th><img class="wp-image" src="<?=get_theme_file_uri('images/logo.svg')?>" alt="<?=bloginfo('title')?>" style="width: 250px;"/></th></tr></thead><tbody class="wp-block-catpow-t-body__body"><tr><td><div class="wp-block-catpow-t-body__body__contents"><!-- wp:catpow/t-box -->
<table class="wp-block-catpow-t-box medium"><tbody><tr><td>
<?php foreach($conf_data['inputs'] as $name=>$conf):?>
<!-- wp:catpow/t-paragraph -->
<table width="100%" class="wp-block-catpow-t-paragraph medium left"><tbody><tr><td><?=$conf['label']?>：[output <?=$name?>]</td></tr></tbody></table>
<!-- /wp:catpow/t-paragraph -->
<?php endforeach; ?>
<</td></tr></tbody></table>
<!-- /wp:catpow/t-box --></div></td></tr></tbody><tfoot class="wp-block-catpow-t-body__footer"><tr><td><?php bloginfo('name'); ?><br/><?=home_url()?></td></tr></tfoot></table>
<!-- /wp:catpow/t-body -->
<?php
$post_data['post_content']=ob_get_clean(); ?>