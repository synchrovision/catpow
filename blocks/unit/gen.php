<?php
use Catpow\util\BlockCode;

$name='catpow/unit';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('unit',$attr)?>><figure class="image"><?=BlockCode::templateImage($attr,$attr,'cp-responsiveimage','',true)?></figure><div class="contents"><?=$children?></div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
