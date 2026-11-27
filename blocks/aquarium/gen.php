<?php
use Catpow\util\BlockCode;

$name='catpow/aquarium';

$comment=BlockCode::commentAttributes($name,$attr);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('aquarium',$attr)?>><?php foreach($attr['layers']??[] as $layer): ?>
	<div<?=BlockCode::attrs(['class'=>$layer['classes']??null])?>>
	<?php foreach($layer['items']??[] as $item): ?>
		<div<?=BlockCode::attrs(['class'=>$item['classes']??null])?>>
		<?php foreach($item['images']??[] as $image): ?>
			<div<?=BlockCode::attrs(['class'=>$image['classes']??null])?>><img<?=BlockCode::attrs(array_intersect_key($image,['src'=>true,'srcset'=>true,'alt'=>true]))?>/></div>
		<?php endforeach; ?>
		<?php foreach($item['texts']??[] as $text): ?>
			<div<?=BlockCode::attrs(['class'=>$text['classes']??null])?>><h3><?=esc_html($text['title']??'')?></h3><p><?=esc_html($text['text']??'')?></p></div>
		<?php endforeach; ?>
		</div>
	<?php endforeach; ?>
	</div>
<?php endforeach; ?>
<div class="contents"><?=$children?></div></div>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
