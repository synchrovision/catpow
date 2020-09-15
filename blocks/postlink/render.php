<div class="wp-block-catpow-postlink">
	<ul class="links">
		<?php if(!$attr['preview']): ?>
		<li class="prev"><?php previous_post_link('%link'); ?></li>
		<li class="next"><?php next_post_link('%link'); ?></li>
		<?php else: ?>
		<li class="prev"><a>前の記事</a></li>
		<li class="next"><a>次の記事</a></li>
		<?php endif; ?>
	</ul>
</div>