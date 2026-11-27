<?php
use Catpow\util\BlockCode;

$name='catpow/switchercontent';

$comment=BlockCode::commentAttributes($name,$attr);

ob_start();
?>
<switcher-content<?=BlockCode::attrs(['cond'=>$attr['cond']??'content'])?>><?=$children?></switcher-content>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
