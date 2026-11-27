<?php
use Catpow\util\BlockCode;

$name='catpow/sidecolumn';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::attrs(['class'=>$attr['classes']??'wp-block-catpow-sidebar-column is-column-side has-background-color'])?>>
	<div class="wp-block-catpow-sidebar-column__container"><?=$children?></div>
	<div class="wp-block-catpow-sidebar-column__button" data-wp-on--click="actions.toggle" aria-controls="{$uid}" data-wp-bind--aria-expanded="context.isOpen">
		<span class="wp-block-catpow-sidebar-column__button-icon"></span>
	</div>
</div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
