<?php
use Catpow\util\BlockCode;

$name='catpow/countdown';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('countdown',$attr,['data-target'=>$attr['target']??null])?>></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
