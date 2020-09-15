<?php namespace Catpow;?>
<dl>
	<dt><i class="fab fa-google"></i>トラッキングID</dt>
	<dd><?php input('cp_ga_code'); ?></dd>
</dl>
<ul class="buttons">
	<li><?php button('<i class="fas fa-sync-alt"></i>登録','action','message'); ?></li>
</ul>
<?php §message(); ?>