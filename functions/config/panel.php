<?php namespace Catpow; ?>
<ul>
	<li>
		<h3>使用機能</h3>
		<p>Catpowのfuncitonsの中からこのテーマで使用する機能を選択します。</p>
		<?php input('use_functions'); ?>
	</li>
</ul>
<ul class="cp-admin-buttons">
	<li class="item"><?php button('<i class="fas fa-sync-alt"></i>更新','action','reload'); ?></li>
</ul>