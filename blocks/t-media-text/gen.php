<?php
use Catpow\util\BlockCode;

$name='catpow/t-media-text';
$prefix='wp-block-catpow-t-media-text';
$attr+=['classes'=>'has-vertical-align-top has-image-left','width'=>'200','gap'=>'20','marginTop'=>1,'marginBottom'=>1];
$comment=BlockCode::commentAttributes($name,$attr,['isTemplate','marginTop','marginBottom']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('t-media-text',$attr,['width'=>'100%'])?>><tbody class="<?=$prefix?>__tbody">
<?=BlockCode::spacer($prefix,$attr['marginTop'],'rem',3)?>
<?php
$image=BlockCode::element('td',$prefix.'__tbody-tr-td is-image-cell',!empty($attr['isTemplate']) && !empty($attr['imageCode'])?esc_html($attr['imageCode']):BlockCode::image($attr,'cp-responsiveimage','',false,['width'=>'100%','height'=>'auto']),['width'=>$attr['width']]);
$text=BlockCode::element('td',$prefix.'__tbody-tr-td is-text-cell',$children);
$gap=BlockCode::element('td',$prefix.'__tbody-tr-td is-spacer-cell','',['width'=>$attr['gap'],'style'=>'width:'.$attr['gap'].'px']);
?>
<tr class="<?=$prefix?>__tbody-tr"><?=BlockCode::has($attr['classes'],'has-image-left')?$image.$gap.$text:$text.$gap.$image?></tr>
<?=BlockCode::spacer($prefix,$attr['marginBottom'],'rem',3)?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
