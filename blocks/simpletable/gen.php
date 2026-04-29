<!-- wp:catpow/simpletable -->
<table class="wp-block-catpow-simpletable <?=$attr['classes']??'is-level3 is-type-spec'?>">
	<tbody class="wp-block-catpow-simpletable__tbody">
<?php foreach($attr['rows'] as $row): ?>
		<tr class="wp-block-catpow-simpletable__tbody-tr <?=$row['classes']?>">
			<th class="wp-block-catpow-simpletable__tbody-tr-th <?=$row['cells'][0]['classes']??''?>"><?=$row['cells'][0]['text']?></th>
			<td class="wp-block-catpow-simpletable__tbody-tr-td <?=$row['cells'][1]['classes']??''?>"><?=$row['cells'][1]['text']?></td>
		</tr>
<?php endforeach ?>
	</tbody>
</table>
<!-- /wp:catpow/simpletable -->