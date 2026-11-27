<?php
use Catpow\util\BlockCode;

$name='catpow/definition';

$comment=BlockCode::commentAttributes($name,$attr,['vars','doLoop','loopCount','query','content_path']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('definition',$attr)?>>
<?php foreach($attr['items']??[] as $item): ?>
	<dl class="wp-block-catpow-definition__item">
		<?=BlockCode::element('dt','wp-block-catpow-definition__item-title',$item['title']??'')?>
		<?=BlockCode::element('dd','wp-block-catpow-definition__item-text',$item['text']??'')?>
	</dl>
<?php endforeach; ?>
</div><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
