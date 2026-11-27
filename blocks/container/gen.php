<?php
use Catpow\util\BlockCode;

$name='catpow/container';
$attr['vars']=array_merge((array)($attr['vars']??[]),(array)($attr['boxSizeVars']??['--cp-inner-content-width'=>960,'--cp-container-height'=>400]));
$comment=BlockCode::commentAttributes($name,$attr,['vars','boxSizeVars']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('container',$attr)?>><div class="wp-block-catpow-container__body"><?=$children?></div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
