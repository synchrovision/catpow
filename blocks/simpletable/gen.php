<?php
use Catpow\util\BlockCode;

$name='catpow/simpletable';
$prefix='wp-block-catpow-simpletable';
$comment=BlockCode::commentAttributes($name,$attr,['vars']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('simpletable',$attr)?>>
<tbody>
<?php foreach($attr['rows']??[] as $row): ?>
	<tr<?=BlockCode::attrs(['class'=>BlockCode::classes($prefix.'__tbody-tr',$row['classes']??''),'data-refine-cond'=>$row['cond']??null])?>>
	<?php foreach(array_values($row['cells']??$row) as $j=>$cell):
		$text=BlockCode::rich($cell['text']??'');
		$tag=$j===0?'th':'td';
$class=BlockCode::classes($prefix.'__tbody-tr-'.$tag,$cell['classes']??'');
	?>
		<<?=$tag?><?=BlockCode::attrs(['class'=>$class])?>><?=$text?></<?=$tag?>>
	<?php endforeach; ?>
	</tr>

<?php endforeach; ?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
