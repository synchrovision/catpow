<?php
namespace Catpow;
?>
<dl>
<?php foreach(CP::$content->conf['meta'] as $name=>$conf): ?>
	<dt><i class="fas fa-code"></i><?=$conf['label']?></dt>
	<dd><?php input($name); ?></dd>
<?php endforeach; ?>
</dl>
<ul class="cp-admin-buttons">
	<li class="item"><?php button('<i class="fas fa-sync-alt"></i>登録','action'); ?></li>
</ul>