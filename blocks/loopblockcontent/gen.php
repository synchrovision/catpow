<?php
use Catpow\util\BlockCode;

$name='catpow/loopblockcontent';

$comment=BlockCode::commentAttributes($name,$attr);

ob_start();
?>
<loop-block-content<?=BlockCode::attrs(['name'=>$attr['name']??'content'])?>><?=$children?></loop-block-content>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
