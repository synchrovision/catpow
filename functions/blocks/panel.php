<?php namespace Catpow; ?>
<ul>
	<li>
		<h3>ブロック</h3>
		<p>このテーマで使用可能なブロックの中から有効にするブロックを選択します。</p>
		<?php input('use_blocks'); ?>
		<small>何も選択しない場合はテーマで使用可能なブロックが全て有効になります。</small>
	</li> 
</ul>
<ul class="cp-admin-buttons">
	<li class="item"><?php button('<i class="fas fa-sync-alt"></i>更新','action','reload'); ?></li>
</ul>