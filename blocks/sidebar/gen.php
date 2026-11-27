<?php
use Catpow\util\BlockCode;

$name='catpow/sidebar';

$attr+=['classes'=>'is-align-left is-stuck is-stuck-bottom has-item-size-small'];
$comment=BlockCode::commentAttributes($name,$attr,['vars','sidebarClases']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('sidebar',$attr,BlockCode::context('catpow/sidebar',['isOpen'=>false,'isViewing'=>false],[
	'id'=>'{$uid}','data-wp-init'=>'callbacks.initBlock','data-wp-class--is-open'=>'callbacks.isOpen','data-wp-class--is-viewing'=>'callbacks.isViewing'
]))?>><?=$children?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
