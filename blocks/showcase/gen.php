<?php
use Catpow\util\BlockCode;

$name='catpow/showcase';
$prefix='wp-block-catpow-showcase';
$has=static function($flag)use(&$attr){return BlockCode::has($attr['classes']??'',$flag);};
$comment=BlockCode::commentAttributes($name,$attr,['HeadingTag','SubHeadingTag','vars','doLoop','isTemplate','loopParam','loopCount','content_path','query']);
$attr=BlockCode::defaults($name,$attr);
ob_start();
?>
<ul<?=BlockCode::root('showcase',$attr)?>>
<?php foreach(array_values($attr['items']??[]) as $index=>$item):
	$itemClass=BlockCode::classes($prefix.'__item',$item['classes']??'');
?>
	<li<?=BlockCode::attrs(['class'=>$itemClass])?>>
		<div class="<?=$prefix?>__item-image">
			<?=BlockCode::templateImage($item,$attr,$prefix.'__item-image-img','',false)?>
		</div>
		<div class="<?=$prefix?>__item-texts">
			<?php if($has('has-counter')): ?>
				<?=BlockCode::counter($prefix.'__item-texts-counter',$index+(1),$attr['countPrefix']??'',$attr['countSuffix']??'')?>
			<?php endif; ?>
			<?=BlockCode::element(BlockCode::tag($attr['HeadingTag']??'h3','h3'),$prefix.'__item-texts-title',$item['title']??'')?>
			<?php if($has('has-title-caption')): ?>
				<?=BlockCode::element('p',$prefix.'__item-texts-caption',$item['titleCaption']??'')?>
			<?php endif; ?>
			<?=BlockCode::element('div',$prefix.'__item-texts-text',$item['text']??'')?>
			<?php if($has('has-link')): ?>
				<?=BlockCode::link($prefix.'__item-texts-link',$item,'linkText')?>
			<?php endif; ?>
		</div>
	</li>
<?php endforeach; ?>
</ul><?php if(!empty($attr['doLoop'])): ?><on-empty><?=$children?></on-empty><?php endif; ?>
<?=BlockCode::serialize($name,$comment,trim(ob_get_clean()))?>
