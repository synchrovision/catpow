<?php namespace Catpow; ?>
<div class="cp_lightbox_content_body">
	<table class="manage">
		<!--meta-->
		<tr>
			<th><!--label--></th>
			<td><?php input('<!--name-->'); ?></td>
		</tr>
		<!--/meta-->
	</table>
	<ul class="buttons center">
		<li class="item close negative"><?php button(_('削除'),'delete','remove');?></li>
		<li class="item refresh primary"><?php button(_('更新'),'push','replace');?></li>
	</ul>
</div>
<div class="cp_lightbox_control"><?php button('','close','lightbox_close'); ?></div>
<?php deps();?>