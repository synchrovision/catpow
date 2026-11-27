<?php
use Catpow\util\BlockCode;

$name='catpow/t-list';
$prefix='wp-block-catpow-t-list';
$attr+=['classes'=>'has-font-weight-regular is-ordered has-font-size-middle has-marker-color-main','marginTop'=>0.5,'marginBottom'=>0.5,'marginBetween'=>0.5,'markerSize'=>'1em','markerWidth'=>'1.5em','markerMargin'=>'0.1em','markerIndexPad'=>1,'markerIndexSize'=>'1em','markerAlign'=>'left'];
$comment=BlockCode::commentAttributes($name,$attr,['marginTop','marginBottom','marginBetween','markerSize','markerWidth','markerMargin','markerIndexSize','markerIndexPad']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('t-list',$attr,['width'=>'100%','align'=>'center'])?>><tbody class="<?=$prefix?>__tbody">
<?=BlockCode::spacer($prefix,$attr['marginTop'],'em',3)?>
<?php foreach(array_values($attr['items']??[]) as $index=>$item): ?>
	<?=$index?BlockCode::spacer($prefix,$attr['marginBetween'],'em',3):''?>
	<tr class="<?=$prefix?>__item">
		<td<?=BlockCode::attrs(['class'=>$attr['markerClasses']??$prefix.'__item-marker has-font-weight-regular','align'=>$attr['markerAlign'],'width'=>$attr['markerWidth'],'style'=>BlockCode::style(['width'=>$attr['markerWidth'],'textAlign'=>$attr['markerAlign'],'fontSize'=>$attr['markerSize']])])?>>
			<?=BlockCode::element('span',$prefix.'__item-marker-prefix',$attr['prefix']??'●')?>
			<?php if(BlockCode::has($attr['classes'],'is-ordered')): ?><?=BlockCode::element('span',$prefix.'__item-marker-index',str_pad((string)($index+1),max(1,(int)$attr['markerIndexPad']),'0',STR_PAD_LEFT),['style'=>'font-size:'.$attr['markerIndexSize']])?>
			<?=BlockCode::element('span',$prefix.'__item-marker-suffix',$attr['suffix']??$attr['sufix']??'')?>
			<?php endif; ?>
		</td>
		<td class="<?=$prefix?>__item-spacer" width="<?=esc_attr($attr['markerMargin'])?>" style="width:<?=esc_attr($attr['markerMargin'])?>"></td>
		<td class="<?=$prefix?>__item-text"><?=BlockCode::rich($item['text']??'')?></td>
	</tr>
<?php endforeach; ?>
<?=BlockCode::spacer($prefix,$attr['marginBottom'],'em',3)?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
