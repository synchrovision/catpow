<?php
use Catpow\util\BlockCode;

$name='catpow/slidablemenu';

$comment=BlockCode::commentAttributes($name,$attr,['isTemplate','doLoop','columnsCount','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<div<?=BlockCode::root('slidablemenu',$attr,['style'=>BlockCode::style(['--columns'=>$attr['columnsCount']??4])])?>><ul class="items">
<?php foreach($attr['items']??[] as $item): ?>
	<li<?=BlockCode::attrs(['class'=>$item['classes']??null])?>>
		<div class="contents">
			<div class="image"><?=BlockCode::templateImage($item,$attr)?></div>
			<div class="texts"><?=BlockCode::element('h4','title',$item['title']??'')?><?=BlockCode::element('div','text',$item['text']??'')?></div>
			<a<?=BlockCode::attrs(['class'=>'link','href'=>$item['linkUrl']??null])?>> </a>
		</div>
	</li>
<?php endforeach; ?>
</ul></div><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
