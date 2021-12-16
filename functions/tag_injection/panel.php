<?php
namespace Catpow;
?>
<?php foreach(CP::$content->conf['meta'] as $name=>$conf): ?>
<dl>
	<dt><i class="fas fa-code"></i><?=$conf['label']?></dt>
	<dd><?php input($name); ?></dd>
</dl>
<?php endforeach; ?>
<ul class="buttons">
	<li><?php button('<i class="fas fa-sync-alt"></i>登録','action','message'); ?></li>
</ul>
<?php §message(); ?>