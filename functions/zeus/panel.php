<?php namespace Catpow;?>
<h3><i class="far fa-credit-card"></i>ZEUS</h3>
<?php foreach(loop('cp_zeus_keys') as $vals): ?>
<dl>
	<dt>IPコード</dt>
	<dd><?php input('ipcode'); ?></dd>
</dl>
<?php endforeach; ?>
<p>
	Zeusより発行された5~10桁のIPコードを入力してください。
</p>
<ul class="wp-block-catpow-buttons m center">
	<li class="item edit"><?php button('登録','action','message'); ?></li>
</ul>
<?php §message(); ?>