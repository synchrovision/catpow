<?php
$states=[];
$classes=$attr['classes']??'wp-block-catpow-datatable spec hasHeaderRow hasHeaderColumn';
foreach(explode(' ',$classes) as $name){$states[$name]=true;}
$hasHeaderRow=!empty($states['hasHeaderRow']);
$hasHeaderColumn=!empty($states['hasHeaderColumn']);
$rows=$attr['rows'];
?>
<!-- wp:catpow/datatable {"doLoop":true} -->
<table class="<?=$classes?>">
<?php if($hasHeaderRow):$row=reset($rows); ?>
	<thead>
		<tr>
<?php foreach($row as $c=>$cell):?>
			<th class="<?=$cell['classes']?>"><?=$cell['text']?></th>
<?php endforeach; ?>
		</tr>
	</thead>
<?php endif; ?>
	<tbody>
<?php while($row=next($rows)): ?>
		<tr>
<?php foreach($row as $c=>$cell):$tag=($hasHeaderColumn&&$c===0)?'th':'td';?>
			<<?=$tag?> class="<?=$cell['classes']?>"><?=$cell['text']?></<?=$tag?>>
<?php endforeach; ?>
		</tr>
<?php endwhile; ?>
	</tbody>
</table>
<onEmpty><?=$children??''?></onEmpty>
<!-- /wp:catpow/datatable -->