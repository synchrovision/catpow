<!-- wp:catpow/formbuttons -->
<ul class="wp-block-catpow-formbuttons buttons <?=$attr['classes']??''?>">
<?php foreach((array)$attr['items'] as $item): ?>
	<li class="item <?=$item['classes']??''?>">
		<div class="button" data-action="<?=$item['action']??''?>" data-callback="<?=$item['callback']??''?>" data-target="<?=$item['target']??''?>" ignore-message="<?=$item['ignoreMessage']??''?>" data-event="<?=$item['event']??''?>">
			<?php if(preg_match('/\bhasIcon\b/',$item['classes']??'')):?>
				<span class="icon">
					<img src="<?=$item['iconSrc']??''?>" alt="<?=$item['iconAlt']??''?>"/>
				</span>
			<?php endif; ?>
			<?=$item['text']?>
		</div>
	</li>
<?php endforeach ?>
</ul>
<!-- /wp:catpow/formbuttons -->