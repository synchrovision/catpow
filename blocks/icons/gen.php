<?php
use Catpow\util\BlockCode;

$name='catpow/icons';
$prefix='wp-block-catpow-icons';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('icons',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
		<?=BlockCode::element('a',$prefix.'__item-link','<img'.BlockCode::attrs(['class'=>$prefix.'__item-link-icon','src'=>$item['src']??null,'alt'=>$item['alt']??null]).'/>',['href'=>$item['href']??''])?>
	</li>
<?php endforeach; ?>
</ul>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
