<?php namespace Catpow; ?>
<table class="manage">
<?php foreach(CP::$content->loop_meta(['can_edit'=>true]) as $name=>$meta): ?>
	<tr>
		<th><?=$meta->conf['label']?></th>
		<td><?php $meta->input(); ?></td>
	</tr>
<?php endforeach; ?>
</table>