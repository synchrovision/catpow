<?php
use Catpow\util\BlockCode;

$name='catpow/t-body';
$prefix='wp-block-catpow-t-body';
$attr+=['classes'=>'has-header has-footer','isHtmlMail'=>true,'headerPaddingTop'=>1,'headerPaddingBottom'=>1,'footerPaddingTop'=>1,'footerPaddingBottom'=>1];
$comment=BlockCode::commentAttributes($name,$attr,['type','isHtmlMail','headerPaddingTop','headerPaddingBottom','footerPaddingTop','footerPaddingBottom','body_class']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<?php if(!$attr['isHtmlMail'] || !empty($attr['textMail'])): ?><textmail><?=esc_html($attr['textMail']??'')?></textmail><?php endif; ?>
<?php if($attr['isHtmlMail']): ?>
<table width="100%" align="center"<?=BlockCode::root('t-body',$attr)?>>
<?php foreach(['header'=>'thead','footer'=>'tfoot'] as $part=>$tag): ?>
	<?php if($part==='footer'): ?>
	<tbody class="<?=$prefix?>__tbody"><tr class="<?=$prefix?>__tbody-tr"><td class="<?=$prefix?>__tbody-tr-td" align="center"><div class="<?=$prefix?>-contents"><?=$children?></div></td></tr></tbody>
	<?php endif; ?>
	<?php if(!BlockCode::has($attr['classes'],'has-'.$part)){continue;} ?>
	<?php
	$class=$attr[$part.'Classes']??$prefix.'__'.$tag.($part==='header'?' has-color-scheme-inverted has-background-color':' has-background-color-alt');
	$cell=$part==='header'?'th':'td';
	$text=$attr[$part.'Text']??($part==='header'?get_bloginfo('name'):'caption');
	?>
	<<?=$tag?> class="<?=esc_attr($class)?>">
	<?=BlockCode::spacer($prefix,$attr[$part.'PaddingTop'],'rem',null,$tag)?>
	<tr class="<?=$prefix?>__<?=$tag?>-tr"><<?=$cell?> class="<?=$prefix?>__<?=$tag?>-tr-<?=$cell?> is-text-cell" align="center"><?=BlockCode::rich($text)?></<?=$cell?>></tr>
	<?=BlockCode::spacer($prefix,$attr[$part.'PaddingBottom'],'rem',null,$tag)?>
	</<?=$tag?>>
<?php endforeach; ?>
</table>
<?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
