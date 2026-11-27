<?php
use Catpow\util\BlockCode;

$name='catpow/sitefooter';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('sitefooter',$attr,['id'=>'SiteFooter'])?>><div<?=BlockCode::attrs(['class'=>$attr['contentsClasses']??'wp-block-catpow-sitefooter__contents'])?>><?=$children?></div>
<?=BlockCode::element('div',$attr['copyrightClasses']??'wp-block-catpow-sitefooter__copyright',$attr['copyright']??'')?></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
