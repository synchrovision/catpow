<?php
$classes=$attr['classes']??'is-level3 has-item-size-medium';
?>
<!-- wp:catpow/formbuttons -->
<ul class="wp-block-catpow-formbuttons cp-buttons <?=$classes?>">
<?php foreach((array)$attr['items'] as $item): ?>
	<li class="wp-block-catpow-formbuttons__item <?=$item['classes']??''?>">
		<?php if(preg_match('/\bhas-micro-copy\b/',$classes)): ?>
			<span class="wp-block-catpow-formbuttons__item-copy"><?=$item['microcopy']??''?></span>
		<?php endif; ?>
		<div class="wp-block-catpow-formbuttons-button" role="button" data-action="<?=$item['action']??''?>" data-event="<?=$item['event']??''?>" data-yss-event="<?=$item['yss-event']??''?>" data-yjad-event="<?=$item['yjad-event']??''?>" data-fbp-event="<?=$item['fbp-event']??''?>">
			<?php if(preg_match('/\bhas-icon\b/',$item['classes']??'')):?>
				<div class="wp-block-catpow-formbuttons-button__icon">
					<img src="<?=$item['iconSrc']??''?>" alt="<?=$item['iconAlt']??''?>"/>
				</div>
			<?php endif; ?>
			<span class="wp-block-catpow-formbuttons-button__text"><?=$item['text']?></span>
		</div>
		<?php if(preg_match('/\bhas-caption\b/',$classes)): ?>
			<span class="wp-block-catpow-formbuttons__item-caption"><?=$item['caption']??''?></span>
		<?php endif; ?>
	</li>
<?php endforeach ?>
</ul>
<!-- /wp:catpow/formbuttons -->