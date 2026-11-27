<?php
use Catpow\util\BlockCode;

$name='catpow/megamenu';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('megamenu',$attr)?>></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
