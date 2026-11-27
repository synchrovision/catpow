<?php
use Catpow\util\BlockCode;

$name='catpow/accordiongroup';

$comment=BlockCode::commentAttributes($name,$attr,['groupId']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('accordiongroup',$attr,BlockCode::context('catpow/accordion',['groupId'=>$attr['groupId']??'accordionGroup']))?>><?=$children?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
