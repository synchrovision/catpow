<?php
namespace Catpow;
if(isset($action)){
	switch($action){
		case 'push':push();break;
		case 'delete':delete();break;
	}
}
?>
<th class="control">
	<ul class="buttons ss">
		<li class="edit"><?php button(_('編集'),'edit','lightbox');?></li>
	</ul>
	<?php §lightbox(); ?>
</th>
<!--meta-->
<!--if:has_children-->
<td>
	<?php foreach(loop('<!--name-->') as $child): ?>
	<table>
		<tbody>
		<!--children-->
			<tr>
				<th><!--label--></th>
				<td><?php output('<!--name-->'); ?></td>
			</tr>
		<!--/children-->
		</tbody>
	</table>
	<?php endforeach; ?>
</td>
<!--else-->
<td><?php output('<!--name-->'); ?></td>
<!--/if-->
<!--/meta-->
