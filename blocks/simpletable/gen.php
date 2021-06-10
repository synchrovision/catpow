<!-- wp:catpow/simpletable -->
<table class="wp-block-catpow-simpletable <?=$attr['classes']?>">
	<tbody>
<?php foreach($attr['rows'] as $row): ?>
		<tr class="<?=$row['classes']??''?>">
			<th class="item <?=$row['cells'][0]['classes']??''?>"><?=$row['cells'][0]['text']?></th>
			<td class="item <?=$row['cells'][1]['classes']??''?>"><?=$row['cells'][1]['text']?></td>
		</tr>
<?php endforeach ?>
	</tbody>
</table>
<!-- /wp:catpow/simpletable -->