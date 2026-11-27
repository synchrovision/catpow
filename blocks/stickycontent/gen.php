<?php
use Catpow\util\BlockCode;

$name='catpow/stickycontent';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div class="wp-block-catpow-stickycontent sticky_content"><?=$children?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
