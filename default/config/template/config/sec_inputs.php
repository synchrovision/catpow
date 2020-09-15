<?php
namespace Catpow;
if(!empty($action)){
	switch($action){
		case 'post':
			receive();
			push();
			clear();
			break;
	}
}
?>
<div class="table_wrapper">
	<table class="manage">
		<tbody>
			<!--meta-->
			<tr>
				<th><!--label--></th>
				<!--if:has_children-->
				<td>
					<?php foreach(loop('<!--name-->') as $child): ?>
					<table>
						<tbody>
						<!--children-->
							<tr>
								<th><!--label--></th>
								<td><?php input('<!--name-->'); ?></td>
							</tr>
						<!--/children-->
						</tbody>
					</table>
					<?php endforeach; ?>
				</td>
				<!--else-->
				<td><?php input('<!--name-->'); ?></td>
				<!--/if-->
			</tr>
			<!--/meta-->
		</tbody>
	</table>
</div>

<ul class="buttons center">
	<li class="item refresh primary"><?php button(_('送信'),'post','replace');?></li>
</ul>