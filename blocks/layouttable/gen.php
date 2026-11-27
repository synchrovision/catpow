<?php
use Catpow\util\BlockCode;

$name='catpow/layouttable';
$prefix='wp-block-catpow-layouttable';
$comment=BlockCode::commentAttributes($name,$attr,['vars']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<table<?=BlockCode::root('layouttable',$attr)?>>
<tbody>
<?php foreach($attr['rows']??[] as $row): ?>
	<tr>
	<?php foreach($row['cells']??$row as $cell):
		$text=BlockCode::rich($cell['text']??'');
		$tag=BlockCode::has($cell['classes']??'',$prefix.'__tbody-tr-th')?'th':'td';
		$class=$cell['classes']??null;
	?>
		<<?=$tag?><?=BlockCode::attrs(['class'=>$class, 'rowspan'=>$cell['rowspan']??null, 'colspan'=>$cell['colspan']??null, 'style'=>$cell['style']??null])?>><?=$text?></<?=$tag?>>
	<?php endforeach; ?>
	</tr>

<?php endforeach; ?>
</tbody></table>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
