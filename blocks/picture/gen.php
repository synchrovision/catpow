<?php
use Catpow\util\BlockCode;

$name='catpow/picture';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('picture',$attr)?>><?=!empty($attr['isTemplate']) && !empty($attr['code'])?esc_html($attr['code']):BlockCode::image($attr,'wp-block-catpow-picture__picture','',true)?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
