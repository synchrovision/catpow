<!-- wp:catpow/buttons -->
<ul class="wp-block-catpow-buttons buttons <?=$attr['classes']?>">
<?php foreach($attr['items'] as $item): ?>
	<li class="item <?=$item['classes']?>">
		<a href="<?=$item['url']?>" class="button" data-event="<?=$item['event']??''?>">
			<?php if(preg_match('/\bhasIcon\b/',$item['classes'])):?>
				<span class="icon">
					<img src="<?=$item['iconSrc']??''?>" alt="<?=$item['iconAlt']??''?>"/>
				</span>
			<?php endif; ?>
			<?=$item['text']?>
		</a>
	</li>
<?php endforeach ?>
</ul>
<!-- /wp:catpow/buttons -->