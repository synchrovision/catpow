<?php
use Catpow\util\BlockCode;

$name='catpow/dialog';
$prefix='wp-block-catpow-dialog';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('dialog',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
		<header class="<?=$prefix?>__item-header">
			<div class="<?=$prefix?>__item-header-image">
				<?=BlockCode::templateImage($item,$attr,$prefix.'__item-header-image-img','headerImage',false)?>
			</div>
			<div class="<?=$prefix?>__item-header-text">
				<?=BlockCode::element('h3',$prefix.'__item-header-text-heading',$item['title']??'')?>
			</div>
		</header>
		<div class="<?=$prefix?>__item-contents">
			<?=BlockCode::element('p',$prefix.'__item-contents-text',$item['text']??'')?>
		</div>
	</li>
<?php endforeach; ?>
</ul><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
