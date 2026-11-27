<?php
use Catpow\util\BlockCode;

$name='catpow/t-button';
$prefix='wp-block-catpow-t-button';
$attr+=['classes'=>'is-size-medium has-font-weight-bold','width'=>'300','align'=>'center','marginTop'=>0.5,'marginBottom'=>0.5];
$classes=['small'=>'is-size-small','medium'=>'is-size-medium','large'=>'is-size-large'];
$attr['classes']=preg_replace_callback('/(?<!\S)(?:small|medium|large)(?!\S)/',static fn($m)=>$classes[$m[0]],$attr['classes']);
$comment=BlockCode::commentAttributes($name,$attr,['marginTop','marginBottom']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('t-button',$attr,['width'=>$attr['width']??'100%','align'=>$attr['align']??null])?>><tbody class="<?=$prefix?>__tbody">
<?=BlockCode::spacer($prefix,$attr['marginTop'],'em',null)?>
<tr class="<?=$prefix?>__tbody-tr"><td class="<?=$prefix?>__button"><a class="<?=$prefix?>__button-link"<?=BlockCode::attrs(['href'=>$attr['url']??home_url('/')])?>><?=BlockCode::rich($attr['title']??'')?></a></td></tr>
<?=BlockCode::spacer($prefix,$attr['marginBottom'],'em',null)?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
