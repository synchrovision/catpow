<?php
use Catpow\util\BlockCode;

$name='catpow/entrypopup';

$comment=BlockCode::commentAttributes($name,$attr,['anchor','vars','target','isForRegist']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('entrypopup',$attr,BlockCode::context('catpow/entrypopup',['isOpen'=>true],[
	'data-wp-class--is-open'=>'context.isOpen',
	'data-wp-bind--hidden'=>'!context.isOpen',
	'data-wp-init'=>null,
	'id'=>$attr['anchor']??null
]))?>><div class="wp-block-catpow-entrypopup__body">
	<div class="wp-block-catpow-entrypopup__body-contents"><?=$children?></div>
	<div class="wp-block-catpow-entrypopup__body-close" data-wp-on--click="actions.close"></div>
</div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
