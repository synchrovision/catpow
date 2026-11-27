<?php
use Catpow\util\BlockCode;

$name='catpow/div';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('div',$attr)?>><?php if(BlockCode::has($attr['classes']??'','has-icon')){echo BlockCode::icon('icon',$attr);} ?><?=$children?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
