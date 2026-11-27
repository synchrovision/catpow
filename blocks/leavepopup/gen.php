<?php
use Catpow\util\BlockCode;

$name='catpow/leavepopup';

$comment=BlockCode::commentAttributes($name,$attr,['anchor','vars','target','isForRegist']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('leavepopup',$attr,BlockCode::context('catpow/leavepopup',['isOpen'=>false],[
	'data-wp-class--is-open'=>'context.isOpen',
	'data-wp-bind--hidden'=>'!context.isOpen',
	'data-wp-init'=>'callbacks.initBlock',
	'id'=>$attr['anchor']??null
]))?>><div class="wp-block-catpow-leavepopup__body">
	<div class="wp-block-catpow-leavepopup__body-contents"><?=$children?></div>
	<div class="wp-block-catpow-leavepopup__body-close" data-wp-on--click="actions.close"></div>
</div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
