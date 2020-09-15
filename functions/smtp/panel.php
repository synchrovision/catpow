<?php namespace Catpow; ?>
<dl>
	<dt><i class="fa fa-envelope"></i>SMTP</dt>
	<dd><?php input('cp_smtp'); ?></dd>
</dl>
<ul class="buttons">
	<li class="edit"><?php button('登録','action','message'); ?></li>
</ul>
<?php §message(); ?>