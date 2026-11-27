<?php
use Catpow\util\BlockCode;

$name='catpow/t-box';
$prefix='wp-block-catpow-t-box';
$attr+=['classes'=>'has-mail-content-width','width'=>'600','paddingTop'=>1,'paddingInline'=>1,'paddingBottom'=>1];
$comment=BlockCode::commentAttributes($name,$attr,['paddingTop','paddingInline','paddingBottom']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('t-box',$attr)?>>
<table<?=BlockCode::attrs(['width'=>$attr['width'],'style'=>'width:'.$attr['width'].'px','align'=>'center'])?> class="<?=$prefix?>__table"><tbody class="<?=$prefix?>__table-tbody">
<?php
$inline=$attr['paddingInline'];
$columns=$inline>0?3:null;
$spacer=$inline>0?BlockCode::element('td',$prefix.'__table-tbody-tr-td is-spacer-cell','',['style'=>'width:'.$inline.'rem','width'=>$inline.'rem']):'';
?>
<?=BlockCode::spacer($prefix.'__table',$attr['paddingTop'],'rem',$columns)?>
<tr class="<?=$prefix?>__table-tbody-tr"><?=$spacer?><td class="<?=$prefix?>__table-tbody-tr-td"><?=$children?></td><?=$spacer?></tr>
<?=BlockCode::spacer($prefix.'__table',$attr['paddingBottom'],'rem',$columns)?>
</tbody></table>
</div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
