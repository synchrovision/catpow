<?php namespace Catpow;?>
<dl>
	<dt><i class="fab fa-yahoo"></i>トラッキングID</dt>
	<dd><?php input('cp_yss_id'); ?></dd>
</dl>
<dl>
	<dt><i class="fab fa-yahoo"></i>リターゲティング</dt>
	<dd><?php input('cp_yss_use_retargeting'); ?></dd>
</dl>
<ul class="buttons">
	<li><?php button('<i class="fas fa-sync-alt"></i>登録','action'); ?></li>
</ul>