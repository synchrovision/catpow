<?php
use Catpow\util\BlockCode;

$name='catpow/tabscontent';
$index=(int)($attr['index']??0);
$comment=BlockCode::commentAttributes($name,$attr,['index']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div id="{$uid}-<?=$index?>" class="wp-block-catpow-tabscontent wp-block-catpow-tabs__contents-content" data-wp-class--is-active="callbacks.isActivePanel"
	data-wp-bind--aria-hidden="!callbacks.isActivePanel" data-wp-bind--inert="!callbacks.isActivePanel" style="--index:<?=$index?>"
	data-index="[object Object]" role="tabpanel" aria-labelledby="{$uid}-tab-<?=$index?>"><?=$children?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
