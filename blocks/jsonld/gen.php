<?php
use Catpow\util\BlockCode;

$name='catpow/jsonld';

$comment=BlockCode::commentAttributes($name,$attr,['json']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<script type="application/ld+json"><?=str_replace('<','\u003c',is_string($attr['json']??null)?$attr['json']:wp_json_encode($attr['json']??(object)[]))?></script>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
