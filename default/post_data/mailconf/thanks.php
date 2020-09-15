<?php
$post_data['post_title']='お問い合わせありがとうございます。';
$post_data['meta']=[
	'to'=>'[output email]',
	'from'=>get_option('admin_email'),
];
ob_start();
?>
<!-- wp:catpow/t-body -->
<table width="100%" align="center" valign="top" class="wp-block-catpow-t-body hasHeader hasFooter"><thead><tr><th><img class="wp-image-43" src="<?=cp::get_logo_url()?>" alt="" style="width: 250px;"/></th></tr></thead><tbody><tr><td><center>
<?php foreach($conf_data['inputs'] as $name=>$conf):?>
<!-- wp:paragraph -->
<p class="has-regular-font-size"><?=$conf['label']?>：[output <?=$name?>]</p>
<!-- /wp:paragraph -->
<?php endforeach; ?>
</center></td></tr></tbody><tfoot><tr><td><?php bloginfo('name'); ?><br/><?=home_url()?></td></tr></tfoot></table>
<!-- /wp:catpow/t-body -->
<?php
$post_data['post_content']=ob_get_clean(); ?>