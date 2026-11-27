<?php
use Catpow\util\BlockCode;

$name='catpow/loopcontent';

$comment=BlockCode::commentAttributes($name,$attr);

ob_start();
?>
<loop-content<?=BlockCode::attrs(['name'=>$attr['name']??'content'])?>><?=$children?></loop-content>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
