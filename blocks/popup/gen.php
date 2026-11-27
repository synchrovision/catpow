<?php
use Catpow\util\BlockCode;

$name='catpow/popup';

$comment=BlockCode::commentAttributes($name,$attr,['anchor','vars','target','isForRegist']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('popup',$attr,BlockCode::context('catpow/popup',isset($attr['anchor'])?['anchor'=>$attr['anchor']]:[],[
	'data-wp-class--is-open'=>'callbacks.isOpen',
	'data-wp-bind--hidden'=>'!callbacks.isOpen',
	'data-wp-init'=>'callbacks.initBlock',
	'id'=>$attr['anchor']??null
]))?>><div class="wp-block-catpow-popup__body">
	<div class="wp-block-catpow-popup__body-contents"><?=$children?></div>
	<div class="wp-block-catpow-popup__body-close" data-wp-on--click="actions.close"></div>
</div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
