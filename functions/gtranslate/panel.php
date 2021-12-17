<?php namespace Catpow; ?>
<ul>
	<li>
		<h3>ウィジェット表示</h3>
		<p>翻訳ウィジェットの表示・非表示を設定</p>
		<?php input('show_widget'); ?>
	</li>
	<li>
		<h3>対応言語</h3>
		<p>翻訳対応する言語を選択</p>
		<?php input('locale'); ?>
		<ul class="buttons">
			<li class="edit"><?php button('更新','action'); ?></li>
		</ul>
	</li>
</ul>