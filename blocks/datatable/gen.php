<?php
use Catpow\util\BlockCode;

$name='catpow/datatable';
$prefix='wp-block-catpow-datatable';
$attr+=['classes'=>'wp-block-catpow-datatable is-style-spec is-level3 has-header-row has-header-column','doLoop'=>true];
$attr['classes']=strtr($attr['classes'],['hasHeaderRow'=>'has-header-row','hasHeaderColumn'=>'has-header-column']);
$attr['classes']=preg_replace('/(?<=\s|^)spec(?=\s|$)/','is-style-spec',$attr['classes']);
$headerRow=BlockCode::has($attr['classes'],'has-header-row');
$headerColumn=BlockCode::has($attr['classes'],'has-header-column');
$comment=BlockCode::commentAttributes($name,$attr,['vars','doLoop','loopParam','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('datatable',$attr)?>>
<?php if($headerRow && !empty($attr['rows'])): ?><thead class="<?=$prefix?>__thead"><?php else: ?><tbody class="<?=$prefix?>__tbody"><?php endif; ?>
<?php foreach(array_values($attr['rows']??[]) as $i=>$row):
	$group=$headerRow&&$i===0?'thead':'tbody';
?>
	<tr class="<?=$prefix?>__<?=$group?>-tr">
	<?php foreach(array_values($row['cells']??$row) as $j=>$cell):
		$text=BlockCode::rich($cell['text']??'');
		$tag=$i===0&&$headerRow || $j===0&&$headerColumn?'th':'td';
		$class=BlockCode::classes($prefix.'__'.$group.'-tr-'.$tag,$group==='thead'&&$j===0&&$headerColumn&&$text===''?'is-spacer':'');
	?>
		<<?=$tag?><?=BlockCode::attrs(['class'=>$class])?>><?=$text?></<?=$tag?>>
	<?php endforeach; ?>
	</tr>
	<?php if($headerRow && $i===0): ?></thead><tbody class="<?=$prefix?>__tbody"><?php endif; ?>
<?php endforeach; ?>
</tbody></table><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
