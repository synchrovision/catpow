<?php
use Catpow\util\BlockCode;

$name='catpow/formblockcontent';

$comment=BlockCode::commentAttributes($name,$attr);

ob_start();
?>
<form-block-content<?=BlockCode::attrs(['name'=>$attr['name']??'content','action'=>$attr['action']??null])?>><?=$children?></form-block-content>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
