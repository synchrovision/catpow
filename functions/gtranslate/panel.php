<?php
namespace Catpow;
?>
<ul>
	<li>
		<?php input('show_widget'); ?>
	</li>
	<li>
		<?php input('locale'); ?>
	</li>
</ul>
<ul class="buttons">
	<li class="edit"><?php button('更新','action','message'); ?></li>
</ul>
<?php §message(); ?>