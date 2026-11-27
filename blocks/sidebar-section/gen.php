<?php
use Catpow\util\BlockCode;

$name='catpow/sidebar-section';

$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('sidebar-section',$attr)?>><header class="wp-block-catpow-sidebar-section__header">
	<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),'wp-block-catpow-sidebar-section__header-title',$attr['title']??'')?>
</header>
<div class="wp-block-catpow-sidebar-section__contents"><?=$children?></div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
