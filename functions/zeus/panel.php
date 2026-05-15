<?php namespace Catpow;?>
<h3><i class="far fa-credit-card"></i>ZEUS</h3>
<dl>
<?php foreach(loop('cp_zeus_keys') as $vals): ?>
	<dt>IPコード</dt>
	<dd><?php input('ipcode'); ?></dd>
<?php endforeach; ?>
</dl>
<p>
	Zeusより発行された5~10桁のIPコードを入力してください。
</p>
<ul class="wp-block-catpow-buttons m center">
	<li class="item edit"><?php button('登録','action'); ?></li>
</ul>