<?php
use Catpow\util\BlockCode;

$name='catpow/t-heading';
$prefix='wp-block-catpow-t-heading';
$attr+=['classes'=>'has-text-align-left has-font-weight-medium has-font-size-middle has-heading-type-headline','marginTop'=>1,'marginBottom'=>0.5];
$classes=['left'=>'has-text-align-left','center'=>'has-text-align-center','right'=>'has-text-align-right','small'=>'has-font-size-small','medium'=>'has-font-size-middle','large'=>'has-font-size-large','headline'=>'has-heading-type-headline'];
$attr['classes']=preg_replace_callback('/(?<!\S)(?:left|center|right|small|medium|large|headline)(?!\S)/',static fn($m)=>$classes[$m[0]],$attr['classes']);
$comment=BlockCode::commentAttributes($name,$attr,['marginTop','marginBottom']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('t-heading',$attr,['width'=>$attr['width']??'100%','align'=>$attr['align']??null])?>><tbody class="<?=$prefix?>__tbody">
<?=BlockCode::spacer($prefix,$attr['marginTop'],'em',null)?>
<tr class="<?=$prefix?>__tbody-tr"><td class="<?=$prefix?>__tbody-tr-td is-text-cell"><?=BlockCode::rich($attr['title']??'Title')?></td></tr>
<?=BlockCode::spacer($prefix,$attr['marginBottom'],'em',null)?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
