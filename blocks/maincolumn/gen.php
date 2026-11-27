<?php
use Catpow\util\BlockCode;

$name='catpow/maincolumn';

$comment=BlockCode::commentAttributes($name,$attr,['columnType']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div class="wp-block-catpow-sidebar-column is-column-main"><?=$children?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
