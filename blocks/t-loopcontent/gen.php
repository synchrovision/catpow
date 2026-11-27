<?php
use Catpow\util\BlockCode;

$name='catpow/t-loopcontent';

$comment=BlockCode::commentAttributes($name,$attr);

ob_start();
?>
<t-loop-content<?=BlockCode::attrs(['name'=>$attr['name']??'content'])?>><?=$children?></t-loop-content>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
