<?php namespace Catpow;?>
<?php if(git_theme::is_theme_repo()): ?>
<code>
	ssh://[host]<?=get_stylesheet_directory()?>/.git
</code>
<?php else: ?>
<ul class="buttons">
	<li><?php button('<i class="fas fa-sync-alt"></i>作成','action'); ?></li>
</ul>
<?php endif; ?>